import type { Metadata } from "next";
import DeThiListingClient from "@/app/thu-vien/de-thi/components/DeThiListingClient";
import { buildExamSeo } from "@/app/thu-vien/de-thi/seo";

const TITLE_SUFFIX = " - Beeedu.vn";

type DeThiPageProps = {
    params: Promise<{ subject: string; gradeSlug: string; examType: string }>;
};

export async function generateMetadata({ params }: DeThiPageProps): Promise<Metadata> {
    const { subject, gradeSlug, examType } = await params;
    const seo = buildExamSeo({
        subjectSlug: subject,
        gradeSlug,
        examTypeSlug: examType,
    });
    const titleWithSuffix = `${seo.title}${TITLE_SUFFIX}`;

    return {
        title: {
            absolute: titleWithSuffix,
        },
        description: seo.description,
        alternates: { canonical: seo.canonical },
        openGraph: {
            title: titleWithSuffix,
            description: seo.description,
            url: seo.canonical,
            type: "website",
            locale: "vi_VN",
        },
    };
}

export default async function DeThiPage({ params }: DeThiPageProps) {
    const { subject, gradeSlug, examType } = await params;
    const seo = buildExamSeo({
        subjectSlug: subject,
        gradeSlug,
        examTypeSlug: examType,
    });

    return (
        <DeThiListingClient
            subjectSlug={subject}
            gradeSlug={gradeSlug}
            examTypeSlug={examType}
            heading={seo.h1}
            description={seo.description}
            routeLevel="examType"
        />
    );
}
