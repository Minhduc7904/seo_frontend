import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export type PublicSeoExamListQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    grade?: string | number;
    typeOfExam?: string;
    subjectId?: string | number;
    chapterIds?: Array<string | number>;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC" | "asc" | "desc";
};
export type PublicSeoRelatedExamQueryParams = {
    limit?: number;
};
export type PublicSeoLatestExamQueryParams = {
    limit?: number;
};

export type PublicSeoExamItem = Record<string, unknown>;
export type PublicSeoExamDetail = Record<string, unknown>;

export type PublicSeoExamListResponse = {
    data: PublicSeoExamItem[];
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
} & Record<string, unknown>;

export type ApiResponse<T> = {
    success?: boolean;
    message?: string;
    data: T;
} & Record<string, unknown>;

export const examService = {
    async getPublicSeoExams(params: PublicSeoExamListQueryParams = {}) {
        const response = await apiClient.get<PublicSeoExamListResponse>(API_ENDPOINTS.exams.publicSeoList, {
            params,
        });

        return response.data;
    },

    async getPublicSeoExamBySlug(slug: string) {
        const response = await apiClient.get<ApiResponse<PublicSeoExamDetail>>(
            API_ENDPOINTS.exams.publicSeoDetail(slug),
        );

        return response.data;
    },

    async getPublicSeoRelatedExams(slug: string, params: PublicSeoRelatedExamQueryParams = {}) {
        const response = await apiClient.get<
            ApiResponse<PublicSeoExamItem[] | PublicSeoExamListResponse> | PublicSeoExamListResponse
        >(API_ENDPOINTS.exams.publicSeoRelated(slug), { params });

        return response.data;
    },

    async getPublicSeoLatestExams(params: PublicSeoLatestExamQueryParams = {}) {
        const response = await apiClient.get<
            ApiResponse<PublicSeoExamItem[] | PublicSeoExamListResponse> | PublicSeoExamListResponse
        >(API_ENDPOINTS.exams.publicSeoLatest, { params });

        return response.data;
    },
};

