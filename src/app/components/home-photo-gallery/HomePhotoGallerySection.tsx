"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS, type SeoMediaItem } from "@/lib/api";

const COLUMN_LAYOUT: Array<
    Array<{
        aspectRatio: string;
    }>
> = [
        [{ aspectRatio: "380 / 320" }, { aspectRatio: "380 / 448" }],
        [{ aspectRatio: "380 / 384" }, { aspectRatio: "380 / 384" }],
        [{ aspectRatio: "380 / 432" }, { aspectRatio: "380 / 336" }],
    ];

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1280;

function useVisibleColumns() {
    const [visibleColumns, setVisibleColumns] = useState(1);

    useEffect(() => {
        const updateVisibleColumns = () => {
            const width = window.innerWidth;

            if (width >= DESKTOP_BREAKPOINT) {
                setVisibleColumns(3);
                return;
            }

            if (width >= MOBILE_BREAKPOINT) {
                setVisibleColumns(2);
                return;
            }

            setVisibleColumns(1);
        };

        updateVisibleColumns();
        window.addEventListener("resize", updateVisibleColumns);
        return () => window.removeEventListener("resize", updateVisibleColumns);
    }, []);

    return visibleColumns;
}

function GalleryMediaCard({
    item,
    aspectRatio,
}: {
    item: SeoMediaItem;
    aspectRatio: string;
}) {
    return (
        <div
            className="group/card relative w-full overflow-hidden rounded-3xl bg-zinc-100 shadow-sm shadow-black/10"
            style={{ aspectRatio }}
        >
            <MediaRenderer
                item={item}
                className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
            />
        </div>
    );
}
export default function HomePhotoGallerySection() {
    const { items, loading } = useSeoMediaSlot(PAGE_SEO_MEDIA_SLOTS.home.gallery, {
        page: 1,
        limit: 6,
    });
    const visibleColumns = useVisibleColumns();
    const [activeIndex, setActiveIndex] = useState(0);
    const galleryItems = items.slice(0, 6);

    const columns = useMemo(
        () => [0, 1, 2].map((columnIndex) => galleryItems.slice(columnIndex * 2, columnIndex * 2 + 2)),
        [galleryItems],
    );
    const maxStartIndex = Math.max(0, columns.length - visibleColumns);
    const shouldSlide = visibleColumns < 3 && columns.length > visibleColumns;
    const displayIndex = Math.min(activeIndex, maxStartIndex);

    useEffect(() => {
        if (!shouldSlide) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex >= maxStartIndex ? 0 : currentIndex + 1));
        }, 5000);

        return () => window.clearInterval(timer);
    }, [maxStartIndex, shouldSlide]);

    const goToPrevious = () => {
        setActiveIndex((currentIndex) => (currentIndex <= 0 ? maxStartIndex : currentIndex - 1));
    };

    const goToNext = () => {
        setActiveIndex((currentIndex) => (currentIndex >= maxStartIndex ? 0 : currentIndex + 1));
    };

    const slideWidth = 100 / visibleColumns;
    const trackTransform = shouldSlide ? `translateX(-${displayIndex * slideWidth}%)` : "translateX(0%)";

    return (
        <section className="col-span-full mt-12 w-full">
            <div className="layout-grid">

                <div className="col-span-4 inline-flex w-full flex-wrap items-center justify-center gap-3 md:col-span-8 xl:col-span-12 mb-3">
                    <h2 className="font-bold text-blue-800 text-3xl">
                        HÌNH ẢNH
                    </h2>

                    <div className="relative -rotate-2 rounded-[36px] bg-cyan-300 px-8 py-4">
                        <Image
                            src="/icon/canhOng.png"
                            alt=""
                            width={32}
                            height={32}
                            className="absolute h-8 w-8 rotate-2 -top-4 -right-0"
                        />

                        <span className="inline-flex items-center font-bold text-blue-800 text-3xl">
                            LỚP HỌC
                        </span>
                    </div>
                </div>

                <div className="col-span-4 inline-flex w-full items-center justify-center p-1 md:col-span-8 xl:col-span-12 mb-5">
                    <p className="text-center text-base font-normal text-zinc-700 md:text-lg xl:text-xl">
                        Những khoảnh khắc tại lớp học Toán thầy Bee ghi lại không gian học tập tại 315 Bạch Mai,
                        nơi học sinh luyện đề, trao đổi cùng trợ giảng và tập trung chuẩn bị cho các kỳ thi quan
                        trọng. Mỗi hình ảnh là một phần của môi trường học nghiêm túc, gần gũi và có người đồng
                        hành trong từng giai đoạn ôn luyện.
                    </p>
                </div>

                <div className="group relative col-span-4 w-full overflow-hidden md:col-span-8 xl:col-span-12">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: trackTransform }}
                    >
                        {[0, 1, 2].map((columnIndex) => (
                            <div
                                key={columnIndex}
                                className="shrink-0 px-0 md:px-2.5 xl:px-2.5"
                                style={{ width: `${slideWidth}%` }}
                            >
                                <div className="grid w-full grid-cols-1 gap-5">
                                    {loading
                                        ? [0, 1].map((placeholderIndex) => (
                                            <div
                                                key={placeholderIndex}
                                                className="w-full animate-pulse rounded-3xl bg-zinc-100"
                                                style={{ aspectRatio: COLUMN_LAYOUT[columnIndex][placeholderIndex].aspectRatio }}
                                            />
                                        ))
                                        : columns[columnIndex].map((item, itemIndex) => (
                                            <GalleryMediaCard
                                                key={item.itemId}
                                                item={item}
                                                aspectRatio={COLUMN_LAYOUT[columnIndex][itemIndex].aspectRatio}
                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {shouldSlide ? (
                        <>
                            <button
                                type="button"
                                aria-label="Cột hình trước"
                                onClick={goToPrevious}
                                className="pointer-events-none absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity duration-200 hover:bg-black/65 group-hover:pointer-events-auto group-hover:opacity-100"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Cột hình tiếp theo"
                                onClick={goToNext}
                                className="pointer-events-none absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity duration-200 hover:bg-black/65 group-hover:pointer-events-auto group-hover:opacity-100"
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
