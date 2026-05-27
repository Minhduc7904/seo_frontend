import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Award,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Search,
    Star,
    UserRound,
} from "lucide-react";
import { teacherProfileService, type PublicSeoTeacherProfileItem, type PublicSeoTeacherProfileListSortBy } from "@/lib/api";

type TeacherListingPageProps = {
    searchParams: Promise<{
        page?: string | string[];
        limit?: string | string[];
        search?: string | string[];
        isFeatured?: string | string[];
        sortBy?: string | string[];
        sortOrder?: string | string[];
    }>;
};

type ListingQuery = {
    page: number;
    limit: number;
    search?: string;
    isFeatured?: boolean;
    sortBy: PublicSeoTeacherProfileListSortBy;
    sortOrder: "asc" | "desc";
};

const DEFAULT_PAGE_SIZE = 12;
const DEFAULT_SORT_BY: PublicSeoTeacherProfileListSortBy = "sortOrder";
const DEFAULT_SORT_ORDER: "asc" | "desc" = "asc";
const SORT_BY_VALUES: PublicSeoTeacherProfileListSortBy[] = [
    "teacherProfileId",
    "displayName",
    "slug",
    "visibility",
    "isFeatured",
    "viewCount",
    "sortOrder",
    "createdAt",
    "updatedAt",
];

export const metadata: Metadata = {
    title: "Đội ngũ giáo viên | BeeEdu",
    description:
        "Danh sách giáo viên BeeEdu / Toán thầy Bee với thông tin chuyên môn, kinh nghiệm giảng dạy và hồ sơ chi tiết.",
    alternates: { canonical: "/doi-ngu/giao-vien" },
    openGraph: {
        title: "Đội ngũ giáo viên | BeeEdu",
        description:
            "Khám phá đội ngũ giáo viên BeeEdu / Toán thầy Bee, kinh nghiệm giảng dạy và thông tin lớp học.",
        url: "/doi-ngu/giao-vien",
        type: "website",
    },
};

function getSingleValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

function getTextValue(value: unknown) {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getPage(value: string | string[] | undefined) {
    const page = Number(getSingleValue(value));
    return Number.isInteger(page) && page > 0 ? page : 1;
}

function getLimit(value: string | string[] | undefined) {
    const limit = Number(getSingleValue(value));
    return Number.isInteger(limit) && limit > 0 && limit <= 48 ? limit : DEFAULT_PAGE_SIZE;
}

function getBooleanValue(value: string | string[] | undefined) {
    const rawValue = getSingleValue(value);

    if (rawValue === "true") {
        return true;
    }

    if (rawValue === "false") {
        return false;
    }

    return undefined;
}

function getSortBy(value: string | string[] | undefined): PublicSeoTeacherProfileListSortBy {
    const rawValue = getSingleValue(value);
    return SORT_BY_VALUES.includes(rawValue as PublicSeoTeacherProfileListSortBy)
        ? (rawValue as PublicSeoTeacherProfileListSortBy)
        : DEFAULT_SORT_BY;
}

function getSortOrder(value: string | string[] | undefined): "asc" | "desc" {
    return getSingleValue(value) === "desc" ? "desc" : DEFAULT_SORT_ORDER;
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

function buildQuery(rawParams: Awaited<TeacherListingPageProps["searchParams"]>): ListingQuery {
    const search = getTextValue(getSingleValue(rawParams.search));

    return {
        page: getPage(rawParams.page),
        limit: getLimit(rawParams.limit),
        search,
        isFeatured: getBooleanValue(rawParams.isFeatured),
        sortBy: getSortBy(rawParams.sortBy),
        sortOrder: getSortOrder(rawParams.sortOrder),
    };
}

function buildListingHref(query: ListingQuery, page: number, overrides: Partial<ListingQuery> = {}) {
    const nextQuery = { ...query, ...overrides, page };
    const params = new URLSearchParams();

    if (nextQuery.page > 1) {
        params.set("page", String(nextQuery.page));
    }

    if (nextQuery.limit !== DEFAULT_PAGE_SIZE) {
        params.set("limit", String(nextQuery.limit));
    }

    if (nextQuery.search) {
        params.set("search", nextQuery.search);
    }

    if (typeof nextQuery.isFeatured === "boolean") {
        params.set("isFeatured", String(nextQuery.isFeatured));
    }

    if (nextQuery.sortBy !== DEFAULT_SORT_BY) {
        params.set("sortBy", nextQuery.sortBy);
    }

    if (nextQuery.sortOrder !== DEFAULT_SORT_ORDER) {
        params.set("sortOrder", nextQuery.sortOrder);
    }

    const queryString = params.toString();
    return queryString ? `/doi-ngu/giao-vien?${queryString}` : "/doi-ngu/giao-vien";
}

function buildPageItems(page: number, totalPages: number) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
    const normalized = Array.from(pages)
        .filter((item) => item >= 1 && item <= totalPages)
        .sort((a, b) => a - b);
    const items: Array<number | "..."> = [];

    for (let index = 0; index < normalized.length; index += 1) {
        const current = normalized[index];
        const previous = normalized[index - 1];

        if (previous && current - previous > 1) {
            items.push("...");
        }

        items.push(current);
    }

    return items;
}

function getTeacherHref(slug: string) {
    return `/doi-ngu/giao-vien/chi-tiet/${encodeURIComponent(slug)}`;
}

function TeacherCard({ profile }: { profile: PublicSeoTeacherProfileItem }) {
    const slug = getTextValue(profile.slug);
    const displayName = getTextValue(profile.displayName) ?? "Giáo viên BeeEdu";
    const imageSrc = normalizeImageSrc(profile.profileImageUrl);
    const yearsExperience = getNumberValue(profile.yearsExperience);
    const viewCount = getNumberValue(profile.viewCount);
    const subjectItems = splitList(profile.teachingSubjects).slice(0, 3);
    const expertise = getTextValue(profile.expertise);
    const href = slug ? getTeacherHref(slug) : "/doi-ngu/giao-vien";

    return (
        <Link
            href={href}
            className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-blue-100 bg-white shadow-sm shadow-blue-900/5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_46px_rgba(25,77,182,0.14)]"
            aria-label={`Xem hồ sơ ${displayName}`}
        >
            <div className="relative bg-[#EAF6FB] p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-100">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={`Ảnh giáo viên ${displayName}`}
                            fill
                            sizes="(min-width: 1280px) 280px, (min-width: 768px) 45vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                            <Star className="h-3.5 w-3.5 fill-blue-950" aria-hidden="true" />
                            Nổi bật
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex-1">
                    <p className="text-xs font-bold uppercase text-blue-700">
                        {profile.workplace || "BeeEdu"}
                    </p>
                    <h2 className="mt-2 line-clamp-2 text-xl font-extrabold leading-snug text-blue-950">
                        {displayName}
                    </h2>
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

                <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                    {yearsExperience > 0 ? (
                        <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-blue-700" aria-hidden="true" />
                            <span>
                                <strong className="text-blue-900">+{yearsExperience}</strong> năm kinh nghiệm
                            </span>
                        </div>
                    ) : null}
                    {expertise ? (
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-blue-700" aria-hidden="true" />
                            <span className="line-clamp-1">{expertise}</span>
                        </div>
                    ) : null}
                    {viewCount > 0 ? (
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-blue-700" aria-hidden="true" />
                            <span>{viewCount.toLocaleString("vi-VN")} lượt xem hồ sơ</span>
                        </div>
                    ) : null}
                </div>

                <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-blue-900">
                    Xem hồ sơ
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
            </div>
        </Link>
    );
}

function TeacherPagination({
    query,
    page,
    totalPages,
    hasPrevious,
    hasNext,
}: {
    query: ListingQuery;
    page: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
}) {
    if (totalPages <= 1) {
        return null;
    }

    const safePage = Math.min(Math.max(page, 1), totalPages);
    const items = buildPageItems(safePage, totalPages);

    return (
        <nav aria-label="Phân trang giáo viên" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {hasPrevious && safePage > 1 ? (
                <Link
                    href={buildListingHref(query, safePage - 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                    aria-label="Trang trước"
                >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
            ) : (
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-300">
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </span>
            )}

            {items.map((item, index) =>
                item === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-slate-500">
                        ...
                    </span>
                ) : (
                    <Link
                        key={item}
                        href={buildListingHref(query, item)}
                        aria-current={item === safePage ? "page" : undefined}
                        className={`min-w-10 rounded-xl border px-3 py-2 text-center text-sm font-bold transition ${
                            item === safePage
                                ? "border-blue-700 bg-blue-700 text-white"
                                : "border-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                    >
                        {item}
                    </Link>
                ),
            )}

            {hasNext && safePage < totalPages ? (
                <Link
                    href={buildListingHref(query, safePage + 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                    aria-label="Trang sau"
                >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            ) : (
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-300">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
            )}
        </nav>
    );
}

export default async function TeacherListingPage({ searchParams }: TeacherListingPageProps) {
    const rawParams = await searchParams;
    const query = buildQuery(rawParams);
    const response = await teacherProfileService
        .getPublicSeoTeacherProfiles({
            page: query.page,
            limit: query.limit,
            search: query.search,
            isFeatured: query.isFeatured,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        })
        .catch(() => null);
    const profiles = response?.data ?? [];
    const pagination = response?.meta ?? {
        page: query.page,
        limit: query.limit,
        total: profiles.length,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
    };
    const allTeachersHref = buildListingHref(query, 1, { isFeatured: undefined });
    const featuredTeachersHref = buildListingHref(query, 1, { isFeatured: true });
    const isFeaturedFilter = query.isFeatured === true;

    return (
        <div className="space-y-10 pb-16">
            <section className="overflow-hidden rounded-[2rem] bg-[#EAF6FB] p-6 md:p-8">
                <div className="grid gap-8 xl:grid-cols-[1fr_360px] xl:items-center">
                    <div>
                        <p className="text-sm font-extrabold uppercase text-blue-700">Đội ngũ BeeEdu</p>
                        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-blue-950 md:text-5xl">
                            Giáo viên đồng hành theo từng mục tiêu học tập
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
                            Danh sách hồ sơ giáo viên đang xuất bản trên hệ thống SEO public, gồm chuyên môn, kinh
                            nghiệm, hình thức giảng dạy và thông tin lớp học chi tiết.
                        </p>

                        <form action="/doi-ngu/giao-vien" className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <label className="relative min-w-0 flex-1">
                                <span className="sr-only">Tìm kiếm giáo viên</span>
                                <Search
                                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                    aria-hidden="true"
                                />
                                <input
                                    name="search"
                                    defaultValue={query.search}
                                    placeholder="Tìm theo tên, môn học, chuyên môn..."
                                    className="h-12 w-full rounded-xl border border-white bg-white pl-12 pr-4 text-sm font-semibold text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                                />
                            </label>
                            {typeof query.isFeatured === "boolean" ? (
                                <input type="hidden" name="isFeatured" value={String(query.isFeatured)} />
                            ) : null}
                            {query.sortBy !== DEFAULT_SORT_BY ? (
                                <input type="hidden" name="sortBy" value={query.sortBy} />
                            ) : null}
                            {query.sortOrder !== DEFAULT_SORT_ORDER ? (
                                <input type="hidden" name="sortOrder" value={query.sortOrder} />
                            ) : null}
                            <button
                                type="submit"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-700 px-5 text-sm font-bold text-white transition hover:bg-blue-900"
                            >
                                Tìm kiếm
                            </button>
                        </form>
                    </div>

                    <div className="relative hidden min-h-[260px] xl:block">
                        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#FDD22C]/75" />
                        <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-cyan-300/80" />
                        <div className="absolute inset-x-8 bottom-5 rounded-[1.6rem] bg-white p-5 shadow-[0_22px_50px_rgba(25,77,182,0.16)]">
                            <p className="text-4xl font-extrabold text-blue-900">
                                {pagination.total.toLocaleString("vi-VN")}
                            </p>
                            <p className="mt-2 text-sm font-bold uppercase text-slate-500">hồ sơ giáo viên</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-2xl font-extrabold text-blue-950">Danh sách giáo viên</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {query.search
                                ? `Kết quả tìm kiếm cho "${query.search}"`
                                : "Hiển thị các hồ sơ giáo viên đang được xuất bản."}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={allTeachersHref}
                            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                                !isFeaturedFilter
                                    ? "border-blue-700 bg-blue-700 text-white"
                                    : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                        >
                            Tất cả
                        </Link>
                        <Link
                            href={featuredTeachersHref}
                            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                                isFeaturedFilter
                                    ? "border-blue-700 bg-blue-700 text-white"
                                    : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                        >
                            Giáo viên nổi bật
                        </Link>
                    </div>
                </div>

                {profiles.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {profiles.map((profile) => (
                            <TeacherCard key={profile.teacherProfileId ?? profile.slug} profile={profile} />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-blue-200 bg-blue-50/60 p-8 text-center">
                        <UserRound className="h-12 w-12 text-blue-700" aria-hidden="true" />
                        <h2 className="mt-4 text-xl font-extrabold text-blue-950">Chưa có hồ sơ phù hợp</h2>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                            Hãy thử bỏ bộ lọc nổi bật hoặc tìm kiếm bằng từ khóa khác.
                        </p>
                    </div>
                )}

                <TeacherPagination
                    query={query}
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    hasPrevious={pagination.hasPrevious}
                    hasNext={pagination.hasNext}
                />
            </section>
        </div>
    );
}
