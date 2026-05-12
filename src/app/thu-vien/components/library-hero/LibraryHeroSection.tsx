"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

function HeroSkeleton() {
    return <div className="h-[220px] w-full animate-pulse bg-zinc-200 md:h-[300px] lg:h-[360px]" />;
}

type HeroVariant = "library" | "documents" | "exams" | "questions";

function resolveHeroVariant(pathname: string): HeroVariant {
    if (pathname.startsWith("/thu-vien/tai-lieu")) {
        return "documents";
    }

    if (pathname.startsWith("/thu-vien/cau-hoi")) {
        return "questions";
    }

    if (pathname.startsWith("/thu-vien/de-thi")) {
        return "exams";
    }

    return "library";
}

function LibraryTitle({ variant }: { variant: HeroVariant }) {
    if (variant === "documents") {
        return (
            <div className="inline-flex w-full flex-wrap items-center justify-center gap-3">
                <h1 className="text-2xl font-bold text-blue-800 md:text-4xl">KHO TÀI LIỆU</h1>
            </div>
        );
    }

    if (variant === "library") {
        return (
            <div className="inline-flex w-full flex-wrap items-center justify-center gap-3">
                <h1 className="text-2xl font-bold text-blue-800 md:text-4xl">THƯ VIỆN</h1>
            </div>
        );
    }

    return (
        <div className="inline-flex w-full flex-wrap items-center justify-center gap-3">
            <h1 className="text-2xl font-bold text-blue-800 md:text-4xl">
                {variant === "exams" ? "THƯ VIỆN" : "NGÂN HÀNG"}
            </h1>
            <div className="relative -rotate-2 rounded-[36px] bg-cyan-300 px-6 py-3 md:px-8 md:py-4">
                <Image
                    src="/icon/canhOng.png"
                    alt=""
                    width={32}
                    height={32}
                    className="absolute -right-0 -top-4 h-8 w-8 rotate-2"
                />
                <span className="inline-flex items-center text-2xl font-bold text-blue-800 md:text-4xl">
                    {variant === "exams" ? "ĐỀ THI" : "CÂU HỎI"}
                </span>
            </div>
        </div>
    );
}

function FallbackBanner({ variant }: { variant: HeroVariant }) {
    return (
        <div className="relative h-[220px] w-full bg-[#E6EFF2] md:h-[300px] lg:h-[360px]">
            <Image
                src="/images/tai_lieu_hoc/book1.png"
                alt="Sách tài liệu bên trái"
                width={220}
                height={220}
                className="absolute bottom-0 left-0 h-auto w-24 object-contain md:w-36 lg:w-52"
                priority
            />

            <div className="flex h-full w-full items-center justify-center px-4 text-center">
                <LibraryTitle variant={variant} />
            </div>

            <Image
                src="/images/tai_lieu_hoc/book2.png"
                alt="Sách tài liệu bên phải"
                width={220}
                height={220}
                className="absolute right-0 bottom-0 h-auto w-24 object-contain md:w-36 lg:w-52"
                priority
            />
        </div>
    );
}

export default function LibraryHeroSection() {
    const pathname = usePathname();
    const variant = resolveHeroVariant(pathname);
    const { items, loading, error } = useSeoMediaSlot(PAGE_SEO_MEDIA_SLOTS.library.hero, {
        page: 1,
        limit: 1,
    });

    const mediaItem = items[0];
    const hasApiBackground = Boolean(mediaItem?.publicUrl) && !error;
    const useFallbackBanner = !loading && !hasApiBackground;

    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
            <div className="relative h-[220px] w-full md:h-[300px] lg:h-[360px]">
                {loading ? (
                    <HeroSkeleton />
                ) : useFallbackBanner ? (
                    <FallbackBanner variant={variant} />
                ) : (
                    <>
                        <MediaRenderer
                            item={mediaItem}
                            className="h-full w-full object-cover"
                            disableLink
                            imageLoading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                            <LibraryTitle variant={variant} />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
