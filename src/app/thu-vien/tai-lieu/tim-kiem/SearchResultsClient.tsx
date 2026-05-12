"use client";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import DocumentCard from "@/app/thu-vien/tai-lieu/components/DocumentCard";
import DocumentSearchPanel from "@/app/thu-vien/tai-lieu/components/DocumentSearchPanel";
import {
    DocumentSearchProvider,
    useDocumentSearch,
} from "@/app/thu-vien/tai-lieu/components/DocumentSearchProvider";
import {
    CHAPTER_TAG_GROUPS,
    CHAPTER_TAGS,
    getDocumentDetailPath,
    type DocumentItem,
} from "@/app/thu-vien/tai-lieu/data";

type SearchResultsClientProps = {
    searchValue: string;
    selectedTags: string[];
    results: DocumentItem[];
};

function ResultsGrid({ results }: { results: DocumentItem[] }) {
    const { selectedTags } = useDocumentSearch();
    const leftResults = results.filter((_, index) => index % 2 === 0);
    const rightResults = results.filter((_, index) => index % 2 === 1);

    return (
        <section className="rounded-[1.6rem] bg-white">
            <div className="layout-grid gap-y-6">
                <div className="col-span-4 flex flex-wrap items-center justify-between gap-3 md:col-span-8 xl:col-span-12">
                    <h2 className="text-lg font-bold text-blue-900">Kết quả tìm kiếm</h2>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
                        {results.length} tài liệu
                    </span>
                </div>

                {results.length > 0 ? (
                    <>
                        <div className="col-span-4 space-y-4 md:col-span-4 xl:col-span-4">
                            {leftResults.map((item) => (
                                <DocumentCard
                                    key={item.id}
                                    item={item}
                                    highlightedTags={selectedTags}
                                    href={`${getDocumentDetailPath(item.id)}?from=tim-kiem`}
                                />
                            ))}
                        </div>
                        <div className="col-span-4 space-y-4 md:col-span-4 xl:col-span-4">
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
                    <p className="col-span-4 text-slate-600 md:col-span-8 xl:col-span-8">
                        Không tìm thấy tài liệu phù hợp.
                    </p>
                )}

                <ChapterTagPanel />
            </div>
        </section>
    );
}

function ChapterTagPanel() {
    const { selectedTags, toggleTag } = useDocumentSearch();

    return (
        <aside className="col-span-4 space-y-6 md:col-span-4 xl:col-span-4">
            <h3 className="text-lg font-bold text-blue-900">Tag chương</h3>
            <div className="space-y-5">
                {CHAPTER_TAG_GROUPS.map((group) => (
                    <div key={group.id} className="space-y-3">
                        <p className="text-sm font-semibold text-slate-700">{group.title}</p>
                        <div className="flex flex-wrap gap-2">
                            {group.tags.map((tag) => {
                                const isActive = selectedTags.includes(tag.id);
                                return (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => toggleTag(tag.id)}
                                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                            isActive
                                                ? "border-blue-600 bg-blue-50 text-blue-800"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                                        }`}
                                    >
                                        {tag.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default function SearchResultsClient({
    searchValue,
    selectedTags,
    results,
}: SearchResultsClientProps) {
    return (
        <DocumentSearchProvider initialSearch={searchValue} initialTags={selectedTags}>
            <RevealOnScroll className="w-full">
                <DocumentSearchPanel extraTags={CHAPTER_TAGS} />
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <ResultsGrid results={results} />
            </RevealOnScroll>
        </DocumentSearchProvider>
    );
}
