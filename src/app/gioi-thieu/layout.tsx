import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Giới thiệu BeeEdu - Toán thầy Bee tại Bạch Mai",
    description:
        "Giới thiệu BeeEdu / Toán thầy Bee: mô hình học Toán online và offline tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội cùng thầy Ong Khắc Ngọc.",
    keywords: [
        "BeeEdu",
        "Toán thầy Bee",
        "toanthaybee",
        "Ong Khắc Ngọc",
        "lớp học toán Bạch Mai",
        "ôn thi THPT Quốc gia môn Toán",
    ],
    alternates: { canonical: "/gioi-thieu" },
    openGraph: {
        title: "Giới thiệu BeeEdu - Toán thầy Bee tại Bạch Mai",
        description:
            "Tìm hiểu mô hình học Toán online - offline của BeeEdu / Toán thầy Bee cùng thầy Ong Khắc Ngọc tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội.",
        url: "/gioi-thieu",
        type: "website",
    },
};

export default function GioiThieuLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <section className="col-span-full bg-white">{children}</section>;
}
