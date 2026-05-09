"use client";

import Image from "next/image";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

const FALLBACK_OVERVIEW_IMAGE = "/images/gioi_thieu/poster.png";

const VALUE_ITEMS = [
    {
        title: "Lộ trình học có chiến lược",
        description:
            "Mỗi học sinh được định vị năng lực đầu vào, nhận kế hoạch học theo giai đoạn và được điều chỉnh liên tục theo tiến độ thực tế.",
    },
    {
        title: "Tăng tốc đúng trọng tâm",
        description:
            "Bài giảng, bài tập và bộ đề được chọn theo mục tiêu điểm số, giúp rút ngắn thời gian ôn tập nhưng vẫn giữ nền tảng chắc chắn.",
    },
    {
        title: "Đồng hành sát cùng phụ huynh",
        description:
            "BeeEdu cập nhật kết quả học tập định kỳ, minh bạch tiến bộ từng giai đoạn để phụ huynh yên tâm theo dõi hành trình học của con.",
    },
    {
        title: "Tập trung vào kết quả thật",
        description:
            "Mục tiêu của đội ngũ là giúp học sinh hiểu bản chất, làm bài vững vàng và tự tin bước vào các kỳ thi quan trọng.",
    },
] as const;

export default function AboutOverviewSection() {
    const { items, loading, error } = useSeoMediaSlot(PAGE_SEO_MEDIA_SLOTS.about.gallery, {
        page: 2,
        limit: 1,
    });

    const imageItem = items[0];
    const hasApiImage = Boolean(imageItem?.publicUrl) && !error;

    return (
        <section className="col-span-full">
            <div className="layout-grid">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <div className="bg-white">
                        <div className="layout-grid items-center">
                            <div className="relative col-span-4 overflow-hidden rounded-[1.6rem] bg-slate-100 md:col-span-8 xl:col-span-5">
                                {loading ? (
                                    <div className="aspect-[4/3] w-full animate-pulse bg-slate-200" />
                                ) : hasApiImage ? (
                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.6rem]">
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
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image
                                            src={FALLBACK_OVERVIEW_IMAGE}
                                            alt="Hoạt động học tập tại BeeEdu"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="hidden xl:block xl:col-span-1" />

                            <div className="col-span-4 mt-8 md:col-span-8 xl:col-span-6 xl:mt-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0D41A9]">
                                    Về BeeEdu
                                </p>
                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                                    Xây lộ trình học thông minh để bứt phá điểm số môn Toán
                                </h2>
                                <p className="mt-5 max-w-[48rem] text-sm leading-7 text-slate-600 md:text-base">
                                    BeeEdu kết hợp phương pháp học có hệ thống, luyện đề chuyên sâu và theo dõi tiến độ liên tục
                                    để mỗi học sinh tiến bộ rõ ràng. Từ nền tảng cơ bản đến mục tiêu thi THPT Quốc gia môn Toán,
                                    đội ngũ luôn đồng hành sát để việc học hiệu quả và bền vững.
                                </p>

                                <div className="mt-8 grid grid-cols-6 gap-4 border-t border-slate-200 pt-6">
                                    <div className="col-span-6 md:col-span-2 md:pr-4">
                                        <p className="text-4xl font-extrabold leading-none text-slate-900">
                                            450 <span className="text-[#FDD22C]">+</span>
                                        </p>
                                        <p className="mt-3 text-sm text-slate-700">Học sinh theo lộ trình cá nhân hóa</p>
                                    </div>
                                    <div className="col-span-6 border-slate-200 md:col-span-2 md:border-l md:border-r md:px-4">
                                        <p className="text-4xl font-extrabold leading-none text-slate-900">
                                            98 <span className="text-[#0D41A9]">%</span>
                                        </p>
                                        <p className="mt-3 text-sm text-slate-700">Phụ huynh hài lòng về tiến bộ học tập</p>
                                    </div>
                                    <div className="col-span-6 md:col-span-2 md:pl-4">
                                        <p className="text-4xl font-extrabold leading-none text-slate-900">
                                            250 <span className="text-[#FDD22C]">+</span>
                                        </p>
                                        <p className="mt-3 text-sm text-slate-700">Bộ đề và chuyên đề luyện tập chọn lọc</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="layout-grid mt-8 gap-y-4">
                            {VALUE_ITEMS.map((item) => (
                                <article
                                    key={item.title}
                                    className="col-span-4 rounded-2xl border-b-4 border-[#0D41A9]/35 bg-[#0D41A9]/6 p-5 md:col-span-4 xl:col-span-3"
                                >
                                    <div className="mb-3 flex justify-end">
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FDD22C] text-[10px] font-bold text-[#0D41A9]">
                                            B
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold leading-tight text-slate-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-xs leading-6 text-slate-600">{item.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
