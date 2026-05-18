import type { Metadata } from "next";

type DocumentLevelSeo = {
    title: string;
    description: string;
    canonical: string;
    keywords: string[];
};

const BRAND_KEYWORDS = ["BeeEdu", "Toán thầy Bee", "toanthaybee", "Ong Khắc Ngọc"];

export const THPT_DOCUMENT_SEO: DocumentLevelSeo = {
    title: "Tài liệu Toán THPT lớp 10, 11, 12 | BeeEdu",
    description:
        "Kho tài liệu Toán THPT cho lớp 10, 11, 12 gồm chuyên đề, công thức, đề kiểm tra và tài liệu ôn thi giúp học sinh hệ thống kiến thức hiệu quả.",
    canonical: "/thu-vien/tai-lieu/thpt",
    keywords: [
        "tài liệu Toán THPT",
        "tài liệu Toán lớp 10",
        "tài liệu Toán lớp 11",
        "tài liệu Toán lớp 12",
        "ôn thi THPT môn Toán",
        ...BRAND_KEYWORDS,
    ],
};

export const THCS_DOCUMENT_SEO: DocumentLevelSeo = {
    title: "Tài liệu Toán THCS lớp 6, 7, 8, 9 | BeeEdu",
    description:
        "Kho tài liệu Toán THCS cho lớp 6, 7, 8, 9 gồm bài ôn tập, chuyên đề, công thức, đề kiểm tra và tài liệu ôn thi vào lớp 10.",
    canonical: "/thu-vien/tai-lieu/thcs",
    keywords: [
        "tài liệu Toán THCS",
        "tài liệu Toán lớp 6",
        "tài liệu Toán lớp 7",
        "tài liệu Toán lớp 8",
        "tài liệu Toán lớp 9",
        "ôn thi vào lớp 10 môn Toán",
        ...BRAND_KEYWORDS,
    ],
};

export function buildDocumentLevelMetadata(seo: DocumentLevelSeo): Metadata {
    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: { canonical: seo.canonical },
        openGraph: {
            title: seo.title,
            description: seo.description,
            url: seo.canonical,
            type: "website",
            locale: "vi_VN",
            siteName: "BeeEdu",
        },
    };
}
