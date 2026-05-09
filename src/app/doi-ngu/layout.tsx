import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đội ngũ | Bee Academy",
    description:
        "Giới thiệu đội ngũ Giáo viên và cố vấn chuyên môn tại Bee Academy với kinh nghiệm giảng dạy thực tế.",
    alternates: { canonical: "/doi-ngu" },
    openGraph: {
        title: "Đội ngũ | Bee Academy",
        description:
            "Giới thiệu đội ngũ Giáo viên và cố vấn chuyên môn tại Bee Academy với kinh nghiệm giảng dạy thực tế.",
        url: "/doi-ngu",
        type: "website",
    },
};

export default function DoiNguLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full ">
            <div className="bg-white">{children}</div>
        </section>
    );
}
