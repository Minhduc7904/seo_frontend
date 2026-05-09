"use client";

import Image from "next/image";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import type { GetPublicSeoMediaItemsParams, SeoMediaSlotCode } from "@/lib/api";

type PagePosterProps = {
    title: string;
    slot: SeoMediaSlotCode;
    fallbackImageSrc: string;
    imageAlt: string;
    params?: GetPublicSeoMediaItemsParams;
};

export default function PagePoster({
    title,
    slot,
    fallbackImageSrc,
    imageAlt,
    params,
}: PagePosterProps) {
    const { items, loading, error } = useSeoMediaSlot(slot, {
        page: 1,
        limit: 1,
        ...params,
    });

    const mediaItem = items[0];
    const useFallbackImage = !loading && (Boolean(error) || !mediaItem?.publicUrl);

    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2">
            {loading && !useFallbackImage ? (
                <div className="h-48 w-full animate-pulse bg-zinc-100 md:h-64 lg:h-72" />
            ) : useFallbackImage ? (
                <Image
                    src={fallbackImageSrc}
                    alt={imageAlt}
                    width={1440}
                    height={300}
                    priority
                    className="block h-auto w-full"
                    sizes="100vw"
                />
            ) : (
                <MediaRenderer
                    item={mediaItem}
                    className="block h-auto w-full"
                    disableLink
                    imageLoading="eager"
                />
            )}
            <h1 className="sr-only">{title}</h1>
        </section>
    );
}
