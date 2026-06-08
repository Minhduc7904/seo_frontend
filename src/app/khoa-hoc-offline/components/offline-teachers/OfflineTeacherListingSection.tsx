import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Award,
    BookOpenCheck,
    GraduationCap,
    MapPin,
    Sparkles,
    UserRound,
} from "lucide-react";
import { teacherProfileService, type PublicSeoTeacherProfileItem } from "@/lib/api";

const OFFLINE_TEACHER_DETAIL_BASE_PATH = "/khoa-hoc-offline/chi-tiet";

function getTextValue(value: unknown) {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getNumberValue(value: unknown) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsedValue = Number(value);
        return Number.isFinite(parsedValue) ? parsedValue : 0;
    }

    return 0;
}

function normalizeImageSrc(value: unknown) {
    const src = getTextValue(value);

    if (!src) {
        return undefined;
    }

    if (/^https?:\/\//i.test(src) || src.startsWith("/")) {
        return src;
    }

    return `/${src.replace(/^\/+/, "")}`;
}

function splitList(value?: string) {
    return (value ?? "")
        .split(/[,;\n]/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function getTeacherDetailHref(slug: string) {
    return `${OFFLINE_TEACHER_DETAIL_BASE_PATH}/${encodeURIComponent(slug)}`;
}

async function getOfflineTeacherProfiles() {
    try {
        const payload = await teacherProfileService.getPublicSeoTeacherProfiles({
            page: 1,
            limit: 12,
            sortBy: "sortOrder",
            sortOrder: "asc",
        });

        return payload.data ?? [];
    } catch {
        return [];
    }
}

function TeacherMetric({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
            {icon}
            <span className="min-w-0 truncate">{label}</span>
        </span>
    );
}

function OfflineTeacherCard({
    profile,
    priority,
}: {
    profile: PublicSeoTeacherProfileItem;
    priority: boolean;
}) {
    const slug = getTextValue(profile.slug);
    const displayName = getTextValue(profile.displayName) ?? "Giáo viên BeeEdu";
    const imageSrc = normalizeImageSrc(profile.profileImageUrl);
    const href = slug ? getTeacherDetailHref(slug) : "/khoa-hoc-offline";
    const yearsExperience = getNumberValue(profile.yearsExperience);
    const subjectItems = splitList(profile.teachingSubjects).slice(0, 3);
    const gradeItems = splitList(profile.gradeLevels).slice(0, 2);
    const area = getTextValue(profile.teachingArea) ?? getTextValue(profile.contactAddress);
    const expertise = getTextValue(profile.expertise);

    return (
        <Link
            href={href}
            className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-blue-100 bg-white shadow-sm shadow-blue-950/5 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_46px_rgba(15,65,169,0.14)]"
            aria-label={`Xem chi tiết giáo viên ${displayName}`}
        >
            <div className="relative bg-[#EAF6FB] p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-100">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={`Ảnh giáo viên ${displayName}`}
                            fill
                            sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={priority}
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-[#FDD22C]/25 p-6 text-center text-blue-900">
                            <UserRound className="h-12 w-12" aria-hidden="true" />
                            <p className="mt-3 text-sm font-bold">Chưa có ảnh giáo viên</p>
                        </div>
                    )}

                    {profile.isFeatured ? (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#FDD22C] px-3 py-1 text-xs font-extrabold text-blue-950 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            Nổi bật
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex-1">
                    <p className="text-xs font-bold uppercase text-blue-700">
                        {profile.workplace || "BeeEdu Offline"}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-snug text-blue-950">
                        {displayName}
                    </h3>
                    {profile.headline ? (
                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-700">
                            {profile.headline}
                        </p>
                    ) : null}
                    {profile.shortDescription ? (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                            {profile.shortDescription}
                        </p>
                    ) : null}

                    {subjectItems.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {subjectItems.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                    {yearsExperience > 0 ? (
                        <TeacherMetric
                            icon={<Award className="h-4 w-4 text-blue-700" aria-hidden="true" />}
                            label={`+${yearsExperience} năm`}
                        />
                    ) : null}
                    {gradeItems.length > 0 ? (
                        <TeacherMetric
                            icon={<GraduationCap className="h-4 w-4 text-blue-700" aria-hidden="true" />}
                            label={gradeItems.join(", ")}
                        />
                    ) : null}
                    {area ? (
                        <TeacherMetric
                            icon={<MapPin className="h-4 w-4 text-blue-700" aria-hidden="true" />}
                            label={area}
                        />
                    ) : null}
                    {expertise ? (
                        <TeacherMetric
                            icon={<BookOpenCheck className="h-4 w-4 text-blue-700" aria-hidden="true" />}
                            label={expertise}
                        />
                    ) : null}
                </div>

                <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-blue-900">
                    Xem lịch học và hồ sơ
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
            </div>
        </Link>
    );
}

export default async function OfflineTeacherListingSection() {
    const profiles = await getOfflineTeacherProfiles();
    const featuredCount = profiles.filter((profile) => profile.isFeatured).length;

    return (
        <section className="col-span-full">
            <div className="layout-grid gap-y-8">
                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end">
                        <div>
                            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-blue-700">
                                Giáo viên Offline
                            </p>
                            <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl">
                                Chọn giáo viên trước, xem chi tiết lớp học sau
                            </h2>
                            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
                                Danh sách giáo viên được ưu tiên hiển thị trên trang khóa Offline. Mỗi hồ sơ có lịch học,
                                chuyên môn, phương pháp giảng dạy và thông tin đăng ký riêng.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 rounded-[1.4rem] bg-[#0D41A9] p-4 text-white">
                            <div className="rounded-2xl bg-white/10 p-4">
                                <p className="text-3xl font-extrabold">{profiles.length}</p>
                                <p className="mt-1 text-xs font-bold uppercase text-white/75">hồ sơ</p>
                            </div>
                            <div className="rounded-2xl bg-[#FDD22C] p-4 text-blue-950">
                                <p className="text-3xl font-extrabold">{featuredCount}</p>
                                <p className="mt-1 text-xs font-bold uppercase">nổi bật</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 md:col-span-8 xl:col-span-12">
                    {profiles.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {profiles.map((profile, index) => (
                                <OfflineTeacherCard
                                    key={profile.teacherProfileId ?? profile.slug}
                                    profile={profile}
                                    priority={index < 3}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-blue-200 bg-blue-50/60 p-8 text-center">
                            <UserRound className="h-12 w-12 text-blue-700" aria-hidden="true" />
                            <h3 className="mt-4 text-xl font-extrabold text-blue-950">
                                Chưa có hồ sơ giáo viên
                            </h3>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                                Danh sách giáo viên khóa Offline sẽ được hiển thị tại đây khi dữ liệu SEO public sẵn sàng.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
