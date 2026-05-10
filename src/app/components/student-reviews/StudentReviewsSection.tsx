"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS, type SeoMediaItem } from "@/lib/api";

const PAGE_STYLES = [
    "rotate-0 translate-x-0 translate-y-0",
    "-rotate-3 -translate-x-2 translate-y-2",
    "rotate-3 translate-x-2 -translate-y-1",
] as const;

const HOME_STUDENT_REVIEW_MEDIA_SIZE = { width: 1040, height: 720 };

function getPageZIndex(pageIndex: number, activePageIndex: number) {
    const distance = (pageIndex - activePageIndex + 3) % 3;

    if (distance === 0) {
        return "z-30";
    }

    if (distance === 2) {
        return "z-20";
    }

    return "z-10";
}

function ReviewMediaCard({
    item,
    isActive,
}: {
    item?: SeoMediaItem;
    isActive: boolean;
}) {
    return (
        <div
            className={`h-full overflow-hidden rounded-2xl bg-zinc-100 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-25"
            }`}
        >
            {item ? (
                <MediaRenderer
                    item={item}
                    className="h-full w-full object-contain"
                    imageLoading="lazy"
                    videoAutoPlay={isActive}
                    videoControls={false}
                    videoLoop
                    fallbackWidth={HOME_STUDENT_REVIEW_MEDIA_SIZE.width}
                    fallbackHeight={HOME_STUDENT_REVIEW_MEDIA_SIZE.height}
                />
            ) : (
                <div className="h-full w-full bg-white" />
            )}
        </div>
    );
}

export default function StudentReviewsSection() {
    const { items, loading } = useSeoMediaSlot(PAGE_SEO_MEDIA_SLOTS.home.studentReviews, {
        page: 1,
        limit: 10,
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const hasMultipleReviews = items.length > 1;
    const activePageIndex = activeIndex % 3;

    useEffect(() => {
        if (!hasMultipleReviews) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [hasMultipleReviews, items.length]);

    const goToPrevious = () => {
        setActiveIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length);
    };

    const goToNext = () => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    };

    return (
        <section className="col-span-full mt-16 w-full">
            <div className="layout-grid items-center gap-y-10">
                <div className="col-span-4 md:col-span-8 xl:col-span-5">
                    <div className="inline-flex w-full flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-blue-800">ĐÁNH GIÁ TỪ HỌC SINH</h2>

                        <div className="relative -rotate-2 rounded-[28px] bg-cyan-300 px-5 py-2.5">
                            <Image
                                src="/icon/canhOng.png"
                                alt=""
                                width={24}
                                height={24}
                                className="absolute -right-0 -top-3 h-6 w-6 rotate-2"
                            />
                            <span className="inline-flex items-center text-xl font-bold text-blue-800">
                                BEEEDU
                            </span>
                        </div>
                    </div>

                    <h2 className="mt-7 text-3xl font-bold leading-tight text-zinc-950 md:text-4xl xl:text-5xl">
                        Học sinh nói gì về Toán thầy Bee?
                    </h2>

                    <div className="mt-7 border-y border-dashed border-zinc-200 py-6 md:flex md:items-center md:gap-8">
                        <div className="flex items-center gap-2 text-2xl font-bold text-zinc-950">
                            4.9
                            <Star className="h-6 w-6 fill-[#FDD22C] text-[#FDD22C]" aria-hidden="true" />
                        </div>
                        <p className="mt-2 max-w-[22rem] text-sm leading-6 text-zinc-600 md:mt-0">
                            Những phản hồi thật giúp phụ huynh hiểu rõ hơn cách BeeEdu đồng hành cùng học sinh trong
                            quá trình luyện đề, theo dõi tiến độ và ôn thi.
                        </p>
                    </div>
                </div>

                <div className="col-span-4 md:col-span-8 xl:col-span-7">
                    <div className="relative mx-auto h-[360px] max-w-[520px] md:h-[430px]">
                        {loading ? (
                            <div className="absolute inset-0 rounded-[32px] border border-[#194DB6]/15 bg-white p-4 shadow-xl shadow-[#194DB6]/10">
                                <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100" />
                            </div>
                        ) : items.length > 0 ? (
                            [0, 1, 2].map((pageIndex) => {
                                const isActive = pageIndex === activePageIndex;
                                const pageItem = isActive ? items[activeIndex] : items[pageIndex];

                                return (
                                    <div
                                        key={pageIndex}
                                        className={`absolute inset-0 rounded-[32px] border border-[#194DB6]/15 bg-white p-4 shadow-xl shadow-[#194DB6]/10 transition-all duration-500 ease-out ${PAGE_STYLES[pageIndex]} ${getPageZIndex(
                                            pageIndex,
                                            activePageIndex,
                                        )}`}
                                    >
                                        <ReviewMediaCard item={pageItem} isActive={isActive} />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="absolute inset-0 rounded-[32px] border border-[#194DB6]/15 bg-white p-4 shadow-xl shadow-[#194DB6]/10">
                                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-zinc-100 p-8 text-center text-sm font-semibold text-zinc-500">
                                    Chưa có ảnh đánh giá học sinh.
                                </div>
                            </div>
                        )}
                    </div>

                    {hasMultipleReviews ? (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button
                                type="button"
                                aria-label="Đánh giá trước"
                                onClick={goToPrevious}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-[#194DB6] hover:text-[#194DB6]"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>

                            <div className="flex items-center gap-2">
                                {items.map((item, index) => (
                                    <button
                                        key={item.itemId}
                                        type="button"
                                        aria-label={`Xem đánh giá ${index + 1}`}
                                        onClick={() => setActiveIndex(index)}
                                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                                            index === activeIndex ? "bg-[#194DB6]" : "bg-zinc-300"
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                aria-label="Đánh giá tiếp theo"
                                onClick={goToNext}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-[#194DB6] hover:text-[#194DB6]"
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

