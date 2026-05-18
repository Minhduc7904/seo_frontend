"use client";

import { useMemo } from "react";
import Link from "next/link";
import MarkdownHtmlRenderer from "@/components/common/MarkdownHtmlRenderer";
import ExamCardList from "@/app/thu-vien/de-thi/components/ExamCardList";
import type { ExamCardData } from "@/app/thu-vien/de-thi/components/ExamCard";
import { usePublicSeoExamById } from "@/hooks/usePublicSeoExamById";
import { usePublicSeoRelatedExams } from "@/hooks/usePublicSeoRelatedExams";
import { usePublicSeoLatestExams } from "@/hooks/usePublicSeoLatestExams";
import {
    buildQuestionDetailHref,
    getQuestionHtml,
    getQuestionId,
    getQuestionSlug,
    getQuestionStatements,
    getQuestionType,
    getStatementHtml,
    getStatementPrefix,
} from "@/app/thu-vien/cau-hoi/question-utils";
import {
    getExamQuestions,
    getExamSections,
    getQuestionLabel,
    getQuestionSectionId,
    getSectionDescription,
    getSectionId,
    getSectionTitle,
} from "@/app/thu-vien/de-thi/exam-utils";

type ExamDetailClientProps = {
    slug: string;
    backHref?: string;
};

function getExamTitle(exam: Record<string, unknown> | null, slug: string) {
    if (!exam) return slug;
    const name = exam.title ?? exam.name ?? exam.examName ?? exam.slug;
    if (typeof name === "string" && name.trim().length > 0) {
        return name;
    }
    return slug;
}

function getExamDescription(exam: Record<string, unknown> | null) {
    if (!exam) return "";
    const description = exam.description ?? exam.shortDescription ?? exam.summary;
    return typeof description === "string" ? description : "";
}

function getProcessedDescription(exam: Record<string, unknown> | null) {
    if (!exam) return "";
    const descriptionHtml = exam.processedDescription ?? exam.descriptionHtml;
    return typeof descriptionHtml === "string" ? descriptionHtml : "";
}

function getExamSlug(item: Record<string, unknown>) {
    const raw = item.slug ?? item.examSlug;
    return typeof raw === "string" ? raw.trim() : "";
}

function getExamName(item: Record<string, unknown>, index: number) {
    const raw = item.title ?? item.name ?? item.examName;
    if (typeof raw === "string" && raw.trim().length > 0) {
        return raw;
    }
    return `Đề thi #${index + 1}`;
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

function toDetailPath(slug: string) {
    return `/thu-vien/de-thi/chi-tiet/${encodeURIComponent(slug)}`;
}

function toExamCards(items: Record<string, unknown>[], currentSlug: string, maxItems: number) {
    const cards: ExamCardData[] = [];

    for (const item of items) {
        const slug = getExamSlug(item);
        if (!slug || slug === currentSlug) {
            continue;
        }

        const thumbnailUrl =
            (typeof item.thumbnailUrl === "string" && item.thumbnailUrl) ||
            (typeof item.image === "string" && item.image) ||
            (typeof item.thumbnail === "string" && item.thumbnail) ||
            "/images/tai_lieu_hoc/defaultExam.jpg";

        cards.push({
            id: `${slug}-${cards.length}`,
            title: getExamName(item, cards.length),
            thumbnailUrl,
            detailUrl: toDetailPath(slug),
            createdAtText: formatExamDate(item),
        });

        if (cards.length >= maxItems) {
            break;
        }
    }

    return cards;
}

function ExamDetailSkeleton() {
    return (
        <article className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded bg-slate-200" />
            <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-11/12 rounded bg-slate-200" />
                <div className="h-4 w-10/12 rounded bg-slate-200" />
            </div>
            <div className="space-y-3 pt-2">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-11/12 rounded bg-slate-200" />
                <div className="h-4 w-9/12 rounded bg-slate-200" />
            </div>
        </article>
    );
}

export default function ExamDetailClient({ slug, backHref = "/thu-vien/de-thi" }: ExamDetailClientProps) {
    const { exam, loading, error } = usePublicSeoExamById(slug);
    const { exams: relatedExams, loading: relatedLoading, error: relatedError } = usePublicSeoRelatedExams(slug, {
        limit: 10,
    });
    const { exams: latestExams, loading: latestLoading, error: latestError } = usePublicSeoLatestExams({
        limit: 4,
    });

    const item = (exam ?? null) as Record<string, unknown> | null;

    const title = useMemo(() => getExamTitle(item, slug), [item, slug]);
    const description = useMemo(() => getExamDescription(item), [item]);
    const processedDescription = useMemo(() => getProcessedDescription(item), [item]);
    const sections = useMemo(() => getExamSections(item), [item]);
    const questions = useMemo(() => getExamQuestions(item), [item]);
    const questionsBySectionId = useMemo(() => {
        const grouped = new Map<string, Record<string, unknown>[]>();

        questions.forEach((question) => {
            const questionItem = question as Record<string, unknown>;
            const sectionId = getQuestionSectionId(questionItem);
            if (!sectionId) return;

            const currentQuestions = grouped.get(sectionId) ?? [];
            currentQuestions.push(questionItem);
            grouped.set(sectionId, currentQuestions);
        });

        return grouped;
    }, [questions]);
    const content = useMemo(() => {
        if (!item) return "";
        const htmlOrText = item.examContent ?? item.content ?? item.body ?? item.detail;
        return typeof htmlOrText === "string" ? htmlOrText : "";
    }, [item]);
    const hasStructuredContent = sections.length > 0;

    const relatedCards = useMemo(
        () => toExamCards(relatedExams as Record<string, unknown>[], slug, 10),
        [relatedExams, slug],
    );

    const latestCards = useMemo(
        () => toExamCards(latestExams as Record<string, unknown>[], slug, 4),
        [latestExams, slug],
    );

    return (
        <div className="space-y-8 pb-16">
            <div className="layout-grid gap-y-6">
                <section className="col-span-4 space-y-6 rounded-[1.6rem] bg-white py-6 md:col-span-5 md:py-7 xl:col-span-8">
                    <div>
                        <Link href={backHref} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                            ← Quay lại danh sách đề thi
                        </Link>
                    </div>

                    {loading ? <ExamDetailSkeleton /> : null}
                    {error ? <p className="text-red-600">Không tải được chi tiết đề thi.</p> : null}

                    {!loading && !error ? (
                        <article className="space-y-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
                                {hasStructuredContent ? (
                                    <Link
                                        href={`/thu-vien/de-thi/chi-tiet/${encodeURIComponent(slug)}/lam-thu`}
                                        className="rounded-lg bg-[#194DB6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#123d92]"
                                    >
                                        Làm thử đề thi
                                    </Link>
                                ) : null}
                            </div>
                            <div className="space-y-5">
                                {processedDescription ? (
                                    <MarkdownHtmlRenderer html={processedDescription} className="text-base text-slate-700" />
                                ) : description ? (
                                    <p className="text-base leading-7 text-slate-700">{description}</p>
                                ) : null}

                                {hasStructuredContent ? (
                                    <div className="space-y-8">
                                        {sections.map((section, sectionIndex) => {
                                            const sectionItem = section as Record<string, unknown>;
                                            const sectionId = getSectionId(sectionItem);
                                            const sectionQuestions = sectionId
                                                ? questionsBySectionId.get(sectionId) ?? []
                                                : [];
                                            const sectionDescription = getSectionDescription(sectionItem);

                                            return (
                                                <section
                                                    key={sectionId || `section-${sectionIndex}`}
                                                    className="space-y-5"
                                                >
                                                    <div className="space-y-2">
                                                        <h2 className="text-xl font-bold text-blue-900">
                                                            {getSectionTitle(sectionItem, sectionIndex)}
                                                        </h2>
                                                        {sectionDescription ? (
                                                            <MarkdownHtmlRenderer
                                                                html={sectionDescription}
                                                                className="text-base text-slate-700"
                                                            />
                                                        ) : null}
                                                    </div>

                                                    {sectionQuestions.length > 0 ? (
                                                        <div className="space-y-6">
                                                            {sectionQuestions.map((question, questionIndex) => {
                                                                const questionType = getQuestionType(question);
                                                                const statements = getQuestionStatements(question);
                                                                const questionId = getQuestionId(question);
                                                                const questionSlug = getQuestionSlug(question);

                                                                return (
                                                                    <article
                                                                        key={`${String(
                                                                            question.questionId ??
                                                                            question.id ??
                                                                            `${sectionId}-${questionIndex}`,
                                                                        )}-${questionIndex}`}
                                                                        className="space-y-3"
                                                                    >
                                                                        <div className="flex items-start gap-2">
                                                                            <div className="shrink-0 pt-[1px] font-bold text-slate-900">
                                                                                <span>
                                                                                    {getQuestionLabel(
                                                                                        question,
                                                                                        questionIndex,
                                                                                    )}
                                                                                </span>
                                                                                {questionId ? (
                                                                                    <span className="ml-2 text-sm font-semibold text-slate-500">
                                                                                        ID: {questionId}
                                                                                    </span>
                                                                                ) : null}
                                                                            </div>
                                                                            <MarkdownHtmlRenderer
                                                                                html={getQuestionHtml(question, questionIndex)}
                                                                                className="min-w-0 flex-1 text-base text-slate-900 [&_p]:m-0"
                                                                            />
                                                                        </div>

                                                                        {questionSlug ? (
                                                                            <a
                                                                                href={buildQuestionDetailHref(questionSlug)}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="inline-flex w-fit text-sm font-semibold text-blue-700 hover:text-blue-900"
                                                                            >
                                                                                Xem chi tiết câu hỏi
                                                                            </a>
                                                                        ) : null}

                                                                        {statements.length > 0 ? (
                                                                            <div className="space-y-2 pl-0 md:pl-8">
                                                                                {statements.map((statement, statementIndex) => {
                                                                                    const statementItem =
                                                                                        statement as Record<string, unknown>;

                                                                                    return (
                                                                                        <div
                                                                                            key={`${String(
                                                                                                statementItem.statementId ??
                                                                                                statementItem.id ??
                                                                                                statementIndex,
                                                                                            )}-${statementIndex}`}
                                                                                            className="flex items-start gap-2"
                                                                                        >
                                                                                            <span className="mt-[2px] shrink-0 text-sm font-semibold text-slate-600">
                                                                                                {getStatementPrefix(
                                                                                                    questionType,
                                                                                                    statementIndex,
                                                                                                )}
                                                                                            </span>
                                                                                            <MarkdownHtmlRenderer
                                                                                                html={getStatementHtml(
                                                                                                    statementItem,
                                                                                                    statementIndex,
                                                                                                )}
                                                                                                className="min-w-0 text-sm text-slate-700 [&_ol]:m-0 [&_p]:m-0 [&_p]:inline [&_ul]:m-0"
                                                                                            />
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        ) : null}
                                                                    </article>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-slate-600">
                                                            Chưa có câu hỏi trong phần này.
                                                        </p>
                                                    )}
                                                </section>
                                            );
                                        })}
                                    </div>
                                ) : content ? (
                                    <MarkdownHtmlRenderer html={content} />
                                ) : (
                                    <p className="text-slate-600">Chưa có nội dung chi tiết cho đề thi này.</p>
                                )}
                            </div>
                        </article>
                    ) : null}

                    <div className="space-y-4 pt-2">
                        <h2 className="text-xl font-bold text-blue-900">Đề thi liên quan</h2>
                        {relatedError ? <p className="text-red-600">Không tải được đề thi liên quan.</p> : null}
                        {!relatedError ? (
                            <ExamCardList
                                exams={relatedCards}
                                loading={relatedLoading}
                                columns={2}
                                skeletonCount={10}
                                emptyText="Chưa có đề thi liên quan."
                            />
                        ) : null}
                    </div>
                </section>

                <aside className="col-span-4 space-y-4 rounded-[1.6rem] bg-white py-6 md:col-span-3 md:py-7 xl:col-span-4">
                    <h2 className="text-xl font-bold text-blue-900">Đề thi mới nhất</h2>
                    {latestError ? <p className="text-red-600">Không tải được đề thi mới nhất.</p> : null}
                    {!latestError ? (
                        <ExamCardList
                            exams={latestCards}
                            loading={latestLoading}
                            columns={1}
                            skeletonCount={4}
                            emptyText="Chưa có đề thi mới nhất."
                        />
                    ) : null}
                </aside>
            </div>
        </div>
    );
}
