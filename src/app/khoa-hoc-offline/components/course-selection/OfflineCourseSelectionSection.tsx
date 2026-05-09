"use client";

import { useMemo, useState } from "react";
import { GRADE_GROUPS, OFFLINE_SUBJECTS, OFFLINE_TEACHERS } from "./data";
import StepGradeGroupSelector from "./StepGradeGroupSelector";
import StepProgressTracker from "./StepProgressTracker";
import StepTeacherInfo from "./StepTeacherInfo";
import StepSubjectSelector from "./StepSubjectSelector";
import StepTeacherSelector from "./StepTeacherSelector";

type StepNumber = 1 | 2 | 3 | 4;

const STEP_ITEMS: Array<{ step: StepNumber; label: string }> = [
    { step: 1, label: "Môn học" },
    { step: 2, label: "Lớp" },
    { step: 3, label: "Thầy cô" },
    { step: 4, label: "Thông tin" },
];

export default function OfflineCourseSelectionSection() {
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState<"" | "tieu-hoc" | "thcs" | "thpt">("");
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [currentStep, setCurrentStep] = useState<StepNumber>(1);
    const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
    const [slideKey, setSlideKey] = useState(0);

    const filteredTeachers = useMemo(() => {
        if (!selectedSubjectId || !selectedGroupId) {
            return [];
        }
        return OFFLINE_TEACHERS.filter(
            (teacher) => teacher.subjects.includes(selectedSubjectId) && teacher.gradeGroups.includes(selectedGroupId),
        );
    }, [selectedGroupId, selectedSubjectId]);

    const activeTeacherId =
        selectedTeacherId && filteredTeachers.some((teacher) => teacher.id === selectedTeacherId) ? selectedTeacherId : "";
    const selectedTeacher = filteredTeachers.find((teacher) => teacher.id === activeTeacherId);

    const maxAvailableStep: StepNumber = !selectedSubjectId
        ? 1
        : !selectedGroupId
            ? 2
            : !activeTeacherId
                ? 3
                : 4;

    const currentMainStep: 1 | 2 | 3 = currentStep === 4 ? 3 : currentStep;

    const goToStep = (nextStep: StepNumber) => {
        if (nextStep === currentStep) {
            return;
        }

        const previousMainStep = currentStep === 4 ? 3 : currentStep;
        const nextMainStep = nextStep === 4 ? 3 : nextStep;

        if (previousMainStep !== nextMainStep) {
            setSlideDirection(nextMainStep > previousMainStep ? 1 : -1);
            setSlideKey((value) => value + 1);
        }

        setCurrentStep(nextStep);
    };

    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 py-12 md:py-16">
            <div className="layout-grid">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <header className="mx-auto max-w-[60rem] text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0D41A9]">Chọn khóa học offline</p>
                        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                            Chọn nhanh lộ trình phù hợp chỉ với 4 bước
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
                            Từ môn học đến lớp và giáo viên phụ trách, BeeEdu giúp bạn chọn đúng khóa học offline ngay trong vài thao tác.
                        </p>
                    </header>

                    <StepProgressTracker
                        items={STEP_ITEMS}
                        currentStep={currentStep}
                        maxAvailableStep={maxAvailableStep}
                        onStepSelect={goToStep}
                    />

                    <div className="mt-7">
                        <div className="relative overflow-hidden">
                            <div
                                key={`main-step-${currentMainStep}-${slideKey}`}
                                className={`step-main-panel ${
                                    slideDirection === 1 ? "step-main-panel-enter-from-right" : "step-main-panel-enter-from-left"
                                }`}
                            >
                                {currentMainStep === 1 ? (
                                    <StepSubjectSelector
                                        subjects={OFFLINE_SUBJECTS}
                                        selectedSubjectId={selectedSubjectId}
                                        onSelect={(subjectId) => {
                                            setSelectedSubjectId(subjectId);
                                            setSelectedGroupId("");
                                            setSelectedTeacherId("");
                                            goToStep(2);
                                        }}
                                    />
                                ) : null}

                                {currentMainStep === 2 ? (
                                    <StepGradeGroupSelector
                                        groups={GRADE_GROUPS}
                                        selectedGroupId={selectedGroupId}
                                        onSelect={(groupId) => {
                                            setSelectedGroupId(groupId);
                                            setSelectedTeacherId("");
                                            goToStep(3);
                                        }}
                                    />
                                ) : null}

                                {currentMainStep === 3 ? (
                                    <StepTeacherSelector
                                        teachers={filteredTeachers}
                                        selectedTeacherId={activeTeacherId}
                                        onSelect={(teacherId) => {
                                            setSelectedTeacherId(teacherId);
                                            if (currentStep !== 4) {
                                                goToStep(4);
                                            }
                                        }}
                                    />
                                ) : null}
                            </div>
                        </div>

                        {currentStep === 4 && selectedTeacher ? (
                            <div key={`step-4-${selectedTeacher.id}`} className="step-info-panel-enter mt-6">
                                <StepTeacherInfo teacher={selectedTeacher} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes panelEnterFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(42px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes panelEnterFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-42px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes infoEnter {
                    from {
                        opacity: 0;
                        transform: translateY(14px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .step-main-panel {
                    will-change: transform, opacity;
                }

                .step-main-panel-enter-from-right {
                    animation: panelEnterFromRight 380ms cubic-bezier(0.2, 0.75, 0.2, 1) both;
                }

                .step-main-panel-enter-from-left {
                    animation: panelEnterFromLeft 380ms cubic-bezier(0.2, 0.75, 0.2, 1) both;
                }

                .step-info-panel-enter {
                    animation: infoEnter 300ms ease-out both;
                }
            `}</style>
        </section>
    );
}
