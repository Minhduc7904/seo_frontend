import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Download, Infinity, Monitor, PlayCircle, Star, Users } from "lucide-react";
import {
    DEFAULT_COURSE_IMAGE_SRC,
    getOnlineCourseBySlug,
    ONLINE_COURSE_DETAILS,
} from "@/app/khoa-hoc-online/data/online-courses";

const DETAIL_IMAGE_SIZE = { width: 640, height: 420 };

type OnlineCourseDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: OnlineCourseDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const course = getOnlineCourseBySlug(slug);

    if (!course) {
        return {
            title: "Khóa học online | BeeEdu",
            description: "Khóa học online của BeeEdu giúp học sinh học tập linh hoạt và bứt tốc điểm số.",
            alternates: { canonical: `/khoa-hoc-online/${slug}` },
        };
    }

    return {
        title: `${course.title} | BeeEdu`,
        description: course.summary,
        alternates: { canonical: `/khoa-hoc-online/${course.slug}` },
        openGraph: {
            title: `${course.title} | BeeEdu`,
            description: course.summary,
            url: `/khoa-hoc-online/${course.slug}`,
            type: "article",
        },
    };
}

export default async function OnlineCourseDetailPage({ params }: OnlineCourseDetailPageProps) {
    const { slug } = await params;
    const course = getOnlineCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    const relatedCourses = ONLINE_COURSE_DETAILS.filter((item) => item.slug !== course.slug).slice(0, 4);

    return (
        <div className="space-y-12 pb-16">
            <section className="col-span-full relative left-1/2 h-[280px] w-screen -translate-x-1/2 text-white md:h-[300px] xl:h-[400px]">
                <div className="absolute inset-0 bg-[#0D41A9]" />
                <div className="relative layout-grid h-full items-end gap-y-4 pb-6 md:pb-8">
                    <div className="col-span-4 md:col-span-8 xl:col-span-12">
                        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
                            {course.breadcrumbs.map((item, index) => (
                                <span key={item} className="flex items-center gap-2">
                                    {index > 0 ? <span className="text-blue-200">›</span> : null}
                                    <span>{item}</span>
                                </span>
                            ))}
                        </nav>
                    </div>

                    <div className="col-span-4 md:col-span-8 xl:col-span-8">
                        <h1 className="text-3xl font-extrabold leading-tight md:text-4xl xl:text-5xl">
                            {course.title}
                        </h1>
                        <p className="mt-3 max-w-[46rem] text-sm text-blue-100 md:text-base">
                            {course.tagline}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-blue-100">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                                <Star className="h-4 w-4 text-[#FDD22C]" fill="currentColor" aria-hidden="true" />
                                <span>{course.ratingText}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                                <Users className="h-4 w-4" aria-hidden="true" />
                                <span>{course.studentsCount} học viên</span>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                                <span>{course.lessonsCount} bài học</span>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                                <Clock className="h-4 w-4" aria-hidden="true" />
                                <span>{course.totalDuration}</span>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-blue-200">Giáo viên {course.instructor}</p>
                    </div>

                </div>
            </section>

            <section className="col-span-full">
                <div className="layout-grid gap-y-6">
                    <div className="col-span-4 space-y-6 md:col-span-8 xl:col-span-8">
                        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900">Bạn sẽ học được</h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                {course.learningItems.map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                        <p className="text-sm text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900">Khám phá chủ đề liên quan</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {course.relatedTopics.map((topic) => (
                                    <span
                                        key={topic}
                                        className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h2 className="text-xl font-bold text-slate-900">Nội dung khóa học</h2>
                                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                    {course.contentSections.length} phần
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {course.contentSections.map((section) => (
                                    <details key={section.title} className="rounded-xl border border-slate-200 bg-white">
                                        <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-800">
                                            <span>{section.title}</span>
                                            <span className="text-xs text-slate-500">
                                                {section.lessons} • {section.duration}
                                            </span>
                                        </summary>
                                        <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
                                            Nội dung chi tiết sẽ được cập nhật trong phiên bản tiếp theo.
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900">Khóa học liên quan</h3>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                {relatedCourses.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/khoa-hoc-online/${item.slug}`}
                                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/40"
                                    >
                                        <div className="h-16 w-20 overflow-hidden rounded-lg bg-slate-100">
                                            <Image
                                                src={item.imageSrc || DEFAULT_COURSE_IMAGE_SRC}
                                                alt={`Ảnh khóa học ${item.title}`}
                                                width={160}
                                                height={120}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-blue-900 line-clamp-2">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {item.duration} • {item.format}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </article>
                    </div>
                    <aside className="col-span-4 md:col-span-8 xl:col-span-4">
                        <div className="xl:sticky xl:top-24 xl:-mt-[200px]">
                            <div className="rounded-3xl bg-white p-5 text-slate-900 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                                    <Image
                                        src={course.imageSrc || DEFAULT_COURSE_IMAGE_SRC}
                                        alt={`Ảnh khóa học ${course.title}`}
                                        width={DETAIL_IMAGE_SIZE.width}
                                        height={DETAIL_IMAGE_SIZE.height}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="mt-5">
                                    <div className="flex flex-wrap items-baseline gap-3">
                                        <p className="text-3xl font-extrabold text-blue-900">{course.price}</p>
                                        {course.oldPrice ? (
                                            <p className="text-sm text-slate-400 line-through">{course.oldPrice}</p>
                                        ) : null}
                                    </div>
                                    {course.priceNote ? <p className="mt-2 text-xs text-red-500">{course.priceNote}</p> : null}
                                </div>

                                <button
                                    type="button"
                                    className="mt-5 w-full rounded-full bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                                >
                                    Đăng ký khóa học
                                </button>

                                <div className="mt-5 space-y-3 text-sm text-slate-600">
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-4 w-4 text-blue-700" aria-hidden="true" />
                                        <span>Thời lượng: {course.totalDuration}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <PlayCircle className="h-4 w-4 text-blue-700" aria-hidden="true" />
                                        <span>{course.lessonsCount} bài học</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Download className="h-4 w-4 text-blue-700" aria-hidden="true" />
                                        <span>Tài liệu tải về</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Infinity className="h-4 w-4 text-blue-700" aria-hidden="true" />
                                        <span>Truy cập trọn đời</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Monitor className="h-4 w-4 text-blue-700" aria-hidden="true" />
                                        <span>Học trên máy tính hoặc điện thoại</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
