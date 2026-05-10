"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "https://m.facebook.com/loptoanthaybee/";
const ZALO_URL = process.env.NEXT_PUBLIC_ZALO_URL?.trim() || "https://zalo.me/0333726202";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => {
            setIsVisible(window.scrollY > 520);
        };

        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });
        return () => window.removeEventListener("scroll", updateVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 md:bottom-7 md:right-7">
            <a
                href={FACEBOOK_URL}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-800 shadow-[0_16px_36px_rgba(15,23,42,0.18)] outline-none ring-1 ring-blue-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.22)] focus-visible:ring-2 focus-visible:ring-[#FDD22C] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
                <Image src="/images/footer/Facebook.svg" alt="" width={48} height={48} className="h-12 w-12" />
            </a>
            <a
                href={ZALO_URL}
                aria-label="Zalo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-800 shadow-[0_16px_36px_rgba(15,23,42,0.18)] outline-none ring-1 ring-blue-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.22)] focus-visible:ring-2 focus-visible:ring-[#FDD22C] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
                <Image src="/images/footer/Zalo.svg" alt="" width={48} height={48} className="h-12 w-12" />
            </a>
            <button
                type="button"
                aria-label="Cuộn lên đầu trang"
                onClick={scrollToTop}
                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-800 text-[#FDD22C] shadow-[0_16px_36px_rgba(25,77,182,0.28)] outline-none ring-1 ring-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-900 hover:shadow-[0_20px_44px_rgba(25,77,182,0.34)] focus-visible:ring-2 focus-visible:ring-[#FDD22C] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                }`}
            >
                <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    );
}
