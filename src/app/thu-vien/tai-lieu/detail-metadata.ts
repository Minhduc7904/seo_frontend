import type { Metadata } from "next";
import type { PublicSeoDocumentDetail } from "@/lib/api";

function parseKeywords(document: PublicSeoDocumentDetail) {
    const keywords = [document.targetKeyword, ...(document.keywordText?.split(",") ?? [])]
        .map((item) => item?.trim())
        .filter((item): item is string => Boolean(item));

    return [...new Set(keywords)];
}

export function buildDocumentDetailMetadata(
    document: PublicSeoDocumentDetail,
    canonical: string,
): Metadata {
    const title = document.metaTitle || document.title;
    const description = document.metaDescription || document.shortDescription;

    return {
        title,
        description,
        keywords: parseKeywords(document),
        alternates: { canonical },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: document.ogTitle || title,
            description: document.ogDescription || description,
            url: canonical,
            type: "article",
            locale: "vi_VN",
            siteName: "BeeEdu",
            images: document.thumbnailUrl ? [{ url: document.thumbnailUrl }] : undefined,
        },
    };
}
