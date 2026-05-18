import { Suspense } from "react";
import SearchResultsClient from "@/app/thu-vien/tai-lieu/tim-kiem/SearchResultsClient";
import { toDocumentItem } from "@/app/thu-vien/tai-lieu/document-section-mapper";
import { documentService } from "@/lib/api";

type SearchPageProps = {
    searchParams: Promise<{
        search?: string | string[];
        tags?: string | string[];
        page?: string | string[];
    }>;
};

function parseTagList(tags: string | string[] | undefined) {
    const raw = Array.isArray(tags) ? tags.join(",") : tags ?? "";
    return raw
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
}

function getFirstValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

function getPage(value: string | string[] | undefined) {
    const page = Number(getFirstValue(value));
    return Number.isInteger(page) && page > 0 ? page : 1;
}

const PAGE_SIZE = 10;

export default async function TaiLieuSearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const searchValue = getFirstValue(params.search)?.trim() ?? "";
    const selectedTags = parseTagList(params.tags);
    const page = getPage(params.page);
    const response = await documentService
        .getPublicSeoDocuments({
            page,
            limit: PAGE_SIZE,
            search: searchValue || undefined,
            tagSlugs: selectedTags,
            includeTags: true,
            sortBy: "createdAt",
            sortOrder: "desc",
        })
        .catch(() => null);

    const results = response?.data.map((item, index) => toDocumentItem(item, index)) ?? [];
    const pagination = response?.meta ?? {
        page,
        limit: PAGE_SIZE,
        total: results.length,
        totalPages: 1,
        hasPrevious: page > 1,
        hasNext: false,
    };

    return (
        <div className="space-y-10 pb-16">
            <Suspense fallback={null}>
                <SearchResultsClient
                    searchValue={searchValue}
                    selectedTags={selectedTags}
                    results={results}
                    pagination={pagination}
                />
            </Suspense>
        </div>
    );
}
