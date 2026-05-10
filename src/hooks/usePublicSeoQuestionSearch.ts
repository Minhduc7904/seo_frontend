"use client";

import { useCallback, useEffect, useState } from "react";
import {
    questionService,
    type PublicSeoQuestionItem,
    type PublicSeoQuestionSearchQueryParams,
    type PublicSeoQuestionSearchResponse,
} from "@/lib/api";

export type UsePublicSeoQuestionSearchResult = {
    questions: PublicSeoQuestionItem[];
    response: PublicSeoQuestionSearchResponse | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function usePublicSeoQuestionSearch(
    params: PublicSeoQuestionSearchQueryParams = {},
): UsePublicSeoQuestionSearchResult {
    const [response, setResponse] = useState<PublicSeoQuestionSearchResponse | null>(null);
    const [questions, setQuestions] = useState<PublicSeoQuestionItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const search = params.search;
    const page = params.page;
    const limit = params.limit;
    const subjectId = params.subjectId;
    const chapterIds = params.chapterIds;
    const type = params.type;
    const difficulty = params.difficulty;
    const grade = params.grade;
    const isCorrect = params.isCorrect;

    const fetchQuestions = useCallback(async () => {
        if (!search?.trim()) {
            setResponse(null);
            setQuestions([]);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await questionService.searchPublicSeoQuestions({
                search,
                page,
                limit,
                subjectId,
                chapterIds,
                type,
                difficulty,
                grade,
                isCorrect,
            });

            setResponse(data);
            setQuestions(data.data ?? []);
        } catch (fetchError) {
            setResponse(null);
            setQuestions([]);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to search public SEO questions."));
        } finally {
            setLoading(false);
        }
    }, [chapterIds, difficulty, grade, isCorrect, limit, page, search, subjectId, type]);

    useEffect(() => {
        void fetchQuestions();
    }, [fetchQuestions]);

    return {
        questions,
        response,
        loading,
        error,
        refetch: fetchQuestions,
    };
}

