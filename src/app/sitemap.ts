import type { MetadataRoute } from "next";
import { EXAM_TYPES } from "@/app/thu-vien/components/exam-type-selector/exam-types";
import { DOCUMENT_TYPE_TAGS } from "@/app/thu-vien/tai-lieu/data";
import { ONLINE_COURSES } from "@/app/khoa-hoc-online/data/online-courses";

const DEFAULT_SITE_URL = "https://beeedu.vn";
const DEFAULT_SUBJECT_SLUG = "toan";
const GRADE_SLUGS = ["lop-6", "lop-7", "lop-8", "lop-9", "lop-10", "lop-11", "lop-12"];
const SUBJECT_PAGE_SIZE = 100;
const EXAM_PAGE_SIZE = 100;
const QUESTION_PAGE_SIZE = 100;
const MAX_SUBJECT_PAGES = 10;
const MAX_EXAM_PAGES = 30;
const MAX_QUESTION_PAGES = 30;
const DOCUMENT_LEVELS = ["thpt", "thcs"] as const;

type ApiListResponse<T> = {
    data?: T[];
    page?: number;
    totalPages?: number;
    total?: number;
    meta?: {
        page?: number;
        totalPages?: number;
        total?: number;
    };
};

type ApiResponse<T> = {
    data?: T;
};

type SubjectPayload = Record<string, unknown>;
type ExamPayload = Record<string, unknown>;
type QuestionPayload = Record<string, unknown>;
type DocumentPayload = Record<string, unknown>;
type DocumentLevelSectionsPayload = {
    sections?: Array<{ documents?: DocumentPayload[] }>;
};

function resolveSiteOrigin() {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

    try {
        const url = new URL(configured);
        return url.origin;
    } catch {
        return DEFAULT_SITE_URL;
    }
}

function resolveApiBase() {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
    return base ? base.replace(/\/$/, "") : "";
}

function toAbsoluteUrl(path: string) {
    const origin = resolveSiteOrigin();
    return new URL(path, `${origin}/`).toString();
}

function slugify(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function resolveTotalPages(payload: ApiListResponse<unknown> | null | undefined, fallback: number) {
    const metaTotalPages = payload?.meta?.totalPages;
    const rawTotalPages = metaTotalPages ?? payload?.totalPages;
    const totalPages = Number(rawTotalPages);

    return Number.isFinite(totalPages) && totalPages > 0 ? totalPages : fallback;
}

function resolveLastModified(raw: unknown) {
    if (typeof raw !== "string" && typeof raw !== "number") {
        return undefined;
    }

    const date = new Date(String(raw));
    return Number.isNaN(date.getTime()) ? undefined : date;
}

async function fetchJson<T>(url: string): Promise<T | null> {
    try {
        const response = await fetch(url, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            return null;
        }

        const json = (await response.json()) as T;
        return json;
    } catch {
        return null;
    }
}

async function getSubjectSlugs() {
    const apiBase = resolveApiBase();
    const slugSet = new Set<string>([DEFAULT_SUBJECT_SLUG]);

    if (!apiBase) {
        return [...slugSet];
    }

    let page = 1;
    let totalPages = 1;

    while (page <= totalPages && page <= MAX_SUBJECT_PAGES) {
        const url = `${apiBase}/subjects/public/seo?page=${page}&limit=${SUBJECT_PAGE_SIZE}&sortBy=name&sortOrder=asc`;
        const payload = await fetchJson<ApiListResponse<SubjectPayload>>(url);

        if (!payload?.data?.length) {
            break;
        }

        for (const subject of payload.data) {
            const slugCandidate =
                (typeof subject.slug === "string" && subject.slug.trim()) ||
                (typeof subject.subjectSlug === "string" && subject.subjectSlug.trim()) ||
                (typeof subject.name === "string" && slugify(subject.name)) ||
                (typeof subject.subjectName === "string" && slugify(subject.subjectName)) ||
                "";

            if (slugCandidate) {
                slugSet.add(slugCandidate);
            }
        }

        totalPages = Math.max(resolveTotalPages(payload, page), page);
        page += 1;
    }

    return [...slugSet];
}

function getExamSlug(exam: ExamPayload) {
    const slug = exam.slug ?? exam.examSlug;
    return typeof slug === "string" && slug.trim() ? slug.trim() : "";
}

function getExamLastModified(exam: ExamPayload) {
    const raw = exam.updatedAt ?? exam.updated_at ?? exam.createdAt ?? exam.created_at ?? exam.created;
    return resolveLastModified(raw);
}

async function getExamEntries() {
    const apiBase = resolveApiBase();
    const entries = new Map<string, Date | undefined>();

    if (!apiBase) {
        return entries;
    }

    let page = 1;
    let totalPages = 1;

    while (page <= totalPages && page <= MAX_EXAM_PAGES) {
        const url = `${apiBase}/exams/public/seo?page=${page}&limit=${EXAM_PAGE_SIZE}`;
        const payload = await fetchJson<ApiListResponse<ExamPayload>>(url);

        if (!payload?.data?.length) {
            break;
        }

        for (const exam of payload.data) {
            const slug = getExamSlug(exam);
            if (!slug) continue;

            const path = `/thu-vien/de-thi/chi-tiet/${encodeURIComponent(slug)}`;
            if (!entries.has(path)) {
                entries.set(path, getExamLastModified(exam));
            }
        }

        totalPages = Math.max(resolveTotalPages(payload, page), page);
        page += 1;
    }

    return entries;
}

function getQuestionSlug(question: QuestionPayload) {
    const raw = question.slug ?? question.questionSlug ?? question.question_slug ?? question.id ?? question.questionId;

    if (typeof raw === "string" || typeof raw === "number") {
        return String(raw).trim();
    }

    return "";
}

function getQuestionLastModified(question: QuestionPayload) {
    const raw =
        question.updatedAt ??
        question.updated_at ??
        question.createdAt ??
        question.created_at ??
        question.created;
    return resolveLastModified(raw);
}

async function getQuestionEntries() {
    const apiBase = resolveApiBase();
    const entries = new Map<string, Date | undefined>();

    if (!apiBase) {
        return entries;
    }

    let page = 1;
    let totalPages = 1;

    while (page <= totalPages && page <= MAX_QUESTION_PAGES) {
        const url = `${apiBase}/questions/public/seo/search?page=${page}&limit=${QUESTION_PAGE_SIZE}`;
        const payload = await fetchJson<ApiListResponse<QuestionPayload>>(url);

        if (!payload?.data?.length) {
            break;
        }

        for (const question of payload.data) {
            const slug = getQuestionSlug(question);
            if (!slug) continue;

            const path = `/thu-vien/cau-hoi/chi-tiet/${encodeURIComponent(slug)}`;
            if (!entries.has(path)) {
                entries.set(path, getQuestionLastModified(question));
            }
        }

        totalPages = Math.max(resolveTotalPages(payload, page), page);
        page += 1;
    }

    return entries;
}

function getDocumentSlug(document: DocumentPayload) {
    const raw =
        document.slug ??
        document.documentSlug ??
        document.document_slug ??
        document.id ??
        document.documentId;

    if (typeof raw === "string" || typeof raw === "number") {
        return String(raw).trim();
    }

    return "";
}

function getDocumentLastModified(document: DocumentPayload) {
    const raw =
        document.updatedAt ??
        document.updated_at ??
        document.createdAt ??
        document.created_at ??
        document.created;
    return resolveLastModified(raw);
}

function collectDocumentsFromSections(payload?: DocumentLevelSectionsPayload) {
    const documents: DocumentPayload[] = [];

    for (const section of payload?.sections ?? []) {
        if (Array.isArray(section.documents)) {
            documents.push(...section.documents);
        }
    }

    return documents;
}

async function getDocumentEntriesByLevel(level: (typeof DOCUMENT_LEVELS)[number]) {
    const apiBase = resolveApiBase();
    const entries = new Map<string, Date | undefined>();

    if (!apiBase) {
        return entries;
    }

    const url = `${apiBase}/documents/public/seo/level/${level}`;
    const payload = await fetchJson<ApiResponse<DocumentLevelSectionsPayload>>(url);
    const documents = collectDocumentsFromSections(payload?.data);

    for (const document of documents) {
        const slug = getDocumentSlug(document);
        if (!slug) continue;

        const path = `/thu-vien/tai-lieu/${level}/chi-tiet/${encodeURIComponent(slug)}`;
        if (!entries.has(path)) {
            entries.set(path, getDocumentLastModified(document));
        }
    }

    return entries;
}

function buildStaticPaths(subjectSlugs: string[]) {
    const paths = new Set<string>([
        "/",
        "/gioi-thieu",
        "/doi-ngu",
        "/khoa-hoc-online",
        "/khoa-hoc-offline",
        "/thanh-tich",
        "/lien-he",
        "/thu-vien",
        "/thu-vien/de-thi",
        "/thu-vien/cau-hoi",
        "/thu-vien/tai-lieu/thpt",
        "/thu-vien/tai-lieu/thcs",
        "/thu-vien/tai-lieu/tim-kiem",
    ]);

    for (const course of ONLINE_COURSES) {
        if (course.slug) {
            paths.add(`/khoa-hoc-online/${encodeURIComponent(course.slug)}`);
        }
    }

    for (const documentType of DOCUMENT_TYPE_TAGS) {
        if (documentType.slug) {
            paths.add(`/thu-vien/tai-lieu/thpt/${encodeURIComponent(documentType.slug)}`);
            paths.add(`/thu-vien/tai-lieu/thcs/${encodeURIComponent(documentType.slug)}`);
        }
    }

    for (const subjectSlug of subjectSlugs) {
        paths.add(`/thu-vien/de-thi/mon-hoc/${encodeURIComponent(subjectSlug)}`);

        for (const gradeSlug of GRADE_SLUGS) {
            paths.add(`/thu-vien/de-thi/mon-hoc/${encodeURIComponent(subjectSlug)}/khoi/${gradeSlug}`);

            for (const examType of EXAM_TYPES) {
                paths.add(
                    `/thu-vien/de-thi/mon-hoc/${encodeURIComponent(subjectSlug)}/khoi/${gradeSlug}/loai-de-thi/${encodeURIComponent(examType.id)}`,
                );
            }
        }
    }

    return [...paths];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const [subjectSlugs, examEntries, questionEntries, thptDocumentEntries, thcsDocumentEntries] =
        await Promise.all([
            getSubjectSlugs(),
            getExamEntries(),
            getQuestionEntries(),
            getDocumentEntriesByLevel("thpt"),
            getDocumentEntriesByLevel("thcs"),
        ]);
    const staticPaths = buildStaticPaths(subjectSlugs);

    const staticUrls: MetadataRoute.Sitemap = staticPaths.map((path) => ({
        url: toAbsoluteUrl(path),
        lastModified: now,
        changeFrequency: path === "/" ? "daily" : "weekly",
        priority: path === "/" ? 1 : path.startsWith("/thu-vien/de-thi/chi-tiet/") ? 0.8 : 0.7,
    }));

    const examUrls: MetadataRoute.Sitemap = [...examEntries.entries()].map(([path, lastModified]) => ({
        url: toAbsoluteUrl(path),
        lastModified: lastModified ?? now,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const examPracticeUrls: MetadataRoute.Sitemap = [...examEntries.entries()].map(([path, lastModified]) => ({
        url: toAbsoluteUrl(`${path}/lam-thu`),
        lastModified: lastModified ?? now,
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    const questionUrls: MetadataRoute.Sitemap = [...questionEntries.entries()].map(([path, lastModified]) => ({
        url: toAbsoluteUrl(path),
        lastModified: lastModified ?? now,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    const documentUrls: MetadataRoute.Sitemap = [
        ...thptDocumentEntries.entries(),
        ...thcsDocumentEntries.entries(),
    ].map(([path, lastModified]) => ({
        url: toAbsoluteUrl(path),
        lastModified: lastModified ?? now,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticUrls, ...examUrls, ...examPracticeUrls, ...questionUrls, ...documentUrls];
}
