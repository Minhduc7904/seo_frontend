import RevealOnScroll from "@/components/common/RevealOnScroll";
import DocumentCard from "@/app/thu-vien/tai-lieu/components/DocumentCard";
import DocumentSearchPanel from "@/app/thu-vien/tai-lieu/components/DocumentSearchPanel";
import { DocumentSearchProvider } from "@/app/thu-vien/tai-lieu/components/DocumentSearchProvider";
import { CHAPTER_TAGS, DOCUMENT_COLUMNS } from "@/app/thu-vien/tai-lieu/data";

export default function TaiLieuPage() {
    return (
        <div className="space-y-10 pb-16">
            <RevealOnScroll className="w-full">
                <DocumentSearchProvider>
                    <DocumentSearchPanel extraTags={CHAPTER_TAGS} />
                </DocumentSearchProvider>
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <section className="layout-grid gap-y-6">
                    {DOCUMENT_COLUMNS.map((column) => (
                        <div key={column.id} className="col-span-4 md:col-span-4 xl:col-span-4">
                            <div className="h-full rounded-[1.6rem] bg-white py-6 md:py-7">
                                <h2 className="text-lg font-bold text-blue-900">{column.title}</h2>
                                <div className="mt-5 divide-y divide-slate-200">
                                    {column.items.map((item) => (
                                        <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                                            <DocumentCard item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </RevealOnScroll>
        </div>
    );
}
