"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { EXAM_TYPES } from "./exam-types";

export default function ExamTypeSelectorSection() {
    const router = useRouter();
    const pathname = usePathname();
    const currentExamTypeId = pathname.split("/").filter(Boolean)[1];
    const selectedExamTypeId = currentExamTypeId ?? EXAM_TYPES[0].id;

    return (
        <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
            <div className="flex items-center justify-center gap-3">
                <h3 className="text-center text-2xl font-extrabold leading-tight text-slate-900">Chon loai de thi</h3>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {EXAM_TYPES.map((examType) => {
                    const isActive = examType.id === selectedExamTypeId;

                    return (
                        <button
                            key={examType.id}
                            type="button"
                            onClick={() => router.push(`/thu-vien/${examType.id}`)}
                            className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                                isActive
                                    ? "border-[#0D41A9] shadow-[0_16px_32px_rgba(13,65,169,0.22)] ring-2 ring-[#0D41A9]/25"
                                    : "border-slate-200 hover:border-[#0D41A9]/40 hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]"
                            }`}
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden">
                                <Image
                                    src={examType.cardImageSrc}
                                    alt={`Card ${examType.name}`}
                                    fill
                                    className={`object-cover transition duration-500 ${
                                        isActive ? "scale-[1.03]" : "group-hover:scale-[1.03]"
                                    }`}
                                />
                                <div className={`absolute inset-0 ${isActive ? "bg-black/10" : "bg-black/0 group-hover:bg-black/10"}`} />
                            </div>

                            <div className="p-4">
                                <p className="text-xl font-bold text-slate-900">{examType.name}</p>
                                <p className="mt-1 text-sm leading-6 text-slate-600">{examType.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}