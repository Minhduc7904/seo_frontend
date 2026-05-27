"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePublicSeoTeacherProfiles } from "@/hooks/usePublicSeoTeacherProfiles";
import type { PublicSeoTeacherProfileItem } from "@/lib/api";

type TeacherCardData = {
    id: number | string;
    slug?: string;
    role: string;
    name: string;
    years: number;
    profileImageUrl?: string;
};

const HOME_TEACHER_MEDIA_SIZE = { width: 744, height: 860 };

function getTextValue(value: unknown) {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getNumberValue(value: unknown) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsedValue = Number(value);
        return Number.isFinite(parsedValue) ? parsedValue : 0;
    }

    return 0;
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

function getTeacherDetailHref(slug: string) {
    return `/doi-ngu/giao-vien/chi-tiet/${encodeURIComponent(slug)}`;
}

function toTeacherCardData(profile: PublicSeoTeacherProfileItem, index: number): TeacherCardData {
    const slug = getTextValue(profile.slug);

    return {
        id: profile.teacherProfileId ?? profile.slug ?? index,
        slug,
        role:
            getTextValue(profile.headline) ??
            getTextValue(profile.expertise) ??
            getTextValue(profile.teachingSubjects) ??
            "Giáo viên BeeEdu",
        name: getTextValue(profile.displayName) ?? "Giáo viên BeeEdu",
        years: getNumberValue(profile.yearsExperience),
        profileImageUrl: normalizeImageSrc(profile.profileImageUrl),
    };
}

function TeacherSectionHeader() {
    return (
        <>
            <div className="col-span-4 mb-3 inline-flex w-full flex-wrap items-center justify-center gap-3 md:col-span-8 xl:col-span-12">
                <h2 className="text-3xl font-bold text-blue-800">ĐỘI NGŨ GIÁO VIÊN</h2>

                <div className="relative -rotate-2 rounded-[36px] bg-cyan-300 px-8 py-4">
                    <Image
                        src="/icon/canhOng.png"
                        alt=""
                        width={32}
                        height={32}
                        className="absolute -right-0 -top-4 h-8 w-8 rotate-2"
                    />

                    <span className="inline-flex items-center text-3xl font-bold text-blue-800">TRUYỀN CẢM HỨNG</span>
                </div>
            </div>

            <div className="col-span-4 mb-5 inline-flex w-full items-center justify-center p-1 md:col-span-8 xl:col-span-12">
                <p className="max-w-4xl text-center text-base font-normal text-zinc-700 md:text-lg xl:text-xl">
                    Học cùng đội ngũ giáo viên Toán giàu kinh nghiệm, tận tâm theo sát từng mục tiêu của học sinh.
                    Mỗi buổi học là một hành trình truyền cảm hứng, rèn tư duy và xây nền tảng vững chắc cho các kỳ thi quan trọng.
                </p>
            </div>
        </>
    );
}

function ExperienceBadge({ years }: { years: number }) {
    return (
        <div className="absolute right-5 top-0 flex h-16 w-20 flex-col items-center justify-center rounded-b-lg bg-blue-800 px-1 py-2 shadow-[0_8px_18px_rgba(25,77,182,0.16)]">
            <div className="text-lg font-bold leading-none text-amber-400">+{years}</div>
            <div className="mt-1 text-center text-[9px] font-bold uppercase leading-3 text-amber-400">
                năm
                <br />
                kinh nghiệm
            </div>
        </div>
    );
}

function TeacherSlideCard({ teacher, isActive }: { teacher: TeacherCardData; isActive: boolean }) {
    const content = (
        <article
            className={`relative overflow-hidden rounded-[32px] bg-cyan-300 p-3 transition-all duration-700 ease-out ${isActive
                ? "z-20 scale-[1.03] opacity-100 shadow-[0_20px_48px_rgba(25,77,182,0.18)] ring-2 ring-white"
                : "z-10 scale-[0.95] opacity-80 shadow-[0_10px_24px_rgba(25,77,182,0.10)] ring-1 ring-white/70"
                } group-hover:shadow-[0_22px_52px_rgba(25,77,182,0.22)]`}
        >
            <div className="overflow-hidden rounded-[26px] bg-zinc-100" style={{ aspectRatio: "372 / 430" }}>
                {teacher.profileImageUrl ? (
                    <Image
                        src={teacher.profileImageUrl}
                        alt={`Ảnh giáo viên ${teacher.name}`}
                        width={HOME_TEACHER_MEDIA_SIZE.width}
                        height={HOME_TEACHER_MEDIA_SIZE.height}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#FDD22C]/25 p-6 text-center text-sm font-semibold text-blue-900">
                        Chưa có ảnh giáo viên.
                    </div>
                )}
            </div>

            {teacher.years > 0 ? <ExperienceBadge years={teacher.years} /> : null}

            <div className="flex min-h-[104px] flex-col justify-center px-2 py-4 text-center">
                <p className="text-sm font-normal text-blue-800 md:text-base">{teacher.role}</p>
                <h3 className="mt-1 text-lg font-bold uppercase text-blue-800 md:text-2xl">{teacher.name}</h3>
            </div>
        </article>
    );

    if (!teacher.slug) {
        return content;
    }

    return (
        <Link
            href={getTeacherDetailHref(teacher.slug)}
            className="group block h-full"
            aria-label={`Xem hồ sơ ${teacher.name}`}
        >
            {content}
        </Link>
    );
}

function TeacherSlideSkeleton() {
    return (
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-5 overflow-hidden py-8">
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    className={`h-[420px] shrink-0 animate-pulse rounded-[32px] bg-zinc-100 shadow-[0_12px_28px_rgba(25,77,182,0.10)] ${index === 1 ? "w-[360px]" : "w-[290px] opacity-60"
                        }`}
                />
            ))}
        </div>
    );
}

function SliderProgress({
    total,
    activeIndex,
    onSelect,
}: {
    total: number;
    activeIndex: number;
    onSelect: (index: number) => void;
}) {
    return (
        <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={`teacher-progress-${index}`}
                    type="button"
                    aria-label={`Giáo viên ${index + 1}`}
                    onClick={() => onSelect(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-12 bg-blue-800" : "w-5 bg-blue-200 hover:bg-blue-300"
                        }`}
                />
            ))}
        </div>
    );
}

export default function TeacherTeamSection() {
    const {
        profiles,
        loading: profilesLoading,
        error: profilesError,
    } = usePublicSeoTeacherProfiles({
        page: 1,
        limit: 10,
        isFeatured: true,
        sortBy: "sortOrder",
        sortOrder: "asc",
    });
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const teachers = useMemo<TeacherCardData[]>(() => {
        return profiles.map((profile, index) => toTeacherCardData(profile, index));
    }, [profiles]);

    const loading = profilesLoading;
    const displayActiveIndex = teachers.length > 0 ? Math.min(activeIndex, teachers.length - 1) : 0;
    const hasMultipleItems = teachers.length > 1;

    return (
        <section className="col-span-full mt-12 w-full">
            <div className="layout-grid">
                <TeacherSectionHeader />

                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <div className="relative overflow-hidden pt-2 pb-4 px-2">
                        {loading ? (
                            <TeacherSlideSkeleton />
                        ) : teachers.length === 0 ? (
                            <div className="mx-auto flex min-h-[280px] max-w-3xl items-center justify-center rounded-[32px] bg-[#FDD22C]/20 p-8 text-center text-sm font-semibold text-blue-900 md:text-base">
                                {profilesError
                                    ? "Chưa tải được danh sách giáo viên."
                                    : "Chưa có giáo viên nổi bật."}
                            </div>
                        ) : (
                            <Swiper
                                modules={[Autoplay]}
                                centeredSlides
                                slidesPerView={1.12}
                                spaceBetween={28}
                                loop={teachers.length > 3}
                                speed={700}
                                grabCursor
                                autoplay={
                                    hasMultipleItems
                                        ? {
                                            delay: 4200,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true,
                                        }
                                        : false
                                }
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 44,
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                        spaceBetween: 78,
                                    },
                                }}
                                onSwiper={setSwiper}
                                onRealIndexChange={(instance) => setActiveIndex(instance.realIndex)}
                                className="teacher-team-swiper !overflow-visible px-8 py-12 md:px-12 xl:px-16"
                            >
                                {teachers.map((teacher, index) => (
                                    <SwiperSlide
                                        key={teacher.id}
                                        className="!h-auto py-6"
                                    >
                                        <TeacherSlideCard teacher={teacher} isActive={index === displayActiveIndex} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        {hasMultipleItems && !loading ? (
                            <>
                                <button
                                    type="button"
                                    aria-label="Giáo viên trước"
                                    onClick={() => swiper?.slidePrev()}
                                    className="absolute left-1 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-[0_12px_30px_rgba(0,0,0,0.20)] transition-colors hover:bg-black/65 md:left-6"
                                >
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Giáo viên tiếp theo"
                                    onClick={() => swiper?.slideNext()}
                                    className="absolute right-1 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-[0_12px_30px_rgba(0,0,0,0.20)] transition-colors hover:bg-black/65 md:right-6"
                                >
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </>
                        ) : null}
                        {hasMultipleItems && !loading ? (
                            <SliderProgress
                                total={teachers.length}
                                activeIndex={displayActiveIndex}
                                onSelect={(index) => swiper?.slideToLoop(index)}
                            />
                        ) : null}
                    </div>


                </div>
            </div>
        </section>
    );
}
