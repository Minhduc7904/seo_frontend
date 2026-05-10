"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PhoneCall, Star, Users, Video } from "lucide-react";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

const FALLBACK_BACKGROUND_SRC = "/images/khoa_offline/poster.png";
const FALLBACK_PREVIEW_SRC = "/images/khoa_offline/poster.png";
const BRAND_YELLOW = "#FDD22C";

function HeroMediaSkeleton({ className }: { className: string }) {
    return <div className={`animate-pulse bg-zinc-700/40 ${className}`} />;
}

export default function OfflineHeroSection() {
    const { items: backgroundItems, loading: backgroundLoading, error: backgroundError } = useSeoMediaSlot(
        PAGE_SEO_MEDIA_SLOTS.offlineCourse.hero,
        { page: 1, limit: 1 },
    );
    const { items: bannerItems, loading: bannerLoading, error: bannerError } = useSeoMediaSlot(
        PAGE_SEO_MEDIA_SLOTS.offlineCourse.banner,
        { page: 1, limit: 1 },
    );
    const { items: galleryItems, loading: galleryLoading, error: galleryError } = useSeoMediaSlot(
        PAGE_SEO_MEDIA_SLOTS.offlineCourse.gallery,
        { page: 1, limit: 1 },
    );

    const backgroundItem = backgroundItems[0];
    const bannerItem = bannerItems[0];
    const galleryItem = galleryItems[0];

    const hasBackgroundFromApi = Boolean(backgroundItem?.publicUrl) && !backgroundError;
    const previewItem = galleryError ? bannerItem : galleryItem ?? bannerItem;
    const hasPreviewMedia = Boolean(previewItem?.publicUrl) && !bannerError;
    const isPreviewLoading = galleryLoading && bannerLoading;

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
                        alt="Khong gian lop hoc offline BeeEdu"
                        fill
                        priority
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-black/46" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#09193f]/64 via-[#0D41A9]/26 to-[#10172f]/52" />
            </div>

            <div className="relative z-10 layout-grid">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <div className="grid gap-7 xl:grid-cols-[1.2fr_0.62fr_0.88fr] xl:items-end">
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
                                kèm sát theo trình độ, luyện đề theo mục tiêu và theo dõi tiến độ hàng tuần để học sinh tự tin
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

                            <div className="mt-9 flex flex-wrap items-center gap-3 text-white/92">
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

                        <div className="space-y-5 xl:pt-8">
                            <div className="rounded-[1.8rem] bg-white p-7 text-center text-slate-900 shadow-[0_16px_38px_rgba(0,0,0,0.2)]">
                                <BookOpen className="mx-auto h-10 w-10 text-[#0D41A9]" aria-hidden="true" />
                                <p className="mt-4 text-5xl font-extrabold leading-none">12+</p>
                                <p className="mt-3 text-lg text-slate-700">Lớp khai giảng mỗi năm</p>
                            </div>

                            <div className="rounded-[1.8rem] bg-[#0D41A9]/95 p-7 text-center shadow-[0_16px_38px_rgba(0,0,0,0.22)]">
                                <Users className="mx-auto h-10 w-10 text-[#FDD22C]" aria-hidden="true" />
                                <p className="mt-4 text-5xl font-extrabold leading-none text-white">500+</p>
                                <p className="mt-3 text-lg text-white/90">Học sinh học trực tiếp</p>
                            </div>
                        </div>

                        {/* <article className="rounded-[1.8rem] border border-white/35 bg-white p-5 text-slate-900 shadow-[0_16px_38px_rgba(0,0,0,0.22)]">
                            <div className="relative overflow-hidden rounded-[1.3rem] bg-slate-100">
                                {isPreviewLoading ? (
                                    <HeroMediaSkeleton className="aspect-[16/10] w-full" />
                                ) : hasPreviewMedia ? (
                                    <div className="aspect-[16/10] w-full overflow-hidden rounded-[1.3rem]">
                                        <MediaRenderer
                                            item={previewItem}
                                            className="h-full w-full object-cover"
                                            disableLink
                                            imageLoading="eager"
                                            videoAutoPlay
                                            videoLoop
                                            videoControls={false}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative aspect-[16/10] w-full">
                                        <Image
                                            src={FALLBACK_PREVIEW_SRC}
                                            alt="Lop hoc offline BeeEdu"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#0D41A9]/90 px-4 py-2 text-base font-semibold text-white">
                                    Khóa Offline
                                </span>

                                <span className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0D41A9] shadow-lg">
                                    <Video className="h-5 w-5" aria-hidden="true" />
                                </span>
                            </div>

                            <div className="mt-5">
                                <p className="inline-flex items-center gap-1 rounded-full bg-[#0D41A9]/10 px-3 py-1 text-sm font-semibold text-[#0D41A9]">
                                    <Star className="h-3.5 w-3.5 text-[#FDD22C]" fill="currentColor" aria-hidden="true" />
                                    4.8
                                </p>
                                <h3 className="mt-3 text-[2rem] font-bold leading-tight">
                                    Lộ trình Offline bám sát mục tiêu thi cử
                                </h3>
                                <div className="mt-4 flex items-center justify-between text-base text-slate-600">
                                    <span>250 buổi luyện đề</span>
                                    <span>125 học sinh/lứa</span>
                                </div>
                                <div className="mt-5 border-t border-slate-200 pt-4">
                                    <p className="text-3xl font-extrabold text-[#0D41A9]">Từ 2.400.000đ/tháng</p>
                                </div>
                            </div>
                        </article> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
