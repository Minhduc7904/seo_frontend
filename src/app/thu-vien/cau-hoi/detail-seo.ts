import type { Metadata } from "next";
import { questionService } from "@/lib/api";

const DEFAULT_DESCRIPTION =
    "Câu hỏi ôn luyện Toán tại BeeEdu / Toán thầy Bee (toanthaybee), hỗ trợ luyện đề và ôn thi THPT Quốc gia cùng thầy Ong Khắc Ngọc.";
const DEFAULT_IMAGE = "/images/tai_lieu_hoc/defaultExam.jpg";
const DESCRIPTION_LIMIT = 160;
const TITLE_SUFFIX = " - BeeEdu";

function pickFirstString(payload: Record<string, unknown> | null, keys: string[]) {
    if (!payload) return "";

    for (const key of keys) {
        const value = payload[key];
        if (typeof value === "string" && value.trim().length > 0) {
            return value.trim();
        }
    }

    return "";
}

function stripHtml(html: string) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ");
}

function decodeBasicEntities(value: string) {
    return value
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">");
}

function normalizeText(value: string) {
    return decodeBasicEntities(stripHtml(value)).replace(/\s+/g, " ").trim();
}

function truncate(value: string, maxLength: number) {
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function getSubjectName(payload: Record<string, unknown> | null) {
    if (!payload) return "";

    const subject = payload.subject as Record<string, unknown> | undefined;
    const subjectName =
        (typeof payload.subjectName === "string" && payload.subjectName) ||
        (typeof payload.subjectTitle === "string" && payload.subjectTitle) ||
        (typeof subject?.name === "string" && subject.name) ||
        (typeof subject?.title === "string" && subject.title);

    return subjectName ? subjectName.trim() : "";
}

function getGrade(payload: Record<string, unknown> | null) {
    if (!payload) return "";
    const raw = payload.grade ?? payload.gradeLevel ?? payload.grade_level ?? payload.class ?? payload.level;
    if (typeof raw === "string" || typeof raw === "number") {
        return String(raw).trim();
    }
    return "";
}

function buildTitle(payload: Record<string, unknown> | null, slug: string) {
    const subject = getSubjectName(payload);
    const grade = getGrade(payload);
    const prefix = subject ? `Câu hỏi ${subject}${grade ? ` lớp ${grade}` : ""}` : "Câu hỏi BeeEdu";
    const contentLikeText = pickFirstString(payload, ["processedContent", "content", "question", "title", "name"]);
    const cleanedContent = contentLikeText ? normalizeText(contentLikeText) : "";
    const fallback = decodeURIComponent(slug).replace(/-/g, " ").trim() || slug;
    const detailText = cleanedContent || fallback || "Câu hỏi chi tiết";

    return `${prefix} - ${truncate(detailText, 70)}`;
}

function buildDescription(payload: Record<string, unknown> | null, subject: string) {
    const contentLikeText = pickFirstString(payload, ["processedContent", "content", "question", "title", "name"]);
    const solutionText = pickFirstString(payload, ["processedSolution", "solution", "explanation"]);
    const cleanedContent = contentLikeText ? normalizeText(contentLikeText) : "";
    const cleanedSolution = solutionText ? normalizeText(solutionText) : "";

    const main = cleanedContent || cleanedSolution || DEFAULT_DESCRIPTION;
    const prefix = subject ? `Câu hỏi ${subject}` : "Câu hỏi BeeEdu";
    const merged = main.toLowerCase().includes(prefix.toLowerCase()) ? main : `${prefix}. ${main}`;

    return truncate(merged, DESCRIPTION_LIMIT);
}

function resolveSiteUrl() {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (!configured) return "";

    try {
        const url = new URL(configured);
        return `${url.origin}/`;
    } catch {
        return "";
    }
}

function toAbsoluteUrl(pathOrUrl: string) {
    if (/^https?:\/\//i.test(pathOrUrl)) {
        return pathOrUrl;
    }

    const siteUrl = resolveSiteUrl();
    if (!siteUrl) {
        return pathOrUrl;
    }

    try {
        return new URL(pathOrUrl, siteUrl).toString();
    } catch {
        return pathOrUrl;
    }
}

export async function buildQuestionDetailMetadata({
    slug,
    canonical,
}: {
    slug: string;
    canonical: string;
}): Promise<Metadata> {
    try {
        const response = await questionService.getPublicSeoQuestionBySlug(slug);
        const payload = (response?.data ?? null) as Record<string, unknown> | null;

        const subject = getSubjectName(payload);
        const title = buildTitle(payload, slug);
        const titleWithSuffix = `${title}${TITLE_SUFFIX}`;
        const description = buildDescription(payload, subject);
        const canonicalUrl = toAbsoluteUrl(canonical);
        const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE);

        return {
            title: {
                absolute: titleWithSuffix,
            },
            description,
            keywords: [
                title,
                subject,
                "BeeEdu",
                "Toán thầy Bee",
                "toanthaybee",
                "Ong Khắc Ngọc",
                "câu hỏi Toán",
                "ôn thi THPT Quốc gia",
            ].filter(Boolean),
            alternates: { canonical: canonicalUrl },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                    "max-video-preview": -1,
                },
            },
            openGraph: {
                title: titleWithSuffix,
                description,
                url: canonicalUrl,
                type: "article",
                locale: "vi_VN",
                images: [{ url: imageUrl, alt: title }],
            },
            twitter: {
                card: "summary_large_image",
                title: titleWithSuffix,
                description,
                images: [imageUrl],
            },
        };
    } catch {
        const fallbackTitle = decodeURIComponent(slug).replace(/-/g, " ").trim() || slug;
        const titleWithSuffix = `${fallbackTitle}${TITLE_SUFFIX}`;
        const description = truncate(`${fallbackTitle}. ${DEFAULT_DESCRIPTION}`, DESCRIPTION_LIMIT);
        const canonicalUrl = toAbsoluteUrl(canonical);
        const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE);

        return {
            title: {
                absolute: titleWithSuffix,
            },
            description,
            keywords: [
                fallbackTitle,
                "BeeEdu",
                "Toán thầy Bee",
                "toanthaybee",
                "Ong Khắc Ngọc",
                "câu hỏi Toán",
            ],
            alternates: { canonical: canonicalUrl },
            robots: {
                index: true,
                follow: true,
            },
            openGraph: {
                title: titleWithSuffix,
                description,
                url: canonicalUrl,
                type: "article",
                locale: "vi_VN",
                images: [{ url: imageUrl, alt: fallbackTitle }],
            },
            twitter: {
                card: "summary_large_image",
                title: titleWithSuffix,
                description,
                images: [imageUrl],
            },
        };
    }
}
