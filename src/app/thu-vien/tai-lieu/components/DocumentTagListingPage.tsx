import { Suspense } from "react";
import Link from "next/link";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import DocumentCard from "@/app/thu-vien/tai-lieu/components/DocumentCard";
import DocumentSearchPanel from "@/app/thu-vien/tai-lieu/components/DocumentSearchPanel";
import { DocumentSearchProvider } from "@/app/thu-vien/tai-lieu/components/DocumentSearchProvider";
import type { DocumentItem, DocumentTag } from "@/app/thu-vien/tai-lieu/data";
import type { PaginationMeta } from "@/lib/api";

type DocumentTagListingPageProps = {
    title: string;
    description: string;
    documents: DocumentItem[];
    chapterTags: DocumentTag[];
    detailBasePath: string;
    backHref: string;
    pagination: PaginationMeta;
    pageHref: (page: number) => string;
};

function buildPageItems(page: number, totalPages: number) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
    const normalized = Array.from(pages)
        .filter((item) => item >= 1 && item <= totalPages)
        .sort((a, b) => a - b);

    const items: Array<number | "..."> = [];
    normalized.forEach((item, index) => {
        const previous = normalized[index - 1];
        if (previous && item - previous > 1) {
            items.push("...");
        }
        items.push(item);
    });

    return items;
}

function TagPagination({
    pagination,
    pageHref,
}: {
    pagination: PaginationMeta;
    pageHref: (page: number) => string;
}) {
    if (pagination.totalPages <= 1) {
        return null;
    }

    const items = buildPageItems(pagination.page, pagination.totalPages);

    return (
        <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
                href={pageHref(pagination.page - 1)}
                aria-disabled={!pagination.hasPrevious}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-md border ${
                    pagination.hasPrevious
                        ? "border-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                        : "pointer-events-none border-slate-200 text-slate-300"
                }`}
            >
                <span aria-hidden="true">{"<"}</span>
            </Link>

            {items.map((item, index) =>
                item === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-slate-500">
                        ...
                    </span>
                ) : (
                    <Link
                        key={item}
                        href={pageHref(item)}
                        aria-current={item === pagination.page ? "page" : undefined}
                        className={`min-w-9 rounded-md border px-3 py-1.5 text-sm font-semibold transition ${
                            item === pagination.page
                                ? "border-blue-600 bg-blue-50 text-blue-800"
                                : "border-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                    >
                        {item}
                    </Link>
                ),
            )}

            <Link
                href={pageHref(pagination.page + 1)}
                aria-disabled={!pagination.hasNext}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-md border ${
                    pagination.hasNext
                        ? "border-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                        : "pointer-events-none border-slate-200 text-slate-300"
                }`}
            >
                <span aria-hidden="true">{">"}</span>
            </Link>
        </nav>
    );
}

export default function DocumentTagListingPage({
    title,
    description,
    documents,
    chapterTags,
    detailBasePath,
    backHref,
    pagination,
    pageHref,
}: DocumentTagListingPageProps) {
    return (
        <div className="space-y-10 pb-16">
            <RevealOnScroll className="w-full">
                <section className="rounded-[1.6rem] border border-blue-100 bg-blue-50 px-6 py-6 md:px-7 md:py-7">
                    <p className="text-xs font-semibold uppercase text-blue-700">Kho tài liệu</p>
                    <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-blue-950">{title}</h1>
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{description}</p>
                        </div>
                        <Link
                            href={backHref}
                            className="inline-flex w-fit items-center justify-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100/60"
                        >
                            Quay lại kho THPT
                        </Link>
                    </div>
                </section>
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <Suspense fallback={null}>
                    <DocumentSearchProvider>
                        <DocumentSearchPanel extraTags={chapterTags} />
                    </DocumentSearchProvider>
                </Suspense>
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <section className="rounded-[1.6rem] bg-white py-6 md:py-7">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-blue-900">Danh sách tài liệu</h2>
                        <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold leading-none text-blue-800">
                            {pagination.total} tài liệu
                        </span>
                    </div>

                    {documents.length > 0 ? (
                        <div className="divide-y divide-slate-200">
                            {documents.map((item) => (
                                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                                    <DocumentCard item={item} href={`${detailBasePath}/${item.id}`} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">Chưa có tài liệu phù hợp.</p>
                    )}

                    <TagPagination pagination={pagination} pageHref={pageHref} />
                </section>
            </RevealOnScroll>
        </div>
    );
}
