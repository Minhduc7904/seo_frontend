import DocumentLibraryPage from "@/app/thu-vien/tai-lieu/components/DocumentLibraryPage";
import { THPT_CHAPTER_TAG_GROUPS } from "@/app/thu-vien/tai-lieu/data";
import { mapDocumentSectionsToColumns } from "@/app/thu-vien/tai-lieu/document-section-mapper";
import { buildDocumentLevelMetadata, THPT_DOCUMENT_SEO } from "@/app/thu-vien/tai-lieu/seo";
import { documentService } from "@/lib/api";

export const metadata = buildDocumentLevelMetadata(THPT_DOCUMENT_SEO);

const THPT_CHAPTER_TAGS = THPT_CHAPTER_TAG_GROUPS.flatMap((group) => group.tags);
const THPT_SECTION_DEFINITIONS = [
    { key: "latest", fallbackTitle: "Tài liệu mới nhất" },
    { key: "thpt_math_review", fallbackTitle: "Tài liệu ôn thi THPT môn Toán" },
    { key: "thpt_math_exams", fallbackTitle: "Đề thi THPT môn Toán" },
    { key: "math_12", fallbackTitle: "Tài liệu Toán 12" },
    { key: "math_11", fallbackTitle: "Tài liệu Toán 11" },
    { key: "math_10", fallbackTitle: "Tài liệu Toán 10" },
];

export default async function TaiLieuThptPage() {
    const sections = await documentService
        .getPublicSeoLevelSections("thpt")
        .then((payload) => payload.data.sections)
        .catch(() => []);
    const columns = mapDocumentSectionsToColumns(sections, THPT_SECTION_DEFINITIONS);

    return (
        <DocumentLibraryPage
            columns={columns}
            chapterTags={THPT_CHAPTER_TAGS}
            detailBasePath="/thu-vien/tai-lieu/thpt/chi-tiet"
            headerTitle="Kho tài liệu THPT"
            headerDescription="Tổng hợp tài liệu Toán dành cho học sinh trung học phổ thông, từ ôn tập theo lớp đến luyện thi THPT môn Toán."
        />
    );
}
