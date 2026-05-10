import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { ApiResponse } from "./exam.service";

export type PublicSeoQuestionSearchQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
    subjectId?: string | number;
    chapterIds?: Array<string | number>;
    type?: string;
    difficulty?: string;
    grade?: string | number;
    isCorrect?: boolean;
};

export type PublicSeoQuestionItem = Record<string, unknown>;
export type PublicSeoQuestionDetail = Record<string, unknown>;

export type PublicSeoQuestionSearchResponse = {
    data: PublicSeoQuestionItem[];
    meta?: {
        hasNext?: boolean;
        hasPrevious?: boolean;
        limit?: number;
        nextPage?: number;
        page?: number;
        total?: number;
        totalPages?: number;
    };
} & Record<string, unknown>;

export const questionService = {
    async searchPublicSeoQuestions(params: PublicSeoQuestionSearchQueryParams = {}) {
        const response = await apiClient.get<PublicSeoQuestionSearchResponse>(API_ENDPOINTS.questions.publicSeoSearch, {
            params,
        });

        return response.data;
    },

    async getPublicSeoQuestionBySlug(slug: string) {
        const response = await apiClient.get<ApiResponse<PublicSeoQuestionDetail>>(
            API_ENDPOINTS.questions.publicSeoDetail(slug),
        );

        return response.data;
    },
};

