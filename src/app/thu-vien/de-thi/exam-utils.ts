export function getNumericOrder(item: Record<string, unknown>) {
    const raw = item.order;
    return typeof raw === "number" ? raw : Number.POSITIVE_INFINITY;
}

export function getExamSections(exam: Record<string, unknown> | null) {
    const sections = exam?.sections;
    if (!Array.isArray(sections)) return [];

    return [...sections].sort((left, right) => {
        const leftSection = left as Record<string, unknown>;
        const rightSection = right as Record<string, unknown>;
        return getNumericOrder(leftSection) - getNumericOrder(rightSection);
    });
}

export function getExamQuestions(exam: Record<string, unknown> | null) {
    const questions = exam?.questions;
    if (!Array.isArray(questions)) return [];

    return [...questions].sort((left, right) => {
        const leftQuestion = left as Record<string, unknown>;
        const rightQuestion = right as Record<string, unknown>;
        return getNumericOrder(leftQuestion) - getNumericOrder(rightQuestion);
    });
}

export function getSectionId(section: Record<string, unknown>) {
    const raw = section.sectionId ?? section.id;
    return typeof raw === "string" || typeof raw === "number" ? String(raw) : "";
}

export function getQuestionSectionId(question: Record<string, unknown>) {
    const raw = question.sectionId ?? question.section_id;
    return typeof raw === "string" || typeof raw === "number" ? String(raw) : "";
}

export function getSectionTitle(section: Record<string, unknown>, index: number) {
    const raw = section.title ?? section.name;
    return typeof raw === "string" && raw.trim().length > 0 ? raw : `Phần ${index + 1}`;
}

export function getSectionDescription(section: Record<string, unknown>) {
    const raw = section.processedDescription ?? section.descriptionHtml ?? section.description;
    return typeof raw === "string" ? raw : "";
}

export function getQuestionLabel(question: Record<string, unknown>, fallbackIndex: number) {
    const raw = question.order;
    const order = typeof raw === "number" && Number.isFinite(raw) ? raw : fallbackIndex + 1;
    return `Câu ${order}.`;
}

export function getQuestionKey(question: Record<string, unknown>, fallbackIndex: number) {
    const raw = question.questionId ?? question.id;
    return typeof raw === "string" || typeof raw === "number" ? String(raw) : `question-${fallbackIndex}`;
}

export function getStatementKey(statement: Record<string, unknown>, fallbackIndex: number) {
    const raw = statement.statementId ?? statement.id;
    return typeof raw === "string" || typeof raw === "number" ? String(raw) : `statement-${fallbackIndex}`;
}

function normalizeAnswerValue(value: unknown) {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value !== "string") return null;

    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "đúng", "dung"].includes(normalized)) return true;
    if (["false", "0", "no", "sai"].includes(normalized)) return false;
    return null;
}

export function getStatementCorrectAnswer(statement: Record<string, unknown>) {
    const raw =
        statement.correctAnswer ??
        statement.correct_answer ??
        statement.isCorrect ??
        statement.is_correct ??
        statement.answer;

    return normalizeAnswerValue(raw);
}

export function getQuestionCorrectAnswer(question: Record<string, unknown>) {
    const raw =
        question.correctAnswer ??
        question.correct_answer ??
        question.answer ??
        question.expectedAnswer ??
        question.expected_answer;

    if (typeof raw === "string" || typeof raw === "number") {
        return String(raw).trim();
    }

    return "";
}

export function normalizeShortAnswer(value: string) {
    return value.trim().replace(/\s+/g, " ").toLowerCase();
}
