"use client";

import { useCallback, useEffect, useState } from "react";
import {
    seoMediaService,
    type GetPublicSeoMediaItemsParams,
    type PaginationMeta,
    type SeoMediaItem,
    type SeoMediaSlotCode,
} from "@/lib/api";

export type UseSeoMediaSlotResult = {
    items: SeoMediaItem[];
    meta: PaginationMeta | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function useSeoMediaSlot(
    code: SeoMediaSlotCode,
    params: GetPublicSeoMediaItemsParams = {},
): UseSeoMediaSlotResult {
    const [items, setItems] = useState<SeoMediaItem[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const includeSlot = params.includeSlot;

    const fetchMedia = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await seoMediaService.getPublicItemsBySlotCode(code, {
                page,
                limit,
                includeSlot,
            });

            setItems(response.data);
            setMeta(response.meta);
        } catch (fetchError) {
            setItems([]);
            setMeta(null);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load SEO media."));
        } finally {
            setLoading(false);
        }
    }, [code, includeSlot, limit, page]);

    useEffect(() => {
        void fetchMedia();
    }, [fetchMedia]);

    return {
        items,
        meta,
        loading,
        error,
        refetch: fetchMedia,
    };
}

