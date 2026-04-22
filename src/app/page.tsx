import ReadyBanner from "@/app/components/ready-banner/ReadyBanner";
import FirstSection from "@/app/components/first-section/FirstSection";
import NewsSection from "@/app/components/news-section/NewsSection";
import Image from "next/image";
export default function Home() {
  return (
    // <>
    //   <ReadyBanner />
    //   <FirstSection />
    //   <NewsSection />
    // </>
    <div className="w-screen max-w-none overflow-x-hidden">
      <img
        src="/poster/Frame2.png"
        alt="full-page"
        className="w-screen h-auto block"
      />
    </div>
  );
}
