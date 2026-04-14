"use client";

import { useState } from "react";
import RankingBoardItem from "./RankingBoardItem";

const periodTabs = [
    { key: "week", label: "Tuần" },
    { key: "month", label: "Tháng" },
    { key: "year", label: "Năm" },
] as const;

type PeriodKey = (typeof periodTabs)[number]["key"];

const rankingByPeriod: Record<PeriodKey, Array<{ rank: number; name: string; score: number }>> = {
    week: [
        { rank: 1, name: "Thủy Tiên", score: 3256 },
        { rank: 2, name: "Phương Mai", score: 2359 },
        { rank: 3, name: "Phương", score: 2356 },
        { rank: 4, name: "Trung Hiếu", score: 2290 },
        { rank: 5, name: "Hà Linh", score: 2230 },
    ],
    month: [
        { rank: 1, name: "Bảo Ngọc", score: 12890 },
        { rank: 2, name: "Thủy Tiên", score: 12140 },
        { rank: 3, name: "Phương Mai", score: 11910 },
        { rank: 4, name: "Minh Châu", score: 11220 },
        { rank: 5, name: "Trung Hiếu", score: 10880 },
    ],
    year: [
        { rank: 1, name: "Quốc Khánh", score: 86540 },
        { rank: 2, name: "Bảo Ngọc", score: 85210 },
        { rank: 3, name: "Thủy Tiên", score: 84000 },
        { rank: 4, name: "Huy Hoàng", score: 82670 },
        { rank: 5, name: "Phương Mai", score: 81020 },
    ],
};

export default function RankingBoard() {
    const [activePeriod, setActivePeriod] = useState<PeriodKey>("week");
    const activeIndex = periodTabs.findIndex((tab) => tab.key === activePeriod);

    return (
        <aside className="inline-flex w-full max-w-100 flex-col items-center gap-5 rounded-xl bg-white p-3 shadow-[0px_2px_4px_0px_rgba(138,138,138,0.25)]">
            <div className="inline-flex items-center justify-center gap-2.5 px-0.5">
                <h2 className="text-center text-3xl font-bold text-blue-800">BẢNG XẾP HẠNG</h2>
            </div>

            <div className="flex w-full flex-col items-center">
                <div className="inline-flex w-full items-center justify-around gap-1">
                    {periodTabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActivePeriod(tab.key)}
                            className={`inline-flex cursor-pointer w-16 flex-col items-center justify-start transition-colors duration-300 ${activePeriod === tab.key ? "text-blue-800" : "text-neutral-600"
                                }`}
                            aria-pressed={activePeriod === tab.key}
                        >
                            <span className="px-1 text-base font-semibold">{tab.label}</span>
                            <span
                                className={`mt-1 h-1 rounded-full transition-all duration-300 ${activePeriod === tab.key ? "w-14 bg-blue-800" : "w-0 bg-transparent"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <div className="mt-3 w-full px-3">
                    <div className="h-px w-full bg-neutral-200" />
                </div>

                <div className="mt-3 w-full px-3 py-2">
                    <div className="w-full overflow-hidden">
                        <div
                            className="flex w-full will-change-transform transition-transform duration-500 ease-in-out"
                            style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
                        >
                            {periodTabs.map((tab) => (
                                <ol
                                    key={tab.key}
                                    className="flex min-w-full w-full shrink-0 flex-col items-start gap-5"
                                >
                                    {rankingByPeriod[tab.key].map((item) => (
                                        <RankingBoardItem
                                            key={`${tab.key}-${item.rank}-${item.name}`}
                                            rank={item.rank}
                                            name={item.name}
                                            score={item.score}
                                        />
                                    ))}
                                </ol>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
