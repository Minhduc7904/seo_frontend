"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type RevealOnScrollProps = {
    children: ReactNode;
    className?: string;
    delayMs?: number;
    once?: boolean;
};

export default function RevealOnScroll({
    children,
    className,
    delayMs = 0,
    once = true,
}: RevealOnScrollProps) {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                rootMargin: "0px 0px -12% 0px",
                threshold: 0.14,
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [once]);

    return (
        <div
            ref={elementRef}
            className={`reveal-section ${className ?? ""}`}
            data-visible={isVisible ? "true" : "false"}
            style={{ transitionDelay: `${delayMs}ms` }}
        >
            {children}
        </div>
    );
}
