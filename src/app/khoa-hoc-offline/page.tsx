import RevealOnScroll from "@/components/common/RevealOnScroll";
import OfflineHeroSection from "@/app/khoa-hoc-offline/components/offline-hero/OfflineHeroSection";
import OfflineCourseSelectionSection from "@/app/khoa-hoc-offline/components/course-selection/OfflineCourseSelectionSection";

export default function KhoaHocOfflinePage() {
    return (
        <div className="space-y-14 pb-16">
            <RevealOnScroll className="w-full">
                <OfflineHeroSection />
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <OfflineCourseSelectionSection />
            </RevealOnScroll>
        </div>
    );
}
