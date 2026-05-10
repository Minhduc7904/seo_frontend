import type { Metadata } from "next";
import DeThiListingClient from "@/app/thu-vien/de-thi/components/DeThiListingClient";
import { buildSubjectSeo } from "@/app/thu-vien/de-thi/seo";

const TITLE_SUFFIX = " - Beeedu.vn";

type DeThiSubjectPageProps = {
    params: Promise<{ subject: string }>;
};

export async function generateMetadata({ params }: DeThiSubjectPageProps): Promise<Metadata> {
    const { subject } = await params;
    const seo = buildSubjectSeo({ subjectSlug: subject });
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

export default async function DeThiSubjectPage({ params }: DeThiSubjectPageProps) {
    const { subject } = await params;
    const seo = buildSubjectSeo({ subjectSlug: subject });

    return <DeThiListingClient subjectSlug={subject} heading={seo.h1} description={seo.description} routeLevel="subject" />;
}
