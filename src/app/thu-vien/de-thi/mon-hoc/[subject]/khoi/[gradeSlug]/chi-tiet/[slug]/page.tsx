import type { Metadata } from "next";
import ExamDetailClient from "@/app/thu-vien/de-thi/components/ExamDetailClient";
import { buildExamDetailMetadata } from "@/app/thu-vien/de-thi/detail-seo";

type ExamDetailBySubjectGradePageProps = {
    params: Promise<{ subject: string; gradeSlug: string; slug: string }>;
};

export async function generateMetadata({ params }: ExamDetailBySubjectGradePageProps): Promise<Metadata> {
    const { subject, gradeSlug, slug } = await params;
    const canonical = `/thu-vien/de-thi/mon-hoc/${subject}/khoi/${gradeSlug}/chi-tiet/${slug}`;
    return buildExamDetailMetadata({ slug, canonical });
}

export default async function ExamDetailBySubjectGradePage({ params }: ExamDetailBySubjectGradePageProps) {
    const { subject, gradeSlug, slug } = await params;
    return <ExamDetailClient slug={slug} backHref={`/thu-vien/de-thi/mon-hoc/${subject}/khoi/${gradeSlug}`} />;
}
