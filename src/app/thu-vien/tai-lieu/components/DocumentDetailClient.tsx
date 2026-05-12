import Link from "next/link";
import DocumentCard from "@/app/thu-vien/tai-lieu/components/DocumentCard";
import {
    getDocumentById,
    getDocumentTagLabel,
    getLatestDocuments,
    getRelatedDocuments,
} from "@/app/thu-vien/tai-lieu/data";

type DocumentDetailClientProps = {
    documentId: string;
    backHref?: string;
};

export default function DocumentDetailClient({
    documentId,
    backHref = "/thu-vien/tai-lieu",
}: DocumentDetailClientProps) {
    const document = getDocumentById(documentId);
    const relatedDocuments = getRelatedDocuments(documentId, 6);
    const latestDocuments = getLatestDocuments(4, documentId);

    if (!document) {
        return (
            <div className="space-y-8 pb-16">
                <div className="layout-grid gap-y-6">
                    <section className="col-span-4 rounded-[1.6rem] bg-white py-6 md:col-span-8 md:py-7 xl:col-span-12">
                        <p className="text-slate-600">Không tìm thấy tài liệu.</p>
                    </section>
                </div>
            </div>
        );
    }

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
                            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                <span>{document.createdAtText}</span>
                                <span className="text-slate-300">•</span>
                                <span>{document.tags.map((tag) => getDocumentTagLabel(tag)).join(" · ")}</span>
                            </div>
                        </div>

                        <div className="space-y-4 text-base leading-7 text-slate-700">
                            <p>
                                Tài liệu gồm 171 trang, được biên soạn bởi thầy giáo Trần Thanh Yên, tuyển tập bộ đề ôn tập
                                chương ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số môn Toán 12, có đáp án và lời giải chi
                                tiết.
                            </p>
                            <p>
                                Các đề kiểm tra được biên soạn theo cấu trúc định dạng trắc nghiệm mới nhất, với nội dung gồm
                                ba phần: Trắc nghiệm nhiều phương án lựa chọn (12 câu); Trắc nghiệm đúng sai (04 câu);
                                Trắc nghiệm trả lời ngắn (06 câu).
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={document.thumbnailUrl}
                                        alt={document.title}
                                        width={160}
                                        height={220}
                                        className="h-[220px] w-[160px] rounded-md border border-black object-cover"
                                    />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-blue-900">Tóm tắt tài liệu</h2>
                                        <p className="mt-2 text-base leading-7 text-slate-700">{document.summary}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-600">Tài liệu bao gồm</h3>
                                        <ul className="mt-2 flex flex-wrap gap-2">
                                            {document.tags.map((tag) => (
                                                <li
                                                    key={tag}
                                                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                                                >
                                                    {getDocumentTagLabel(tag)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            Tải xuống tài liệu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-lg font-bold text-blue-900">Preview PDF</h2>
                            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                                Preview PDF tài liệu ở đây
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-lg font-bold text-blue-900">Nội dung tài liệu</h2>
                            {document.content.map((paragraph, index) => (
                                <p key={`${document.id}-content-${index}`} className="text-base leading-7 text-slate-700">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </article>

                    <div className="space-y-4 pt-2">
                        <h2 className="text-xl font-bold text-blue-900">Tài liệu liên quan</h2>
                        {relatedDocuments.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
                                {relatedDocuments.map((item) => (
                                    <div key={item.id} className="md:col-span-4">
                                        <DocumentCard item={item} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-600">Chưa có tài liệu liên quan.</p>
                        )}
                    </div>
                </section>

                <aside className="col-span-4 space-y-4 rounded-[1.6rem] bg-white py-6 md:col-span-3 md:py-7 xl:col-span-4">
                    <h2 className="text-xl font-bold text-blue-900">Tài liệu mới nhất</h2>
                    {latestDocuments.length > 0 ? (
                        <div className="space-y-4">
                            {latestDocuments.map((item) => (
                                <DocumentCard key={item.id} item={item} />
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
