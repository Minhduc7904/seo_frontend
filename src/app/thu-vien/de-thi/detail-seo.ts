import type { Metadata } from "next";
import { examService } from "@/lib/api";

const DEFAULT_DESCRIPTION = "Chi tiet de thi, noi dung va dap an on tap.";
const DEFAULT_IMAGE = "/images/tai_lieu_hoc/defaultExam.jpg";
const DESCRIPTION_LIMIT = 160;
const TITLE_SUFFIX = " - Beeedu.vn";

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

function buildTitle(payload: Record<string, unknown> | null, slug: string) {
    const fallback = decodeURIComponent(slug).replace(/-/g, " ").trim() || slug;
    const title = pickFirstString(payload, ["title", "name", "examName", "slug"]);
    return title || fallback;
}

function buildDescription(payload: Record<string, unknown> | null, title: string) {
    const descriptionText = pickFirstString(payload, ["description", "shortDescription", "summary"]);
    const contentLikeText = pickFirstString(payload, [
        "processedDescription",
        "descriptionHtml",
        "examContent",
        "content",
        "body",
        "detail",
    ]);

    const cleanedDescription = descriptionText ? normalizeText(descriptionText) : "";
    const cleanedContent = contentLikeText ? normalizeText(contentLikeText) : "";

    const main = cleanedDescription || cleanedContent || DEFAULT_DESCRIPTION;
    const titlePrefix = title.trim();
    const merged = main.toLowerCase().includes(titlePrefix.toLowerCase()) ? main : `${titlePrefix}. ${main}`;

    return truncate(merged, DESCRIPTION_LIMIT);
}

function getExamImage(payload: Record<string, unknown> | null) {
    const image = pickFirstString(payload, ["thumbnailUrl", "thumbnail", "image", "coverImage", "ogImage"]);
    return image || DEFAULT_IMAGE;
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

export async function buildExamDetailMetadata({
    slug,
    canonical,
}: {
    slug: string;
    canonical: string;
}): Promise<Metadata> {
    try {
        const response = await examService.getPublicSeoExamBySlug(slug);
        const payload = (response?.data ?? null) as Record<string, unknown> | null;

        const title = buildTitle(payload, slug);
        const titleWithSuffix = `${title}${TITLE_SUFFIX}`;
        const description = buildDescription(payload, title);
        const canonicalUrl = toAbsoluteUrl(canonical);
        const imageUrl = toAbsoluteUrl(getExamImage(payload));

        return {
            title: {
                absolute: titleWithSuffix,
            },
            description,
            keywords: [title, `${title} dap an`, `${title} co loi giai`, "de thi", "BeeEdu"],
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
        const title = decodeURIComponent(slug).replace(/-/g, " ").trim() || slug;
        const titleWithSuffix = `${title}${TITLE_SUFFIX}`;
        const description = truncate(`${title}. ${DEFAULT_DESCRIPTION}`, DESCRIPTION_LIMIT);
        const canonicalUrl = toAbsoluteUrl(canonical);
        const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE);

        return {
            title: {
                absolute: titleWithSuffix,
            },
            description,
            keywords: [title, "de thi", "BeeEdu"],
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
                images: [{ url: imageUrl, alt: title }],
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
