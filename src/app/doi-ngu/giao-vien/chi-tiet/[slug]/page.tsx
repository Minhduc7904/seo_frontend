import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeacherProfileDetail from "@/app/doi-ngu/giao-vien/components/TeacherProfileDetail";
import TeacherScheduleHeroSection from "@/app/doi-ngu/giao-vien/components/TeacherScheduleHeroSection";
import { buildTeacherProfileDetailMetadata } from "@/app/doi-ngu/giao-vien/detail-metadata";
import { teacherProfileService } from "@/lib/api";

type TeacherProfileDetailPageProps = {
    params: Promise<{ slug: string }>;
};

const getTeacherProfile = cache(async (slug: string) => {
    try {
        const payload = await teacherProfileService.getPublicSeoTeacherProfileBySlug(slug);
        return payload.data;
    } catch {
        return null;
    }
});

async function getMoreTeacherProfiles(currentSlug: string) {
    try {
        const payload = await teacherProfileService.getPublicSeoTeacherProfiles({
            page: 1,
            limit: 6,
            isFeatured: true,
            sortBy: "sortOrder",
            sortOrder: "asc",
        });

        return (payload.data ?? []).filter((profile) => profile.slug !== currentSlug).slice(0, 4);
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: TeacherProfileDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const profile = await getTeacherProfile(slug);

    if (!profile) {
        return {};
    }

    return buildTeacherProfileDetailMetadata(profile, `/doi-ngu/giao-vien/chi-tiet/${slug}`);
}

export default async function TeacherProfileDetailPage({ params }: TeacherProfileDetailPageProps) {
    const { slug } = await params;
    const profile = await getTeacherProfile(slug);

    if (!profile) {
        notFound();
    }

    const moreProfiles = await getMoreTeacherProfiles(slug);

    return (
        <>
            <TeacherScheduleHeroSection
                teacherName={profile.displayName}
                headline={profile.headline}
                scheduleImageUrls={profile.scheduleImageUrls}
                fallbackImageUrl={profile.profileImageUrl}
                ctaLabel={profile.ctaLabel}
                ctaUrl={profile.ctaUrl}
                bookingUrl={profile.bookingUrl}
            />
            <TeacherProfileDetail profile={profile} moreProfiles={moreProfiles} />
        </>
    );
}
