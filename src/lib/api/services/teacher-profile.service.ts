import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { PaginationMeta } from "./seo-media.service";

export type PublicSeoTeacherProfileListSortBy =
    | "teacherProfileId"
    | "displayName"
    | "slug"
    | "visibility"
    | "isFeatured"
    | "viewCount"
    | "sortOrder"
    | "createdAt"
    | "updatedAt";

export type PublicSeoTeacherProfileListQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    isFeatured?: boolean;
    sortBy?: PublicSeoTeacherProfileListSortBy;
    sortOrder?: "asc" | "desc";
};

export type PublicSeoTeacherProfileItem = {
    teacherProfileId: number;
    displayName: string;
    slug: string;
    headline?: string;
    shortDescription?: string;
    bio?: string;
    expertise?: string;
    teachingSubjects?: string;
    gradeLevels?: string;
    teachingFormats?: string;
    teachingMethods?: string;
    yearsExperience?: number;
    education?: string;
    certifications?: string;
    achievements?: string;
    teachingArea?: string;
    workplace?: string;
    profileImageUrl?: string | null;
    scheduleImageUrls?: string[] | null;
    classroomImageUrls?: string[] | null;
    classroomImageMediaUrls?: string[] | null;
    contactEmail?: string;
    contactPhone?: string;
    contactZalo?: string;
    contactFacebook?: string;
    contactWebsite?: string;
    contactAddress?: string;
    bookingUrl?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    targetKeyword?: string;
    keywordText?: string;
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    searchIntent?: string;
    seoScore?: number;
    visibility?: "PUBLISHED" | string;
    isFeatured?: boolean;
    viewCount?: number;
    sortOrder?: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
} & Record<string, unknown>;

export type PublicSeoTeacherProfileListResponse = {
    success: boolean;
    message: string;
    data: PublicSeoTeacherProfileItem[];
    meta: PaginationMeta;
};

export type PublicSeoTeacherProfileDetailResponse = {
    success: boolean;
    message: string;
    data: PublicSeoTeacherProfileItem;
};

export const teacherProfileService = {
    async getPublicSeoTeacherProfiles(params: PublicSeoTeacherProfileListQueryParams = {}) {
        const response = await apiClient.get<PublicSeoTeacherProfileListResponse>(
            API_ENDPOINTS.teacherProfiles.publicSeoList,
            {
                params,
            },
        );

        return response.data;
    },

    async getPublicSeoTeacherProfileBySlug(slug: string) {
        const response = await apiClient.get<PublicSeoTeacherProfileDetailResponse>(
            API_ENDPOINTS.teacherProfiles.publicSeoDetail(slug),
        );

        return response.data;
    },
};
