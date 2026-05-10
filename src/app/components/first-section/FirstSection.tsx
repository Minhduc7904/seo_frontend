import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SeoMediaSlot from "@/components/common/SeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";
import RankingBoard from "./RankingBoard";
import StatsSection from "./StatsSection";

const HOME_HERO_MEDIA_SIZE = { width: 1600, height: 800 };

export default function FirstSection() {
    return (
        <section className="col-span-full mt-10 flex flex-col gap-10">
            <div className="layout-grid">
                <div className="relative col-span-4 aspect-[2/1] w-full overflow-hidden rounded-2xl bg-zinc-100 md:col-span-8 xl:col-span-8">
                    <SeoMediaSlot
                        code={PAGE_SEO_MEDIA_SLOTS.home.hero}
                        params={{ page: 1, limit: 10 }}
                        className="relative h-full w-full overflow-hidden"
                        mediaClassName="h-full w-full object-cover"
                        imageLoading="eager"
                        fallbackWidth={HOME_HERO_MEDIA_SIZE.width}
                        fallbackHeight={HOME_HERO_MEDIA_SIZE.height}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 md:p-7 xl:p-9">
                        <div className="max-w-[28rem]">
                            <h1 className="text-4xl font-bold leading-none text-white md:text-5xl xl:text-6xl">
                                Bee
                                <span className="text-[#FDD22C]"> edu</span>
                            </h1>

                            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-white/92 md:text-base">
                                Trung Tâm giáo dục tại Bạch Mai, ôn thi THPT Quốc gia, ôn thi HSA, TSA
                            </p>

                            <Link
                                href="/khoa-hoc-offline"
                                className="group pointer-events-auto mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FDD22C] px-5 py-3 text-sm font-bold text-blue-900 shadow-[0_16px_36px_rgba(0,0,0,0.22)] outline-none transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-white hover:shadow-[0_20px_42px_rgba(0,0,0,0.28)] focus-visible:ring-2 focus-visible:ring-[#FDD22C] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 md:px-6 md:text-base"
                            >
                                Học ngay
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>

                <aside className="col-span-4 flex items-start justify-center md:col-span-8 xl:col-span-4 xl:pl-5">
                    <RankingBoard />
                </aside>
            </div>
            <StatsSection />
        </section>
    );
}
