import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khóa Offline | Bee Academy",
    description:
        "Khám phá các khóa học Offline tại Bee Academy với lộ trình rõ ràng, sĩ số phù hợp và đội ngũ giảng viên kinh nghiệm.",
    alternates: { canonical: "/khoa-hoc-offline" },
    openGraph: {
        title: "Khóa Offline | Bee Academy",
        description:
            "Khám phá các khóa học Offline tại Bee Academy với lộ trình rõ ràng, sĩ số phù hợp và đội ngũ giảng viên kinh nghiệm.",
        url: "/khoa-hoc-offline",
        type: "website",
    },
};

export default function KhoaHocOfflineLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full ">
            <div className="bg-white">{children}</div>
        </section>
    );
}
