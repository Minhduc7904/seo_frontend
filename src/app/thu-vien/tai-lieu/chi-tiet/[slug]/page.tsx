import { notFound } from "next/navigation";
import DocumentDetailClient from "@/app/thu-vien/tai-lieu/components/DocumentDetailClient";
import { getDocumentById } from "@/app/thu-vien/tai-lieu/data";

type DocumentDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
    const { slug } = await params;

    if (!getDocumentById(slug)) {
        notFound();
    }

    return <DocumentDetailClient documentId={slug} />;
}
