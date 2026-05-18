import Link from "next/link";
import { Download, Eye } from "lucide-react";
import MarkdownHtmlRenderer from "@/components/common/MarkdownHtmlRenderer";
import DocumentCard from "@/app/thu-vien/tai-lieu/components/DocumentCard";
import DocumentShareActions from "@/app/thu-vien/tai-lieu/components/DocumentShareActions";
import { toDocumentItem } from "@/app/thu-vien/tai-lieu/document-section-mapper";
import type { PublicSeoDocumentDetail, PublicSeoDocumentItem } from "@/lib/api";

type DocumentDetailClientProps = {
    document: PublicSeoDocumentDetail;
    latestDocuments: PublicSeoDocumentItem[];
    relatedDocuments: PublicSeoDocumentItem[];
    level: "thpt" | "thcs";
    downloadUrl: string;
};

function getTagLabel(tag: NonNullable<PublicSeoDocumentDetail["tags"]>[number]) {
    return tag.name ?? tag.slug ?? "";
}

function getDocumentFile(document: PublicSeoDocumentDetail) {
    return document.mediaUsages?.find((item) => item.fieldName?.toLowerCase() === "document_file");
}

export default function DocumentDetailClient({
    document,
    latestDocuments,
    relatedDocuments,
    level,
    downloadUrl,
}: DocumentDetailClientProps) {
    const detailBasePath = `/thu-vien/tai-lieu/${level}/chi-tiet`;
    const backHref = `/thu-vien/tai-lieu/${level}`;
    const latestItems = latestDocuments.map((item, index) => toDocumentItem(item, index));
    const relatedItems = relatedDocuments.map((item, index) => toDocumentItem(item, index));
    const documentFile = getDocumentFile(document);
    const tags = document.tags ?? [];

    return (
        <div className="space-y-8 pb-16">
            <div className="layout-grid gap-y-6">
                <section className="col-span-4 space-y-6 rounded-[1.6rem] bg-white py-6 md:col-span-5 md:py-7 xl:col-span-8">
                    <div>
                        <Link href={backHref} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                            ← Quay lại kho tài liệu
                        </Link>
                    </div>

                    <article className="space-y-6">
                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-blue-900">{document.title}</h1>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                                    <Eye className="h-4 w-4" />
                                    {Number(document.viewCount ?? 0).toLocaleString("vi-VN")} lượt xem
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                                    <Download className="h-4 w-4" />
                                    {Number(document.downloadCount ?? 0).toLocaleString("vi-VN")} lượt tải
                                </span>
                            </div>
                            {tags.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag.slug ?? tag.tagId}
                                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                                        >
                                            {getTagLabel(tag)}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={document.thumbnailUrl || "/images/tai_lieu_hoc/defaultExam.jpg"}
                                        alt={document.title}
                                        width={160}
                                        height={220}
                                        className="h-[220px] w-[160px] rounded-md border border-black object-cover"
                                    />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-blue-900">Tài liệu</h2>
                                        <p className="mt-2 text-base leading-7 text-slate-700">
                                            {document.shortDescription || document.title}
                                        </p>
                                    </div>
                                    {downloadUrl ? (
                                        <a
                                            href={downloadUrl}
                                            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            <Download className="h-4 w-4" />
                                            Tải xuống tài liệu
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-lg font-bold text-blue-900">Nội dung tài liệu</h2>
                            <MarkdownHtmlRenderer html={document.processedContent ?? document.content} />
                        </div>

                        {documentFile?.url && documentFile.mimeType === "application/pdf" ? (
                            <div className="space-y-3">
                                <h2 className="text-lg font-bold text-blue-900">Tài liệu PDF</h2>
                                <iframe
                                    title={document.title}
                                    src={documentFile.url}
                                    className="h-[720px] w-full rounded-2xl border border-slate-200"
                                />
                                {downloadUrl ? (
                                    <a
                                        href={downloadUrl}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        <Download className="h-4 w-4" />
                                        Tải xuống tài liệu PDF
                                    </a>
                                ) : null}
                            </div>
                        ) : null}
                    </article>

                    <div className="space-y-4 pt-2">
                        <h2 className="text-xl font-bold text-blue-900">Tài liệu liên quan</h2>
                        {relatedItems.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
                                {relatedItems.map((item) => (
                                    <div key={item.id} className="md:col-span-4">
                                        <DocumentCard item={item} href={`${detailBasePath}/${item.id}`} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-600">Chưa có tài liệu liên quan.</p>
                        )}
                    </div>
                </section>

                <aside className="col-span-4 space-y-4 rounded-[1.6rem] bg-white py-6 md:col-span-3 md:py-7 xl:col-span-4">
                    <DocumentShareActions title={document.title} />
                    <h2 className="text-xl font-bold text-blue-900">Tài liệu mới nhất</h2>
                    {latestItems.length > 0 ? (
                        <div className="space-y-4">
                            {latestItems.map((item) => (
                                <DocumentCard key={item.id} item={item} href={`${detailBasePath}/${item.id}`} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-600">Chưa có tài liệu mới nhất.</p>
                    )}
                </aside>
            </div>
        </div>
    );
}
