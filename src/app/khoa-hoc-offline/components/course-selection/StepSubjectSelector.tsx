import Image from "next/image";
import type { OfflineSubject } from "./data";

type StepSubjectSelectorProps = {
    subjects: OfflineSubject[];
    selectedSubjectId: string;
    onSelect: (subjectId: string) => void;
};

export default function StepSubjectSelector({ subjects, selectedSubjectId, onSelect }: StepSubjectSelectorProps) {
    return (
        <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
            <div className="flex justify-center items-center gap-3">
                <div>
                    <h3 className="text-2xl font-extrabold leading-tight text-slate-900">Chọn môn học</h3>
                </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {subjects.map((subject) => {
                    const isActive = subject.id === selectedSubjectId;
                    return (
                        <button
                            key={subject.id}
                            type="button"
                            onClick={() => onSelect(subject.id)}
                            className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                                isActive
                                    ? "border-[#0D41A9] shadow-[0_16px_32px_rgba(13,65,169,0.22)] ring-2 ring-[#0D41A9]/25"
                                    : "border-slate-200 hover:border-[#0D41A9]/40 hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]"
                            }`}
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden">
                                <Image
                                    src={subject.cardImageSrc}
                                    alt={`Card môn ${subject.name}`}
                                    fill
                                    className={`object-cover transition duration-500 ${
                                        isActive ? "scale-[1.03]" : "group-hover:scale-[1.03]"
                                    }`}
                                />
                                <div className={`absolute inset-0 ${isActive ? "bg-black/10" : "bg-black/0 group-hover:bg-black/10"}`} />
                            </div>

                            <div className="p-4">
                                <p className="text-xl font-bold text-slate-900">{subject.name}</p>
                                <p className="mt-1 text-sm leading-6 text-slate-600">{subject.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
