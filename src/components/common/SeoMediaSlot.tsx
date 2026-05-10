"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import type { GetPublicSeoMediaItemsParams, SeoMediaSlotCode } from "@/lib/api";

type SeoMediaSlotProps = {
    code: SeoMediaSlotCode;
    params?: GetPublicSeoMediaItemsParams;
    className?: string;
    mediaClassName?: string;
    autoPlay?: boolean;
    intervalMs?: number;
    showControls?: boolean;
    imageLoading?: "eager" | "lazy";
    fallbackWidth?: number;
    fallbackHeight?: number;
};

export default function SeoMediaSlot({
    code,
    params,
    className,
    mediaClassName,
    autoPlay = true,
    intervalMs = 5000,
    showControls = true,
    imageLoading,
    fallbackWidth,
    fallbackHeight,
}: SeoMediaSlotProps) {
    const { items, loading, error } = useSeoMediaSlot(code, params);
    const [activeIndex, setActiveIndex] = useState(0);
    const hasMultipleItems = items.length > 1;
    const containerClassName = className
        ? `group ${className}`
        : "group relative h-full w-full overflow-hidden";

    const safeActiveIndex = useMemo(() => {
        if (items.length === 0) {
            return 0;
        }

        return Math.min(activeIndex, items.length - 1);
    }, [activeIndex, items.length]);

    useEffect(() => {
        if (!autoPlay || !hasMultipleItems) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
        }, intervalMs);

        return () => window.clearInterval(timer);
    }, [autoPlay, hasMultipleItems, intervalMs, items.length]);

    const goToPrevious = () => {
        setActiveIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length);
    };

    const goToNext = () => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    };

    if (loading) {
        return <div className={className ?? "h-full min-h-40 w-full animate-pulse bg-zinc-100"} />;
    }

    if (error || items.length === 0) {
        return null;
    }

    return (
        <div className={containerClassName}>
            <div
                className="flex h-full w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${safeActiveIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div key={item.itemId} className="h-full w-full shrink-0">
                        <MediaRenderer
                            item={item}
                            className={mediaClassName}
                            imageLoading={index === 0 ? imageLoading : undefined}
                            fallbackWidth={fallbackWidth}
                            fallbackHeight={fallbackHeight}
                        />
                    </div>
                ))}
            </div>

            {showControls && hasMultipleItems ? (
                <>
                    <button
                        type="button"
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 pointer-events-none transition-opacity duration-200 hover:bg-black/65 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
                        aria-label="Media truoc"
                        onClick={goToPrevious}
                    >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 pointer-events-none transition-opacity duration-200 hover:bg-black/65 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
                        aria-label="Media tiep theo"
                        onClick={goToNext}
                    >
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                        {items.map((item, index) => (
                            <button
                                key={item.itemId}
                                type="button"
                                className={`h-2.5 w-2.5 rounded-full transition-colors ${index === safeActiveIndex ? "bg-white" : "bg-white/45"
                                    }`}
                                aria-label={`Chuyen den media ${index + 1}`}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
}
