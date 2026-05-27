"use client";

import { useCallback, useEffect, useState } from "react";
import {
    teacherProfileService,
    type PublicSeoTeacherProfileItem,
    type PublicSeoTeacherProfileListQueryParams,
    type PublicSeoTeacherProfileListResponse,
} from "@/lib/api";

export type UsePublicSeoTeacherProfilesResult = {
    profiles: PublicSeoTeacherProfileItem[];
    response: PublicSeoTeacherProfileListResponse | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function usePublicSeoTeacherProfiles(
    params: PublicSeoTeacherProfileListQueryParams = {},
): UsePublicSeoTeacherProfilesResult {
    const [response, setResponse] = useState<PublicSeoTeacherProfileListResponse | null>(null);
    const [profiles, setProfiles] = useState<PublicSeoTeacherProfileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const page = params.page;
    const limit = params.limit;
    const search = params.search;
    const isFeatured = params.isFeatured;
    const sortBy = params.sortBy;
    const sortOrder = params.sortOrder;

    const fetchProfiles = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await teacherProfileService.getPublicSeoTeacherProfiles({
                page,
                limit,
                search,
                isFeatured,
                sortBy,
                sortOrder,
            });

            setResponse(data);
            setProfiles(data.data ?? []);
        } catch (fetchError) {
            setResponse(null);
            setProfiles([]);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load public SEO teacher profiles."));
        } finally {
            setLoading(false);
        }
    }, [isFeatured, limit, page, search, sortBy, sortOrder]);

    useEffect(() => {
        void fetchProfiles();
    }, [fetchProfiles]);

    return {
        profiles,
        response,
        loading,
        error,
        refetch: fetchProfiles,
    };
}
