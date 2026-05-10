"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EXAM_TYPES } from "@/app/thu-vien/components/exam-type-selector/exam-types";

const EXAM_SEGMENT_LABELS = Object.fromEntries(EXAM_TYPES.map((item) => [item.id, item.name]));

const SEGMENT_LABELS: Record<string, string> = {
    "thu-vien": "Thu vien",
    "de-thi": "De thi",
    "tai-lieu": "Tai lieu",
    "video-bai-giang": "Video bai giang",
    ...EXAM_SEGMENT_LABELS,
};

function toTitle(segment: string) {
    if (SEGMENT_LABELS[segment]) {
        return SEGMENT_LABELS[segment];
    }

    return decodeURIComponent(segment)
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function LibraryBreadcrumb() {
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);

    const crumbs = [
        { href: "/", label: "Trang chu" },
        ...parts.map((part, index) => ({
            href: `/${parts.slice(0, index + 1).join("/")}`,
            label: toTitle(part),
        })),
    ];

    return (
        <nav aria-label="Breadcrumb" className="w-full border-b border-slate-200 bg-white/95">
            <div className="layout-grid py-4">
                <ol className="col-span-4 flex flex-wrap items-center gap-2 text-sm md:col-span-8 xl:col-span-12">
                    {crumbs.map((crumb, index) => {
                        const isLast = index === crumbs.length - 1;

                        return (
                            <li key={crumb.href} className="flex items-center gap-2">
                                {isLast ? (
                                    <span className="font-semibold text-blue-900">{crumb.label}</span>
                                ) : (
                                    <Link href={crumb.href} className="text-slate-600 transition hover:text-blue-900">
                                        {crumb.label}
                                    </Link>
                                )}
                                {!isLast ? <span className="text-slate-400">/</span> : null}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}