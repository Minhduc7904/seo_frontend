import Image from "next/image";

type RankingBoardItemProps = {
    rank: number;
    name: string;
    score: number;
};

const rankImageMap: Record<number, string> = {
    1: "/images/rank/Rank1.png",
    2: "/images/rank/Rank2.png",
    3: "/images/rank/Rank3.png",
};

export default function RankingBoardItem({
    rank,
    name,
    score,
}: RankingBoardItemProps) {
    const rankImage = rankImageMap[rank];

    return (
        <li className="inline-flex w-full max-w-80 items-center justify-between">
            <div className="flex w-48 items-center gap-3">
                {rankImage ? (
                    <Image
                        src={rankImage}
                        alt={`Rank ${rank}`}
                        width={32}
                        height={32}
                        className="h-8 w-8"
                    />
                ) : (
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-zinc-700">
                        {rank}
                    </div>
                )}

                <div className="inline-flex items-center gap-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800">
                        {name.charAt(0)}
                    </div>
                    <p className="w-36 truncate text-base font-medium text-neutral-950">{name}</p>
                </div>
            </div>

            <div className="inline-flex items-center gap-3">
                <p className="w-20 text-right text-base font-semibold text-neutral-950">{score}</p>
                <Image src="/images/rank/Point.svg" alt="Point" width={10} height={16} className="h-4 w-2.5" />
            </div>
        </li>
    );
}
