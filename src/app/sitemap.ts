import type { MetadataRoute } from "next";
import { EXAM_TYPES } from "@/app/thu-vien/components/exam-type-selector/exam-types";

const DEFAULT_SITE_URL = "https://beeedu.vn";
const DEFAULT_SUBJECT_SLUG = "toan";
const GRADE_SLUGS = ["lop-6", "lop-7", "lop-8", "lop-9", "lop-10", "lop-11", "lop-12"];
const SUBJECT_PAGE_SIZE = 100;
const EXAM_PAGE_SIZE = 100;
const MAX_SUBJECT_PAGES = 10;
const MAX_EXAM_PAGES = 30;

type ApiListResponse<T> = {
    data?: T[];
    page?: number;
    totalPages?: number;
    total?: number;
};

type SubjectPayload = Record<string, unknown>;
type ExamPayload = Record<string, unknown>;

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

        totalPages = Math.max(payload.totalPages ?? page, page);
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
    if (typeof raw !== "string" && typeof raw !== "number") {
        return undefined;
    }

    const date = new Date(String(raw));
    return Number.isNaN(date.getTime()) ? undefined : date;
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

        totalPages = Math.max(payload.totalPages ?? page, page);
        page += 1;
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
    ]);

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
    const subjectSlugs = await getSubjectSlugs();
    const examEntries = await getExamEntries();
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

    return [...staticUrls, ...examUrls];
}
