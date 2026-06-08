import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Award,
    BookOpen,
    Briefcase,
    CalendarDays,
    ExternalLink,
    Eye,
    GraduationCap,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Star,
    Users,
} from "lucide-react";
import MarkdownHtmlRenderer from "@/components/common/MarkdownHtmlRenderer";
import TeacherShareActions from "@/app/doi-ngu/giao-vien/components/TeacherShareActions";
import TeacherClassroomGallerySection from "@/app/doi-ngu/giao-vien/components/TeacherClassroomGallerySection";
import type { PublicSeoTeacherProfileItem } from "@/lib/api";

type TeacherProfileDetailProps = {
    profile: PublicSeoTeacherProfileItem;
    moreProfiles: PublicSeoTeacherProfileItem[];
    backHref?: string;
    backLabel?: string;
    detailBasePath?: string;
};

type DetailSectionProps = {
    title: string;
    children: React.ReactNode;
};

const PROFILE_IMAGE_SIZE = { width: 744, height: 860 };

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

function getExternalHref(value?: string) {
    if (!value) {
        return undefined;
    }

    if (/^https?:\/\//i.test(value) || value.startsWith("mailto:") || value.startsWith("tel:")) {
        return value;
    }

    return `https://${value}`;
}

function getPhoneHref(value?: string) {
    if (!value) {
        return undefined;
    }

    const normalizedPhone = value.replace(/[^\d+]/g, "");
    return normalizedPhone ? `tel:${normalizedPhone}` : undefined;
}

function getZaloHref(value?: string) {
    if (!value) {
        return undefined;
    }

    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    const phone = value.replace(/[^\d]/g, "");
    return phone ? `https://zalo.me/${phone}` : undefined;
}

function formatDate(value?: string) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

const DEFAULT_DETAIL_BASE_PATH = "/doi-ngu/giao-vien/chi-tiet";
const DEFAULT_BACK_HREF = "/doi-ngu";
const DEFAULT_BACK_LABEL = "Quay lại đội ngũ";

function getTeacherHref(slug: string, detailBasePath = DEFAULT_DETAIL_BASE_PATH) {
    return `${detailBasePath.replace(/\/$/, "")}/${encodeURIComponent(slug)}`;
}

function PillList({ items }: { items: string[] }) {
    if (items.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span
                    key={item}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800"
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

function DetailSection({ title, children }: DetailSectionProps) {
    return (
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-bold text-blue-900">{title}</h2>
            {children}
        </section>
    );
}

function InfoRow({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value?: string;
    href?: string;
}) {
    if (!value) {
        return null;
    }

    const content = (
        <>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                {icon}
            </span>
            <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase text-slate-400">{label}</span>
                <span className="mt-0.5 block break-words text-sm font-semibold text-slate-800">{value}</span>
            </span>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/50"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
                {content}
            </a>
        );
    }

    return <div className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3">{content}</div>;
}

function MoreTeacherCard({
    profile,
    detailBasePath,
    fallbackHref,
}: {
    profile: PublicSeoTeacherProfileItem;
    detailBasePath: string;
    fallbackHref: string;
}) {
    const slug = getTextValue(profile.slug);
    const imageSrc = normalizeImageSrc(profile.profileImageUrl);
    const href = slug ? getTeacherHref(slug, detailBasePath) : fallbackHref;

    return (
        <Link href={href} className="group block rounded-2xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/50">
            <div className="flex items-center gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={`Ảnh giáo viên ${profile.displayName}`}
                            width={112}
                            height={128}
                            className="h-full w-full object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#FDD22C]/25 text-xs font-bold text-blue-800">
                            Bee
                        </div>
                    )}
                </div>
                <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-bold text-slate-900 transition group-hover:text-blue-800">
                        {profile.displayName}
                    </p>
                    {profile.headline ? (
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{profile.headline}</p>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}

export default function TeacherProfileDetail({
    profile,
    moreProfiles,
    backHref = DEFAULT_BACK_HREF,
    backLabel = DEFAULT_BACK_LABEL,
    detailBasePath = DEFAULT_DETAIL_BASE_PATH,
}: TeacherProfileDetailProps) {
    const imageSrc = normalizeImageSrc(profile.profileImageUrl);
    const yearsExperience = getNumberValue(profile.yearsExperience);
    const viewCount = getNumberValue(profile.viewCount);
    const updatedAt = formatDate(profile.updatedAt);
    const subjectItems = splitList(profile.teachingSubjects);
    const expertiseItems = splitList(profile.expertise);
    const gradeItems = splitList(profile.gradeLevels);
    const formatItems = splitList(profile.teachingFormats);
    const methodHtml = getTextValue(profile.processedTeachingMethods) ?? profile.teachingMethods;
    const bioHtml = getTextValue(profile.processedBio) ?? profile.bio;
    const ctaLabel = getTextValue(profile.ctaLabel) ?? "Đăng ký học thử";
    const ctaHref = getExternalHref(getTextValue(profile.ctaUrl) ?? getTextValue(profile.bookingUrl));

    return (
        <div className="space-y-8 pb-16">
            <div className="layout-grid gap-y-6">
                <section className="col-span-4 space-y-6 rounded-[1.6rem] bg-white py-6 md:col-span-5 md:py-7 xl:col-span-8">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        {backLabel}
                    </Link>

                    <article className="space-y-6">
                        <section className="rounded-[1.6rem] border border-blue-100 bg-blue-50/50 p-4 md:p-5">
                            <div className="grid gap-6 md:grid-cols-[minmax(0,280px)_1fr] md:items-center">
                                <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.4rem] border-4 border-white bg-slate-100 shadow-lg shadow-blue-900/10">
                                    <div className="aspect-[372/430]">
                                        {imageSrc ? (
                                            <Image
                                                src={imageSrc}
                                                alt={`Ảnh giáo viên ${profile.displayName}`}
                                                width={PROFILE_IMAGE_SIZE.width}
                                                height={PROFILE_IMAGE_SIZE.height}
                                                className="h-full w-full object-cover"
                                                priority
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-[#FDD22C]/25 p-6 text-center text-sm font-semibold text-blue-900">
                                                Chưa có ảnh giáo viên.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="min-w-0 space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {profile.isFeatured ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#FDD22C] px-3 py-1 text-xs font-bold text-blue-900">
                                                <Star className="h-3.5 w-3.5 fill-blue-900" aria-hidden="true" />
                                                Giáo viên nổi bật
                                            </span>
                                        ) : null}
                                        {profile.workplace ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">
                                                <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                                                {profile.workplace}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div>
                                        <h1 className="break-words text-3xl font-extrabold leading-tight text-blue-950 md:text-4xl">
                                            {profile.displayName}
                                        </h1>
                                        {profile.headline ? (
                                            <p className="mt-3 text-lg font-semibold leading-7 text-blue-800">
                                                {profile.headline}
                                            </p>
                                        ) : null}
                                        {profile.shortDescription ? (
                                            <p className="mt-3 text-base leading-7 text-slate-700">
                                                {profile.shortDescription}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {yearsExperience > 0 ? (
                                            <div className="rounded-2xl bg-white p-4">
                                                <div className="flex items-center gap-2 text-blue-800">
                                                    <Award className="h-5 w-5" aria-hidden="true" />
                                                    <span className="text-2xl font-extrabold">+{yearsExperience}</span>
                                                </div>
                                                <p className="mt-1 text-xs font-semibold uppercase text-slate-500">
                                                    năm kinh nghiệm
                                                </p>
                                            </div>
                                        ) : null}
                                        {viewCount > 0 ? (
                                            <div className="rounded-2xl bg-white p-4">
                                                <div className="flex items-center gap-2 text-blue-800">
                                                    <Eye className="h-5 w-5" aria-hidden="true" />
                                                    <span className="text-2xl font-extrabold">
                                                        {viewCount.toLocaleString("vi-VN")}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs font-semibold uppercase text-slate-500">
                                                    lượt xem hồ sơ
                                                </p>
                                            </div>
                                        ) : null}
                                        {updatedAt ? (
                                            <div className="rounded-2xl bg-white p-4">
                                                <div className="flex items-center gap-2 text-blue-800">
                                                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                                                    <span className="text-lg font-extrabold">{updatedAt}</span>
                                                </div>
                                                <p className="mt-1 text-xs font-semibold uppercase text-slate-500">
                                                    cập nhật gần nhất
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>

                                    {ctaHref ? (
                                        <a
                                            href={ctaHref}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900"
                                        >
                                            {ctaLabel}
                                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        </section>

                        {bioHtml ? (
                            <DetailSection title="Giới thiệu giáo viên">
                                <MarkdownHtmlRenderer html={bioHtml} />
                            </DetailSection>
                        ) : null}

                        <DetailSection title="Chuyên môn giảng dạy">
                            <div className="space-y-5">
                                {subjectItems.length > 0 ? (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold uppercase text-slate-500">Môn học</h3>
                                        <PillList items={subjectItems} />
                                    </div>
                                ) : null}
                                {expertiseItems.length > 0 ? (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold uppercase text-slate-500">Thế mạnh</h3>
                                        <PillList items={expertiseItems} />
                                    </div>
                                ) : null}
                                {gradeItems.length > 0 ? (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold uppercase text-slate-500">Khối lớp</h3>
                                        <PillList items={gradeItems} />
                                    </div>
                                ) : null}
                                {formatItems.length > 0 ? (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold uppercase text-slate-500">Hình thức học</h3>
                                        <PillList items={formatItems} />
                                    </div>
                                ) : null}
                            </div>
                        </DetailSection>

                        {methodHtml ? (
                            <DetailSection title="Phương pháp giảng dạy">
                                <MarkdownHtmlRenderer html={methodHtml} />
                            </DetailSection>
                        ) : null}

                        {(profile.education || profile.certifications || profile.achievements) ? (
                            <DetailSection title="Học vấn và thành tích">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <InfoRow
                                        icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />}
                                        label="Học vấn"
                                        value={profile.education}
                                    />
                                    <InfoRow
                                        icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
                                        label="Chứng chỉ"
                                        value={profile.certifications}
                                    />
                                    <InfoRow
                                        icon={<Award className="h-4 w-4" aria-hidden="true" />}
                                        label="Thành tích"
                                        value={profile.achievements}
                                    />
                                </div>
                            </DetailSection>
                        ) : null}
                    </article>
                </section>

                <aside className="col-span-4 space-y-4 rounded-[1.6rem] bg-white py-6 md:col-span-3 md:py-7 xl:col-span-4">
                    <TeacherShareActions title={profile.displayName} />

                    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <h2 className="text-xl font-bold text-blue-900">Thông tin liên hệ</h2>
                        <div className="space-y-3">
                            <InfoRow
                                icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
                                label="Khu vực"
                                value={profile.teachingArea ?? profile.contactAddress}
                            />
                            <InfoRow
                                icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                                label="Điện thoại"
                                value={profile.contactPhone}
                                href={getPhoneHref(profile.contactPhone)}
                            />
                            <InfoRow
                                icon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
                                label="Zalo"
                                value={profile.contactZalo}
                                href={getZaloHref(profile.contactZalo)}
                            />
                            <InfoRow
                                icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                                label="Email"
                                value={profile.contactEmail}
                                href={profile.contactEmail ? `mailto:${profile.contactEmail}` : undefined}
                            />
                            <InfoRow
                                icon={<Users className="h-4 w-4" aria-hidden="true" />}
                                label="Facebook"
                                value={profile.contactFacebook}
                                href={getExternalHref(profile.contactFacebook)}
                            />
                            <InfoRow
                                icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
                                label="Website"
                                value={profile.contactWebsite}
                                href={getExternalHref(profile.contactWebsite)}
                            />
                        </div>
                    </section>

                    {ctaHref ? (
                        <a
                            href={ctaHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900"
                        >
                            {ctaLabel}
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                    ) : null}

                    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <h2 className="text-xl font-bold text-blue-900">Giáo viên khác</h2>
                        {moreProfiles.length > 0 ? (
                            <div className="space-y-3">
                                {moreProfiles.map((item) => (
                                    <MoreTeacherCard
                                        key={item.slug ?? item.teacherProfileId}
                                        profile={item}
                                        detailBasePath={detailBasePath}
                                        fallbackHref={backHref}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm leading-6 text-slate-600">Chưa có giáo viên liên quan.</p>
                        )}
                    </section>
                </aside>
            </div>

            <TeacherClassroomGallerySection
                teacherName={profile.displayName}
                imageUrls={profile.classroomImageMediaUrls ?? profile.classroomImageUrls}
            />
        </div>
    );
}
