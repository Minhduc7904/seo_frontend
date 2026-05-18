import { notFound } from "next/navigation";
import DocumentTagListingPage from "@/app/thu-vien/tai-lieu/components/DocumentTagListingPage";
import { DOCUMENT_TYPE_TAGS, THPT_CHAPTER_TAG_GROUPS } from "@/app/thu-vien/tai-lieu/data";
import { toDocumentItem } from "@/app/thu-vien/tai-lieu/document-section-mapper";
import { documentService } from "@/lib/api";

type DocumentTypePageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string | string[] }>;
};

const THPT_CHAPTER_TAGS = THPT_CHAPTER_TAG_GROUPS.flatMap((group) => group.tags);
const PAGE_SIZE = 10;

function getPage(value: string | string[] | undefined) {
    const rawValue = Array.isArray(value) ? value[0] : value;
    const page = Number(rawValue);
    return Number.isInteger(page) && page > 0 ? page : 1;
}

function buildPageHref(slug: string, page: number) {
    return page > 1 ? `/thu-vien/tai-lieu/thpt/${slug}?page=${page}` : `/thu-vien/tai-lieu/thpt/${slug}`;
}

export default async function TaiLieuThptTypePage({ params, searchParams }: DocumentTypePageProps) {
    const { slug } = await params;
    const page = getPage((await searchParams).page);
    const documentType = DOCUMENT_TYPE_TAGS.find((item) => item.slug === slug);

    if (!documentType) {
        notFound();
    }

    const response = await documentService
        .getPublicSeoDocumentsByTag(slug, {
            page,
            limit: PAGE_SIZE,
            includeTags: true,
        })
        .catch(() => null);

    const documents = response?.data.map((item, index) => toDocumentItem(item, index)) ?? [];
    const pagination = response?.meta ?? {
        page,
        limit: PAGE_SIZE,
        total: documents.length,
        totalPages: 1,
        hasPrevious: page > 1,
        hasNext: false,
    };

    return (
        <DocumentTagListingPage
            title={documentType.name}
            description={`Tổng hợp tài liệu thuộc nhóm ${documentType.name.toLowerCase()} dành cho học sinh THPT.`}
            documents={documents}
            chapterTags={THPT_CHAPTER_TAGS}
            detailBasePath="/thu-vien/tai-lieu/thpt/chi-tiet"
            backHref="/thu-vien/tai-lieu/thpt"
            pagination={pagination}
            pageHref={(nextPage) => buildPageHref(slug, nextPage)}
        />
    );
}
