"use client";

import { useCallback, useEffect, useState } from "react";
import {
    examService,
    type PublicSeoExamDetail,
    type ApiResponse,
} from "@/lib/api";

export type UsePublicSeoExamByIdResult = {
    exam: PublicSeoExamDetail | null;
    response: ApiResponse<PublicSeoExamDetail> | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};
export function usePublicSeoExamById(slug?: string): UsePublicSeoExamByIdResult {
    const [response, setResponse] = useState<ApiResponse<PublicSeoExamDetail> | null>(null);
    const [exam, setExam] = useState<PublicSeoExamDetail | null>(null);
    const [loading, setLoading] = useState(Boolean(slug));
    const [error, setError] = useState<Error | null>(null);

    const fetchExam = useCallback(async () => {
        if (slug === undefined || slug === null || slug === "") {
            setResponse(null);
            setExam(null);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await examService.getPublicSeoExamBySlug(slug);
            setResponse(data);
            setExam(data.data);
        } catch (fetchError) {
            setResponse(null);
            setExam(null);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load public SEO exam detail."));
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        void fetchExam();
    }, [fetchExam]);

    return {
        exam,
        response,
        loading,
        error,
        refetch: fetchExam,
    };
}