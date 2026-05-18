"use client";

import { useRouter } from "next/navigation";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import Pagination from "@/components/common/Pagination";
import DocumentCard from "@/app/thu-vien/tai-lieu/components/DocumentCard";
import DocumentSearchPanel from "@/app/thu-vien/tai-lieu/components/DocumentSearchPanel";
import {
    DocumentSearchProvider,
    useDocumentSearch,
} from "@/app/thu-vien/tai-lieu/components/DocumentSearchProvider";
import { CHAPTER_TAGS, getDocumentDetailPath, type DocumentItem } from "@/app/thu-vien/tai-lieu/data";
import type { PaginationMeta } from "@/lib/api";

type SearchResultsClientProps = {
    searchValue: string;
    selectedTags: string[];
    results: DocumentItem[];
    pagination: PaginationMeta;
};

function buildSearchHref(searchValue: string, selectedTags: string[], page: number) {
    const params = new URLSearchParams();

    if (searchValue.trim()) {
        params.set("search", searchValue.trim());
    }

    if (selectedTags.length > 0) {
        params.set("tags", selectedTags.join(","));
    }

    if (page > 1) {
        params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `/thu-vien/tai-lieu/tim-kiem?${query}` : "/thu-vien/tai-lieu/tim-kiem";
}

function ResultsGrid({
    searchValue,
    results,
    pagination,
}: {
    searchValue: string;
    results: DocumentItem[];
    pagination: PaginationMeta;
}) {
    const router = useRouter();
    const { selectedTags } = useDocumentSearch();
    const leftResults = results.filter((_, index) => index % 2 === 0);
    const rightResults = results.filter((_, index) => index % 2 === 1);

    return (
        <section className="rounded-[1.6rem] bg-white">
            <div className="layout-grid gap-y-6">
                <div className="col-span-4 flex flex-wrap items-center justify-between gap-3 md:col-span-8 xl:col-span-12">
                    <h2 className="text-lg font-bold text-blue-900">Kết quả tìm kiếm</h2>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
                        {pagination.total} tài liệu
                    </span>
                </div>

                {results.length > 0 ? (
                    <>
                        <div className="col-span-4 space-y-4 md:col-span-4 xl:col-span-6">
                            {leftResults.map((item) => (
                                <DocumentCard
                                    key={item.id}
                                    item={item}
                                    highlightedTags={selectedTags}
                                    href={`${getDocumentDetailPath(item.id)}?from=tim-kiem`}
                                />
                            ))}
                        </div>
                        <div className="col-span-4 space-y-4 md:col-span-4 xl:col-span-6">
                            {rightResults.map((item) => (
                                <DocumentCard
                                    key={item.id}
                                    item={item}
                                    highlightedTags={selectedTags}
                                    href={`${getDocumentDetailPath(item.id)}?from=tim-kiem`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="col-span-4 text-slate-600 md:col-span-8 xl:col-span-12">
                        Không tìm thấy tài liệu phù hợp.
                    </p>
                )}
            </div>

            <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                hasPrevious={pagination.hasPrevious}
                hasNext={pagination.hasNext}
                onPageChange={(page) => {
                    router.push(buildSearchHref(searchValue, selectedTags, page));
                }}
            />
        </section>
    );
}

export default function SearchResultsClient({
    searchValue,
    selectedTags,
    results,
    pagination,
}: SearchResultsClientProps) {
    return (
        <DocumentSearchProvider initialSearch={searchValue} initialTags={selectedTags}>
            <RevealOnScroll className="w-full">
                <DocumentSearchPanel extraTags={CHAPTER_TAGS} />
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <ResultsGrid searchValue={searchValue} results={results} pagination={pagination} />
            </RevealOnScroll>
        </DocumentSearchProvider>
    );
}
