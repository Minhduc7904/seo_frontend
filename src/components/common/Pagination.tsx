"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
    page: number;
    totalPages: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    onPageChange: (page: number) => void;
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
    for (let index = 0; index < normalized.length; index += 1) {
        const current = normalized[index];
        const previous = normalized[index - 1];

        if (previous && current - previous > 1) {
            items.push("...");
        }

        items.push(current);
    }

    return items;
}

export default function Pagination({ page, totalPages, hasPrevious, hasNext, onPageChange }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const safePage = Math.min(Math.max(page, 1), totalPages);
    const items = buildPageItems(safePage, totalPages);

    return (
        <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                aria-label="Trang truoc"
                disabled={!hasPrevious || safePage <= 1}
                onClick={() => onPageChange(safePage - 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {items.map((item, index) =>
                item === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-slate-500">
                        ...
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onPageChange(item)}
                        aria-current={item === safePage ? "page" : undefined}
                        className={`min-w-9 rounded-md border px-3 py-1.5 text-sm font-semibold transition ${
                            item === safePage
                                ? "border-blue-600 bg-blue-50 text-blue-800"
                                : "border-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                    >
                        {item}
                    </button>
                ),
            )}

            <button
                type="button"
                aria-label="Trang sau"
                disabled={!hasNext || safePage >= totalPages}
                onClick={() => onPageChange(safePage + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
}
