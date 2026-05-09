import AboutHeroSection from "@/app/gioi-thieu/components/about-hero/AboutHeroSection";
import AboutOverviewSection from "@/app/gioi-thieu/components/about-overview/AboutOverviewSection";
import AboutPurposeSection from "@/app/gioi-thieu/components/about-purpose/AboutPurposeSection";
import AboutStorySection from "@/app/gioi-thieu/components/about-story/AboutStorySection";
import RevealOnScroll from "@/components/common/RevealOnScroll";

export default function GioiThieuPage() {
    return (
        <div className="space-y-16 pb-16">
            <RevealOnScroll className="w-full">
                <AboutHeroSection />
            </RevealOnScroll>
            <RevealOnScroll className="w-full">
                <AboutOverviewSection />
            </RevealOnScroll>
            <RevealOnScroll className="w-full">
                <AboutPurposeSection />
            </RevealOnScroll>
            <RevealOnScroll className="w-full">
                <AboutStorySection />
            </RevealOnScroll>
        </div>
    );
}
