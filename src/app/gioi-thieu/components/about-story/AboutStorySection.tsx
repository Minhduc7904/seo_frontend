"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";
import type { SeoMediaItem } from "@/lib/api";

const FALLBACK_STORY_IMAGE = "/images/gioi_thieu/poster.png";

type StoryMilestone = {
    year: string;
    title: string;
    description: string;
};

type StorySlideData = StoryMilestone & {
    id: string;
    media?: SeoMediaItem;
};

const STORY_MILESTONES: StoryMilestone[] = [
    {
        year: "2018",
        title: "Lứa nền tảng đầu tiên",
        description:
            "Khóa học đầu tiên đặt nền móng phương pháp học Toán có hệ thống, tập trung vào tư duy và kỷ luật học tập.",
    },
    {
        year: "2020",
        title: "Mở rộng lứa tăng tốc",
        description:
            "Các lứa học sinh được chia theo mục tiêu điểm số, tăng cường luyện đề theo chuyên đề và theo dõi tiến bộ định kỳ.",
    },
    {
        year: "2023",
        title: "Chuẩn hóa lứa bứt phá",
        description:
            "Mô hình online - offline đồng bộ giúp học sinh duy trì phong độ ổn định và tự tin bước vào kỳ thi THPT Quốc gia.",
    },
    {
        year: "2024",
        title: "Lứa ôn thi chuyên sâu",
        description:
            "Học sinh được rèn chiến lược làm bài theo dạng đề, tối ưu thời gian và tăng độ chính xác ở các câu phân loại.",
    },
    {
        year: "2025",
        title: "Lứa tăng trưởng toàn diện",
        description:
            "Từ nền tảng đến nâng cao, mỗi lứa được đồng hành sát qua bài tập tuần, đề tổng hợp và phản hồi cá nhân hóa.",
    },
] as const;

function isImageMedia(item: SeoMediaItem) {
    return item.mimeType.toLowerCase().startsWith("image/");
}

export default function AboutStorySection() {
    const { items, loading } = useSeoMediaSlot(PAGE_SEO_MEDIA_SLOTS.about.gallery, {
        page: 1,
        limit: 20,
    });
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const imageItems = useMemo(() => items.filter(isImageMedia), [items]);
    const slides = useMemo<StorySlideData[]>(() => {
        if (imageItems.length === 0) {
            return STORY_MILESTONES.slice(0, 3).map((milestone, index) => ({
                ...milestone,
                id: `fallback-${milestone.year}-${index}`,
            }));
        }

        return imageItems.map((media, index) => {
            const milestone = STORY_MILESTONES[index % STORY_MILESTONES.length];
            return {
                ...milestone,
                media,
                id: `${milestone.year}-${media.itemId}`,
            };
        });
    }, [imageItems]);

    const hasMultipleSlides = slides.length > 1;

    return (
        <section className="col-span-full bg-white py-12 md:py-16">
            <div className="layout-grid">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <header className="mx-auto max-w-[54rem] text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0D41A9]">
                            Câu chuyện BeeEdu
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                            Hành trình các lứa khóa cũ của trung tâm qua từng năm
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
                            Mỗi mùa học là một cột mốc đáng nhớ của BeeEdu và Toán thầy Bee. Những hình ảnh dưới đây ghi lại
                            hành trình học tập, luyện đề và trưởng thành của các lứa học sinh qua các năm.
                        </p>
                    </header>

                    <div className="mt-10">
                        {loading ? (
                            <div className="layout-grid gap-y-8">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={`story-skeleton-${index}`}
                                        className="col-span-4 h-[360px] animate-pulse rounded-[1.5rem] bg-slate-100 md:col-span-8 xl:col-span-4"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="relative px-2 md:px-3">
                                <Swiper
                                    modules={[Autoplay]}
                                    centeredSlides
                                    slidesPerView={1.08}
                                    spaceBetween={24}
                                    loop={slides.length > 3}
                                    speed={700}
                                    grabCursor
                                    autoplay={
                                        hasMultipleSlides
                                            ? {
                                                delay: 4200,
                                                disableOnInteraction: false,
                                                pauseOnMouseEnter: true,
                                            }
                                            : false
                                    }
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 1.45,
                                            spaceBetween: 28,
                                        },
                                        1280: {
                                            slidesPerView: 3,
                                            spaceBetween: 28,
                                        },
                                    }}
                                    onSwiper={setSwiper}
                                    onRealIndexChange={(instance) => setActiveIndex(instance.realIndex)}
                                    className="!overflow-visible py-2"
                                >
                                    {slides.map((story) => (
                                        <SwiperSlide key={story.id} className="!h-auto">
                                            <article className="h-full">
                                                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                                                    {story.media ? (
                                                        <div className="aspect-[16/11] w-full overflow-hidden rounded-[1.5rem]">
                                                            <MediaRenderer
                                                                item={story.media}
                                                                className="h-full w-full object-cover"
                                                                disableLink
                                                                imageLoading="lazy"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="relative aspect-[16/11] w-full">
                                                            <Image
                                                                src={FALLBACK_STORY_IMAGE}
                                                                alt={`Cột mốc ${story.year} của BeeEdu`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="absolute left-5 top-5 rounded-2xl border-b-4 border-[#FDD22C] bg-white/88 px-5 py-3 backdrop-blur-sm">
                                                        <p className="text-2xl font-bold leading-none text-[#0D41A9]">{story.year}</p>
                                                    </div>
                                                </div>

                                                <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900">{story.title}</h3>
                                                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">{story.description}</p>
                                            </article>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {hasMultipleSlides ? (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Cột mốc trước"
                                            onClick={() => swiper?.slidePrev()}
                                            className="absolute left-1 top-[38%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 md:left-4"
                                        >
                                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Cột mốc tiếp theo"
                                            onClick={() => swiper?.slideNext()}
                                            className="absolute right-1 top-[38%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 md:right-4"
                                        >
                                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <div className="mt-6 flex items-center justify-center gap-2">
                                            {slides.map((slide, index) => (
                                                <button
                                                    key={`story-progress-${slide.id}`}
                                                    type="button"
                                                    aria-label={`Đến cột mốc ${index + 1}`}
                                                    onClick={() => swiper?.slideToLoop(index)}
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                        index === activeIndex
                                                            ? "w-11 bg-[#0D41A9]"
                                                            : "w-5 bg-blue-200 hover:bg-blue-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
