import type { Metadata } from "next";
import LibraryBreadcrumb from "@/app/thu-vien/components/library-breadcrumb/LibraryBreadcrumb";
import LibraryHeroSection from "@/app/thu-vien/components/library-hero/LibraryHeroSection";

export const metadata: Metadata = {
    title: "Thư viện đề thi Toán | BeeEdu - Toán thầy Bee",
    description:
        "Thư viện BeeEdu tổng hợp tài liệu thi cử, đề thi Toán theo môn học, khối lớp và loại đề thi có đáp án, hỗ trợ luyện đề và ôn thi THPT Quốc gia.",
    keywords: [
        "thư viện đề thi",
        "đề thi Toán",
        "luyện đề Toán",
        "ôn thi THPT Quốc gia môn Toán",
        "BeeEdu",
        "Toán thầy Bee",
        "toanthaybee",
        "Ong Khắc Ngọc",
    ],
    alternates: { canonical: "/thu-vien" },
    openGraph: {
        title: "Thư viện đề thi Toán | BeeEdu - Toán thầy Bee",
        description:
            "Tổng hợp đề thi Toán, tài liệu thi cử và bộ đề có đáp án theo từng khối lớp, giúp học sinh luyện tập và ôn thi hiệu quả.",
        url: "/thu-vien",
        type: "website",
        locale: "vi_VN",
        siteName: "BeeEdu",
    },
};

export default function ThuVienLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full bg-white">
            <LibraryHeroSection />
            <LibraryBreadcrumb />
            {children}
        </section>
    );
}
