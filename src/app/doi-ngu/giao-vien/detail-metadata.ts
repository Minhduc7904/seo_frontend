import type { Metadata } from "next";
import type { PublicSeoTeacherProfileItem } from "@/lib/api";

function getTextValue(value: unknown) {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function parseKeywords(profile: PublicSeoTeacherProfileItem) {
    const rawKeywords = [
        profile.targetKeyword,
        profile.keywordText,
        profile.expertise,
        profile.teachingSubjects,
        profile.gradeLevels,
    ];

    const keywords = rawKeywords
        .flatMap((item) => getTextValue(item)?.split(",") ?? [])
        .map((item) => item.trim())
        .filter(Boolean);

    return [...new Set(keywords)];
}

export function buildTeacherProfileDetailMetadata(
    profile: PublicSeoTeacherProfileItem,
    canonical: string,
): Metadata {
    const title = profile.metaTitle || profile.displayName;
    const description = profile.metaDescription || profile.shortDescription || profile.headline;
    const imageUrl = getTextValue(profile.profileImageUrl) ?? getTextValue(profile.scheduleImageUrls?.[0]);

    return {
        title,
        description,
        keywords: parseKeywords(profile),
        alternates: { canonical },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: profile.ogTitle || title,
            description: profile.ogDescription || description,
            url: canonical,
            type: "profile",
            locale: "vi_VN",
            siteName: "BeeEdu",
            images: imageUrl ? [{ url: imageUrl, alt: profile.displayName }] : undefined,
        },
    };
}
