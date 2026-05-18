"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import MarkdownHtmlRenderer from "@/components/common/MarkdownHtmlRenderer";
import { usePublicSeoExamById } from "@/hooks/usePublicSeoExamById";
import {
    buildQuestionDetailHref,
    getQuestionHtml,
    getQuestionId,
    getQuestionSlug,
    getQuestionStatements,
    getQuestionType,
    getStatementHtml,
    getStatementPrefix,
} from "@/app/thu-vien/cau-hoi/question-utils";
import {
    getExamQuestions,
    getExamSections,
    getQuestionCorrectAnswer,
    getQuestionKey,
    getQuestionLabel,
    getQuestionSectionId,
    getSectionDescription,
    getSectionId,
    getSectionTitle,
    getStatementCorrectAnswer,
    getStatementKey,
    normalizeShortAnswer,
} from "@/app/thu-vien/de-thi/exam-utils";

type ExamPracticeClientProps = {
    slug: string;
};

type AnswersState = Record<string, string>;
type QuestionResult = {
    answered: boolean;
    correctCount: number;
    maxCorrectCount: number;
    score: number;
    maxScore: number;
    isFullyCorrect: boolean;
};

function getExamTitle(exam: Record<string, unknown> | null, slug: string) {
    if (!exam) return slug;
    const raw = exam.title ?? exam.name ?? exam.examName ?? exam.slug;
    return typeof raw === "string" && raw.trim() ? raw : slug;
}

function getProcessedDescription(exam: Record<string, unknown> | null) {
    const raw = exam?.processedDescription ?? exam?.descriptionHtml ?? exam?.description;
    return typeof raw === "string" ? raw : "";
}

function ExamPracticeSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-8 w-2/3 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-10/12 rounded bg-slate-200" />
            <div className="h-40 rounded bg-slate-200" />
        </div>
    );
}

function formatScore(value: number) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export default function ExamPracticeClient({ slug }: ExamPracticeClientProps) {
    const { exam, loading, error } = usePublicSeoExamById(slug);
    const item = (exam ?? null) as Record<string, unknown> | null;
    const [answers, setAnswers] = useState<AnswersState>({});
    const [submitted, setSubmitted] = useState(false);

    const title = useMemo(() => getExamTitle(item, slug), [item, slug]);
    const processedDescription = useMemo(() => getProcessedDescription(item), [item]);
    const sections = useMemo(() => getExamSections(item), [item]);
    const questions = useMemo(() => getExamQuestions(item), [item]);
    const questionsBySectionId = useMemo(() => {
        const grouped = new Map<string, Record<string, unknown>[]>();

        questions.forEach((question, questionIndex) => {
            const questionItem = question as Record<string, unknown>;
            const sectionId = getQuestionSectionId(questionItem);
            if (!sectionId) return;

            const current = grouped.get(sectionId) ?? [];
            current.push({ ...questionItem, __questionIndex: questionIndex });
            grouped.set(sectionId, current);
        });

        return grouped;
    }, [questions]);

    const questionResults = useMemo(() => {
        const results = new Map<string, QuestionResult>();

        questions.forEach((question, questionIndex) => {
            const questionItem = question as Record<string, unknown>;
            const questionType = getQuestionType(questionItem);
            const questionKey = getQuestionKey(questionItem, questionIndex);
            const statements = getQuestionStatements(questionItem);

            if (questionType === "SHORT_ANSWER") {
                const userAnswer = answers[questionKey] ?? "";
                const correctAnswer = getQuestionCorrectAnswer(questionItem);
                const isCorrect =
                    userAnswer.trim() &&
                    correctAnswer &&
                    normalizeShortAnswer(userAnswer) === normalizeShortAnswer(correctAnswer);

                results.set(questionKey, {
                    answered: Boolean(userAnswer.trim()),
                    correctCount: isCorrect ? 1 : 0,
                    maxCorrectCount: 1,
                    score: isCorrect ? 0.5 : 0,
                    maxScore: 0.5,
                    isFullyCorrect: Boolean(isCorrect),
                });
                return;
            }

            let answeredCount = 0;
            let correctCount = 0;
            let scorableCount = 0;

            statements.forEach((statement, statementIndex) => {
                const statementItem = statement as Record<string, unknown>;
                const statementKey = getStatementKey(statementItem, statementIndex);
                const answerKey = `${questionKey}:${statementKey}`;
                const correctAnswer = getStatementCorrectAnswer(statementItem);
                if (correctAnswer === null) return;

                scorableCount += 1;
                const userValue = answers[answerKey];
                if (userValue === "true" || userValue === "false") {
                    answeredCount += 1;
                    if ((userValue === "true") === correctAnswer) {
                        correctCount += 1;
                    }
                }
            });

            if (questionType === "TRUE_FALSE") {
                const scoreByCorrectCount: Record<number, number> = {
                    4: 1,
                    3: 0.5,
                    2: 0.25,
                    1: 0.1,
                };

                results.set(questionKey, {
                    answered: answeredCount > 0,
                    correctCount,
                    maxCorrectCount: scorableCount,
                    score: scoreByCorrectCount[correctCount] ?? 0,
                    maxScore: 1,
                    isFullyCorrect: scorableCount > 0 && correctCount === scorableCount,
                });
                return;
            }

            results.set(questionKey, {
                answered: answeredCount > 0,
                correctCount,
                maxCorrectCount: scorableCount,
                score: scorableCount > 0 && correctCount === scorableCount ? 0.25 : 0,
                maxScore: 0.25,
                isFullyCorrect: scorableCount > 0 && correctCount === scorableCount,
            });
        });

        return results;
    }, [answers, questions]);

    const summary = useMemo(() => {
        let answeredQuestions = 0;
        let fullyCorrectQuestions = 0;
        let totalScore = 0;
        let maxScore = 0;

        questionResults.forEach((result) => {
            if (result.answered) answeredQuestions += 1;
            if (result.isFullyCorrect) fullyCorrectQuestions += 1;
            totalScore += result.score;
            maxScore += result.maxScore;
        });

        return {
            totalQuestions: questionResults.size,
            answeredQuestions,
            fullyCorrectQuestions,
            unansweredQuestions: Math.max(questionResults.size - answeredQuestions, 0),
            totalScore,
            maxScore,
            percent: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0,
        };
    }, [questionResults]);

    const setSingleChoiceAnswer = (
        question: Record<string, unknown>,
        questionIndex: number,
        selectedStatementIndex: number,
    ) => {
        const questionKey = getQuestionKey(question, questionIndex);
        const statements = getQuestionStatements(question);
        const nextEntries: AnswersState = {};

        statements.forEach((statement, statementIndex) => {
            const statementItem = statement as Record<string, unknown>;
            const statementKey = getStatementKey(statementItem, statementIndex);
            nextEntries[`${questionKey}:${statementKey}`] =
                statementIndex === selectedStatementIndex ? "true" : "false";
        });

        setAnswers((current) => ({ ...current, ...nextEntries }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <div className="space-y-6 pb-16">
            <section className="rounded-[1.6rem] bg-white py-6 md:py-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href={`/thu-vien/de-thi/chi-tiet/${encodeURIComponent(slug)}`}
                        className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                        ← Quay lại đề thi
                    </Link>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitted}
                        className="rounded-lg bg-[#194DB6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#123d92] disabled:cursor-default disabled:bg-slate-400"
                    >
                        {submitted ? "Đã nộp bài" : "Nộp bài"}
                    </button>
                </div>

                {loading ? <ExamPracticeSkeleton /> : null}
                {error ? <p className="text-red-600">Không tải được đề thi.</p> : null}

                {!loading && !error && item ? (
                    <article className="mt-5 space-y-6">
                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
                            {processedDescription ? (
                                <MarkdownHtmlRenderer html={processedDescription} className="text-base text-slate-700" />
                            ) : null}
                        </div>

                        {submitted ? (
                            <div className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-6">
                                <p>
                                    <span className="block font-semibold text-slate-900">{summary.totalQuestions}</span>
                                    Tổng số câu
                                </p>
                                <p>
                                    <span className="block font-semibold text-slate-900">
                                        {summary.answeredQuestions}
                                    </span>
                                    Câu đã làm
                                </p>
                                <p>
                                    <span className="block font-semibold text-emerald-700">
                                        {summary.fullyCorrectQuestions}
                                    </span>
                                    Câu đúng hoàn toàn
                                </p>
                                <p>
                                    <span className="block font-semibold text-amber-700">
                                        {summary.unansweredQuestions}
                                    </span>
                                    Chưa trả lời
                                </p>
                                <p>
                                    <span className="block font-semibold text-blue-700">
                                        {formatScore(summary.totalScore)} / {formatScore(summary.maxScore)}
                                    </span>
                                    Tổng điểm
                                </p>
                                <p>
                                    <span className="block font-semibold text-blue-700">{summary.percent}%</span>
                                    Tỷ lệ đúng
                                </p>
                            </div>
                        ) : null}

                        <div className="space-y-8">
                            {sections.map((section, sectionIndex) => {
                                const sectionItem = section as Record<string, unknown>;
                                const sectionId = getSectionId(sectionItem);
                                const sectionQuestions = sectionId
                                    ? questionsBySectionId.get(sectionId) ?? []
                                    : [];
                                const sectionDescription = getSectionDescription(sectionItem);

                                return (
                                    <section key={sectionId || `section-${sectionIndex}`} className="space-y-5">
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-bold text-blue-900">
                                                {getSectionTitle(sectionItem, sectionIndex)}
                                            </h2>
                                            {sectionDescription ? (
                                                <MarkdownHtmlRenderer
                                                    html={sectionDescription}
                                                    className="text-base text-slate-700"
                                                />
                                            ) : null}
                                        </div>

                                        <div className="space-y-6">
                                            {sectionQuestions.map((question, localQuestionIndex) => {
                                                const questionItem = question as Record<string, unknown>;
                                                const questionIndex =
                                                    typeof questionItem.__questionIndex === "number"
                                                        ? questionItem.__questionIndex
                                                        : localQuestionIndex;
                                                const questionKey = getQuestionKey(questionItem, questionIndex);
                                                const questionType = getQuestionType(questionItem);
                                                const statements = getQuestionStatements(questionItem);
                                                const shortAnswerCorrect = getQuestionCorrectAnswer(questionItem);
                                                const questionResult = questionResults.get(questionKey);
                                                const questionId = getQuestionId(questionItem);
                                                const questionSlug = getQuestionSlug(questionItem);

                                                return (
                                                    <article key={questionKey} className="space-y-3">
                                                        <div className="flex items-start gap-2">
                                                            <div className="shrink-0 pt-[1px] font-bold text-slate-900">
                                                                <span>
                                                                    {getQuestionLabel(questionItem, questionIndex)}
                                                                </span>
                                                                {questionId ? (
                                                                    <span className="ml-2 text-sm font-semibold text-slate-500">
                                                                        ID: {questionId}
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                            <MarkdownHtmlRenderer
                                                                html={getQuestionHtml(questionItem, questionIndex)}
                                                                className="min-w-0 flex-1 text-base text-slate-900 [&_p]:m-0"
                                                            />
                                                        </div>

                                                        {questionType === "SHORT_ANSWER" ? (
                                                            <div className="space-y-2 pl-0 md:pl-8">
                                                                <input
                                                                    value={answers[questionKey] ?? ""}
                                                                    onChange={(event) =>
                                                                        setAnswers((current) => ({
                                                                            ...current,
                                                                            [questionKey]: event.target.value,
                                                                        }))
                                                                    }
                                                                    disabled={submitted}
                                                                    placeholder="Nhập câu trả lời"
                                                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 disabled:bg-slate-50"
                                                                />
                                                                {submitted ? (
                                                                    <p className="text-sm text-slate-600">
                                                                        Đáp án đúng:{" "}
                                                                        <span className="font-semibold text-blue-800">
                                                                            {shortAnswerCorrect || "Chưa có đáp án"}
                                                                        </span>
                                                                    </p>
                                                                ) : null}
                                                            </div>
                                                        ) : questionType === "TRUE_FALSE" ? (
                                                            <div className="space-y-3 pl-0 md:pl-8">
                                                                {statements.map((statement, statementIndex) => {
                                                                    const statementItem =
                                                                        statement as Record<string, unknown>;
                                                                    const statementKey = getStatementKey(
                                                                        statementItem,
                                                                        statementIndex,
                                                                    );
                                                                    const answerKey = `${questionKey}:${statementKey}`;
                                                                    const correctAnswer =
                                                                        getStatementCorrectAnswer(statementItem);

                                                                    return (
                                                                        <div
                                                                            key={answerKey}
                                                                            className="space-y-2 rounded-lg bg-slate-50 p-3"
                                                                        >
                                                                            <div className="flex items-start gap-2">
                                                                                <span className="mt-[2px] shrink-0 text-sm font-semibold text-slate-600">
                                                                                    {getStatementPrefix(
                                                                                        questionType,
                                                                                        statementIndex,
                                                                                    )}
                                                                                </span>
                                                                                <MarkdownHtmlRenderer
                                                                                    html={getStatementHtml(
                                                                                        statementItem,
                                                                                        statementIndex,
                                                                                    )}
                                                                                    className="min-w-0 text-sm text-slate-700 [&_ol]:m-0 [&_p]:m-0 [&_p]:inline [&_ul]:m-0"
                                                                                />
                                                                            </div>
                                                                            <div className="flex flex-wrap gap-2 pl-6">
                                                                                {[
                                                                                    { label: "Đúng", value: "true" },
                                                                                    { label: "Sai", value: "false" },
                                                                                ].map((option) => (
                                                                                    <label
                                                                                        key={option.value}
                                                                                        className="inline-flex items-center gap-2 text-sm text-slate-700"
                                                                                    >
                                                                                        <input
                                                                                            type="radio"
                                                                                            name={answerKey}
                                                                                            value={option.value}
                                                                                            checked={
                                                                                                answers[answerKey] === option.value
                                                                                            }
                                                                                            onChange={() =>
                                                                                                setAnswers((current) => ({
                                                                                                    ...current,
                                                                                                    [answerKey]: option.value,
                                                                                                }))
                                                                                            }
                                                                                            disabled={submitted}
                                                                                        />
                                                                                        {option.label}
                                                                                    </label>
                                                                                ))}
                                                                            </div>
                                                                            {submitted ? (
                                                                                <p className="pl-6 text-sm text-slate-600">
                                                                                    Đáp án đúng:{" "}
                                                                                    <span className="font-semibold text-blue-800">
                                                                                        {correctAnswer === null
                                                                                            ? "Chưa có đáp án"
                                                                                            : correctAnswer
                                                                                              ? "Đúng"
                                                                                              : "Sai"}
                                                                                    </span>
                                                                                </p>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-2 pl-0 md:pl-8">
                                                                {statements.map((statement, statementIndex) => {
                                                                    const statementItem =
                                                                        statement as Record<string, unknown>;
                                                                    const statementKey = getStatementKey(
                                                                        statementItem,
                                                                        statementIndex,
                                                                    );
                                                                    const answerKey = `${questionKey}:${statementKey}`;
                                                                    const correctAnswer =
                                                                        getStatementCorrectAnswer(statementItem);

                                                                    return (
                                                                        <label
                                                                            key={answerKey}
                                                                            className="flex cursor-pointer items-start gap-2"
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name={questionKey}
                                                                                checked={answers[answerKey] === "true"}
                                                                                onChange={() =>
                                                                                    setSingleChoiceAnswer(
                                                                                        questionItem,
                                                                                        questionIndex,
                                                                                        statementIndex,
                                                                                    )
                                                                                }
                                                                                disabled={submitted}
                                                                                className="mt-1"
                                                                            />
                                                                            <span className="mt-[2px] shrink-0 text-sm font-semibold text-slate-600">
                                                                                {getStatementPrefix(
                                                                                    questionType,
                                                                                    statementIndex,
                                                                                )}
                                                                            </span>
                                                                            <MarkdownHtmlRenderer
                                                                                html={getStatementHtml(
                                                                                    statementItem,
                                                                                    statementIndex,
                                                                                )}
                                                                                className="min-w-0 text-sm text-slate-700 [&_ol]:m-0 [&_p]:m-0 [&_p]:inline [&_ul]:m-0"
                                                                            />
                                                                            {submitted ? (
                                                                                <span className="ml-auto text-xs font-semibold text-blue-800">
                                                                                    {correctAnswer === true
                                                                                        ? "Đáp án đúng"
                                                                                        : null}
                                                                                </span>
                                                                            ) : null}
                                                                        </label>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}

                                                        {submitted && questionResult ? (
                                                            <div
                                                                className={`rounded-lg px-3 py-2 text-sm ${
                                                                    questionResult.isFullyCorrect
                                                                        ? "bg-emerald-50 text-emerald-800"
                                                                        : "bg-amber-50 text-amber-900"
                                                                }`}
                                                            >
                                                                Kết quả câu này:{" "}
                                                                <span className="font-semibold">
                                                                    {formatScore(questionResult.score)} /{" "}
                                                                    {formatScore(questionResult.maxScore)} điểm
                                                                </span>
                                                                {questionType === "TRUE_FALSE" ? (
                                                                    <>
                                                                        {" "}
                                                                        ({questionResult.correctCount}/
                                                                        {questionResult.maxCorrectCount} statement đúng)
                                                                    </>
                                                                ) : null}
                                                            </div>
                                                        ) : null}

                                                        {submitted && questionSlug ? (
                                                            <a
                                                                href={buildQuestionDetailHref(questionSlug)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex w-fit text-sm font-semibold text-blue-700 hover:text-blue-900"
                                                            >
                                                                Xem chi tiết câu hỏi
                                                            </a>
                                                        ) : null}
                                                    </article>
                                                );
                                            })}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitted}
                                className="rounded-lg bg-[#194DB6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#123d92] disabled:cursor-default disabled:bg-slate-400"
                            >
                                {submitted ? "Đã nộp bài" : "Nộp bài"}
                            </button>
                        </div>
                    </article>
                ) : null}
            </section>
        </div>
    );
}
