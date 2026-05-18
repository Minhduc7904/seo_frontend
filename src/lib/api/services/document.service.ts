import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { ApiResponse } from "./exam.service";

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

export const documentService = {
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
