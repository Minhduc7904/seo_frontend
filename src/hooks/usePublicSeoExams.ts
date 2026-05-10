"use client";

import { useCallback, useEffect, useState } from "react";
import {
    examService,
    type PublicSeoExamItem,
    type PublicSeoExamListQueryParams,
    type PublicSeoExamListResponse,
} from "@/lib/api";

export type UsePublicSeoExamsResult = {
    exams: PublicSeoExamItem[];
    response: PublicSeoExamListResponse | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

export function usePublicSeoExams(
    params: PublicSeoExamListQueryParams = {},
): UsePublicSeoExamsResult {
    const [response, setResponse] = useState<PublicSeoExamListResponse | null>(null);
    const [exams, setExams] = useState<PublicSeoExamItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const page = params.page;
    const limit = params.limit;
    const search = params.search;
    const grade = params.grade;
    const typeOfExam = params.typeOfExam;
    const subjectId = params.subjectId;
    const chapterIds = params.chapterIds;
    const sortBy = params.sortBy;
    const sortOrder = params.sortOrder;

    const fetchExams = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await examService.getPublicSeoExams({
                page,
                limit,
                search,
                grade,
                typeOfExam,
                subjectId,
                chapterIds,
                sortBy,
                sortOrder,
            });

            setResponse(data);
            setExams(data.data ?? []);
        } catch (fetchError) {
            setResponse(null);
            setExams([]);
            setError(fetchError instanceof Error ? fetchError : new Error("Failed to load public SEO exams."));
        } finally {
            setLoading(false);
        }
    }, [chapterIds, grade, limit, page, search, sortBy, sortOrder, subjectId, typeOfExam]);

    useEffect(() => {
        void fetchExams();
    }, [fetchExams]);

    return {
        exams,
        response,
        loading,
        error,
        refetch: fetchExams,
    };
}