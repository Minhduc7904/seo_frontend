import { Suspense } from "react";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import DocumentCard from "@/app/thu-vien/tai-lieu/components/DocumentCard";
import DocumentSearchPanel from "@/app/thu-vien/tai-lieu/components/DocumentSearchPanel";
import { DocumentSearchProvider } from "@/app/thu-vien/tai-lieu/components/DocumentSearchProvider";
import type { DocumentColumn, DocumentTag } from "@/app/thu-vien/tai-lieu/data";

type DocumentLibraryPageProps = {
    columns: DocumentColumn[];
    chapterTags: DocumentTag[];
    detailBasePath: string;
    headerTitle: string;
    headerDescription: string;
};

export default function DocumentLibraryPage({
    columns,
    chapterTags,
    detailBasePath,
    headerTitle,
    headerDescription,
}: DocumentLibraryPageProps) {
    return (
        <div className="space-y-10 pb-16">
            <RevealOnScroll className="w-full">
                <section className="rounded-[1.6rem] border border-blue-100 bg-blue-50 px-6 py-6 md:px-7 md:py-7">
                    <p className="text-xs font-semibold uppercase text-blue-700">Kho tài liệu</p>
                    <h2 className="mt-2 text-2xl font-bold text-blue-950">{headerTitle}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{headerDescription}</p>
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
                <section className="layout-grid gap-y-6">
                    {columns.map((column) => (
                        <div
                            key={column.id}
                            id={column.id}
                            className="col-span-4 scroll-mt-24 md:col-span-4 xl:col-span-4"
                        >
                            <div className="h-full rounded-[1.6rem] bg-white py-6 md:py-7">
                                <h2 className="text-lg font-bold text-blue-900">{column.title}</h2>
                                {column.items.length > 0 ? (
                                    <div className="mt-5 divide-y divide-slate-200">
                                        {column.items.map((item) => (
                                            <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                                                <DocumentCard item={item} href={`${detailBasePath}/${item.id}`} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-5 text-sm text-slate-500">Chưa có tài liệu.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            </RevealOnScroll>
        </div>
    );
}
