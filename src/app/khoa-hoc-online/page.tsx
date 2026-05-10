import RevealOnScroll from "@/components/common/RevealOnScroll";
import OnlineHeroSection from "@/app/khoa-hoc-online/components/online-hero/OnlineHeroSection";
import OnlineCourseListingSection from "@/app/khoa-hoc-online/components/course-listing/OnlineCourseListingSection";

export default function KhoaHocOnlinePage() {
    return (
        <div className="space-y-14 pb-16">
            <RevealOnScroll className="w-full">
                <OnlineHeroSection />
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <OnlineCourseListingSection />
            </RevealOnScroll>
        </div>
    );
}
