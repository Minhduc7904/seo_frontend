import { Layers3 } from "lucide-react";
import type { GradeGroup } from "./data";

type StepGradeGroupSelectorProps = {
    groups: GradeGroup[];
    selectedGroupId: GradeGroup["id"] | "";
    onSelect: (groupId: GradeGroup["id"]) => void;
};

export default function StepGradeGroupSelector({ groups, selectedGroupId, onSelect }: StepGradeGroupSelectorProps) {
    return (
        <section className="rounded-[1.6rem]  bg-white p-6 md:p-7">
            <div className="flex justify-center items-center gap-3">
                <div>
                    <h3 className="text-2xl font-extrabold leading-tight text-slate-900">Chọn lớp</h3>
                </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
                {groups.map((group) => {
                    const isActive = group.id === selectedGroupId;
                    return (
                        <button
                            key={group.id}
                            type="button"
                            onClick={() => onSelect(group.id)}
                            className={`rounded-2xl border p-5 text-left transition ${
                                isActive
                                    ? "border-[#0D41A9] bg-[#0D41A9]/8 shadow-[0_10px_25px_rgba(13,65,169,0.15)]"
                                    : "border-slate-200 bg-white hover:border-[#0D41A9]/35 hover:bg-[#0D41A9]/[0.03]"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-bold text-slate-900">{group.name}</p>
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D41A9] text-white">
                                    <Layers3 className="h-5 w-5" aria-hidden="true" />
                                </span>
                            </div>

                            <p className="mt-2 text-sm font-semibold text-[#0D41A9]">{group.note}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {group.grades.map((grade) => (
                                    <span
                                        key={`${group.id}-${grade}`}
                                        className="inline-flex min-w-9 items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700"
                                    >
                                        {grade}
                                    </span>
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
