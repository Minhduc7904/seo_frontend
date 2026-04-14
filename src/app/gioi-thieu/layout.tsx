import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Giới thiệu | Bee Academy",
    description:
        "Tìm hiểu về Bee Academy, định hướng giáo dục và giá trị cốt lõi trong hành trình đồng hành cùng học sinh.",
    alternates: { canonical: "/gioi-thieu" },
    openGraph: {
        title: "Giới thiệu | Bee Academy",
        description:
            "Tìm hiểu về Bee Academy, định hướng giáo dục và giá trị cốt lõi trong hành trình đồng hành cùng học sinh.",
        url: "/gioi-thieu",
        type: "website",
    },
};

export default function GioiThieuLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full ">
            <div className="bg-white">{children}</div>
        </section>
    );
}
