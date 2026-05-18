import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocumentDetailClient from "@/app/thu-vien/tai-lieu/components/DocumentDetailClient";
import { buildDocumentDetailMetadata } from "@/app/thu-vien/tai-lieu/detail-metadata";
import { documentService } from "@/lib/api";

type DocumentDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DocumentDetailPageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const payload = await documentService.getPublicSeoDocumentBySlug(slug);
        return buildDocumentDetailMetadata(payload.data, `/thu-vien/tai-lieu/thcs/chi-tiet/${slug}`);
    } catch {
        return {};
    }
}

export default async function ThcsDocumentDetailPage({ params }: DocumentDetailPageProps) {
    const { slug } = await params;

    try {
        await documentService.incrementPublicSeoDocumentView(slug).catch(() => null);
        const [documentPayload, latestPayload, relatedPayload] = await Promise.all([
            documentService.getPublicSeoDocumentBySlug(slug),
            documentService.getPublicSeoLatestDocuments(),
            documentService.getPublicSeoRelatedDocuments(slug),
        ]);

        return (
            <DocumentDetailClient
                document={documentPayload.data}
                latestDocuments={latestPayload.data}
                relatedDocuments={relatedPayload.data}
                level="thcs"
                downloadUrl={documentService.getPublicSeoDocumentDownloadUrl(slug)}
            />
        );
    } catch {
        notFound();
    }
}
