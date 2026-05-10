import RevealOnScroll from "@/components/common/RevealOnScroll";
import ExamTypeSelectorSection from "@/app/thu-vien/components/exam-type-selector/ExamTypeSelectorSection";

export default function ThuVienDeThiPage() {
    return (
        <div className="space-y-14 pb-16">
            <RevealOnScroll className="w-full">
                <ExamTypeSelectorSection />
            </RevealOnScroll>
            <RevealOnScroll className="w-full">
                <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
                    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-slate-700">
                        <h2 className="text-xl font-bold text-slate-900">Ngân hàng đề thi Toán BeeEdu</h2>
                        <p>
                            BeeEdu, còn được nhiều học sinh biết đến với tên Toán thầy Bee và toanthaybee, cung cấp ngân hàng
                            đề thi Toán phù hợp cho việc ôn tập và luyện thi THPT Quốc gia. Các bộ đề được biên soạn theo
                            chuyên đề, mức độ và cấu trúc để giúp học sinh làm quen dạng bài quan trọng.
                        </p>
                        <p>
                            Học sinh có thể chọn đề thi thử, đề luyện tập theo chủ đề hoặc đề tổng hợp, kèm lời giải và hướng
                            dẫn để tự kiểm tra tiến bộ. BeeEdu đồng hành cùng học sinh qua mô hình học online kết hợp lớp học
                            offline tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội, dưới sự hướng dẫn chuyên môn của thầy Ong Khắc Ngọc.
                        </p>
                        <p>
                            Bắt đầu từ ngân hàng đề thi này để rèn kỹ năng phân tích đề, cân chỉnh thời gian làm bài và tăng sự
                            tự tin trước các kỳ thi quan trọng.
                        </p>
                    </div>
                </section>
            </RevealOnScroll>
        </div>
    );
}