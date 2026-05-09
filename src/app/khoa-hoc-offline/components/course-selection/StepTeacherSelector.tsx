import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { OfflineTeacher } from "./data";

type StepTeacherSelectorProps = {
    teachers: OfflineTeacher[];
    selectedTeacherId: string;
    onSelect: (teacherId: string) => void;
};

export default function StepTeacherSelector({ teachers, selectedTeacherId, onSelect }: StepTeacherSelectorProps) {
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const hasMultipleTeachers = teachers.length > 1;

    return (
        <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
            <div className="flex justify-center items-center gap-3">
                <div>
                    <h3 className="text-2xl font-extrabold leading-tight text-slate-900">Chọn thầy/cô phù hợp</h3>
                </div>
            </div>

            {teachers.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm text-slate-600">
                    Chưa có giáo viên phù hợp với tổ hợp môn và lớp đã chọn. Vui lòng thử lớp khác.
                </div>
            ) : (
                <div className="relative mt-5 overflow-hidden px-1 py-2">
                    <Swiper
                        centeredSlides
                        slidesPerView={1.12}
                        spaceBetween={16}
                        loop={teachers.length > 3}
                        speed={650}
                        grabCursor
                        breakpoints={{
                            768: {
                                slidesPerView: 2.1,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        onSwiper={setSwiper}
                        onRealIndexChange={(instance) => {
                            setActiveIndex(instance.realIndex);
                        }}
                        className="!overflow-visible py-3"
                    >
                        {teachers.map((teacher, index) => {
                            const isSelected = teacher.id === selectedTeacherId;
                            const isFocused = index === activeIndex;
                            return (
                                <SwiperSlide key={teacher.id} className="!h-auto">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onSelect(teacher.id);
                                            swiper?.slideToLoop(index);
                                        }}
                                        className={`h-full w-full rounded-[1.45rem] border p-5 text-left transition-all duration-500 ${
                                            isSelected
                                                ? "border-[#0D41A9] bg-[#0D41A9]/10 shadow-[0_16px_34px_rgba(13,65,169,0.16)] ring-2 ring-[#0D41A9]/20"
                                                : isFocused
                                                    ? "border-[#0D41A9]/40 bg-[#0D41A9]/[0.03] shadow-[0_12px_26px_rgba(13,65,169,0.12)]"
                                                    : "border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)] hover:border-[#0D41A9]/35"
                                        }`}
                                    >
                                        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#0D41A9]/20">
                                            <Image
                                                src={teacher.avatarImageSrc}
                                                alt={`Ảnh giáo viên ${teacher.name}`}
                                                fill
                                                sizes="56px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="mt-4 text-xl font-bold text-slate-900">{teacher.name}</p>
                                        <p className="mt-1 text-sm text-slate-600">{teacher.title}</p>
                                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#0D41A9]">
                                            Vuốt để xem thêm
                                        </p>
                                    </button>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {hasMultipleTeachers ? (
                        <>
                            <button
                                type="button"
                                aria-label="Thầy cô trước"
                                onClick={() => swiper?.slidePrev()}
                                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 md:left-2"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Thầy cô tiếp theo"
                                onClick={() => swiper?.slideNext()}
                                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 md:right-2"
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2">
                                {teachers.map((teacher, index) => (
                                    <button
                                        key={`teacher-dot-${teacher.id}`}
                                        type="button"
                                        aria-label={`Đến thầy cô ${index + 1}`}
                                        onClick={() => swiper?.slideToLoop(index)}
                                        className={`h-2 rounded-full transition-all ${
                                            index === activeIndex ? "w-10 bg-[#0D41A9]" : "w-4 bg-blue-200 hover:bg-blue-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </section>
    );
}
