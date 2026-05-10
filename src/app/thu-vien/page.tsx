import RevealOnScroll from "@/components/common/RevealOnScroll";
import LibraryCategorySection from "@/app/thu-vien/components/library-category/LibraryCategorySection";

export default function ThuVienPage() {
    return (
        <div className="space-y-14 pb-16">
            <RevealOnScroll className="w-full">
                <LibraryCategorySection />
            </RevealOnScroll>
            <RevealOnScroll className="w-full">
                <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
                    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-slate-700">
                        <h2 className="text-xl font-bold text-slate-900">Thư viện Toán BeeEdu</h2>
                        <p>
                            BeeEdu, còn được nhiều học sinh biết đến với tên Toán thầy Bee và toanthaybee, xây dựng thư viện
                            học tập để cung cấp tài liệu, đề thi và câu hỏi chọn lọc phục vụ ôn luyện Toán. Nội dung được cập
                            nhật thường xuyên để hỗ trợ học sinh từ luyện tập cơ bản đến chuyên sâu.
                        </p>
                        <p>
                            Thư viện tổng hợp nhiều danh mục như đề thi, ngân hàng câu hỏi, tài liệu ôn tập theo chuyên đề và
                            các chương trình luyện đề. BeeEdu đồng hành cùng học sinh qua mô hình học online kết hợp lớp học
                            offline tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội, dưới sự hướng dẫn chuyên môn của thầy Ong Khắc Ngọc.
                        </p>
                        <p>
                            Hãy chọn danh mục phù hợp để bắt đầu lộ trình ôn tập rõ ràng, rèn kỹ năng làm bài và cải thiện kết
                            quả học tập theo từng giai đoạn.
                        </p>
                    </div>
                </section>
            </RevealOnScroll>
        </div>
    );
}