export const DOCUMENT_TAG_TYPES = ["CHAPTER", "DOCUMENT_TYPE", "LEVEL", "SUBJECT"] as const;

export type DocumentTagType = (typeof DOCUMENT_TAG_TYPES)[number];

export const DOCUMENT_TAG_TYPE_LABELS: Record<DocumentTagType, string> = {
    CHAPTER: "Chương",
    DOCUMENT_TYPE: "Loại tài liệu",
    LEVEL: "Cấp học",
    SUBJECT: "Môn học",
};

export function isDocumentTagType(value: unknown): value is DocumentTagType {
    return typeof value === "string" && DOCUMENT_TAG_TYPES.includes(value as DocumentTagType);
}
