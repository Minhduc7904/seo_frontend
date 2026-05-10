import type { Metadata } from "next";
import QuestionDetailClient from "@/app/thu-vien/cau-hoi/components/QuestionDetailClient";
import { buildQuestionDetailMetadata } from "@/app/thu-vien/cau-hoi/detail-seo";

type QuestionDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: QuestionDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const canonical = `/thu-vien/cau-hoi/chi-tiet/${slug}`;
    return buildQuestionDetailMetadata({ slug, canonical });
}

export default async function QuestionDetailPage({ params }: QuestionDetailPageProps) {
    const { slug } = await params;
    return <QuestionDetailClient slug={slug} backHref="/thu-vien/cau-hoi" />;
}
