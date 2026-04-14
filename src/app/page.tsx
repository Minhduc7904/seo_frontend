import ReadyBanner from "@/app/components/ready-banner/ReadyBanner";
import FirstSection from "@/app/components/first-section/FirstSection";
import NewsSection from "@/app/components/news-section/NewsSection";

export default function Home() {
  return (
    <>
      <ReadyBanner />
      <FirstSection />
      <NewsSection />
    </>
  );
}
