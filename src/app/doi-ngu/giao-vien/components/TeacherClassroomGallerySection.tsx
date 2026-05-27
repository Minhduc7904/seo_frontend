"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type TeacherClassroomGallerySectionProps = {
    teacherName: string;
    imageUrls?: string[] | null;
};

type GalleryCardProps = {
    imageUrl: string;
    index: number;
    teacherName: string;
    isFeatured?: boolean;
    hiddenImageCount?: number;
    onOpen: (index: number) => void;
};

const CLASSROOM_IMAGE_SIZE = { width: 1600, height: 1100 };
const PREVIEW_IMAGE_LIMIT = 5;

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

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

function getPreviewCardClassName(index: number) {
    if (index === 0) {
        return "aspect-[16/11] md:aspect-[16/10] xl:aspect-[14/11]";
    }

    return "aspect-[4/3]";
}

function GalleryCard({
    imageUrl,
    index,
    teacherName,
    isFeatured = false,
    hiddenImageCount = 0,
    onOpen,
}: GalleryCardProps) {
    return (
        <button
            type="button"
            onClick={() => onOpen(index)}
            className={[
                "classroom-gallery-card group relative block w-full overflow-hidden bg-white p-2 text-left",
                "rounded-[1.6rem] shadow-[0_18px_42px_rgba(25,77,182,0.12)] ring-1 ring-blue-100/70",
                "transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(25,77,182,0.18)]",
                isFeatured ? "xl:row-span-2" : "",
            ].join(" ")}
            aria-label={`Xem ảnh lớp học ${index + 1} của ${teacherName}`}
        >
            <span className={`relative block overflow-hidden rounded-[1.2rem] bg-slate-100 ${getPreviewCardClassName(index)}`}>
                <Image
                    src={imageUrl}
                    alt={`Hình ảnh lớp học ${index + 1} của ${teacherName}`}
                    fill
                    sizes={isFeatured ? "(min-width: 1280px) 560px, 100vw" : "(min-width: 1280px) 280px, 50vw"}
                    className="classroom-gallery-image object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06]"
                    loading={index === 0 ? "eager" : "lazy"}
                    unoptimized
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/62 via-blue-950/6 to-white/0 opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <span className="pointer-events-none absolute left-4 top-4 inline-flex rounded-full bg-white/92 px-3 py-1 text-xs font-extrabold text-blue-900 shadow-sm">
                    Ảnh {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-white drop-shadow md:text-base">
                        Không gian lớp học thực tế
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/92 text-blue-900 shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <Expand className="h-4 w-4" aria-hidden="true" />
                    </span>
                </span>
                {hiddenImageCount > 0 ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-blue-950/66 text-2xl font-extrabold text-white backdrop-blur-[2px]">
                        +{hiddenImageCount} ảnh
                    </span>
                ) : null}
            </span>
        </button>
    );
}

export default function TeacherClassroomGallerySection({
    teacherName,
    imageUrls,
}: TeacherClassroomGallerySectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [modalIndex, setModalIndex] = useState<number | null>(null);
    const classroomImages = useMemo(() => normalizeImageUrls(imageUrls), [imageUrls]);
    const previewImages = classroomImages.slice(0, PREVIEW_IMAGE_LIMIT);
    const activeModalImage = modalIndex === null ? null : classroomImages[modalIndex];
    const hasMultipleImages = classroomImages.length > 1;

    useGSAP(
        () => {
            const section = sectionRef.current;

            if (!section || classroomImages.length === 0) {
                return;
            }

            const heading = section.querySelector<HTMLElement>(".classroom-gallery-heading");
            const grid = section.querySelector<HTMLElement>(".classroom-gallery-grid");
            const cards = Array.from(section.querySelectorAll<HTMLElement>(".classroom-gallery-card"));
            const mediaQuery = gsap.matchMedia();

            mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
                if (heading) {
                    gsap.fromTo(
                        heading,
                        { autoAlpha: 0, y: 26 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.75,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: heading,
                                start: "top 82%",
                                once: true,
                            },
                        },
                    );
                }

                if (grid && cards.length > 0) {
                    gsap.fromTo(
                        cards,
                        {
                            autoAlpha: 0,
                            y: 52,
                            scale: 0.94,
                            rotation: (index) => (index % 2 === 0 ? -2.5 : 2.5),
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            scale: 1,
                            rotation: 0,
                            duration: 0.9,
                            stagger: { amount: 0.34, from: "start" },
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: grid,
                                start: "top 78%",
                                once: true,
                            },
                        },
                    );
                }

                cards.forEach((card, index) => {
                    const image = card.querySelector<HTMLElement>(".classroom-gallery-image");

                    if (!image) {
                        return;
                    }

                    gsap.fromTo(
                        image,
                        { yPercent: index % 2 === 0 ? -4 : 4, scale: 1.08 },
                        {
                            yPercent: index % 2 === 0 ? 4 : -4,
                            scale: 1.08,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 0.8,
                            },
                        },
                    );
                });
            });

            return () => mediaQuery.revert();
        },
        { scope: sectionRef, dependencies: [classroomImages.length] },
    );

    useEffect(() => {
        if (modalIndex === null) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setModalIndex(null);
                return;
            }

            if (!hasMultipleImages) {
                return;
            }

            if (event.key === "ArrowLeft") {
                setModalIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex - 1 + classroomImages.length) % classroomImages.length,
                );
            }

            if (event.key === "ArrowRight") {
                setModalIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex + 1) % classroomImages.length,
                );
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [classroomImages.length, hasMultipleImages, modalIndex]);

    if (classroomImages.length === 0) {
        return null;
    }

    const showPreviousModalImage = () => {
        setModalIndex((currentIndex) =>
            currentIndex === null ? currentIndex : (currentIndex - 1 + classroomImages.length) % classroomImages.length,
        );
    };

    const showNextModalImage = () => {
        setModalIndex((currentIndex) =>
            currentIndex === null ? currentIndex : (currentIndex + 1) % classroomImages.length,
        );
    };

    return (
        <>
            <section
                ref={sectionRef}
                className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#F7FBFF] py-12 md:py-16"
            >
                <div className="layout-shell">
                    <div className="layout-grid gap-y-8">
                        <div className="classroom-gallery-heading col-span-4 flex flex-col items-center gap-4 text-center md:col-span-8 xl:col-span-12">
                            <div className="inline-flex flex-wrap items-center justify-center gap-3">
                                <h2 className="text-3xl font-extrabold text-blue-900 md:text-4xl">
                                    HÌNH ẢNH LỚP HỌC
                                </h2>
                                <span className="relative -rotate-2 rounded-[28px] bg-cyan-300 px-6 py-3 text-2xl font-extrabold text-blue-900 shadow-sm md:text-3xl">
                                    CÙNG {teacherName}
                                </span>
                            </div>
                            <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
                                Một vài khoảnh khắc trong lớp học để phụ huynh và học sinh nhìn rõ không gian học tập,
                                cách thầy cô đồng hành và nhịp luyện tập ở từng buổi.
                            </p>
                        </div>

                        <div className="classroom-gallery-grid col-span-4 grid gap-4 md:col-span-8 md:grid-cols-2 xl:col-span-12 xl:grid-cols-[1.15fr_0.85fr] xl:gap-5">
                            <div className="min-w-0">
                                <GalleryCard
                                    imageUrl={previewImages[0]}
                                    index={0}
                                    teacherName={teacherName}
                                    isFeatured
                                    onOpen={setModalIndex}
                                />
                            </div>

                            {previewImages.length > 1 ? (
                                <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:gap-5">
                                    {previewImages.slice(1).map((imageUrl, previewIndex) => {
                                        const imageIndex = previewIndex + 1;
                                        const isLastPreview = imageIndex === previewImages.length - 1;
                                        const hiddenImageCount =
                                            isLastPreview && classroomImages.length > PREVIEW_IMAGE_LIMIT
                                                ? classroomImages.length - PREVIEW_IMAGE_LIMIT
                                                : 0;

                                        return (
                                            <GalleryCard
                                                key={`${imageUrl}-${imageIndex}`}
                                                imageUrl={imageUrl}
                                                index={imageIndex}
                                                teacherName={teacherName}
                                                hiddenImageCount={hiddenImageCount}
                                                onOpen={setModalIndex}
                                            />
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>

            {activeModalImage ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/88 p-4 backdrop-blur-sm">
                    <button
                        type="button"
                        aria-label="Đóng ảnh lớp học"
                        onClick={() => setModalIndex(null)}
                        className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        aria-label="Đóng ảnh lớp học"
                        onClick={() => setModalIndex(null)}
                        className="absolute inset-0"
                    />

                    <div className="relative z-10 flex max-h-[88vh] w-full max-w-6xl flex-col items-center">
                        <div className="relative flex max-h-[78vh] w-full items-center justify-center">
                            <Image
                                src={activeModalImage}
                                alt={`Hình ảnh lớp học phóng to của ${teacherName}`}
                                width={CLASSROOM_IMAGE_SIZE.width}
                                height={CLASSROOM_IMAGE_SIZE.height}
                                className="max-h-[78vh] w-auto max-w-full rounded-2xl bg-white object-contain shadow-2xl"
                                unoptimized
                            />
                        </div>
                        <div className="mt-4 rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-white">
                            {(modalIndex ?? 0) + 1} / {classroomImages.length}
                        </div>
                    </div>

                    {hasMultipleImages ? (
                        <>
                            <button
                                type="button"
                                aria-label="Ảnh lớp học trước"
                                onClick={showPreviousModalImage}
                                className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100 md:left-8"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Ảnh lớp học tiếp theo"
                                onClick={showNextModalImage}
                                className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100 md:right-8"
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
