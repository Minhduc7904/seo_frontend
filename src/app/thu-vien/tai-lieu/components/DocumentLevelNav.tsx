"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, House, Menu, X } from "lucide-react";
import { useState } from "react";
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(null);

    if (!resolvedLevel) {
        return null;
    }

    const navItems = NAV_ITEMS[resolvedLevel];
    const handleToggleMobile = () => {
        setMobileOpen((prev) => !prev);
        if (mobileOpen) {
            setOpenGroupIndex(null);
        }
    };

    const handleCloseMobile = () => {
        setMobileOpen(false);
        setOpenGroupIndex(null);
    };

    return (
        <>
            <nav className="sticky top-0 z-30 relative left-0 right-0 -ml-[var(--layout-inline-padding)] -mr-[var(--layout-inline-padding)] border-y border-slate-200 bg-white/95 shadow-sm backdrop-blur md:left-1/2 md:right-1/2 md:-ml-[50vw] md:-mr-[50vw]">
                <div className="layout-grid">
                    <div className="col-span-4 md:col-span-8 xl:col-span-12">
                        <div className="flex items-center justify-between px-2 py-2 md:hidden">
                            <Link
                                href={HOME_HREF[resolvedLevel]}
                                aria-label="Trang chủ kho tài liệu"
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-slate-700 transition hover:text-blue-800"
                                onClick={handleCloseMobile}
                            >
                                <House className="h-4 w-4" />
                            </Link>

                            <button
                                type="button"
                                onClick={handleToggleMobile}
                                aria-label={mobileOpen ? "Dong menu tai lieu" : "Mo menu tai lieu"}
                                className="inline-flex h-11 w-11 items-center justify-center text-slate-700 transition hover:text-blue-800"
                            >
                                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="hidden items-center gap-2 overflow-visible px-2 py-2 md:flex">
                            <Link
                                href={HOME_HREF[resolvedLevel]}
                                aria-label="Trang chủ kho tài liệu"
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                            >
                                <House className="h-4 w-4" />
                            </Link>

                            {navItems.map((item) =>
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
                </div>
            </nav>

            {mobileOpen ? (
                <div className="fixed inset-0 z-40 bg-white md:hidden overflow-y-auto">
                    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
                        <div className="layout-grid">
                            <div className="col-span-4 flex items-center justify-between px-2 py-2">
                                <Link
                                    href={HOME_HREF[resolvedLevel]}
                                    aria-label="Trang chu kho tai lieu"
                                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-slate-700 transition hover:text-blue-800"
                                    onClick={handleCloseMobile}
                                >
                                    <House className="h-4 w-4" />
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleToggleMobile}
                                    aria-label="Dong menu tai lieu"
                                    className="inline-flex h-11 w-11 items-center justify-center text-slate-700 transition hover:text-blue-800"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="layout-grid">
                        <div className="col-span-4 px-3 pb-8 pt-4">
                            <div className="flex flex-col gap-3">
                                {navItems.map((item, index) => {
                                    if (!item.slugs?.length) {
                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href ?? HOME_HREF[resolvedLevel]}
                                                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                                                onClick={handleCloseMobile}
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown className="h-4 w-4 -rotate-90" />
                                            </Link>
                                        );
                                    }

                                    const isOpen = openGroupIndex === index;
                                    const groupId = `mobile-doc-group-${index}`;

                                    return (
                                        <div key={item.label} className="rounded-xl border border-slate-200">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenGroupIndex(isOpen ? null : index)
                                                }
                                                aria-expanded={isOpen}
                                                aria-controls={groupId}
                                                className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform ${
                                                        isOpen ? "rotate-0" : "-rotate-90"
                                                    }`}
                                                />
                                            </button>

                                            <div
                                                id={groupId}
                                                className={isOpen ? "px-4 pb-3" : "hidden"}
                                            >
                                                <div className="flex flex-col gap-1 border-t border-slate-200 pt-3">
                                                    {item.slugs.map((slug) => {
                                                        const option = TAG_BY_SLUG.get(slug);
                                                        if (!option) return null;

                                                        return (
                                                            <Link
                                                                key={slug}
                                                                href={buildSlugHref(resolvedLevel, slug)}
                                                                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                                                                onClick={handleCloseMobile}
                                                            >
                                                                {option.name}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
