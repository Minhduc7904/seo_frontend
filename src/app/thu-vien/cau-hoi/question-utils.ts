const UPPER_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function pickStringValue(value: unknown) {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    return trimmed ? trimmed : "";
}

function pickDisplayValue(value: unknown) {
    if (typeof value === "number") return String(value);
    return pickStringValue(value);
}

export function getQuestionType(item: Record<string, unknown>) {
    const raw =
        item.type ??
        item.questionType ??
        item.question_type ??
        item.kind ??
        item.format;

    return typeof raw === "string" ? raw.trim().toUpperCase() : "";
}

export function getQuestionHtml(item: Record<string, unknown>, index: number) {
    const raw =
        item.processedContent ??
        item.processed_content ??
        item.contentHtml ??
        item.content ??
        item.question ??
        item.title ??
        item.name;

    const value = pickStringValue(raw);
    if (value) {
        return value;
    }

    return `Câu hỏi #${index + 1}`;
}

export function getQuestionStatements(item: Record<string, unknown>) {
    const raw = item.statements ?? item.answers ?? item.options ?? item.choices ?? item.items;
    return Array.isArray(raw) ? raw : [];
}

export function getStatementHtml(statement: Record<string, unknown>, index: number) {
    const raw =
        statement.processedContent ??
        statement.processed_content ??
        statement.contentHtml ??
        statement.content ??
        statement.text ??
        statement.title ??
        statement.label;

    const value = pickStringValue(raw);
    if (value) {
        return value;
    }

    return `Lựa chọn #${index + 1}`;
}

export function getStatementPrefix(questionType: string, index: number) {
    const normalizedType = questionType.trim().toUpperCase();
    const useLower = normalizedType === "TRUE_FALSE";
    const alphabet = useLower ? LOWER_ALPHABET : UPPER_ALPHABET;
    const fallbackCode = (useLower ? 97 : 65) + index;
    const letter = alphabet[index] ?? String.fromCharCode(fallbackCode);

    return useLower ? `${letter})` : `${letter}.`;
}

export function getQuestionSlug(item: Record<string, unknown>) {
    const raw = item.slug ?? item.questionSlug ?? item.question_slug ?? item.id ?? item.questionId;

    if (typeof raw === "string" || typeof raw === "number") {
        return String(raw).trim();
    }

    return "";
}

export function getQuestionId(item: Record<string, unknown>) {
    const raw = item.questionId ?? item.question_id ?? item.id;

    if (typeof raw === "string" || typeof raw === "number") {
        return String(raw).trim();
    }

    return "";
}

export function getQuestionGrade(item: Record<string, unknown>) {
    const raw =
        item.grade ??
        item.gradeName ??
        item.grade_level ??
        item.gradeLevel ??
        item.class ??
        item.level;

    return pickDisplayValue(raw);
}

export function getQuestionSubjectName(item: Record<string, unknown>) {
    const subject = item.subject as Record<string, unknown> | string | undefined;

    if (typeof subject === "string") {
        return pickStringValue(subject);
    }

    if (subject && typeof subject === "object") {
        const name = subject.name ?? subject.title ?? subject.subjectName;
        const value = pickStringValue(name);
        if (value) {
            return value;
        }
    }

    const raw = item.subjectName ?? item.subject_name ?? item.subjectTitle;
    return pickStringValue(raw);
}

export function getQuestionChapters(item: Record<string, unknown>) {
    const raw = item.questionChapters ?? item.question_chapters ?? item.chapters ?? item.chapterList;
    return Array.isArray(raw) ? raw : [];
}

export function getQuestionChapterTitles(item: Record<string, unknown>) {
    const chapters = getQuestionChapters(item);
    const names = chapters
        .map((entry) => {
            const chapterEntry = entry as Record<string, unknown>;
            const chapter = chapterEntry.chapter as Record<string, unknown> | undefined;
            const raw =
                chapter?.fullPath ??
                chapter?.name ??
                chapterEntry.chapterName ??
                chapterEntry.name ??
                chapterEntry.title;
            return pickStringValue(raw);
        })
        .filter(Boolean);

    return Array.from(new Set(names));
}

export function getQuestionSolutionHtml(item: Record<string, unknown>) {
    const raw =
        item.processedSolution ??
        item.processed_solution ??
        item.solutionHtml ??
        item.solution ??
        item.explanation ??
        item.answerHtml;

    return pickStringValue(raw);
}

export function getQuestionSolutionYoutubeUrl(item: Record<string, unknown>) {
    const raw =
        item.solutionYoutubeUrl ??
        item.solution_youtube_url ??
        item.solutionVideoUrl ??
        item.solution_video_url ??
        item.youtubeUrl ??
        item.youtube_url ??
        item.videoUrl;

    return pickStringValue(raw);
}

export function buildQuestionDetailHref(slug: string, search?: string) {
    const base = `/thu-vien/cau-hoi/chi-tiet/${encodeURIComponent(slug)}`;
    const trimmedSearch = search?.trim();

    if (!trimmedSearch) {
        return base;
    }

    const params = new URLSearchParams();
    params.set("search", trimmedSearch);
    return `${base}?${params.toString()}`;
}
