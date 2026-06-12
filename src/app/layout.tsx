import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import StudentLoginRedirect from "@/components/common/StudentLoginRedirect";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "BeeEdu",
  title: {
    default: "BeeEdu | Toán thầy Bee",
    template: "%s | BeeEdu",
  },
  description:
    "BeeEdu và Toán thầy Bee hỗ trợ học sinh học Toán, luyện đề, theo dõi tiến độ và ôn thi THPT Quốc gia qua các khóa học online và offline tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội.",
  keywords: [
    "BeeEdu",
    "Toán thầy Bee",
    "toanthaybee",
    "Ong Khắc Ngọc",
    "thầy Ong Khắc Ngọc",
    "lớp học toán Bạch Mai",
    "trung tâm luyện thi Bạch Mai",
    "ôn thi THPT Quốc gia môn Toán",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "BeeEdu",
    title: "BeeEdu | Toán thầy Bee",
    description:
      "Hệ thống học Toán online và offline giúp học sinh luyện tập, làm đề, theo dõi tiến độ và ôn thi THPT Quốc gia cùng thầy Ong Khắc Ngọc.",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden">
        <div className="layout-shell min-h-full">
          <div className="layout-grid min-h-full">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
        <ScrollToTopButton />
        <StudentLoginRedirect />
      </body>
    </html>
  );
}
