import type { Metadata } from "next";
import DeThiListingClient from "@/app/thu-vien/de-thi/components/DeThiListingClient";
import { buildSubjectGradeSeo } from "@/app/thu-vien/de-thi/seo";

const TITLE_SUFFIX = " - Beeedu.vn";

type DeThiSubjectGradePageProps = {
    params: Promise<{ subject: string; gradeSlug: string }>;
};

export async function generateMetadata({ params }: DeThiSubjectGradePageProps): Promise<Metadata> {
    const { subject, gradeSlug } = await params;
    const seo = buildSubjectGradeSeo({ subjectSlug: subject, gradeSlug });
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

export default async function DeThiSubjectGradePage({ params }: DeThiSubjectGradePageProps) {
    const { subject, gradeSlug } = await params;
    const seo = buildSubjectGradeSeo({ subjectSlug: subject, gradeSlug });

    return (
        <DeThiListingClient
            subjectSlug={subject}
            gradeSlug={gradeSlug}
            heading={seo.h1}
            description={seo.description}
            routeLevel="grade"
        />
    );
}
