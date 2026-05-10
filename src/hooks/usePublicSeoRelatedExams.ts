"use client";

import { useCallback, useEffect, useState } from "react";
import {
    examService,
    type PublicSeoExamItem,
    type PublicSeoRelatedExamQueryParams,
} from "@/lib/api";
import { extractExamItems } from "@/hooks/exam-list-extract";

export type UsePublicSeoRelatedExamsResult = {
    exams: PublicSeoExamItem[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function usePublicSeoRelatedExams(
    slug?: string,
    params: PublicSeoRelatedExamQueryParams = {},
): UsePublicSeoRelatedExamsResult {
    const [exams, setExams] = useState<PublicSeoExamItem[]>([]);
    const [loading, setLoading] = useState(Boolean(slug));
    const [error, setError] = useState<Error | null>(null);

    const limit = params.limit;

    const fetchExams = useCallback(async () => {
        if (!slug) {
            setExams([]);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const payload = await examService.getPublicSeoRelatedExams(slug, { limit });
            setExams(extractExamItems(payload));
        } catch (fetchError) {
            setExams([]);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load related exams."));
        } finally {
            setLoading(false);
        }
    }, [limit, slug]);

    useEffect(() => {
        void fetchExams();
    }, [fetchExams]);

    return {
        exams,
        loading,
        error,
        refetch: fetchExams,
    };
}
