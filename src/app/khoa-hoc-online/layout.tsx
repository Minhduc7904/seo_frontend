import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khóa Online | Bee Academy",
    description:
        "Tổng hợp các khóa học Online tại Bee Academy giúp học sinh học linh hoạt, bám sát lộ trình và tối ưu kết quả.",
    alternates: { canonical: "/khoa-hoc-online" },
    openGraph: {
        title: "Khóa Online | Bee Academy",
        description:
            "Tổng hợp các khóa học Online tại Bee Academy giúp học sinh học linh hoạt, bám sát lộ trình và tối ưu kết quả.",
        url: "/khoa-hoc-online",
        type: "website",
    },
};

export default function KhoaHocOnlineLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full ">
            <div className="bg-white">{children}</div>
        </section>
    );
}
