import RevealOnScroll from "@/components/common/RevealOnScroll";
import ExamTypeSelectorSection from "@/app/thu-vien/components/exam-type-selector/ExamTypeSelectorSection";

export default function ThuVienPage() {
    return (
        <div className="space-y-14 pb-16">
            {/* <RevealOnScroll className="w-full"> */}
                <ExamTypeSelectorSection />
            {/* </RevealOnScroll> */}
        </div>
    );
}
