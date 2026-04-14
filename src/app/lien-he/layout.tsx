import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Liên hệ | Bee Academy",
    description:
        "Kênh liên hệ chính thức của Bee Academy dành cho phụ huynh và học sinh cần tư vấn lộ trình học tập.",
    alternates: { canonical: "/lien-he" },
    openGraph: {
        title: "Liên hệ | Bee Academy",
        description:
            "Kênh liên hệ chính thức của Bee Academy dành cho phụ huynh và học sinh cần tư vấn lộ trình học tập.",
        url: "/lien-he",
        type: "website",
    },
};

export default function LienHeLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="col-span-full ">
            <div className="bg-white">{children}</div>
        </section>
    );
}
