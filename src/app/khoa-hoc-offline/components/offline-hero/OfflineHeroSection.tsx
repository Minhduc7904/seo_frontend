"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Medal, PhoneCall, Star, Target, Users } from "lucide-react";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

const FALLBACK_BACKGROUND_SRC = "/images/khoa_offline/home-banner.jpg";
const BRAND_YELLOW = "#FDD22C";

function HeroMediaSkeleton({ className }: { className: string }) {
    return <div className={`animate-pulse bg-zinc-700/40 ${className}`} />;
}

export default function OfflineHeroSection() {
    const { items: backgroundItems, loading: backgroundLoading, error: backgroundError } = useSeoMediaSlot(
        PAGE_SEO_MEDIA_SLOTS.offlineCourse.hero,
        { page: 1, limit: 1 },
    );

    const backgroundItem = backgroundItems[0];
    const hasBackgroundFromApi = Boolean(backgroundItem?.publicUrl) && !backgroundError;
    const isUsingFallbackBackground = !backgroundLoading && !hasBackgroundFromApi;

    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-black py-20 text-white">
            <div className="absolute inset-0">
                {backgroundLoading ? (
                    <HeroMediaSkeleton className="h-full w-full" />
                ) : hasBackgroundFromApi ? (
                    <MediaRenderer
                        item={backgroundItem}
                        className="h-full w-full object-cover"
                        disableLink
                        imageLoading="eager"
                    />
                ) : (
                    <Image
                        src={FALLBACK_BACKGROUND_SRC}
                        alt="Không gian lớp học offline BeeEdu"
                        fill
                        priority
                        className="object-cover"
                    />
                )}
                {isUsingFallbackBackground ? (
                    <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/60" />
                ) : null}
            </div>

            <div className="relative z-10 layout-grid">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <div className="grid items-end gap-10 lg:grid-cols-[1.04fr_0.96fr]">
                        <div className="max-w-[44rem]">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FDD22C]">
                                Khóa học Offline BeeEdu
                            </p>

                            <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-6xl">
                                Học trực tiếp tại lớp,
                                <span className="block bg-gradient-to-r from-[#FDD22C] via-[#FFD74A] to-[#FFE083] bg-clip-text text-transparent">
                                    chắc nền tảng, bứt tốc điểm số.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-[40rem] text-base leading-8 text-white/88 sm:text-lg">
                                Tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội, khóa học Offline của BeeEdu / Toán thầy Bee tập trung
                                kèm sát theo trình độ, luyện đề theo mục tiêu và theo dõi tiến độ hằng tuần để học sinh tự tin
                                chinh phục các kỳ thi quan trọng.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link
                                    href="/lien-he"
                                    className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-[#0D41A9] shadow-[0_18px_38px_rgba(5,22,64,0.45)] transition hover:-translate-y-0.5"
                                    style={{ backgroundColor: BRAND_YELLOW }}
                                >
                                    Đăng ký học thử
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                                <Link
                                    href="/lien-he"
                                    className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold text-[#0D41A9] transition hover:bg-white/90"
                                >
                                    <PhoneCall className="h-4 w-4" aria-hidden="true" />
                                    Tư vấn lớp phù hợp
                                </Link>
                            </div>

                            <div className="mt-9 flex items-center gap-5 text-white/92">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 backdrop-blur-sm">
                                    <Star className="h-4 w-4 text-[#FDD22C]" fill="currentColor" aria-hidden="true" />
                                    <span className="text-sm font-semibold">4.8 đánh giá từ học sinh</span>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 backdrop-blur-sm">
                                    <Users className="h-4 w-4 text-[#FDD22C]" aria-hidden="true" />
                                    <span className="text-sm font-semibold">Sĩ số lớp vừa phải, theo sát từng bạn</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-[44rem] lg:mx-0 lg:max-w-none">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-5">
                                    
                                    <div className="rounded-[1.8rem] bg-white p-7 text-center text-slate-900 shadow-[0_16px_38px_rgba(0,0,0,0.2)]">
                                        <Target className="mx-auto h-10 w-10 text-[#0D41A9]" aria-hidden="true" />
                                        <p className="mt-4 text-5xl font-extrabold leading-none">95%</p>
                                        <p className="mt-3 text-lg text-slate-700">Học sinh đạt mục tiêu tăng điểm</p>
                                    </div>

                                    <div
                                        className="relative overflow-hidden rounded-[1.8rem] bg-[#0D41A9] p-7 text-center shadow-[0_16px_38px_rgba(0,0,0,0.22)]"
                                        style={{
                                            backgroundImage: "url('/images/khoa_offline/Shape.png')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-[#0D41A9]/60" />
                                        <div className="relative z-10">
                                            <Users className="mx-auto h-10 w-10 text-[#FDD22C]" aria-hidden="true" />
                                            <p className="mt-4 text-5xl font-extrabold leading-none text-white">500+</p>
                                            <p className="mt-3 text-lg text-white/90">Học sinh học trực tiếp</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    

                                    <div
                                        className="relative overflow-hidden rounded-[1.8rem] bg-[#0D41A9] p-7 text-center shadow-[0_16px_38px_rgba(0,0,0,0.22)]"
                                        style={{
                                            backgroundImage: "url('/images/khoa_offline/Shape.png')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-[#0D41A9]/60" />
                                        <div className="relative z-10">
                                            <Medal className="mx-auto h-10 w-10 text-[#FDD22C]" aria-hidden="true" />
                                            <p className="mt-4 text-5xl font-extrabold leading-none text-white">20+</p>
                                            <p className="mt-3 text-lg text-white/90">Giáo viên giàu kinh nghiệm đồng hành</p>
                                        </div>
                                    </div>
                                    <div className="rounded-[1.8rem] bg-white p-7 text-center text-slate-900 shadow-[0_16px_38px_rgba(0,0,0,0.2)]">
                                        <BookOpen className="mx-auto h-10 w-10 text-[#0D41A9]" aria-hidden="true" />
                                        <p className="mt-4 text-5xl font-extrabold leading-none">12+</p>
                                        <p className="mt-3 text-lg text-slate-700">Lớp khai giảng mỗi năm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
