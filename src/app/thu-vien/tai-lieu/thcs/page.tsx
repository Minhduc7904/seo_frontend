import DocumentLibraryPage from "@/app/thu-vien/tai-lieu/components/DocumentLibraryPage";
import { THCS_CHAPTER_TAG_GROUPS } from "@/app/thu-vien/tai-lieu/data";
import { mapDocumentSectionsToColumns } from "@/app/thu-vien/tai-lieu/document-section-mapper";
import { buildDocumentLevelMetadata, THCS_DOCUMENT_SEO } from "@/app/thu-vien/tai-lieu/seo";
import { documentService } from "@/lib/api";

export const metadata = buildDocumentLevelMetadata(THCS_DOCUMENT_SEO);

const THCS_CHAPTER_TAGS = THCS_CHAPTER_TAG_GROUPS.flatMap((group) => group.tags);
const THCS_SECTION_DEFINITIONS = [
    { key: "latest", fallbackTitle: "Tài liệu mới nhất" },
    { key: "grade_10_exam_review", fallbackTitle: "Ôn thi vào lớp 10 môn Toán" },
    { key: "math_9", fallbackTitle: "Tài liệu Toán 9" },
    { key: "math_8", fallbackTitle: "Tài liệu Toán 8" },
    { key: "math_7", fallbackTitle: "Tài liệu Toán 7" },
    { key: "math_6", fallbackTitle: "Tài liệu Toán 6" },
];

export default async function TaiLieuThcsPage() {
    const sections = await documentService
        .getPublicSeoLevelSections("thcs")
        .then((payload) => payload.data.sections)
        .catch(() => []);
    const columns = mapDocumentSectionsToColumns(sections, THCS_SECTION_DEFINITIONS);

    return (
        <DocumentLibraryPage
            columns={columns}
            chapterTags={THCS_CHAPTER_TAGS}
            detailBasePath="/thu-vien/tai-lieu/thcs/chi-tiet"
            headerTitle="Kho tài liệu THCS"
            headerDescription="Tổng hợp tài liệu Toán dành cho học sinh trung học cơ sở, từ lớp 6 đến lớp 9 và nhóm ôn thi vào lớp 10."
        />
    );
}
