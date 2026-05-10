"use client";

import { useCallback, useEffect, useState } from "react";
import {
    questionService,
    type PublicSeoQuestionDetail,
    type ApiResponse,
} from "@/lib/api";

export type UsePublicSeoQuestionBySlugResult = {
    question: PublicSeoQuestionDetail | null;
    response: ApiResponse<PublicSeoQuestionDetail> | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function usePublicSeoQuestionBySlug(slug?: string): UsePublicSeoQuestionBySlugResult {
    const [response, setResponse] = useState<ApiResponse<PublicSeoQuestionDetail> | null>(null);
    const [question, setQuestion] = useState<PublicSeoQuestionDetail | null>(null);
    const [loading, setLoading] = useState(Boolean(slug));
    const [error, setError] = useState<Error | null>(null);

    const fetchQuestion = useCallback(async () => {
        if (slug === undefined || slug === null || slug === "") {
            setResponse(null);
            setQuestion(null);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await questionService.getPublicSeoQuestionBySlug(slug);
            setResponse(data);
            setQuestion(data.data);
        } catch (fetchError) {
            setResponse(null);
            setQuestion(null);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load public SEO question detail."));
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        void fetchQuestion();
    }, [fetchQuestion]);

    return {
        question,
        response,
        loading,
        error,
        refetch: fetchQuestion,
    };
}
