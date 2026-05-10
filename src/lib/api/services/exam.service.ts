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

    async getPublicSeoExamById(id: string | number) {
        const response = await apiClient.get<ApiResponse<PublicSeoExamDetail>>(
            API_ENDPOINTS.exams.publicSeoDetail(id),
        );

        return response.data;
    },
};

