import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { ApiResponse } from "./exam.service";
import type { PaginationMeta } from "./seo-media.service";

export type PublicSeoDocumentItem = Record<string, unknown>;

export type PublicSeoDocumentDetail = {
    documentId: number;
    title: string;
    slug: string;
    visibility: string;
    content?: string;
    processedContent?: string;
    shortDescription?: string;
    targetKeyword?: string;
    keywordText?: string;
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    searchIntent?: string;
    viewCount?: number;
    downloadCount?: number;
    thumbnailUrl?: string;
    mediaUsages?: Array<{
        usageId?: number;
        mediaId?: number;
        fieldName?: string;
        url?: string;
        mimeType?: string;
        originalFilename?: string;
    }>;
    tags?: Array<{
        tagId?: number;
        name?: string;
        slug?: string;
        type?: string;
        description?: string | null;
    }>;
} & Record<string, unknown>;

export type PublicSeoDocumentLevel = {
    tagId: number;
    name: string;
    slug: "thpt" | "thcs";
    type: string;
    description: string | null;
};

export type PublicSeoDocumentSection = {
    key: string;
    title: string;
    documents: PublicSeoDocumentItem[];
};

export type PublicSeoDocumentLevelSectionsResponse = {
    level: PublicSeoDocumentLevel;
    sections: PublicSeoDocumentSection[];
};

export type PublicSeoDocumentsByTagQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    isFeatured?: boolean;
    includeTags?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export type PublicSeoDocumentListSortBy =
    | "documentId"
    | "title"
    | "slug"
    | "visibility"
    | "isFeatured"
    | "viewCount"
    | "downloadCount"
    | "createdAt"
    | "updatedAt";

export type PublicSeoDocumentListQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    isFeatured?: boolean;
    tagSlugs?: string[];
    includeTags?: boolean;
    sortBy?: PublicSeoDocumentListSortBy;
    sortOrder?: "asc" | "desc";
};

export type PublicSeoDocumentListResponse = {
    success: boolean;
    message: string;
    data: PublicSeoDocumentItem[];
    meta: PaginationMeta;
};

export type PublicSeoDocumentsByTagResponse = {
    success: boolean;
    message: string;
    data: PublicSeoDocumentItem[];
    meta: PaginationMeta;
};

export const documentService = {
    async getPublicSeoDocuments(params: PublicSeoDocumentListQueryParams = {}) {
        const response = await apiClient.get<PublicSeoDocumentListResponse>(
            API_ENDPOINTS.documents.publicSeoList,
            {
                params,
                paramsSerializer: {
                    serialize: (queryParams) => {
                        const searchParams = new URLSearchParams();

                        Object.entries(queryParams).forEach(([key, value]) => {
                            if (value === undefined || value === null || value === "") {
                                return;
                            }

                            if (Array.isArray(value)) {
                                value.forEach((item) => searchParams.append(key, String(item)));
                                return;
                            }

                            searchParams.set(key, String(value));
                        });

                        return searchParams.toString();
                    },
                },
            },
        );

        return response.data;
    },

    async getPublicSeoLevelSections(level: "thpt" | "thcs") {
        const response = await apiClient.get<ApiResponse<PublicSeoDocumentLevelSectionsResponse>>(
            API_ENDPOINTS.documents.publicSeoLevelSections(level),
        );

        return response.data;
    },

    async getPublicSeoDocumentBySlug(slug: string) {
        const response = await apiClient.get<ApiResponse<PublicSeoDocumentDetail>>(
            API_ENDPOINTS.documents.publicSeoDetail(slug),
        );

        return response.data;
    },

    async getPublicSeoDocumentsByTag(
        slug: string,
        params: PublicSeoDocumentsByTagQueryParams = {},
    ) {
        const response = await apiClient.get<PublicSeoDocumentsByTagResponse>(
            API_ENDPOINTS.documents.publicSeoByTag(slug),
            {
                params,
            },
        );

        return response.data;
    },

    async getPublicSeoLatestDocuments() {
        const response = await apiClient.get<ApiResponse<PublicSeoDocumentItem[]>>(
            API_ENDPOINTS.documents.publicSeoLatest,
        );

        return response.data;
    },

    async getPublicSeoRelatedDocuments(slug: string) {
        const response = await apiClient.get<ApiResponse<PublicSeoDocumentItem[]>>(
            API_ENDPOINTS.documents.publicSeoRelated(slug),
        );

        return response.data;
    },

    async incrementPublicSeoDocumentView(slug: string) {
        const response = await apiClient.post<ApiResponse<unknown>>(API_ENDPOINTS.documents.publicSeoView(slug));
        return response.data;
    },

    getPublicSeoDocumentDownloadUrl(slug: string) {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
        return `${apiBase}${API_ENDPOINTS.documents.publicSeoDownload(slug)}`;
    },
};
