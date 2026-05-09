type StepNumber = 1 | 2 | 3 | 4;

type StepProgressItem = {
    step: StepNumber;
    label: string;
};

type StepProgressTrackerProps = {
    items: StepProgressItem[];
    currentStep: StepNumber;
    maxAvailableStep: StepNumber;
    onStepSelect: (step: StepNumber) => void;
};

export default function StepProgressTracker({ items, currentStep, maxAvailableStep, onStepSelect }: StepProgressTrackerProps) {
    const activeIndex = Math.max(
        0,
        items.findIndex((item) => item.step === currentStep),
    );
    const progressPercent = items.length > 1 ? (activeIndex / (items.length - 1)) * 78 : 0;

    return (
        <div className="mx-auto mt-8 max-w-[58rem]">
            <div className="rounded-[1.8rem] border border-[#0D41A9]/12 bg-white px-4 py-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] md:px-8">
                <div className="relative">
                    <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 h-[6px] rounded-full bg-slate-200/85" />
                    <div
                        className="pointer-events-none absolute left-[12.5%] top-7 h-[6px] rounded-full bg-gradient-to-r from-[#0D41A9] to-[#3F7BFF] shadow-[0_0_16px_rgba(13,65,169,0.35)] transition-[width] duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />

                    <div className="relative grid grid-cols-4 gap-2">
                        {items.map((item) => {
                            const isCurrent = currentStep === item.step;
                            const isPassed = item.step < currentStep && item.step <= maxAvailableStep;
                            const isAvailable = item.step <= maxAvailableStep;

                            return (
                                <button
                                    key={item.step}
                                    type="button"
                                    disabled={!isAvailable}
                                    onClick={() => onStepSelect(item.step)}
                                    className="group flex flex-col items-center text-center disabled:cursor-not-allowed"
                                    aria-current={isCurrent ? "step" : undefined}
                                >
                                    <span
                                        className={`relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 text-base font-extrabold transition-all md:h-16 md:w-16 md:text-lg ${
                                            isCurrent
                                                ? "scale-105 border-[#0D41A9] bg-[#0D41A9] text-white shadow-[0_14px_30px_rgba(13,65,169,0.35)]"
                                                : isPassed
                                                    ? "border-[#0D41A9] bg-[#E9F0FF] text-[#0D41A9]"
                                                    : isAvailable
                                                        ? "border-slate-300 bg-white text-slate-700 group-hover:border-[#0D41A9]/45"
                                                        : "border-slate-200 bg-slate-100 text-slate-400"
                                        }`}
                                    >
                                        {item.step}
                                    </span>
                                    <span
                                        className={`mt-3 text-xs font-semibold uppercase tracking-[0.08em] md:text-[0.81rem] ${
                                            isCurrent || isPassed ? "text-[#0D41A9]" : isAvailable ? "text-slate-700" : "text-slate-400"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
