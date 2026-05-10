import type { Metadata } from "next";
import ExamDetailClient from "@/app/thu-vien/de-thi/components/ExamDetailClient";
import { buildExamDetailMetadata } from "@/app/thu-vien/de-thi/detail-seo";

type ExamDetailBySubjectPageProps = {
    params: Promise<{ subject: string; slug: string }>;
};

export async function generateMetadata({ params }: ExamDetailBySubjectPageProps): Promise<Metadata> {
    const { subject, slug } = await params;
    const canonical = `/thu-vien/de-thi/mon-hoc/${subject}/chi-tiet/${slug}`;
    return buildExamDetailMetadata({ slug, canonical });
}

export default async function ExamDetailBySubjectPage({ params }: ExamDetailBySubjectPageProps) {
    const { subject, slug } = await params;
    return <ExamDetailClient slug={slug} backHref={`/thu-vien/de-thi/mon-hoc/${subject}`} />;
}
