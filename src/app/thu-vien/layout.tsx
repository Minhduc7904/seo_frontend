import type { Metadata } from "next";
import LibraryBreadcrumb from "@/app/thu-vien/components/library-breadcrumb/LibraryBreadcrumb";
import LibraryHeroSection from "@/app/thu-vien/components/library-hero/LibraryHeroSection";

export const metadata: Metadata = {
    title: "Thư viện | Bee Academy",
    description:
        "Khám phá thư viện tài liệu, hình ảnh và hoạt động học tập tại Bee Academy dành cho học sinh và phụ huynh.",
    alternates: { canonical: "/thu-vien" },
    openGraph: {
        title: "Thư viện | Bee Academy",
        description:
            "Khám phá thư viện tài liệu, hình ảnh và hoạt động học tập tại Bee Academy dành cho học sinh và phụ huynh.",
        url: "/thu-vien",
        type: "website",
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
