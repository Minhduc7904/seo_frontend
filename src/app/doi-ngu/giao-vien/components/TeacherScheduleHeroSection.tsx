"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type TeacherScheduleHeroSectionProps = {
    teacherName: string;
    headline?: string | null;
    scheduleImageUrls?: string[] | null;
    fallbackImageUrl?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
    bookingUrl?: string | null;
};

const SCHEDULE_IMAGE_SIZE = { width: 2048, height: 1448 };
const SCHEDULE_HERO_STYLE = {
    height: "clamp(320px, 70.7vw, 760px)",
};

function getTextValue(value: unknown) {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeImageSrc(value: unknown) {
    const src = getTextValue(value);

    if (!src) {
        return undefined;
    }

    if (/^https?:\/\//i.test(src) || src.startsWith("/")) {
        return src;
    }

    return `/${src.replace(/^\/+/, "")}`;
}

function normalizeImageUrls(values?: string[] | null) {
    if (!Array.isArray(values)) {
        return [];
    }

    return values.map(normalizeImageSrc).filter((item): item is string => Boolean(item));
}

function getExternalHref(value?: string) {
    if (!value) {
        return undefined;
    }

    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    return `https://${value}`;
}

function ScheduleFallback({
    teacherName,
    headline,
    imageUrl,
    ctaLabel,
    ctaHref,
}: {
    teacherName: string;
    headline?: string | null;
    imageUrl?: string;
    ctaLabel: string;
    ctaHref?: string;
}) {
    return (
        <div className="relative flex h-full w-full items-center justify-center bg-[#E6EFF2] px-4 text-center">
            <Image
                src="/images/tai_lieu_hoc/book1.png"
                alt=""
                width={220}
                height={220}
                className="absolute bottom-0 left-0 h-auto w-24 object-contain md:w-36 lg:w-52"
                priority
            />
            {imageUrl ? (
                <div className="absolute bottom-0 right-5 hidden h-[86%] w-[240px] overflow-hidden rounded-t-[2rem] border-4 border-white bg-white shadow-xl shadow-blue-900/10 md:block lg:right-20">
                    <Image
                        src={imageUrl}
                        alt={`Ảnh giáo viên ${teacherName}`}
                        width={420}
                        height={520}
                        className="h-full w-full object-cover"
                        priority
                        unoptimized
                    />
                </div>
            ) : null}
            <div className="relative z-10 mx-auto max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Lịch học giáo viên</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight text-blue-900 md:text-5xl">
                    {teacherName}
                </h1>
                {headline ? <p className="mt-4 text-base font-semibold text-slate-700 md:text-lg">{headline}</p> : null}
                <p className="mt-4 text-sm leading-6 text-slate-600 md:text-base">
                    Lịch học đang được cập nhật. Vui lòng xem thông tin liên hệ bên dưới để được tư vấn lớp phù hợp.
                </p>
                {ctaHref ? (
                    <a
                        href={ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900"
                    >
                        {ctaLabel}
                    </a>
                ) : null}
            </div>
            <Image
                src="/images/tai_lieu_hoc/book2.png"
                alt=""
                width={220}
                height={220}
                className="absolute right-0 bottom-0 h-auto w-24 object-contain md:w-36 lg:w-52"
                priority
            />
        </div>
    );
}

export default function TeacherScheduleHeroSection({
    teacherName,
    headline,
    scheduleImageUrls,
    fallbackImageUrl,
    ctaLabel,
    ctaUrl,
    bookingUrl,
}: TeacherScheduleHeroSectionProps) {
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalIndex, setModalIndex] = useState<number | null>(null);

    const scheduleImages = useMemo(() => normalizeImageUrls(scheduleImageUrls), [scheduleImageUrls]);
    const fallbackImage = normalizeImageSrc(fallbackImageUrl);
    const resolvedCtaLabel = getTextValue(ctaLabel) ?? "Đăng ký học thử";
    const ctaHref = getExternalHref(getTextValue(ctaUrl) ?? getTextValue(bookingUrl));
    const heroImages = scheduleImages.length > 0 ? scheduleImages : [];
    const activeModalImage = modalIndex === null ? null : heroImages[modalIndex];
    const hasMultipleImages = heroImages.length > 1;
    const displayActiveIndex = heroImages.length > 0 ? Math.min(activeIndex, heroImages.length - 1) : 0;

    useEffect(() => {
        if (modalIndex === null) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setModalIndex(null);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalIndex]);

    const openModal = (index: number) => {
        setModalIndex(index);
    };

    const showPreviousModalImage = () => {
        setModalIndex((currentIndex) => {
            if (currentIndex === null) {
                return currentIndex;
            }

            return (currentIndex - 1 + heroImages.length) % heroImages.length;
        });
    };

    const showNextModalImage = () => {
        setModalIndex((currentIndex) => {
            if (currentIndex === null) {
                return currentIndex;
            }

            return (currentIndex + 1) % heroImages.length;
        });
    };

    return (
        <>
            <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
                <div className="relative w-full bg-slate-950" style={SCHEDULE_HERO_STYLE}>
                    {heroImages.length === 0 ? (
                        <ScheduleFallback
                            teacherName={teacherName}
                            headline={headline}
                            imageUrl={fallbackImage}
                            ctaLabel={resolvedCtaLabel}
                            ctaHref={ctaHref}
                        />
                    ) : (
                        <>
                            <Swiper
                                modules={[Autoplay]}
                                slidesPerView={1}
                                loop={hasMultipleImages}
                                speed={700}
                                grabCursor
                                autoplay={
                                    hasMultipleImages
                                        ? {
                                              delay: 4800,
                                              disableOnInteraction: false,
                                              pauseOnMouseEnter: true,
                                          }
                                        : false
                                }
                                onSwiper={setSwiper}
                                onRealIndexChange={(instance) => setActiveIndex(instance.realIndex)}
                                className="h-full w-full"
                            >
                                {heroImages.map((imageUrl, index) => (
                                    <SwiperSlide key={`${imageUrl}-${index}`} className="h-full">
                                        <button
                                            type="button"
                                            onClick={() => openModal(index)}
                                            className="relative h-full w-full overflow-hidden bg-[#E6EFF2]"
                                            aria-label={`Xem ảnh lịch học ${index + 1} của ${teacherName}`}
                                        >
                                            <Image
                                                src={imageUrl}
                                                alt={`Lịch học ${index + 1} của ${teacherName}`}
                                                fill
                                                sizes="100vw"
                                                className="object-contain"
                                                priority={index === 0}
                                                unoptimized
                                            />
                                        </button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/32 via-transparent to-black/24" />
                            <div className="pointer-events-none absolute left-4 top-4 z-20 max-w-[min(34rem,calc(100vw-2rem))] text-white md:left-8 md:top-8">
                                <div className="inline-flex rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-blue-800 shadow-sm">
                                    Lịch học
                                </div>
                                <h1 className="mt-3 text-2xl font-extrabold leading-tight drop-shadow md:text-4xl">
                                    {teacherName}
                                </h1>
                                {headline ? (
                                    <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-white/90 drop-shadow md:text-base">
                                        {headline}
                                    </p>
                                ) : null}
                                <div className="pointer-events-auto mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => openModal(displayActiveIndex)}
                                        className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold text-blue-900 shadow-sm transition hover:bg-white"
                                    >
                                        <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                                        Nhấn để xem rõ lịch học
                                    </button>
                                    {ctaHref ? (
                                        <a
                                            href={ctaHref}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center rounded-full bg-[#FDD22C] px-4 py-2 text-xs font-extrabold text-blue-950 shadow-lg shadow-black/10 transition hover:bg-yellow-300"
                                        >
                                            {resolvedCtaLabel}
                                        </a>
                                    ) : null}
                                </div>
                            </div>

                            {hasMultipleImages ? (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Ảnh lịch học trước"
                                        onClick={() => swiper?.slidePrev()}
                                        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 md:left-8"
                                    >
                                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Ảnh lịch học tiếp theo"
                                        onClick={() => swiper?.slideNext()}
                                        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 md:right-8"
                                    >
                                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                                        {heroImages.map((imageUrl, index) => (
                                            <button
                                                key={`schedule-hero-dot-${imageUrl}-${index}`}
                                                type="button"
                                                aria-label={`Đến ảnh lịch học ${index + 1}`}
                                                onClick={() => swiper?.slideToLoop(index)}
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    index === displayActiveIndex
                                                        ? "w-11 bg-[#FDD22C]"
                                                        : "w-5 bg-white/70 hover:bg-white"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </>
                    )}
                </div>
            </section>

            {activeModalImage ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 backdrop-blur-sm">
                    <button
                        type="button"
                        aria-label="Đóng ảnh lịch học"
                        onClick={() => setModalIndex(null)}
                        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        aria-label="Đóng ảnh lịch học"
                        onClick={() => setModalIndex(null)}
                        className="absolute inset-0"
                    />
                    <div className="relative z-10 flex max-h-[88vh] w-full max-w-6xl items-center justify-center">
                        <Image
                            src={activeModalImage}
                            alt={`Lịch học phóng to của ${teacherName}`}
                            width={SCHEDULE_IMAGE_SIZE.width}
                            height={SCHEDULE_IMAGE_SIZE.height}
                            className="max-h-[88vh] w-auto max-w-full rounded-2xl bg-white object-contain shadow-2xl"
                            unoptimized
                        />
                    </div>
                    {hasMultipleImages ? (
                        <>
                            <button
                                type="button"
                                aria-label="Ảnh lịch học trước"
                                onClick={showPreviousModalImage}
                                className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100 md:left-8"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Ảnh lịch học tiếp theo"
                                onClick={showNextModalImage}
                                className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100 md:right-8"
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}
