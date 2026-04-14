"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainMenuItems = [
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Khóa Offline", href: "/khoa-hoc-offline" },
    { label: "Khóa Online", href: "/khoa-hoc-online" },
    { label: "Thành tích", href: "/thanh-tich" },
    { label: "Thư viện", href: "/thu-vien" },
    { label: "Đội ngũ", href: "/doi-ngu" },
    { label: "Liên hệ", href: "/lien-he" },
];

export default function Header() {
    const pathname = usePathname();

    const isActiveMenu = (href: string) => {
        if (pathname === href) {
            return true;
        }

        return pathname.startsWith(`${href}/`);
    };

    return (
        <header className="col-span-full py-2">
            <div className="grid grid-cols-4 items-center gap-x-5 gap-y-4 md:grid-cols-8 xl:grid-cols-12">

                {/* Logo */}
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

                {/* Menu */}
                <nav
                    aria-label="Menu chính"
                    className="col-span-4 flex justify-center md:col-span-4 md:col-start-3 xl:col-span-8 xl:col-start-3"
                >
                    <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold text-zinc-700 xl:gap-x-6">
                        {mainMenuItems.map((item) => (
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
                        ))}
                    </ul>
                </nav>

                {/* Button */}
                <div className="col-span-2 flex items-center justify-end md:col-start-7 xl:col-start-11">
                    <a
                        href="https://beeedu.vn/student/login"
                        className="cursor-pointer rounded-lg bg-[#194DB6] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FDD22C]"
                    >
                        Đăng nhập
                    </a>
                </div>

            </div>
        </header>
    );
}