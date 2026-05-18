import type { Metadata } from "next";
import { Suspense } from "react";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import QuestionSearchSection from "@/app/thu-vien/components/question-search/QuestionSearchSection";

export const metadata: Metadata = {
    title: "Ngân hàng câu hỏi Toán | BeeEdu - Toán thầy Bee",
    description:
        "Ngân hàng câu hỏi Toán BeeEdu tổng hợp câu hỏi ôn luyện, hỗ trợ tìm kiếm câu hỏi theo từ khóa, phù hợp luyện đề và ôn thi THPT Quốc gia.",
    keywords: [
        "ngân hàng câu hỏi",
        "tổng hợp câu hỏi",
        "tìm kiếm câu hỏi",
        "câu hỏi Toán",
        "luyện đề Toán",
        "ôn thi THPT Quốc gia",
        "BeeEdu",
        "Toán thầy Bee",
        "toanthaybee",
        "Ong Khắc Ngọc",
    ],
    alternates: { canonical: "/thu-vien/cau-hoi" },
    openGraph: {
        title: "Ngân hàng câu hỏi Toán | BeeEdu - Toán thầy Bee",
        description:
            "Tổng hợp câu hỏi Toán, hỗ trợ tìm kiếm theo từ khóa, giúp học sinh luyện tập và ôn thi THPT Quốc gia hiệu quả.",
        url: "/thu-vien/cau-hoi",
        type: "website",
        locale: "vi_VN",
        siteName: "BeeEdu",
    },
};

export default function ThuVienCauHoiPage() {
    return (
        <div className="space-y-14 pb-16">
            <RevealOnScroll className="w-full">
                <Suspense fallback={<div className="rounded-[1.6rem] bg-white p-6 md:p-7" />}>
                    <QuestionSearchSection />
                </Suspense>
            </RevealOnScroll>
            <RevealOnScroll className="w-full">
                <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
                    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-slate-700">
                        <h2 className="text-xl font-bold text-slate-900">Ngân hàng câu hỏi Toán BeeEdu</h2>
                        <p>
                            BeeEdu, còn được nhiều học sinh biết đến với tên Toán thầy Bee và toanthaybee, cung cấp ngân hàng
                            câu hỏi Toán phong phú và tổng hợp câu hỏi theo chuyên đề để hỗ trợ luyện tập và ôn thi THPT Quốc
                            gia. Nội dung được cập nhật liên tục, phù hợp nhiều mức độ và giúp học sinh rèn kỹ năng làm bài vững
                            chắc.
                        </p>
                        <p>
                            Học sinh có thể tìm kiếm câu hỏi nhanh theo từ khóa, xem lời giải rõ ràng và tham khảo video hướng
                            dẫn khi cần. BeeEdu đồng hành cùng học sinh qua mô hình học online kết hợp lớp học offline tại 315
                            Bạch Mai, Hai Bà Trưng, Hà Nội, dưới sự hướng dẫn chuyên môn của thầy Ong Khắc Ngọc.
                        </p>
                        <p>
                            Nếu bạn đang cần luyện đề, củng cố kiến thức hoặc tìm dạng bài trọng tâm, hãy bắt đầu từ ngân hàng
                            câu hỏi này để có lộ trình ôn tập hiệu quả và có định hướng rõ ràng.
                        </p>
                    </div>
                </section>
            </RevealOnScroll>
        </div>
    );
}