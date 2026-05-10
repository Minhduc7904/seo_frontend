import type { Metadata } from "next";
import ExamDetailClient from "@/app/thu-vien/de-thi/components/ExamDetailClient";
import { buildExamDetailMetadata } from "@/app/thu-vien/de-thi/detail-seo";

type ExamDetailByFullContextPageProps = {
    params: Promise<{ subject: string; gradeSlug: string; examType: string; slug: string }>;
};

export async function generateMetadata({ params }: ExamDetailByFullContextPageProps): Promise<Metadata> {
    const { subject, gradeSlug, examType, slug } = await params;
    const canonical = `/thu-vien/de-thi/mon-hoc/${subject}/khoi/${gradeSlug}/loai-de-thi/${examType}/chi-tiet/${slug}`;
    return buildExamDetailMetadata({ slug, canonical });
}

export default async function ExamDetailByFullContextPage({ params }: ExamDetailByFullContextPageProps) {
    const { subject, gradeSlug, examType, slug } = await params;
    return (
        <ExamDetailClient
            slug={slug}
            backHref={`/thu-vien/de-thi/mon-hoc/${subject}/khoi/${gradeSlug}/loai-de-thi/${examType}`}
        />
    );
}
