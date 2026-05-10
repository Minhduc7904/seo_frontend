"use client";

import Link from "next/link";

export type ExamCardData = {
    id: string;
    title: string;
    thumbnailUrl: string;
    detailUrl?: string;
    createdAtText?: string;
};

type ExamCardProps = {
    exam: ExamCardData;
};

export default function ExamCard({ exam }: ExamCardProps) {
    const content = (
        <div className="flex w-full items-start gap-4">
            <div className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={exam.thumbnailUrl || "/images/tai_lieu_hoc/defaultExam.jpg"}
                    alt={exam.title}
                    width={100}
                    height={140}
                    className="h-[140px] w-[100px] rounded-md object-cover"
                />
            </div>

            <div className="min-w-0 flex-1">
                <p className="whitespace-normal break-words text-base font-semibold text-slate-900 transition group-hover:text-blue-800">
                    {exam.title}
                </p>

                {exam.createdAtText ? <p className="mt-2 text-sm text-slate-500">{exam.createdAtText}</p> : null}
            </div>
        </div>
    );

    if (exam.detailUrl) {
        return (
            <Link href={exam.detailUrl} className="group block w-full transition hover:-translate-y-0.5">
                {content}
            </Link>
        );
    }

    return <div className="w-full">{content}</div>;
}
