import type { Metadata } from "next";
import ExamDetailClient from "@/app/thu-vien/de-thi/components/ExamDetailClient";
import { buildExamDetailMetadata } from "@/app/thu-vien/de-thi/detail-seo";

type ExamDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ExamDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const canonical = `/thu-vien/de-thi/chi-tiet/${slug}`;
    return buildExamDetailMetadata({ slug, canonical });
}

export default async function ExamDetailPage({ params }: ExamDetailPageProps) {
    const { slug } = await params;
    return <ExamDetailClient slug={slug} backHref="/thu-vien/de-thi" />;
}
