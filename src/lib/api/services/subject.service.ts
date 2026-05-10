import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";

export type PublicSeoSubjectListQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    code?: string;
    sortBy?: "name" | "code" | string;
    sortOrder?: "ASC" | "DESC" | "asc" | "desc";
};

export type PublicSeoSubjectItem = {
    id?: string | number;
    name?: string;
    code?: string;
} & Record<string, unknown>;

export type PublicSeoSubjectListResponse = {
    data: PublicSeoSubjectItem[];
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
} & Record<string, unknown>;

export const subjectService = {
    async getPublicSeoSubjects(params: PublicSeoSubjectListQueryParams = {}) {
        const response = await apiClient.get<PublicSeoSubjectListResponse>(API_ENDPOINTS.subjects.publicSeoList, {
            params,
        });

        return response.data;
    },
};
