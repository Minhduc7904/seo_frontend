"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, House } from "lucide-react";
import { DOCUMENT_TYPE_TAGS, type DocumentTypeSlug } from "@/app/thu-vien/tai-lieu/data";

type DocumentLevel = "thpt" | "thcs";

type DocumentLevelNavProps = {
    level?: DocumentLevel;
};

type NavItem = {
    label: string;
    href?: string;
    slugs?: DocumentTypeSlug[];
};

const TAG_BY_SLUG = new Map(DOCUMENT_TYPE_TAGS.map((item) => [item.slug, item]));

const NAV_ITEMS: Record<DocumentLevel, NavItem[]> = {
    thpt: [
        {
            label: "Toán 10",
            slugs: [
                "tai-lieu-toan-10",
                "de-cuong-toan-10",
                "de-giua-hk1-toan-10",
                "de-hk1-toan-10",
                "de-giua-hk2-toan-10",
                "de-hk2-toan-10",
                "de-khao-sat-toan-10",
                "de-hsg-toan-10",
                "giao-an-toan-10",
                "tips-giai-toan-10",
            ],
        },
        {
            label: "Toán 11",
            slugs: [
                "tai-lieu-toan-11",
                "de-cuong-toan-11",
                "de-giua-hk1-toan-11",
                "de-hk1-toan-11",
                "de-giua-hk2-toan-11",
                "de-hk2-toan-11",
                "de-khao-sat-toan-11",
                "de-hsg-toan-11",
                "giao-an-toan-11",
                "tips-giai-toan-11",
            ],
        },
        {
            label: "Toán 12",
            slugs: [
                "tai-lieu-toan-12",
                "de-cuong-toan-12",
                "de-giua-hk1-toan-12",
                "de-hk-1-toan-12",
                "de-giua-hk2-toan-12",
                "de-hk-2-toan-12",
                "de-khao-sat-toan-12",
                "de-hsg-toan-12",
                "giao-an-toan-12",
                "tips-giai-toan-12",
            ],
        },
        {
            label: "Đề thi THPT",
            slugs: [
                "de-thi-thu-thpt",
                "de-thpt-chinh-thuc",
                "de-danh-gia-nang-luc",
                "tai-lieu-on-thi-thpt",
            ],
        },
        {
            label: "SGK-SBT",
            slugs: ["sach-giao-khoa-thpt"],
        },
        {
            label: "Toán THCS",
            href: "/thu-vien/tai-lieu/thcs",
        },
    ],
    thcs: [
        {
            label: "Toán 6",
            slugs: [
                "tai-lieu-toan-6",
                "de-cuong-toan-6",
                "de-giua-hk1-toan-6",
                "de-hk1-toan-6",
                "de-giua-hk2-toan-6",
                "de-hk2-toan-6",
                "de-khao-sat-toan-6",
                "de-hsg-toan-6",
            ],
        },
        {
            label: "Toán 7",
            slugs: [
                "tai-lieu-toan-7",
                "de-cuong-toan-7",
                "de-giua-hk1-toan-7",
                "de-hk1-toan-7",
                "de-giua-hk2-toan-7",
                "de-hk2-toan-7",
                "de-khao-sat-toan-7",
                "de-hsg-toan-7",
            ],
        },
        {
            label: "Toán 8",
            slugs: [
                "tai-lieu-toan-8",
                "de-cuong-toan-8",
                "de-giua-hk1-toan-8",
                "de-hk1-toan-8",
                "de-giua-hk2-toan-8",
                "de-hk2-toan-8",
                "de-khao-sat-toan-8",
                "de-hsg-toan-8",
            ],
        },
        {
            label: "Toán 9",
            slugs: [
                "tai-lieu-toan-9",
                "de-cuong-toan-9",
                "de-giua-hk1-toan-9",
                "de-hk1-toan-9",
                "de-giua-hk2-toan-9",
                "de-hk2-toan-9",
                "de-khao-sat-toan-9",
                "de-hsg-toan-9",
            ],
        },
        {
            label: "Thi vào lớp 10",
            slugs: ["de-thi-vao-lop-10", "tai-lieu-thi-vao-lop-10"],
        },
        {
            label: "SGK-SBT",
            slugs: ["sach-giao-khoa-thcs"],
        },
        {
            label: "THPT",
            href: "/thu-vien/tai-lieu/thpt",
        },
    ],
};

const HOME_HREF: Record<DocumentLevel, string> = {
    thpt: "/thu-vien/tai-lieu/thpt",
    thcs: "/thu-vien/tai-lieu/thcs",
};

function buildSlugHref(level: DocumentLevel, slug: DocumentTypeSlug) {
    return `/thu-vien/tai-lieu/${level}/${slug}`;
}

function getLevelFromPathname(pathname: string | null): DocumentLevel | null {
    if (!pathname) return null;
    if (pathname.startsWith("/thu-vien/tai-lieu/thpt")) return "thpt";
    if (pathname.startsWith("/thu-vien/tai-lieu/thcs")) return "thcs";

    return null;
}

export default function DocumentLevelNav({ level }: DocumentLevelNavProps) {
    const pathname = usePathname();
    const resolvedLevel = level ?? getLevelFromPathname(pathname);

    if (!resolvedLevel) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-30 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-y border-slate-200 bg-white/95 shadow-sm backdrop-blur">
            <div className="layout-grid">
                <div className="col-span-4 flex items-center gap-2 overflow-visible px-2 py-2 md:col-span-8 xl:col-span-12">
                    <Link
                        href={HOME_HREF[resolvedLevel]}
                        aria-label="Trang chủ kho tài liệu"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                    >
                        <House className="h-4 w-4" />
                    </Link>

                    {NAV_ITEMS[resolvedLevel].map((item) =>
                        item.slugs?.length ? (
                            <div key={item.label} className="group relative shrink-0">
                                <button
                                    type="button"
                                    className="inline-flex h-11 min-w-36 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                                >
                                    {item.label}
                                    <ChevronDown className="h-4 w-4" />
                                </button>

                                <div className="invisible absolute left-0 top-full z-40 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                                    <div className="min-w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                                    {item.slugs.map((slug) => {
                                        const option = TAG_BY_SLUG.get(slug);
                                        if (!option) return null;

                                        return (
                                            <Link
                                                key={slug}
                                                href={buildSlugHref(resolvedLevel, slug)}
                                                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                                            >
                                                {option.name}
                                            </Link>
                                        );
                                    })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.label}
                                href={item.href ?? HOME_HREF[resolvedLevel]}
                                className="inline-flex h-11 min-w-36 shrink-0 items-center justify-center rounded-lg px-5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                            >
                                {item.label}
                            </Link>
                        ),
                    )}
                </div>
            </div>
        </nav>
    );
}
