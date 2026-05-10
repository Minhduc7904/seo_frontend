import type { Metadata } from "next";
import { buildExamSeo } from "@/app/thu-vien/de-thi/seo";

type DeThiSeoLayoutProps = Readonly<{
    children: React.ReactNode;
    params: Promise<{ subject: string; gradeSlug: string; examType: string }>;
}>;

export async function generateMetadata({ params }: DeThiSeoLayoutProps): Promise<Metadata> {
    const { subject, gradeSlug, examType } = await params;
    const seo = buildExamSeo({
        subjectSlug: subject,
        gradeSlug,
        examTypeSlug: examType,
    });

    return {
        title: seo.title,
        description: seo.description,
        alternates: { canonical: seo.canonical },
        openGraph: {
            title: seo.title,
            description: seo.description,
            url: seo.canonical,
            type: "website",
            locale: "vi_VN",
        },
    };
}

export default function DeThiSeoLayout({ children }: DeThiSeoLayoutProps) {
    return children;
}
