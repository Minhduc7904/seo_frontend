import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đề thi | BeeEdu",
    description: "Thư viện đề thi BeeEdu theo môn học, khối lớp và loại đề thi.",
    alternates: { canonical: "/thu-vien/de-thi" },
    openGraph: {
        title: "Đề thi | BeeEdu",
        description: "Thư viện đề thi BeeEdu theo môn học, khối lớp và loại đề thi.",
        url: "/thu-vien/de-thi",
        type: "website",
        locale: "vi_VN",
    },
};

export default function DeThiLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full bg-white">
            {children}
        </section>
    );
}
