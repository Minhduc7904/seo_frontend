"use client";

import { useCallback, useEffect, useState } from "react";
import {
    tagService,
    type PublicSeoTagItem,
    type PublicSeoTagSearchQueryParams,
    type PublicSeoTagSearchResponse,
} from "@/lib/api";

type UsePublicSeoTagSearchResult = {
    tags: PublicSeoTagItem[];
    response: PublicSeoTagSearchResponse | null;
    loading: boolean;
    error: Error | null;
};

export function usePublicSeoTagSearch(
    params: PublicSeoTagSearchQueryParams = {},
): UsePublicSeoTagSearchResult {
    const [tags, setTags] = useState<PublicSeoTagItem[]>([]);
    const [response, setResponse] = useState<PublicSeoTagSearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const search = params.search;
    const page = params.page;
    const limit = params.limit;

    const fetchTags = useCallback(async () => {
        if (!search?.trim()) {
            setTags([]);
            setResponse(null);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await tagService.searchPublicSeoTags({ search, page, limit });
            setResponse(data);
            setTags(Array.isArray(data.data) ? data.data : []);
        } catch (fetchError) {
            setTags([]);
            setResponse(null);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to search public SEO tags."));
        } finally {
            setLoading(false);
        }
    }, [limit, page, search]);

    useEffect(() => {
        void fetchTags();
    }, [fetchTags]);

    return { tags, response, loading, error };
}
