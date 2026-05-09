"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight, PhoneCall } from "lucide-react";
import AnimatedStatBadge from "@/components/common/AnimatedStatBadge";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

const FALLBACK_BACKGROUND_SRC = "/images/gioi_thieu/poster.png";
const FALLBACK_CHARACTER_SRC = "/images/gioi_thieu/poster.png";
const FALLBACK_VIDEO_PREVIEW_SRC = "/images/gioi_thieu/poster.png";
const BRAND_YELLOW = "#FDD22C";

function HeroMediaSkeleton({ className }: { className: string }) {
    return <div className={`animate-pulse bg-zinc-700/40 ${className}`} />;
}

export default function AboutHeroSection() {
    const { items: backgroundItems, loading: backgroundLoading, error: backgroundError } = useSeoMediaSlot(
        PAGE_SEO_MEDIA_SLOTS.about.hero,
        { page: 1, limit: 1 },
    );
    const { items: characterItems, loading: characterLoading, error: characterError } = useSeoMediaSlot(
        PAGE_SEO_MEDIA_SLOTS.about.banner,
        { page: 1, limit: 1 },
    );
    const { items: videoItems, loading: videoLoading, error: videoError } = useSeoMediaSlot(
        PAGE_SEO_MEDIA_SLOTS.about.gallery,
        { page: 1, limit: 1 },
    );

    const backgroundItem = backgroundItems[0];
    const characterItem = characterItems[0];
    const videoItem = videoItems[0];

    const hasBackgroundFromApi = Boolean(backgroundItem?.publicUrl) && !backgroundError;
    const hasCharacterFromApi = Boolean(characterItem?.publicUrl) && !characterError;
    const hasVideoFromApi = Boolean(videoItem?.publicUrl) && !videoError;
    const shouldStartStats = !backgroundLoading && !characterLoading && !videoLoading;

    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-black text-white pt-20">
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
                        alt="Nền lớp học BeeEdu"
                        fill
                        priority
                        className="object-cover"
                    />
                )}
            </div>

            <div className="relative z-10 layout-grid">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <div className="grid items-end gap-10 lg:grid-cols-[1.04fr_0.96fr]">
                    <div className="max-w-[44rem]">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FDD22C]">
                            Giới thiệu BeeEdu - Toán thầy Bee
                        </p>

                        <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-6xl">
                            Nơi hành trình học Toán
                            <span className="block bg-gradient-to-r from-[#FDD22C] via-[#FFD74A] to-[#FFE083] bg-clip-text text-transparent">
                                bắt đầu từ nền tảng vững chắc.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-[40rem] text-base leading-8 text-white/88 sm:text-lg">
                            BeeEdu, còn được biết đến với tên Toán thầy Bee và toanthaybee, đồng hành cùng học sinh qua mô hình
                            học online kết hợp offline tại 315 Bạch Mai, Hai Bà Trưng, Hà Nội. Đội ngũ tập trung xây lộ trình rõ
                            ràng, luyện đề có chiến lược và theo dõi tiến độ sát sao để giúp học sinh tiến bộ bền vững.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/gioi-thieu"
                                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-[#0D41A9] shadow-[0_18px_38px_rgba(5,22,64,0.45)] transition hover:-translate-y-0.5"
                                style={{ backgroundColor: BRAND_YELLOW }}
                            >
                                Câu chuyện BeeEdu
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/lien-he"
                                className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold text-[#0D41A9] transition hover:bg-white/90"
                            >
                                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                                Tư vấn ngay
                            </Link>
                        </div>

                        <div
                            className="relative mt-9 w-full max-w-[28rem] overflow-hidden rounded-t-3xl rounded-b-none border border-white bg-white px-3 pt-3 pb-0 shadow-[0_20px_48px_rgba(5,8,22,0.55)]"
                        >
                            {videoLoading ? (
                                <HeroMediaSkeleton className="aspect-[16/9] w-full rounded-t-2xl rounded-b-none" />
                            ) : hasVideoFromApi ? (
                                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl rounded-b-none">
                                    <MediaRenderer
                                        item={videoItem}
                                        disableLink
                                        className="h-full w-full object-cover"
                                        videoAutoPlay
                                        videoLoop
                                        videoControls={false}
                                        imageLoading="eager"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                                </div>
                            ) : (
                                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl rounded-b-none">
                                    <Image
                                        src={FALLBACK_VIDEO_PREVIEW_SRC}
                                        alt="Video hoạt động học tập BeeEdu"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                                </div>
                            )}

                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <span
                                    className="inline-flex h-16 w-16 items-center justify-center rounded-full text-[#0D41A9] shadow-[0_0_0_10px_rgba(253,210,44,0.35)]"
                                    style={{ backgroundColor: BRAND_YELLOW }}
                                >
                                    <Play className="h-7 w-7" fill="currentColor" aria-hidden="true" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[40rem] self-end lg:mx-0 lg:max-w-none">
                        {characterLoading ? (
                            <HeroMediaSkeleton className="mx-auto h-[720px] w-[560px] max-w-full rounded-[2.2rem]" />
                        ) : hasCharacterFromApi ? (
                            <MediaRenderer
                                item={characterItem}
                                disableLink
                                className="mx-auto h-[720px] w-[560px] max-w-full object-contain object-bottom"
                                imageLoading="eager"
                                videoAutoPlay
                                videoLoop
                                videoControls={false}
                            />
                        ) : (
                            <div className="relative mx-auto h-[720px] w-[560px] max-w-full">
                                <Image
                                    src={FALLBACK_CHARACTER_SRC}
                                    alt="Đội ngũ giảng dạy BeeEdu"
                                    fill
                                    className="object-contain object-bottom"
                                />
                            </div>
                        )}

                        <AnimatedStatBadge
                            value={250}
                            label="Bộ đề và chuyên đề"
                            start={shouldStartStats}
                            className="absolute right-[6%] top-[16%] rounded-3xl border-b-4 border-[#8DB8FF] bg-transparent px-6 py-5"
                        />

                        <AnimatedStatBadge
                            value={500}
                            label="Học sinh đồng hành"
                            start={shouldStartStats}
                            className="absolute bottom-[17%] left-[4%] rounded-3xl border-b-4 border-[#8DB8FF] bg-transparent px-6 py-5"
                        />
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
