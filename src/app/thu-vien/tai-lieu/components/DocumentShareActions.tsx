"use client";

import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

type DocumentShareActionsProps = {
    title: string;
};

export default function DocumentShareActions({ title }: DocumentShareActionsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title,
                url: window.location.href,
            });
            return;
        }

        await handleCopy();
    };

    return (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="text-base font-bold text-blue-900">Chia sẻ tài liệu</h2>
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-800"
                >
                    <Share2 className="h-4 w-4" />
                    Chia sẻ
                </button>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-800"
                >
                    <Copy className="h-4 w-4" />
                    {copied ? "Đã sao chép" : "Sao chép link"}
                </button>
            </div>
        </div>
    );
}
