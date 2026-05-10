"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import Pagination from "@/components/common/Pagination";
import { EXAM_TYPE_BY_ID, EXAM_TYPES } from "@/app/thu-vien/components/exam-type-selector/exam-types";
import { parseGradeFromSlug, resolveExamTypeLabel } from "@/app/thu-vien/de-thi/seo";
import { usePublicSeoExams } from "@/hooks/usePublicSeoExams";
import { usePublicSeoSubjects } from "@/hooks/usePublicSeoSubjects";
import ExamCardList from "@/app/thu-vien/de-thi/components/ExamCardList";
import type { ExamCardData } from "@/app/thu-vien/de-thi/components/ExamCard";

type DeThiRouteLevel = "subject" | "grade" | "examType";

type DeThiListingClientProps = {
    subjectSlug: string;
    gradeSlug?: string;
    examTypeSlug?: string;
    heading: string;
    description: string;
    routeLevel: DeThiRouteLevel;
};

type ExamFilters = {
    search: string;
    grade: string;
    subjectId: string;
    page: number;
};

type SubjectOption = {
    id: string;
    name: string;
};

const GRADE_OPTIONS = ["6", "7", "8", "9", "10", "11", "12"];
const DEFAULT_GRADE = "12";
const DEFAULT_SUBJECT_ID = "1";

const SUBJECT_SLUG_BY_ID: Record<string, string> = {
    "1": "toan",
};

const SUBJECT_ID_BY_SLUG: Record<string, string> = {
    toan: "1",
};


function slugify(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function parseSubjectOption(item: Record<string, unknown>): SubjectOption | null {
    const rawId = item.id ?? item.subjectId;
    const rawName = item.name ?? item.subjectName ?? item.title;

    if ((typeof rawId !== "string" && typeof rawId !== "number") || typeof rawName !== "string") {
        return null;
    }

    const id = String(rawId).trim();
    const name = rawName.trim();

    if (!id || !name) {
        return null;
    }

    return { id, name };
}

function findSubjectIdFromSlug(subjectSlug: string, subjects: SubjectOption[]) {
    if (SUBJECT_ID_BY_SLUG[subjectSlug]) {
        return SUBJECT_ID_BY_SLUG[subjectSlug];
    }

    const found = subjects.find((item) => slugify(item.name) === subjectSlug);
    return found?.id ?? "";
}

function getSubjectSlug(subjectId: string, subjects: SubjectOption[]) {
    if (SUBJECT_SLUG_BY_ID[subjectId]) {
        return SUBJECT_SLUG_BY_ID[subjectId];
    }

    const subject = subjects.find((item) => item.id === subjectId);
    return subject ? slugify(subject.name) : `mon-${subjectId}`;
}

function getExamName(item: Record<string, unknown>, index: number) {
    const name = item.title ?? item.name ?? item.examName;
    return typeof name === "string" && name.trim().length > 0 ? name : `Đề thi #${index + 1}`;
}

function formatExamDate(item: Record<string, unknown>) {
    const createdRaw = (item.createdAt ?? item.created_at ?? item.created) as string | number | undefined;
    if (!createdRaw) return "";

    const createdAt = new Date(String(createdRaw));
    if (Number.isNaN(createdAt.getTime())) return "";

    try {
        return createdAt.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    } catch {
        return createdAt.toISOString();
    }
}

function buildSubjectPath(subjectSlug: string) {
    return `/thu-vien/de-thi/mon-hoc/${subjectSlug}`;
}

function buildSubjectGradePath(subjectSlug: string, grade: string) {
    return `/thu-vien/de-thi/mon-hoc/${subjectSlug}/khoi/lop-${grade}`;
}

function buildListPath(routeLevel: DeThiRouteLevel, filters: ExamFilters, subjects: SubjectOption[]) {
    const resolvedGrade = filters.grade || DEFAULT_GRADE;
    const resolvedSubjectId = filters.subjectId || DEFAULT_SUBJECT_ID;
    const subjectSlug = getSubjectSlug(resolvedSubjectId, subjects);

    if (routeLevel === "subject" && resolvedGrade === DEFAULT_GRADE) {
        return buildSubjectPath(subjectSlug);
    }

    return buildSubjectGradePath(subjectSlug, resolvedGrade);
}

function buildExamTypePath(examTypeId: string, filters: ExamFilters, subjects: SubjectOption[]) {
    const resolvedGrade = filters.grade || DEFAULT_GRADE;
    const resolvedSubjectId = filters.subjectId || DEFAULT_SUBJECT_ID;
    const subjectSlug = getSubjectSlug(resolvedSubjectId, subjects);
    return `/thu-vien/de-thi/mon-hoc/${subjectSlug}/khoi/lop-${resolvedGrade}/loai-de-thi/${examTypeId}`;
}

function buildUrlWithQuery(path: string, search: string, page: number) {
    const params = new URLSearchParams();
    const nextSearch = search.trim();

    if (nextSearch) {
        params.set("search", nextSearch);
    }

    if (page > 1) {
        params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `${path}?${query}` : path;
}

function buildExamDetailPath({
    slug,
    subjectSlug,
    grade,
    examTypeSlug,
    routeLevel,
}: {
    slug: string;
    subjectSlug: string;
    grade: string;
    examTypeSlug?: string;
    routeLevel: DeThiRouteLevel;
}) {
    if (routeLevel === "examType" && examTypeSlug) {
        return `/thu-vien/de-thi/mon-hoc/${subjectSlug}/khoi/lop-${grade}/loai-de-thi/${examTypeSlug}/chi-tiet/${slug}`;
    }

    if (routeLevel === "grade") {
        return `/thu-vien/de-thi/mon-hoc/${subjectSlug}/khoi/lop-${grade}/chi-tiet/${slug}`;
    }

    return `/thu-vien/de-thi/mon-hoc/${subjectSlug}/chi-tiet/${slug}`;
}

function getPaginationMeta(response: Record<string, unknown> | null, fallbackPage: number) {
    if (!response) {
        return {
            page: fallbackPage,
            total: 0,
            totalPages: 1,
            hasPrevious: fallbackPage > 1,
            hasNext: false,
        };
    }

    const meta = (response.meta as Record<string, unknown> | undefined) ?? {};

    const page = Number(meta.page ?? response.page ?? fallbackPage) || fallbackPage;
    const total = Number(meta.total ?? response.total ?? 0) || 0;
    const totalPages = Number(meta.totalPages ?? response.totalPages ?? 1) || 1;
    const hasPrevious = Boolean(meta.hasPrevious ?? page > 1);
    const hasNext = Boolean(meta.hasNext ?? page < totalPages);

    return {
        page,
        total,
        totalPages,
        hasPrevious,
        hasNext,
    };
}

type ExamTypeFilterSectionProps = {
    selectedExamTypeId?: string;
    filters: ExamFilters;
    subjects: SubjectOption[];
    subjectsLoading: boolean;
    onSearchSubmit: (search: string) => void;
    onGradeChange: (grade: string) => void;
    onSubjectChange: (subjectId: string) => void;
    onClearFilters: () => void;
};

function ExamTypeFilterSection({
    selectedExamTypeId,
    filters,
    subjects,
    subjectsLoading,
    onSearchSubmit,
    onGradeChange,
    onSubjectChange,
    onClearFilters,
}: ExamTypeFilterSectionProps) {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState(filters.search);
    const hasSearchValue = searchValue.trim().length > 0;

    return (
        <section className="space-y-5 rounded-[1.6rem] bg-white py-5 md:py-6">
            <h3 className="text-lg font-bold text-slate-900">Lọc đề thi</h3>

            <div className="flex w-full items-center gap-2">
                <input
                    id="exam-search"
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            onSearchSubmit(searchValue);
                        }
                    }}
                    placeholder="Nhập tên đề hoặc từ khóa..."
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />

                <button
                    type="button"
                    aria-label="Tìm kiếm đề thi"
                    onClick={() => onSearchSubmit(searchValue)}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${
                        hasSearchValue
                            ? "border-blue-600 bg-blue-600 text-white shadow-[0_0_0_3px_rgba(37,99,235,0.15)]"
                            : "border-slate-300 bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                >
                    <Search className="h-4 w-4" />
                </button>
            </div>

            <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Loại đề thi</p>
                <div className="flex flex-wrap gap-2">
                    {EXAM_TYPES.map((item) => {
                        const isActive = item.id === selectedExamTypeId;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    const path = buildExamTypePath(item.id, filters, subjects);
                                    router.push(buildUrlWithQuery(path, filters.search, 1));
                                }}
                                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                                    isActive
                                        ? "border-blue-600 bg-blue-50 text-blue-800"
                                        : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                                }`}
                            >
                                {resolveExamTypeLabel(item.id)}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Khối lớp</p>
                <div className="flex flex-wrap gap-2">
                    {GRADE_OPTIONS.map((grade) => {
                        const isActive = filters.grade === grade;
                        return (
                            <button
                                key={grade}
                                type="button"
                                onClick={() => onGradeChange(grade)}
                                className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                                    isActive
                                        ? "border-blue-600 bg-blue-50 text-blue-800"
                                        : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                                }`}
                            >
                                Khối {grade}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Môn học</p>
                <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
                    {subjects.map((subject) => {
                        const isActive = filters.subjectId === subject.id;
                        return (
                            <button
                                key={subject.id}
                                type="button"
                                onClick={() => onSubjectChange(subject.id)}
                                className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                                    isActive
                                        ? "border-blue-600 bg-blue-50 text-blue-800"
                                        : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                                }`}
                            >
                                {subject.name}
                            </button>
                        );
                    })}
                </div>
                {subjectsLoading ? <p className="mt-1 text-xs text-slate-500">Đang tải danh sách môn học...</p> : null}
            </div>

            <div className="pt-1">
                <button
                    type="button"
                    onClick={() => {
                        setSearchValue("");
                        onClearFilters();
                    }}
                    className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Về mặc định
                </button>
            </div>
        </section>
    );
}

export default function DeThiListingClient({
    subjectSlug,
    gradeSlug,
    examTypeSlug,
    heading,
    description,
    routeLevel,
}: DeThiListingClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedExamType = examTypeSlug ? EXAM_TYPE_BY_ID[examTypeSlug] : undefined;
    const rawGrade = parseGradeFromSlug(gradeSlug ?? "");

    const { subjects, loading: subjectsLoading } = usePublicSeoSubjects({
        page: 1,
        limit: 100,
        sortBy: "name",
        sortOrder: "asc",
    });

    const subjectOptions = useMemo(() => {
        const uniqueSubjects = new Map<string, SubjectOption>();

        subjects.forEach((item) => {
            const option = parseSubjectOption(item as Record<string, unknown>);
            if (option && !uniqueSubjects.has(option.id)) {
                uniqueSubjects.set(option.id, option);
            }
        });

        return Array.from(uniqueSubjects.values());
    }, [subjects]);

    const subjectIdFromSlug = useMemo(() => {
        const mapped = findSubjectIdFromSlug(subjectSlug, subjectOptions);
        return mapped || DEFAULT_SUBJECT_ID;
    }, [subjectSlug, subjectOptions]);

    const appliedFilters = useMemo<ExamFilters>(() => {
        const page = Number(searchParams.get("page")) || 1;
        const resolvedGrade = routeLevel === "subject" ? "" : rawGrade || DEFAULT_GRADE;

        return {
            search: searchParams.get("search")?.trim() ?? "",
            grade: resolvedGrade,
            subjectId: subjectIdFromSlug,
            page: page > 0 ? page : 1,
        };
    }, [rawGrade, routeLevel, searchParams, subjectIdFromSlug]);

    const { exams, response, loading, error } = usePublicSeoExams({
        page: appliedFilters.page,
        limit: 20,
        typeOfExam: selectedExamType?.typeOfExam,
        search: appliedFilters.search || undefined,
        grade: appliedFilters.grade || undefined,
        subjectId: appliedFilters.subjectId || undefined,
    });

    const pushListRoute = (nextFilters: ExamFilters) => {
        const path = buildListPath(routeLevel, nextFilters, subjectOptions);
        router.push(buildUrlWithQuery(path, nextFilters.search, nextFilters.page));
    };

    const pushRouteKeepingExamType = (nextFilters: ExamFilters) => {
        if (selectedExamType?.id) {
            const examTypePath = buildExamTypePath(selectedExamType.id, nextFilters, subjectOptions);
            router.push(buildUrlWithQuery(examTypePath, nextFilters.search, nextFilters.page));
            return;
        }

        pushListRoute(nextFilters);
    };

    const examCards = useMemo<ExamCardData[]>(() => {
        const currentSubjectSlug = getSubjectSlug(appliedFilters.subjectId, subjectOptions);

        return exams.map((exam, index) => {
            const item = exam as Record<string, unknown>;
            const id = item.id ?? item.examId;
            const slug = (item.slug ?? item.examSlug ?? String(id ?? index)) as string;

            const detailUrl = buildExamDetailPath({
                slug,
                subjectSlug: currentSubjectSlug,
                grade: appliedFilters.grade || DEFAULT_GRADE,
                examTypeSlug: selectedExamType?.id,
                routeLevel,
            });

            const thumbnailUrl =
                (typeof item.thumbnailUrl === "string" && item.thumbnailUrl) ||
                (typeof item.image === "string" && item.image) ||
                (typeof item.thumbnail === "string" && item.thumbnail) ||
                "/images/tai_lieu_hoc/defaultExam.jpg";

            return {
                id: `${slug}-${index}`,
                title: getExamName(item, index),
                thumbnailUrl,
                detailUrl: slug ? detailUrl : undefined,
                createdAtText: formatExamDate(item),
            };
        });
    }, [appliedFilters.grade, appliedFilters.subjectId, exams, routeLevel, selectedExamType?.id, subjectOptions]);

    const pagination = useMemo(() => {
        return getPaginationMeta((response ?? null) as Record<string, unknown> | null, appliedFilters.page);
    }, [appliedFilters.page, response]);

    return (
        <div className="space-y-8 pb-16">
            <RevealOnScroll className="w-full">
                <div className="layout-grid gap-y-6">
                    <aside className="col-span-4 space-y-4 md:col-span-3 xl:col-span-4">
                        <ExamTypeFilterSection
                            key={`${subjectSlug}-${gradeSlug ?? ""}-${examTypeSlug ?? ""}-${appliedFilters.search}-${appliedFilters.grade}-${appliedFilters.subjectId}`}
                            selectedExamTypeId={selectedExamType?.id}
                            filters={appliedFilters}
                            onSearchSubmit={(search) => {
                                pushListRoute({
                                    ...appliedFilters,
                                    search,
                                    page: 1,
                                });
                            }}
                            onGradeChange={(grade) => {
                                pushRouteKeepingExamType({
                                    ...appliedFilters,
                                    grade,
                                    page: 1,
                                });
                            }}
                            onSubjectChange={(subjectId) => {
                                pushRouteKeepingExamType({
                                    ...appliedFilters,
                                    subjectId,
                                    page: 1,
                                });
                            }}
                            onClearFilters={() => {
                                pushListRoute({
                                    search: "",
                                    grade: routeLevel === "subject" ? "" : DEFAULT_GRADE,
                                    subjectId: DEFAULT_SUBJECT_ID,
                                    page: 1,
                                });
                            }}
                            subjects={subjectOptions}
                            subjectsLoading={subjectsLoading}
                        />
                    </aside>

                    <section className="col-span-4 rounded-[1.6rem] bg-white p-6 md:col-span-5 md:p-7 xl:col-span-8">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <h1 className="text-2xl font-bold text-blue-900">{heading}</h1>
                                <p className="mt-1 text-sm text-slate-600">{description}</p>
                            </div>
                            {loading ? (
                                <span className="inline-flex h-7 w-16 animate-pulse rounded-full bg-slate-200" />
                            ) : (
                                <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold leading-none text-blue-800">
                                    {pagination.total || exams.length} đề
                                </span>
                            )}
                        </div>

                        {error ? <p className="text-red-600">Không tải được danh sách đề thi.</p> : null}
                        {!error ? (
                            <ExamCardList
                                exams={examCards}
                                loading={loading}
                                columns={2}
                                skeletonCount={6}
                                emptyText="Chưa có đề thi phù hợp với bộ lọc hiện tại."
                            />
                        ) : null}

                        {!error ? (
                            <Pagination
                                page={pagination.page}
                                totalPages={pagination.totalPages}
                                hasPrevious={pagination.hasPrevious}
                                hasNext={pagination.hasNext}
                                onPageChange={(page) => {
                                    pushRouteKeepingExamType({
                                        ...appliedFilters,
                                        page,
                                    });
                                }}
                            />
                        ) : null}
                    </section>
                </div>
            </RevealOnScroll>
        </div>
    );
}
