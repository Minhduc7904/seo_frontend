import { notFound } from "next/navigation";
import { DOCUMENT_TYPE_TAGS } from "@/app/thu-vien/tai-lieu/data";

type DocumentTypePageProps = {
    params: Promise<{ slug: string }>;
};

export default async function TaiLieuThptTypePage({ params }: DocumentTypePageProps) {
    const { slug } = await params;
    const documentType = DOCUMENT_TYPE_TAGS.find((item) => item.slug === slug);

    if (!documentType) {
        notFound();
    }

    return (
        <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
            <h1 className="text-2xl font-bold text-blue-950">{documentType.name}</h1>
        </section>
    );
}
