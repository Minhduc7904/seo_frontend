"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mainMenuItems = [
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Khóa Offline", href: "/khoa-hoc-offline" },
    { label: "Khóa Online", href: "/khoa-hoc-online" },
    { label: "Thành tích", href: "/thanh-tich" },
    { label: "Thư viện", href: "/thu-vien" },
    { label: "Đội ngũ", href: "/doi-ngu" },
    { label: "Liên hệ", href: "/lien-he" },
];

const libraryMenuItems = [
    { label: "Kho tài liệu", href: "/thu-vien/tai-lieu/thpt" },
    { label: "Thư viện đề thi", href: "/thu-vien/de-thi" },
    { label: "Ngân hàng câu hỏi", href: "/thu-vien/cau-hoi" },
];

export default function Header() {
    const pathname = usePathname();
    const [isLibraryMenuOpen, setIsLibraryMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileLibraryMenuOpen, setIsMobileLibraryMenuOpen] = useState(false);

    const isActiveMenu = (href: string) => {
        if (pathname === href) {
            return true;
        }

        return pathname.startsWith(`${href}/`);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileLibraryMenuOpen(false);
    };

    return (
        <header className="col-span-full py-2">
            <div className="grid grid-cols-4 items-center gap-x-5 gap-y-4 md:grid-cols-8 xl:grid-cols-12">
                <Link
                    href="/"
                    className="col-span-2 flex items-center"
                    aria-label="Trang chủ"
                >
                    <Image
                        src="/Logo/Logo1.svg"
                        alt="Logo"
                        width={61}
                        height={48}
                        priority
                    />
                </Link>

                <nav
                    aria-label="Menu chính"
                    className="hidden justify-center md:col-span-4 md:col-start-3 md:flex xl:col-span-8 xl:col-start-3"
                >
                    <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold text-zinc-700 xl:gap-x-6">
                        {mainMenuItems.map((item) =>
                            item.href === "/thu-vien" ? (
                                <li
                                    key={item.href}
                                    className="group relative flex items-center"
                                    onMouseEnter={() => setIsLibraryMenuOpen(true)}
                                    onMouseLeave={() => setIsLibraryMenuOpen(false)}
                                >
                                    <Link
                                        href={item.href}
                                        aria-current={isActiveMenu(item.href) ? "page" : undefined}
                                        className={`transition-colors hover:text-[#194DB6] ${isActiveMenu(item.href)
                                            ? "text-[#194DB6] underline underline-offset-4"
                                            : "text-zinc-700"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>

                                    <button
                                        type="button"
                                        aria-label="Mở menu thư viện"
                                        aria-expanded={isLibraryMenuOpen}
                                        onClick={() => setIsLibraryMenuOpen((current) => !current)}
                                        className="ml-1 inline-flex h-6 w-6 items-center justify-center text-zinc-600 transition-colors hover:text-[#194DB6]"
                                    >
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${isLibraryMenuOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`absolute left-1/2 top-full z-20 pt-1 transition ${isLibraryMenuOpen
                                            ? "pointer-events-auto visible opacity-100"
                                            : "pointer-events-none invisible opacity-0"
                                            }`}
                                    >
                                        <div className="-translate-x-1/2 overflow-hidden rounded-lg border border-zinc-200 bg-white py-2 shadow-lg">
                                            {libraryMenuItems.map((libraryItem) => (
                                                <Link
                                                    key={libraryItem.href}
                                                    href={libraryItem.href}
                                                    className={`block whitespace-nowrap px-4 py-2 text-sm transition-colors hover:bg-blue-50 hover:text-[#194DB6] ${isActiveMenu(libraryItem.href)
                                                        ? "text-[#194DB6]"
                                                        : "text-zinc-700"
                                                        }`}
                                                >
                                                    {libraryItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={isActiveMenu(item.href) ? "page" : undefined}
                                        className={`transition-colors hover:text-[#194DB6] ${isActiveMenu(item.href)
                                            ? "text-[#194DB6] underline underline-offset-4"
                                            : "text-zinc-700"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </nav>

                <div className="hidden items-center justify-end md:col-span-2 md:col-start-7 md:flex xl:col-span-2 xl:col-start-11">
                    <a
                        href="https://beeedu.vn/student/login"
                        className="cursor-pointer whitespace-nowrap rounded-lg bg-[#194DB6] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FDD22C]"
                    >
                        Đăng nhập
                    </a>
                </div>

                <div className="col-span-2 flex justify-end md:hidden">
                    <button
                        type="button"
                        aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((current) => !current)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:border-[#194DB6] hover:text-[#194DB6]"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen ? (
                <nav aria-label="Menu di động" className="mt-3 md:hidden">
                    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
                        {mainMenuItems.map((item) =>
                            item.href === "/thu-vien" ? (
                                <div key={item.href} className="border-b border-zinc-100">
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href}
                                            aria-current={isActiveMenu(item.href) ? "page" : undefined}
                                            onClick={closeMobileMenu}
                                            className={`flex-1 px-4 py-3 text-sm font-semibold ${isActiveMenu(item.href)
                                                ? "text-[#194DB6]"
                                                : "text-zinc-700"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                        <button
                                            type="button"
                                            aria-label="Mở menu thư viện"
                                            aria-expanded={isMobileLibraryMenuOpen}
                                            onClick={() =>
                                                setIsMobileLibraryMenuOpen((current) => !current)
                                            }
                                            className="mr-2 inline-flex h-9 w-9 items-center justify-center text-zinc-600"
                                        >
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform ${isMobileLibraryMenuOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {isMobileLibraryMenuOpen ? (
                                        <div className="bg-zinc-50 pb-2">
                                            {libraryMenuItems.map((libraryItem) => (
                                                <Link
                                                    key={libraryItem.href}
                                                    href={libraryItem.href}
                                                    onClick={closeMobileMenu}
                                                    className={`block px-6 py-2 text-sm ${isActiveMenu(libraryItem.href)
                                                        ? "font-semibold text-[#194DB6]"
                                                        : "text-zinc-600"
                                                        }`}
                                                >
                                                    {libraryItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActiveMenu(item.href) ? "page" : undefined}
                                    onClick={closeMobileMenu}
                                    className={`block border-b border-zinc-100 px-4 py-3 text-sm font-semibold last:border-b-0 ${isActiveMenu(item.href)
                                        ? "text-[#194DB6]"
                                        : "text-zinc-700"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        )}

                        <a
                            href="https://beeedu.vn/student/login"
                            className="block bg-[#194DB6] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#FDD22C]"
                        >
                            Đăng nhập
                        </a>
                    </div>
                </nav>
            ) : null}
        </header>
    );
}
