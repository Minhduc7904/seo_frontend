import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export type SeoMediaSlotCode = "home_hero" | "home_gallery" | "footer_banner" | string;

export type SeoMediaItem = {
    itemId: number;
    slotId: number;
    bucketName: string;
    objectKey: string;
    publicUrl: string;
    originalName: string;
    mimeType: string;
    fileSize: number;
    width: number;
    height: number;
    sortOrder: number;
    alt: string | null;
    linkUrl: string | null;
    createdAt: string;
    updatedAt: string;
};

export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
};

export type ApiListResponse<T> = {
    success: boolean;
    message: string;
    data: T[];
    meta: PaginationMeta;
};

export type GetPublicSeoMediaItemsParams = {
    page?: number;
    limit?: number;
    includeSlot?: boolean;
};

export const seoMediaService = {
    async getPublicItemsBySlotCode(
        code: SeoMediaSlotCode,
        params: GetPublicSeoMediaItemsParams = {},
    ) {
        const response = await apiClient.get<ApiListResponse<SeoMediaItem>>(
            API_ENDPOINTS.seoMedia.publicSlotItems(code),
            {
                params,
            },
        );

        return response.data;
    },
};

