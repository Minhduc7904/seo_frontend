import type { Metadata } from "next";

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
        <section className="col-span-full ">
            <div className="bg-white">{children}</div>
        </section>
    );
}
