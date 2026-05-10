import { EXAM_TYPE_BY_ID } from "@/app/thu-vien/components/exam-type-selector/exam-types";

const SUBJECT_LABEL_BY_SLUG: Record<string, string> = {
    toan: "Toán",
    "ngu-van": "Ngữ văn",
    "tieng-anh": "Tiếng Anh",
    "vat-ly": "Vật lý",
    "hoa-hoc": "Hóa học",
    "sinh-hoc": "Sinh học",
    "lich-su": "Lịch sử",
    "dia-ly": "Địa lý",
    "gdcd": "Giáo dục công dân",
    "tin-hoc": "Tin học",
    "cong-nghe": "Công nghệ",
};

function toTitleCaseFromSlug(value: string) {
    return decodeURIComponent(value)
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function parseGradeFromSlug(gradeSlug: string) {
    const match = gradeSlug.match(/^lop-(\d{1,2})$/i);
    return match?.[1] ?? "";
}

export function resolveSubjectLabel(subjectSlug: string) {
    return SUBJECT_LABEL_BY_SLUG[subjectSlug] ?? toTitleCaseFromSlug(subjectSlug);
}

export function resolveExamTypeLabel(examTypeSlug: string) {
    return EXAM_TYPE_BY_ID[examTypeSlug]?.name ?? toTitleCaseFromSlug(examTypeSlug);
}

type BuildExamSeoInput = {
    subjectSlug: string;
    gradeSlug: string;
    examTypeSlug: string;
};

type BuildSubjectSeoInput = {
    subjectSlug: string;
};

type BuildSubjectGradeSeoInput = {
    subjectSlug: string;
    gradeSlug: string;
};

export function buildExamSeo({ subjectSlug, gradeSlug, examTypeSlug }: BuildExamSeoInput) {
    const subjectLabel = resolveSubjectLabel(subjectSlug);
    const examTypeLabel = resolveExamTypeLabel(examTypeSlug);
    const grade = parseGradeFromSlug(gradeSlug) || "12";
    const canonical = `/thu-vien/de-thi/mon-hoc/${subjectSlug}/khoi/lop-${grade}/loai-de-thi/${examTypeSlug}`;

    const h1 = `Đề thi ${subjectLabel} ${examTypeLabel} lớp ${grade}`;
    const title = `${h1} có đáp án`;
    const description = `Tổng hợp đề thi ${subjectLabel} lớp ${grade} ${examTypeLabel}, bám sát cấu trúc mới nhất, có đáp án chi tiết và lời giải dễ hiểu.`;

    return {
        title,
        h1,
        description,
        canonical,
        subjectLabel,
        examTypeLabel,
        grade,
    };
}

export function buildSubjectSeo({ subjectSlug }: BuildSubjectSeoInput) {
    const subjectLabel = resolveSubjectLabel(subjectSlug);
    const canonical = `/thu-vien/de-thi/mon-hoc/${subjectSlug}`;
    const h1 = `Đề thi ${subjectLabel} có đáp án`;
    const title = h1;
    const description = `Tổng hợp đề thi ${subjectLabel} theo từng khối lớp và loại đề, có đáp án chi tiết giúp ôn tập hiệu quả.`;

    return {
        title,
        h1,
        description,
        canonical,
        subjectLabel,
    };
}

export function buildSubjectGradeSeo({ subjectSlug, gradeSlug }: BuildSubjectGradeSeoInput) {
    const subjectLabel = resolveSubjectLabel(subjectSlug);
    const grade = parseGradeFromSlug(gradeSlug) || "12";
    const canonical = `/thu-vien/de-thi/mon-hoc/${subjectSlug}/khoi/lop-${grade}`;
    const h1 = `Đề thi ${subjectLabel} lớp ${grade} có đáp án`;
    const title = h1;
    const description = `Tổng hợp đề thi ${subjectLabel} lớp ${grade} theo từng loại đề, bám sát chương trình và có đáp án chi tiết.`;

    return {
        title,
        h1,
        description,
        canonical,
        subjectLabel,
        grade,
    };
}
