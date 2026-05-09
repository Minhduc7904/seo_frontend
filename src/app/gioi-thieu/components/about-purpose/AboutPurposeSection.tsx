"use client";

import Image from "next/image";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

const FALLBACK_PURPOSE_IMAGE = "/images/gioi_thieu/poster.png";

const PURPOSE_STEPS = [
    {
        id: "01",
        title: "Cá nhân hóa lộ trình học",
        description:
            "Học sinh được đánh giá năng lực đầu vào để xây lộ trình phù hợp, tránh học dàn trải và tăng hiệu quả theo từng giai đoạn.",
    },
    {
        id: "02",
        title: "Tối ưu quy trình luyện đề",
        description:
            "Mỗi chuyên đề có bộ đề tương ứng, chấm và phản hồi nhanh để học sinh nhận ra lỗi sai trọng tâm và cải thiện ngay.",
    },
    {
        id: "03",
        title: "Tăng cường phối hợp học tập",
        description:
            "Giáo viên, trợ giảng và phụ huynh phối hợp chặt chẽ, giúp duy trì kỷ luật học và theo dõi tiến bộ rõ ràng theo tuần.",
    },
    {
        id: "04",
        title: "Bứt phá mục tiêu thi cử",
        description:
            "Đội ngũ tập trung vào tư duy giải Toán, quản lý thời gian làm bài và chiến lược điểm số cho kỳ thi THPT Quốc gia.",
    },
] as const;

export default function AboutPurposeSection() {
    const { items, loading, error } = useSeoMediaSlot(PAGE_SEO_MEDIA_SLOTS.about.banner, {
        page: 2,
        limit: 1,
    });

    const imageItem = items[0];
    const hasApiImage = Boolean(imageItem?.publicUrl) && !error;

    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 bg-[#F6F8FC] py-12 md:py-16">
            <div className="layout-grid">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <div className="layout-grid">
                        <div className="col-span-4 md:col-span-8 xl:col-span-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0D41A9]">
                                Định hướng BeeEdu
                            </p>
                            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                                Dẫn dắt tầm nhìn học Toán cho tăng trưởng dài hạn
                            </h2>
                            <p className="mt-5 max-w-[40rem] text-sm leading-7 text-slate-600 md:text-base">
                                Từ nền tảng đến nâng cao, BeeEdu tập trung xây hệ thống học tập bền vững để học sinh tiến bộ
                                thật, giữ vững phong độ trong suốt năm học và tự tin ở các kỳ thi quan trọng.
                            </p>

                            <div className="mt-10 space-y-7">
                                {PURPOSE_STEPS.map((step) => (
                                    <article key={step.id} className="flex items-start gap-4">
                                        <div className="mt-1 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0D41A9] text-3xl font-bold leading-none text-white">
                                            {step.id}
                                        </div>
                                        <div>
                                            <h3 className="text-[1.75rem] font-bold leading-tight text-slate-900">{step.title}</h3>
                                            <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-4 mt-10 md:col-span-8 xl:col-span-6 xl:mt-0">
                            <div className="rounded-[1.8rem] bg-white p-8 shadow-sm">
                                <h3 className="text-4xl font-extrabold leading-tight text-slate-900">Tầm nhìn</h3>
                                <p className="mt-4 text-base leading-7 text-slate-600">
                                    BeeEdu hướng đến môi trường học Toán nơi mỗi học sinh có lộ trình rõ, được đo lường tiến bộ
                                    liên tục và bứt phá bằng năng lực thật thay vì học đối phó.
                                </p>
                            </div>

                            <div className="relative mt-6 overflow-hidden rounded-[1.8rem] bg-slate-200">
                                {loading ? (
                                    <div className="aspect-[16/13] w-full animate-pulse bg-slate-300" />
                                ) : hasApiImage ? (
                                    <div className="aspect-[16/13] w-full overflow-hidden rounded-[1.8rem]">
                                        <MediaRenderer
                                            item={imageItem}
                                            className="h-full w-full object-cover"
                                            disableLink
                                            imageLoading="eager"
                                            videoAutoPlay
                                            videoLoop
                                            videoControls={false}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative aspect-[16/13] w-full">
                                        <Image
                                            src={FALLBACK_PURPOSE_IMAGE}
                                            alt="Giáo viên BeeEdu đồng hành cùng học sinh"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="absolute bottom-6 right-6 rounded-2xl border-b-4 border-[#FDD22C] bg-black/45 px-6 py-4 backdrop-blur-sm">
                                    <p className="text-3xl font-bold leading-none text-white">Ong Khắc Ngọc</p>
                                    <p className="mt-2 text-sm text-white/95">Giáo viên chính - Toán thầy Bee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
