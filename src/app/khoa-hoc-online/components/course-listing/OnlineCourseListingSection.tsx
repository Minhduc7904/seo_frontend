"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    DEFAULT_COURSE_IMAGE_SRC,
    ONLINE_COURSES,
    type OnlineCourse,
} from "@/app/khoa-hoc-online/data/online-courses";

const TRACK_OPTIONS: Array<{ id: OnlineCourse["track"] | "ALL"; label: string }> = [
    { id: "ALL", label: "Tất cả" },
    { id: "THPT", label: "THPT Quốc gia" },
    { id: "HSA", label: "HSA" },
    { id: "TSA", label: "TSA" },
    { id: "CO_BAN", label: "Nền tảng" },
];

const GRADE_OPTIONS: Array<{ id: OnlineCourse["grade"] | "ALL"; label: string }> = [
    { id: "ALL", label: "Tất cả" },
    { id: "10", label: "Lớp 10" },
    { id: "11", label: "Lớp 11" },
    { id: "12", label: "Lớp 12" },
];

function CourseCard({ course }: { course: OnlineCourse }) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 transition hover:border-blue-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                    src={course.imageSrc || DEFAULT_COURSE_IMAGE_SRC}
                    alt={`Ảnh minh họa ${course.title}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 520px, (min-width: 768px) 60vw, 100vw"
                />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-lg font-bold text-blue-900 md:text-xl">{course.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{course.summary}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                    Lớp {course.grade}
                </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">{course.track}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{course.duration}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{course.format}</span>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {course.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-lg font-bold text-blue-900">{course.price}</span>
                <Link
                    href={`/khoa-hoc-online/${course.slug}`}
                    className="rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                    Xem chi tiết
                </Link>
            </div>
        </article>
    );
}

export default function OnlineCourseListingSection() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedTrack, setSelectedTrack] = useState<OnlineCourse["track"] | "ALL">("ALL");
    const [selectedGrade, setSelectedGrade] = useState<OnlineCourse["grade"] | "ALL">("ALL");

    const filteredCourses = useMemo(() => {
        const search = searchValue.trim().toLowerCase();

        return ONLINE_COURSES.filter((course) => {
            const matchesTrack = selectedTrack === "ALL" || course.track === selectedTrack;
            const matchesGrade = selectedGrade === "ALL" || course.grade === selectedGrade;
            const matchesSearch =
                !search ||
                course.title.toLowerCase().includes(search) ||
                course.summary.toLowerCase().includes(search);

            return matchesTrack && matchesGrade && matchesSearch;
        });
    }, [searchValue, selectedGrade, selectedTrack]);

    return (
        <section className="col-span-full">
            <div className="layout-grid gap-y-6">
                <aside className="col-span-4 space-y-4 md:col-span-3 xl:col-span-4">
                    <section className="space-y-5 rounded-[1.6rem] bg-white p-5 md:p-6">
                        <h3 className="text-lg font-bold text-slate-900">Lọc khóa học</h3>

                        <div className="flex w-full items-center gap-2">
                            <input
                                id="online-course-search"
                                type="text"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                placeholder="Nhập tên khóa học..."
                                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                            />

                            <button
                                type="button"
                                aria-label="Tìm kiếm khóa học"
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-500"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </div>

                        <div>
                            <p className="mb-2 text-sm font-semibold text-slate-700">Lộ trình</p>
                            <div className="flex flex-wrap gap-2">
                                {TRACK_OPTIONS.map((item) => {
                                    const isActive = item.id === selectedTrack;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSelectedTrack(item.id)}
                                            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                                                isActive
                                                    ? "border-blue-600 bg-blue-50 text-blue-800"
                                                    : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-sm font-semibold text-slate-700">Khối lớp</p>
                            <div className="flex flex-wrap gap-2">
                                {GRADE_OPTIONS.map((item) => {
                                    const isActive = item.id === selectedGrade;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSelectedGrade(item.id)}
                                            className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                                                isActive
                                                    ? "border-blue-600 bg-blue-50 text-blue-800"
                                                    : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-1">
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchValue("");
                                    setSelectedTrack("ALL");
                                    setSelectedGrade("ALL");
                                }}
                                className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Về mặc định
                            </button>
                        </div>
                    </section>
                </aside>

                <section className="col-span-4 rounded-[1.6rem] bg-white p-6 md:col-span-5 md:p-7 xl:col-span-8">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold text-blue-900">Danh sách khóa học online</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Các khóa học online được thiết kế để ôn thi, rèn kỹ năng làm bài và theo dõi tiến độ.
                            </p>
                        </div>
                        <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold leading-none text-blue-800">
                            {filteredCourses.length} khóa học
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                        {filteredCourses.length === 0 ? (
                            <p className="text-sm text-slate-600">Không có khóa học phù hợp với bộ lọc hiện tại.</p>
                        ) : null}
                    </div>
                </section>
            </div>
        </section>
    );
}
