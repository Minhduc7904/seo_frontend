"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import MarkdownHtmlRenderer from "@/components/common/MarkdownHtmlRenderer";
import YouTubeEmbed from "@/components/common/YouTubeEmbed";
import { usePublicSeoQuestionBySlug } from "@/hooks/usePublicSeoQuestionBySlug";
import {
    getQuestionChapterTitles,
    getQuestionGrade,
    getQuestionHtml,
    getQuestionId,
    getQuestionStatements,
    getQuestionSubjectName,
    getQuestionSolutionHtml,
    getQuestionSolutionYoutubeUrl,
    getQuestionType,
    getStatementHtml,
    getStatementPrefix,
} from "@/app/thu-vien/cau-hoi/question-utils";

type QuestionDetailClientProps = {
    slug: string;
    backHref?: string;
};

function QuestionDetailSkeleton() {
    return (
        <article className="animate-pulse space-y-4">
            <div className="h-7 w-1/2 rounded bg-slate-200" />
            <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-11/12 rounded bg-slate-200" />
                <div className="h-4 w-10/12 rounded bg-slate-200" />
            </div>
            <div className="space-y-2 pt-1">
                <div className="h-4 w-11/12 rounded bg-slate-200" />
                <div className="h-4 w-10/12 rounded bg-slate-200" />
                <div className="h-4 w-9/12 rounded bg-slate-200" />
            </div>
            <div className="space-y-2 pt-2">
                <div className="h-4 w-1/3 rounded bg-slate-200" />
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-3/4 rounded bg-slate-200" />
            </div>
            <div className="space-y-2 pt-2">
                <div className="h-4 w-1/4 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-200" />
                <div className="h-3 w-11/12 rounded bg-slate-200" />
            </div>
        </article>
    );
}

export default function QuestionDetailClient({ slug, backHref = "/thu-vien/cau-hoi" }: QuestionDetailClientProps) {
    const searchParams = useSearchParams();
    const { question, loading, error } = usePublicSeoQuestionBySlug(slug);
    const item = (question ?? null) as Record<string, unknown> | null;
    const queryString = searchParams.toString();
    const backHrefWithQuery = queryString ? `${backHref}?${queryString}` : backHref;

    const questionHtml = useMemo(() => (item ? getQuestionHtml(item, 0) : ""), [item]);
    const questionType = useMemo(() => (item ? getQuestionType(item) : ""), [item]);
    const statements = useMemo(() => (item ? getQuestionStatements(item) : []), [item]);
    const questionId = useMemo(() => (item ? getQuestionId(item) : ""), [item]);
    const grade = useMemo(() => (item ? getQuestionGrade(item) : ""), [item]);
    const subjectName = useMemo(() => (item ? getQuestionSubjectName(item) : ""), [item]);
    const chapterTitles = useMemo(() => (item ? getQuestionChapterTitles(item) : []), [item]);
    const solutionHtml = useMemo(() => (item ? getQuestionSolutionHtml(item) : ""), [item]);
    const solutionYoutubeUrl = useMemo(() => (item ? getQuestionSolutionYoutubeUrl(item) : ""), [item]);
    const hasMeta = Boolean(questionId || grade || subjectName || chapterTitles.length > 0);
    const hasSolution = Boolean(solutionHtml || solutionYoutubeUrl);

    return (
        <div className="space-y-6 pb-16">
            <section className="rounded-[1.6rem] bg-white py-6 md:py-7">
                <div>
                    <Link href={backHrefWithQuery} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                        ← Quay lại danh sách câu hỏi
                    </Link>
                </div>

                {loading ? <QuestionDetailSkeleton /> : null}
                {error ? <p className="text-red-600">Không tải được chi tiết câu hỏi.</p> : null}

                {!loading && !error && item ? (
                    <article className="space-y-5">
                        <h1 className="text-2xl font-bold text-blue-900">Chi tiết câu hỏi</h1>
                        {hasMeta ? (
                            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                                <p className="font-semibold text-slate-900">Thông tin câu hỏi</p>
                                <div className="mt-2 space-y-1">
                                    {questionId ? (
                                        <p>
                                            <span className="font-semibold text-slate-700">ID câu hỏi:</span> {questionId}
                                        </p>
                                    ) : null}
                                    {subjectName ? (
                                        <p>
                                            <span className="font-semibold text-slate-700">Môn:</span> {subjectName}
                                        </p>
                                    ) : null}
                                    {grade ? (
                                        <p>
                                            <span className="font-semibold text-slate-700">Khối:</span> {grade}
                                        </p>
                                    ) : null}
                                    {chapterTitles.length > 0 ? (
                                        <p>
                                            <span className="font-semibold text-slate-700">Chương:</span>{" "}
                                            {chapterTitles.join(", ")}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                        <div className="space-y-3">
                            <MarkdownHtmlRenderer html={questionHtml} className="text-sm text-slate-900" />

                            {statements.length > 0 && (
                                <div className="space-y-2">
                                    {statements.map((statement, statementIndex) => {
                                        const statementItem = statement as Record<string, unknown>;
                                        const statementHtml = getStatementHtml(statementItem, statementIndex);
                                        const prefix = getStatementPrefix(questionType, statementIndex);

                                        return (
                                            <div
                                                key={`${String(statementItem.id ?? statementIndex)}-${statementIndex}`}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="mt-[2px] text-sm font-semibold text-slate-600">
                                                    {prefix}
                                                </span>
                                                <MarkdownHtmlRenderer
                                                    html={statementHtml}
                                                    className="text-sm text-slate-700 [&_p]:m-0 [&_p]:inline [&_ul]:m-0 [&_ol]:m-0"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>



                        {hasSolution ? (
                            <div className="space-y-3">
                                <h2 className="text-lg font-bold text-slate-900">Lời giải của BeeEdu</h2>
                                {solutionHtml ? (
                                    <MarkdownHtmlRenderer html={solutionHtml} className="text-sm text-slate-700" />
                                ) : null}
                                {solutionYoutubeUrl ? (
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-600">
                                            Lời giải được thực hiện bởi trợ giảng BeeEdu được đào tạo chuyên nghiệp, trình bày
                                            rõ ràng để bạn dễ theo dõi và áp dụng khi làm bài.
                                        </p>
                                        <YouTubeEmbed url={solutionYoutubeUrl} title="Video lời giải BeeEdu" />
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </article>
                ) : null}

                {!loading && !error && !item ? (
                    <p className="text-sm text-slate-600">Không tìm thấy câu hỏi.</p>
                ) : null}
            </section>
        </div>
    );
}
