import type { PublicSeoExamItem } from "@/lib/api";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function toExamArray(value: unknown): PublicSeoExamItem[] {
    if (Array.isArray(value)) {
        return value as PublicSeoExamItem[];
    }

    if (isRecord(value) && Array.isArray(value.data)) {
        return value.data as PublicSeoExamItem[];
    }

    return [];
}

export function extractExamItems(payload: unknown): PublicSeoExamItem[] {
    if (isRecord(payload) && "data" in payload) {
        return toExamArray(payload.data);
    }

    return toExamArray(payload);
}
