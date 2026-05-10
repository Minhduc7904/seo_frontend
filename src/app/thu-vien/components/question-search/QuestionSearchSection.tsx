"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MarkdownHtmlRenderer from "@/components/common/MarkdownHtmlRenderer";
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
import { usePublicSeoQuestionSearch } from "@/hooks/usePublicSeoQuestionSearch";

type QuestionCardProps = {
    item: Record<string, unknown>;
    index: number;
    searchQuery: string;
};

function QuestionCard({ item, index, searchQuery }: QuestionCardProps) {
    const questionHtml = getQuestionHtml(item, index);
    const questionType = getQuestionType(item);
    const statements = getQuestionStatements(item);
    const slug = getQuestionSlug(item);
    const detailHref = slug ? buildQuestionDetailHref(slug, searchQuery) : "";
    const questionId = getQuestionId(item);

    const content = (
        <article className="rounded-lg border border-slate-200 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            <div className="space-y-3">

                {questionId ? (
                    <div className="text-xs font-semibold text-slate-500">ID câu hỏi: {questionId}</div>
                ) : null}
                <MarkdownHtmlRenderer html={questionHtml} className="text-sm text-slate-900" />


                {statements.length > 0 ? (
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
                                    <span className="mt-[2px] text-sm font-semibold text-slate-600">{prefix}</span>
                                    <MarkdownHtmlRenderer
                                        html={statementHtml}
                                        className="text-sm text-slate-700 [&_p]:m-0 [&_p]:inline [&_ul]:m-0 [&_ol]:m-0"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </article>
    );

    if (detailHref) {
        return (
            <Link href={detailHref} className="group block">
                {content}
            </Link>
        );
    }

    return content;
}

function QuestionCardSkeleton() {
    return (
        <div className="animate-pulse rounded-lg border border-slate-200 p-4">
            <div className="space-y-3">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-11/12 rounded bg-slate-200" />
                    <div className="h-3 w-10/12 rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

export default function QuestionSearchSection() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") ?? "";
    const [keyword, setKeyword] = useState(initialSearch);
    const [debouncedKeyword, setDebouncedKeyword] = useState(initialSearch);

    useEffect(() => {
        const nextKeyword = searchParams.get("search") ?? "";
        if (nextKeyword !== keyword) {
            setKeyword(nextKeyword);
            setDebouncedKeyword(nextKeyword);
        }
        // Intentionally omit `keyword` from deps to avoid overriding user input mid-typing.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedKeyword(keyword.trim());
        }, 500);

        return () => clearTimeout(timeout);
    }, [keyword]);

    useEffect(() => {
        const currentSearch = searchParams.get("search") ?? "";
        if (debouncedKeyword === currentSearch) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());

        if (debouncedKeyword) {
            params.set("search", debouncedKeyword);
        } else {
            params.delete("search");
        }

        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname);
    }, [debouncedKeyword, pathname, router, searchParams]);

    const currentSearch = searchParams.get("search") ?? "";

    const { questions, response, loading, error } = usePublicSeoQuestionSearch({
        search: debouncedKeyword || undefined,
        page: 1,
        limit: 10,
    });

    const total = useMemo(() => {
        return Number(response?.meta?.total ?? questions.length ?? 0);
    }, [questions.length, response?.meta?.total]);

    return (
        <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
            <div className="mx-auto max-w-3xl">
                <h3 className="text-center text-2xl font-extrabold leading-tight text-slate-900">Tìm kiếm câu hỏi</h3>

                <div className="relative mx-auto mt-5 max-w-2xl">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder="Nhập từ khóa để tìm câu hỏi..."
                        className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                    />
                </div>

                {debouncedKeyword && !loading && !error ? (
                    <p className="mt-3 text-center text-sm text-slate-600">
                        Kết quả: <span className="font-semibold text-blue-800">{total}</span>
                    </p>
                ) : !debouncedKeyword ? (
                    <p className="mt-3 text-center text-sm text-slate-500">Nhập từ khóa để bắt đầu tìm kiếm.</p>
                ) : null}

                {loading ? (
                    <div className="mt-5 space-y-2">
                        {[0, 1, 2].map((index) => (
                            <QuestionCardSkeleton key={`question-skeleton-${index}`} />
                        ))}
                    </div>
                ) : null}

                {error ? <p className="mt-4 text-center text-red-600">Không tìm được câu hỏi.</p> : null}

                {!loading && !error && debouncedKeyword && questions.length > 0 ? (
                    <div className="mt-5 space-y-2">
                        {questions.map((question, index) => {
                            const item = question as Record<string, unknown>;
                            return (
                                <QuestionCard
                                    key={`${String(item.id ?? index)}-${index}`}
                                    item={item}
                                    index={index}
                                    searchQuery={currentSearch}
                                />
                            );
                        })}
                    </div>
                ) : null}

                {!loading && !error && debouncedKeyword && questions.length === 0 ? (
                    <p className="mt-5 text-center text-slate-600">Không có câu hỏi phù hợp.</p>
                ) : null}
            </div>
        </section>
    );
}

