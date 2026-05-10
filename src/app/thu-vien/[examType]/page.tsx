"use client";

import Link from "next/link";
import { use } from "react";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ExamTypeSelectorSection from "@/app/thu-vien/components/exam-type-selector/ExamTypeSelectorSection";
import { EXAM_TYPE_BY_ID } from "@/app/thu-vien/components/exam-type-selector/exam-types";
import { usePublicSeoExams } from "@/hooks/usePublicSeoExams";

type ThuVienExamTypePageProps = {
    params: Promise<{ examType: string }>;
};

function getExamName(item: Record<string, unknown>, index: number) {
    const name = item.title ?? item.name ?? item.examName;
    return typeof name === "string" && name.trim().length > 0 ? name : `De thi #${index + 1}`;
}

export default function ThuVienExamTypePage({ params }: ThuVienExamTypePageProps) {
    const { examType: examTypeSlug } = use(params);
    const examType = EXAM_TYPE_BY_ID[examTypeSlug];

    const { exams, response, loading, error } = usePublicSeoExams({
        page: 1,
        limit: 20,
        typeOfExam: examType?.typeOfExam,
    });

    if (!examType) {
        return (
            <div className="space-y-8 pb-16">
                <RevealOnScroll className="w-full">
                    <ExamTypeSelectorSection />
                </RevealOnScroll>

                <RevealOnScroll className="w-full">
                    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-800">
                        Loai de thi khong hop le. Vui long chon lai trong danh sach.
                    </div>
                </RevealOnScroll>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-16">
            <RevealOnScroll className="w-full">
                <ExamTypeSelectorSection />
            </RevealOnScroll>

            <RevealOnScroll className="w-full">
                <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-2xl font-bold text-blue-900">Danh sach de: {examType.name}</h2>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
                            {response?.total ?? exams.length} de
                        </span>
                    </div>

                    {loading ? <p className="text-slate-600">Dang tai danh sach de thi...</p> : null}
                    {error ? <p className="text-red-600">Khong tai duoc danh sach de thi.</p> : null}

                    {!loading && !error && exams.length === 0 ? (
                        <p className="text-slate-600">Chua co de thi cho loai nay.</p>
                    ) : null}

                    {!loading && !error && exams.length > 0 ? (
                        <div className="grid gap-3 md:grid-cols-2">
                            {exams.map((exam, index) => {
                                const item = exam as Record<string, unknown>;
                                const id = item.id ?? item.examId;

                                return (
                                    <article
                                        key={`${String(id ?? index)}-${index}`}
                                        className="rounded-xl border border-slate-200 p-4"
                                    >
                                        <p className="text-base font-semibold text-slate-900">{getExamName(item, index)}</p>
                                        {typeof item.description === "string" && item.description ? (
                                            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                                        ) : null}
                                        {id ? (
                                            <Link
                                                href={`/thu-vien/${examType.id}/${id}`}
                                                className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
                                            >
                                                Xem chi tiet
                                            </Link>
                                        ) : null}
                                    </article>
                                );
                            })}
                        </div>
                    ) : null}
                </section>
            </RevealOnScroll>
        </div>
    );
}