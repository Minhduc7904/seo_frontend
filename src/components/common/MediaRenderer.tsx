"use client";

import Image from "next/image";
import type { SeoMediaItem } from "@/lib/api";

type MediaRendererProps = {
    item: SeoMediaItem;
    className?: string;
    disableLink?: boolean;
    imageLoading?: "eager" | "lazy";
    fallbackWidth?: number;
    fallbackHeight?: number;
    videoAutoPlay?: boolean;
    videoControls?: boolean;
    videoLoop?: boolean;
};

const isVideoMedia = (item: SeoMediaItem) => {
    const mimeType = item.mimeType.toLowerCase();
    const url = item.publicUrl.toLowerCase();

    return mimeType.startsWith("video/") || /\.(mp4|webm|ogg|mov)(\?|$)/.test(url);
};

export default function MediaRenderer({
    item,
    className,
    disableLink = false,
    imageLoading,
    fallbackWidth,
    fallbackHeight,
    videoAutoPlay = false,
    videoControls = true,
    videoLoop = false,
}: MediaRendererProps) {
    const sharedClassName = className ?? "h-full w-full object-cover";

    const media = isVideoMedia(item) ? (
        <video
            src={item.publicUrl}
            className={sharedClassName}
            autoPlay={videoAutoPlay}
            controls={videoControls}
            loop={videoLoop}
            muted
            playsInline
            preload="metadata"
        />
    ) : (
        <Image
            src={item.publicUrl}
            alt={item.alt ?? item.originalName}
            width={item.width || fallbackWidth || 1200}
            height={item.height || fallbackHeight || 675}
            className={sharedClassName}
            loading={imageLoading}
            unoptimized
        />
    );

    if (disableLink || !item.linkUrl) {
        return media;
    }

    return (
        <a href={item.linkUrl} className="block h-full w-full" target="_blank" rel="noreferrer">
            {media}
        </a>
    );
}
