import Link from "next/link";
import { Check } from "lucide-react";
import { getDocumentDetailPath, getDocumentTagLabel, type DocumentItem } from "@/app/thu-vien/tai-lieu/data";

type DocumentCardProps = {
    item: DocumentItem;
    href?: string;
    highlightedTags?: string[];
};

export default function DocumentCard({ item, href, highlightedTags = [] }: DocumentCardProps) {
    const content = (
        <div className="group w-full transition hover:-translate-y-0.5">
            <div className="flex w-full items-start gap-4">
                <div className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        width={100}
                        height={140}
                        className="h-[140px] w-[100px] rounded-md border border-black object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="whitespace-normal break-words text-base font-semibold text-slate-900 transition group-hover:text-blue-800">
                        {item.title}
                    </p>
                    {item.tags.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {item.tags.map((tag) => {
                                const isHighlighted = highlightedTags.includes(tag);
                                return (
                                    <span
                                        key={tag}
                                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                                            isHighlighted
                                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                : "border-slate-200 text-slate-600"
                                        }`}
                                    >
                                        {isHighlighted ? <Check className="h-3 w-3" /> : null}
                                        {getDocumentTagLabel(tag)}
                                    </span>
                                );
                            })}
                        </div>
                    ) : null}
                    <p className="mt-2 text-sm text-slate-500">{item.createdAtText}</p>
                </div>
            </div>
        </div>
    );

    return (
        <Link href={href ?? getDocumentDetailPath(item.id)} className="block w-full">
            {content}
        </Link>
    );
}
