"use client";

import { useCallback, useEffect, useState } from "react";
import {
    subjectService,
    type PublicSeoSubjectItem,
    type PublicSeoSubjectListQueryParams,
    type PublicSeoSubjectListResponse,
} from "@/lib/api";

export type UsePublicSeoSubjectsResult = {
    subjects: PublicSeoSubjectItem[];
    response: PublicSeoSubjectListResponse | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function usePublicSeoSubjects(
    params: PublicSeoSubjectListQueryParams = {},
): UsePublicSeoSubjectsResult {
    const [response, setResponse] = useState<PublicSeoSubjectListResponse | null>(null);
    const [subjects, setSubjects] = useState<PublicSeoSubjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const page = params.page;
    const limit = params.limit;
    const search = params.search;
    const code = params.code;
    const sortBy = params.sortBy;
    const sortOrder = params.sortOrder;

    const fetchSubjects = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await subjectService.getPublicSeoSubjects({
                page,
                limit,
                search,
                code,
                sortBy,
                sortOrder,
            });

            setResponse(data);
            setSubjects(data.data ?? []);
        } catch (fetchError) {
            setResponse(null);
            setSubjects([]);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load public SEO subjects."));
        } finally {
            setLoading(false);
        }
    }, [code, limit, page, search, sortBy, sortOrder]);

    useEffect(() => {
        void fetchSubjects();
    }, [fetchSubjects]);

    return {
        subjects,
        response,
        loading,
        error,
        refetch: fetchSubjects,
    };
}
