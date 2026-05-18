import ExamPracticeClient from "@/app/thu-vien/de-thi/components/ExamPracticeClient";

type ExamPracticePageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ExamPracticePage({ params }: ExamPracticePageProps) {
    const { slug } = await params;
    return <ExamPracticeClient slug={slug} />;
}
