import Image from "next/image";
import RankingBoard from "./RankingBoard";
import StatsSection from "./StatsSection";

export default function FirstSection() {
    return (
        <section className="col-span-full mt-10 flex flex-col gap-10">
            <div className="grid grid-cols-4 gap-5 md:grid-cols-8 xl:grid-cols-12">
                <div className="col-span-4 overflow-hidden rounded-2xl bg-zinc-100 md:col-span-5 xl:col-span-7">
                    <div className="relative h-70 w-full md:h-90 xl:h-105">
                        <Image
                            src="/window.svg"
                            alt="Hinh anh noi bat"
                            fill
                            className="object-contain p-8"
                            priority
                        />
                    </div>
                </div>

                <aside className="col-span-4 flex items-start justify-center md:col-span-3 xl:col-span-5">
                    <RankingBoard />
                </aside>
            </div>
            <StatsSection />
        </section>
    );
}
