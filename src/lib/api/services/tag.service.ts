import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export type PublicSeoTagSearchQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
};

export type PublicSeoTagItem = {
    id?: string | number;
    tagId?: string | number;
    name?: string;
    label?: string;
    slug?: string;
} & Record<string, unknown>;

export type PublicSeoTagSearchResponse = {
    data?: PublicSeoTagItem[];
    meta?: Record<string, unknown>;
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
} & Record<string, unknown>;

export const tagService = {
    async searchPublicSeoTags(params: PublicSeoTagSearchQueryParams = {}) {
        const response = await apiClient.get<PublicSeoTagSearchResponse>(API_ENDPOINTS.tags.publicSeoSearch, {
            params,
        });

        return response.data;
    },
};
