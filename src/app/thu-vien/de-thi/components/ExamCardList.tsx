"use client";

import ExamCard, { type ExamCardData } from "@/app/thu-vien/de-thi/components/ExamCard";

type ExamCardListProps = {
    exams: ExamCardData[];
    loading: boolean;
    emptyText?: string;
    skeletonCount?: number;
    columns?: 1 | 2;
};

function getGridClass(columns: 1 | 2) {
    if (columns === 1) return "grid w-full gap-5";
    return "grid w-full gap-5 md:grid-cols-2";
}

function ExamCardListSkeleton({ columns, skeletonCount }: { columns: 1 | 2; skeletonCount: number }) {
    return (
        <div className={getGridClass(columns)}>
            {Array.from({ length: skeletonCount }).map((_, index) => (
                <article key={`exam-skeleton-${index}`} className="w-full animate-pulse">
                    <div className="flex items-start gap-4">
                        <div className="h-[140px] w-[100px] rounded-md bg-slate-200" />
                        <div className="min-w-0 flex-1 space-y-3">
                            <div className="h-5 w-full rounded bg-slate-200" />
                            <div className="h-5 w-full rounded bg-slate-200" />
                            <div className="h-4 w-32 rounded bg-slate-200" />
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default function ExamCardList({
    exams,
    loading,
    emptyText = "Chua co de thi.",
    skeletonCount,
    columns = 2,
}: ExamCardListProps) {
    if (loading) {
        const count = skeletonCount ?? (columns === 1 ? 4 : 6);
        return <ExamCardListSkeleton columns={columns} skeletonCount={count} />;
    }

    if (!exams.length) {
        return <p className="text-slate-600">{emptyText}</p>;
    }

    return (
        <div className={getGridClass(columns)}>
            {exams.map((exam) => (
                <article key={exam.id} className="w-full">
                    <ExamCard exam={exam} />
                </article>
            ))}
        </div>
    );
}
