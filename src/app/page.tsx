import type { Metadata } from "next";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ReadyBanner from "@/app/components/ready-banner/ReadyBanner";
import FirstSection from "@/app/components/first-section/FirstSection";
import HomePhotoGallerySection from "@/app/components/home-photo-gallery/HomePhotoGallerySection";
import LearningEnvironmentSection from "@/app/components/learning-environment/LearningEnvironmentSection";
import NewsSection from "@/app/components/news-section/NewsSection";
import StudentReviewsSection from "@/app/components/student-reviews/StudentReviewsSection";
import TeacherTeamSection from "@/app/components/teacher-team/TeacherTeamSection";

export const metadata: Metadata = {
  title: "Toán thầy Bee - Lớp học Toán Bạch Mai, ôn thi THPT Quốc gia",
  description:
    "BeeEdu / Toán thầy Bee tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội hỗ trợ học sinh học Toán, luyện đề, theo dõi tiến độ, ôn thi THPT Quốc gia qua các khóa học online và offline cùng thầy Ong Khắc Ngọc.",
  keywords: [
    "Toán thầy Bee",
    "toanthaybee",
    "BeeEdu",
    "Ong Khắc Ngọc",
    "thầy Ong Khắc Ngọc",
    "lớp học toán Bạch Mai",
    "ôn luyện Bạch Mai",
    "trung tâm luyện thi Bạch Mai",
    "ôn thi THPT Quốc gia môn Toán",
    "luyện đề Toán online",
    "khóa học Toán online",
    "khóa học Toán offline",
  ],
  openGraph: {
    title: "Toán thầy Bee - Lớp học Toán Bạch Mai, ôn thi THPT Quốc gia",
    description:
      "Học Toán, luyện đề và ôn thi THPT Quốc gia cùng BeeEdu / Toán thầy Bee tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội cùng thầy Ong Khắc Ngọc.",
  },
};

export default function Home() {
  return (
    <>
      <ReadyBanner />
      <div className="flex flex-col justify-start items-center w-full gap-20 mb-20">
        <RevealOnScroll className="w-full">
          <FirstSection />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <LearningEnvironmentSection />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <TeacherTeamSection />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <HomePhotoGallerySection />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <StudentReviewsSection />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <NewsSection />
        </RevealOnScroll>
      </div>
    </>
    // <div className="w-screen max-w-none overflow-x-hidden">
    //   <img
    //     src="/poster/Frame2.png"
    //     alt="full-page"
    //     className="w-screen h-auto block"
    //   />
    // </div>
  );
}
