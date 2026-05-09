import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Khóa học Offline BeeEdu tại Bạch Mai",
    description:
        "Khóa học Offline của BeeEdu / Toán thầy Bee tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội với lộ trình rõ ràng, luyện đề sát mục tiêu và theo dõi tiến độ học tập.",
    keywords: [
        "khóa học offline BeeEdu",
        "Toán thầy Bee",
        "lớp học toán Bạch Mai",
        "lớp học toán Hai Bà Trưng",
        "ôn thi THPT Quốc gia môn Toán",
        "Ong Khắc Ngọc",
    ],
    alternates: { canonical: "/khoa-hoc-offline" },
    openGraph: {
        title: "Khóa học Offline BeeEdu tại Bạch Mai",
        description:
            "Tìm hiểu khóa học Offline của BeeEdu / Toán thầy Bee tại 315 Bạch Mai, với lộ trình học rõ ràng và định hướng ôn thi THPT Quốc gia môn Toán.",
        url: "/khoa-hoc-offline",
        type: "website",
    },
};

export default function KhoaHocOfflineLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <section className="col-span-full bg-white">{children}</section>;
}
