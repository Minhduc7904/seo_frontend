"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import MediaRenderer from "@/components/common/MediaRenderer";
import { useSeoMediaSlot } from "@/hooks/useSeoMediaSlot";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

const featureItems = [
    {
        title: "Lộ trình học rõ ràng",
        description:
            "Học sinh được định hướng từng giai đoạn, biết mình cần luyện phần nào để học chắc hơn và tiến bộ đều hơn.",
    },
    {
        title: "Luyện đề sát mục tiêu",
        description:
            "Hệ thống bài tập và đề luyện giúp học sinh rèn kỹ năng làm bài, củng cố kiến thức và chuẩn bị tốt cho kỳ thi.",
    },
    {
        title: "Theo dõi tiến độ học tập",
        description:
            "BeeEdu hỗ trợ ghi nhận quá trình luyện tập để học sinh, phụ huynh và thầy cô nhìn rõ sự thay đổi qua từng buổi.",
    },
    {
        title: "Online và offline linh hoạt",
        description:
            "Học sinh có thể học trực tiếp tại 315 Bạch Mai hoặc luyện tập online cùng Toán thầy Bee khi cần chủ động thời gian.",
    },
];

const reactionIcons = [
    {
        src: "/icon/Face1.png",
        alt: "Cam xuc 1",
        className:
            "left-[-28px] top-[-10px] -rotate-[14deg] translate-x-12 translate-y-12 group-hover/media:translate-x-0 group-hover/media:translate-y-0 md:left-[-34px] md:top-[-18px]",
        delay: "delay-0",
    },
    {
        src: "/icon/Face2.png",
        alt: "Cam xuc 2",
        className:
            "right-[-24px] top-[-18px] rotate-[12deg] -translate-x-12 translate-y-12 group-hover/media:translate-x-0 group-hover/media:translate-y-0 md:right-[-30px] md:top-[-26px]",
        delay: "delay-75",
    },
    {
        src: "/icon/Face3.png",
        alt: "Cam xuc 3",
        className:
            "left-[-30px] bottom-[-10px] rotate-[10deg] translate-x-12 -translate-y-12 group-hover/media:translate-x-0 group-hover/media:translate-y-0 md:left-[-38px] md:bottom-[-18px]",
        delay: "delay-150",
    },
    {
        src: "/icon/Face4.png",
        alt: "Cam xuc 4",
        className:
            "right-[-32px] bottom-[-2px] -rotate-[10deg] -translate-x-12 -translate-y-12 group-hover/media:translate-x-0 group-hover/media:translate-y-0 md:right-[-40px] md:bottom-[-10px]",
        delay: "delay-200",
    },
];

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <article className="flex gap-4 rounded-2xl border border-[#194DB6]/15 bg-white p-5 shadow-sm shadow-[#194DB6]/5 transition-colors hover:border-[#194DB6]/35">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#194DB6] text-[#FDD22C]">
                <Check className="h-5 w-5" aria-hidden="true" />
            </span>

            <div>
                <h3 className="text-lg font-bold leading-snug text-zinc-900 md:text-xl">
                    {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 md:text-base">
                    {description}
                </p>
            </div>
        </article>
    );
}

export default function LearningEnvironmentSection() {
    const { items, loading } = useSeoMediaSlot(PAGE_SEO_MEDIA_SLOTS.home.learningEnvironment, {
        page: 1,
        limit: 1,
    });

    const heroMedia = items[0];
    const leftFeatures = featureItems.slice(0, 2);
    const rightFeatures = featureItems.slice(2);

    return (
        <section className="col-span-full mt-16 w-full">
            <div className="layout-grid gap-y-8">
                <div className="col-span-4 flex justify-center md:col-span-8 xl:col-span-12">
                    <div className="inline-flex w-full flex-wrap items-center justify-center gap-3">
                        <h2 className="text-3xl font-bold text-blue-800">TOÁN THẦY BEE</h2>

                        <div className="relative -rotate-2 rounded-[36px] bg-cyan-300 px-8 py-4">
                            <Image
                                src="/icon/canhOng.png"
                                alt=""
                                width={32}
                                height={32}
                                className="absolute -right-0 -top-4 h-8 w-8 rotate-2"
                            />
                            <span className="inline-flex items-center text-3xl font-bold text-blue-800">
                                TẠI BẠCH MAI
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 text-center md:col-span-8 xl:col-span-12">
                    <h2 className="mx-auto max-w-[800px] text-3xl font-bold leading-tight text-zinc-950 md:text-4xl xl:text-5xl">
                        Môi trường học Toán giúp học sinh tiến bộ rõ ràng
                    </h2>
                    <p className="mx-auto mt-4 max-w-[800px] text-base leading-7 text-zinc-600 md:text-lg">
                        BeeEdu / Toán thầy Bee kết hợp lớp học offline tại 315 Bạch Mai với hệ thống luyện tập
                        online, giúp học sinh làm đề, theo dõi tiến độ và ôn thi THPT Quốc gia cùng thầy Ong
                        Khắc Ngọc.
                    </p>
                </div>

                <div className="order-4 col-span-4 flex flex-col gap-5 md:col-span-4 xl:order-3 xl:col-span-4 xl:pt-10">
                    {leftFeatures.map((item) => (
                        <FeatureCard key={item.title} title={item.title} description={item.description} />
                    ))}
                </div>

                <div className="order-3 col-span-4 md:col-span-8 xl:order-4 xl:col-span-4">
                    <div className="group/media relative mx-auto w-full max-w-[390px]">
                        {reactionIcons.map((icon) => (
                            <Image
                                key={icon.src}
                                src={icon.src}
                                alt={icon.alt}
                                width={76}
                                height={76}
                                className={[
                                    "pointer-events-none absolute z-20",
                                    "h-12 w-12 md:h-[72px] md:w-[72px]",
                                    "opacity-0 scale-75 blur-[1px]",
                                    "drop-shadow-[0_16px_24px_rgba(15,23,42,0.22)]",
                                    "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                    "group-hover/media:opacity-100 group-hover/media:scale-100 group-hover/media:blur-0",
                                    icon.className,
                                    icon.delay,
                                ].join(" ")}
                            />
                        ))}

                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border-8 border-white bg-zinc-100 shadow-xl shadow-zinc-200 transition-transform duration-300 ease-out group-hover/media:scale-[1.02]">
                            {loading ? (
                                <div className="h-full w-full animate-pulse bg-zinc-100" />
                            ) : heroMedia ? (
                                <MediaRenderer
                                    item={heroMedia}
                                    className="h-full w-full object-cover"
                                    imageLoading="lazy"
                                    videoAutoPlay
                                    videoControls={false}
                                    videoLoop
                                />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center bg-[#FDD22C]/25 p-8 text-center">
                                    <Image
                                        src="/icon/canhOng.png"
                                        alt=""
                                        width={64}
                                        height={64}
                                        className="mb-4 h-16 w-16"
                                    />
                                    <p className="text-lg font-bold text-blue-900">BeeEdu</p>
                                    <p className="mt-2 text-sm text-zinc-600">Không gian học tập tại Bạch Mai</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="order-5 col-span-4 flex flex-col gap-5 md:col-span-4 xl:order-5 xl:col-span-4 xl:pt-12">
                    {rightFeatures.map((item) => (
                        <FeatureCard key={item.title} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </section>
    );
}
