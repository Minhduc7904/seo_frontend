"use client";

import { useCallback, useEffect, useState } from "react";
import {
    examService,
    type PublicSeoExamItem,
    type PublicSeoLatestExamQueryParams,
} from "@/lib/api";
import { extractExamItems } from "@/hooks/exam-list-extract";

export type UsePublicSeoLatestExamsResult = {
    exams: PublicSeoExamItem[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function usePublicSeoLatestExams(
    params: PublicSeoLatestExamQueryParams = {},
): UsePublicSeoLatestExamsResult {
    const [exams, setExams] = useState<PublicSeoExamItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const limit = params.limit;

    const fetchExams = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const payload = await examService.getPublicSeoLatestExams({ limit });
            setExams(extractExamItems(payload));
        } catch (fetchError) {
            setExams([]);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load latest exams."));
        } finally {
            setLoading(false);
        }
    }, [limit]);

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
