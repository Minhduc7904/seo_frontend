import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thành tích | Bee Academy",
    description:
        "Theo dõi các thành tích học tập nổi bật của học sinh Bee Academy qua các kỳ thi và chương trình đánh giá năng lực.",
    alternates: { canonical: "/thanh-tich" },
    openGraph: {
        title: "Thành tích | Bee Academy",
        description:
            "Theo dõi các thành tích học tập nổi bật của học sinh Bee Academy qua các kỳ thi và chương trình đánh giá năng lực.",
        url: "/thanh-tich",
        type: "website",
    },
};

export default function ThanhTichLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full ">
            <div className="bg-white">{children}</div>
        </section>
    );
}
