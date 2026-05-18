"use client";

import type { CSSProperties } from "react";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { DOCUMENT_TAGS, SEARCH_EXTRA_TAGS, type DocumentTag } from "@/app/thu-vien/tai-lieu/data";
import {
    DOCUMENT_TAG_TYPES,
    DOCUMENT_TAG_TYPE_LABELS,
    isDocumentTagType,
    type DocumentTagType,
} from "@/app/thu-vien/tai-lieu/document-tag-types";
import { useDocumentSearch } from "@/app/thu-vien/tai-lieu/components/DocumentSearchProvider";
import { usePublicSeoTagSearch } from "@/hooks/usePublicSeoTagSearch";
import type { PublicSeoTagItem } from "@/lib/api";

type DocumentSearchPanelProps = {
    searchPath?: string;
    extraTags?: DocumentTag[];
};

type SearchableDocumentTag = DocumentTag & {
    type: DocumentTagType;
};

const DEFAULT_SEARCH_PATH = "/thu-vien/tai-lieu/tim-kiem";

function mergeTags(tags: DocumentTag[]) {
    const map = new Map<string, DocumentTag>();
    tags.forEach((tag) => {
        if (!map.has(tag.id)) {
            map.set(tag.id, tag);
        }
    });
    return Array.from(map.values());
}

function toDocumentTag(item: PublicSeoTagItem): SearchableDocumentTag | null {
    const rawId = item.slug ?? item.id ?? item.tagId;
    const rawLabel = item.name ?? item.label ?? item.slug;

    if (
        (typeof rawId !== "string" && typeof rawId !== "number") ||
        typeof rawLabel !== "string" ||
        !isDocumentTagType(item.type)
    ) {
        return null;
    }

    const id = String(rawId).trim();
    const label = rawLabel.trim();
    return id && label ? { id, label, type: item.type } : null;
}

export default function DocumentSearchPanel({
    searchPath = DEFAULT_SEARCH_PATH,
    extraTags = [],
}: DocumentSearchPanelProps) {
    const router = useRouter();
    const markerRef = useRef<HTMLDivElement | null>(null);
    const tagInputRef = useRef<HTMLInputElement | null>(null);
    const tagDropdownRef = useRef<HTMLDivElement | null>(null);
    const {
        searchValue,
        setSearchValue,
        selectedTags,
        toggleTag,
        removeTag,
        tagSearchValue,
        setTagSearchValue,
    } = useDocumentSearch();
    const [showStickyTags, setShowStickyTags] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [debouncedTagSearch, setDebouncedTagSearch] = useState(tagSearchValue);
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
    const [tagDropdownStyle, setTagDropdownStyle] = useState<CSSProperties>({});

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedTagSearch(tagSearchValue.trim());
        }, 500);

        return () => clearTimeout(timeout);
    }, [tagSearchValue]);

    const { tags: apiTags, loading: tagsLoading, error: tagsError } = usePublicSeoTagSearch({
        search: debouncedTagSearch || undefined,
        page: 1,
        limit: 20,
    });

    const apiTagOptions = useMemo(
        () => apiTags.map(toDocumentTag).filter((tag): tag is SearchableDocumentTag => Boolean(tag)),
        [apiTags],
    );
    const groupedTagOptions = useMemo(
        () =>
            DOCUMENT_TAG_TYPES.map((type) => ({
                type,
                label: DOCUMENT_TAG_TYPE_LABELS[type],
                tags: apiTagOptions.filter((tag) => tag.type === type),
            })).filter((group) => group.tags.length > 0),
        [apiTagOptions],
    );

    const tagLookup = useMemo(() => {
        const allTags = mergeTags([...DOCUMENT_TAGS, ...SEARCH_EXTRA_TAGS, ...extraTags, ...apiTagOptions]);
        return new Map(allTags.map((tag) => [tag.id, tag.label]));
    }, [apiTagOptions, extraTags]);

    const selectedTagLabels = selectedTags.map((tagId) => ({
        id: tagId,
        label: tagLookup.get(tagId) ?? tagId,
    }));

    const handleSearch = () => {
        const trimmedSearch = searchValue.trim();
        const params = new URLSearchParams();

        if (trimmedSearch) params.set("search", trimmedSearch);
        if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));

        const query = params.toString();
        router.push(query ? `${searchPath}?${query}` : searchPath);
    };

    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        const target = markerRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => setShowStickyTags(!entry.isIntersecting),
            { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!tagDropdownRef.current?.contains(target) && !tagInputRef.current?.contains(target)) {
                setIsTagDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, []);

    useEffect(() => {
        if (!isTagDropdownOpen) return;

        const updatePosition = () => {
            const rect = tagInputRef.current?.getBoundingClientRect();
            if (!rect) return;

            setTagDropdownStyle({
                position: "fixed",
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width,
            });
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isTagDropdownOpen]);

    const selectedTagButtons = selectedTagLabels.map((tag) => (
        <button
            key={tag.id}
            type="button"
            onClick={() => removeTag(tag.id)}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 transition hover:border-blue-300"
        >
            <span>{tag.label}</span>
            <X className="h-3 w-3" />
        </button>
    ));

    const stickyHeader =
        showStickyTags && selectedTagButtons.length > 0 ? (
            <div className="fixed left-0 right-0 top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="layout-grid py-3">
                    <div className="col-span-4 flex flex-wrap items-center justify-between gap-3 md:col-span-8 xl:col-span-12">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Tag đã chọn
                            </span>
                            {selectedTagButtons}
                        </div>
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        ) : null;

    const tagDropdown =
        isTagDropdownOpen && isMounted ? (
            <div
                ref={tagDropdownRef}
                style={tagDropdownStyle}
                className="z-[70] max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
            >
                {tagsLoading ? (
                    <p className="px-3 py-2 text-sm text-slate-500">Đang tìm tag...</p>
                ) : tagsError ? (
                    <p className="px-3 py-2 text-sm text-rose-600">Không tải được tag.</p>
                ) : !debouncedTagSearch ? (
                    <p className="px-3 py-2 text-sm text-slate-500">Nhập từ khóa để tìm tag.</p>
                ) : groupedTagOptions.length > 0 ? (
                    <div className="space-y-3">
                        {groupedTagOptions.map((group) => (
                            <div key={group.type} className="space-y-1.5">
                                <p className="px-3 text-xs font-semibold uppercase text-slate-500">{group.label}</p>
                                <div className="space-y-1">
                                    {group.tags.map((tag) => {
                                        const isActive = selectedTags.includes(tag.id);
                                        return (
                                            <button
                                                key={tag.id}
                                                type="button"
                                                onClick={() => toggleTag(tag.id)}
                                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                                                    isActive
                                                        ? "bg-blue-50 font-semibold text-blue-800"
                                                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                                                }`}
                                            >
                                                <span>{tag.label}</span>
                                                {isActive ? <span className="text-xs">Đã chọn</span> : null}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="px-3 py-2 text-sm text-slate-500">Không tìm thấy tag.</p>
                )}
            </div>
        ) : null;

    return (
        <>
            {isMounted && stickyHeader ? createPortal(stickyHeader, document.body) : null}
            {tagDropdown ? createPortal(tagDropdown, document.body) : null}

            <section className="rounded-[1.6rem] bg-white py-6 md:py-7">
                <div className="layout-grid gap-y-6">
                    <div className="col-span-4 space-y-4 md:col-span-8 xl:col-span-8">
                        <p className="text-lg font-bold text-blue-900">Tìm kiếm tài liệu</p>
                        <div className="relative w-full">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                id="document-search"
                                type="text"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleSearch();
                                    }
                                }}
                                placeholder="Nhập từ khóa tài liệu..."
                                className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Tìm kiếm
                        </button>
                        <div ref={markerRef} className="h-px w-full" />
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tag đã chọn</p>
                            {selectedTagLabels.length > 0 ? (
                                <div className="flex flex-wrap gap-2">{selectedTagButtons}</div>
                            ) : (
                                <p className="text-sm text-slate-500">Chưa chọn tag.</p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-4 space-y-4 md:col-span-8 xl:col-span-4">
                        <p className="text-lg font-bold text-blue-900">Tag tài liệu</p>
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                ref={tagInputRef}
                                type="text"
                                value={tagSearchValue}
                                onChange={(event) => setTagSearchValue(event.target.value)}
                                onFocus={() => setIsTagDropdownOpen(true)}
                                placeholder="Tìm tag tài liệu..."
                                className="h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-xs text-slate-900 outline-none transition focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
