import RevealOnScroll from "@/components/common/RevealOnScroll";
import OfflineHeroSection from "@/app/khoa-hoc-offline/components/offline-hero/OfflineHeroSection";
import OfflineTeacherListingSection from "@/app/khoa-hoc-offline/components/offline-teachers/OfflineTeacherListingSection";

export default function KhoaHocOfflinePage() {
    return (
        <div className="space-y-14 pb-16">
            <RevealOnScroll className="w-full">
                <OfflineHeroSection />
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <OfflineTeacherListingSection />
            </RevealOnScroll>
        </div>
    );
}
