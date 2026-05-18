import type { DocumentColumn, DocumentItem } from "@/app/thu-vien/tai-lieu/data";
import type { PublicSeoDocumentItem, PublicSeoDocumentSection } from "@/lib/api";

const DEFAULT_THUMBNAIL = "/images/tai_lieu_hoc/defaultExam.jpg";

function formatDocumentDate(item: PublicSeoDocumentItem) {
    const raw = item.createdAt ?? item.created_at ?? item.created;
    if (typeof raw !== "string" && typeof raw !== "number") {
        return "";
    }

    const date = new Date(String(raw));
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function toDocumentItem(item: PublicSeoDocumentItem, index: number): DocumentItem {
    const rawId = item.slug ?? item.id ?? item.documentId ?? `document-${index}`;
    const rawTitle = item.title ?? item.name ?? item.documentName;
    const rawThumbnail = item.thumbnailUrl ?? item.image ?? item.thumbnail ?? item.coverUrl;
    const rawTags = item.tags;

    return {
        id: String(rawId),
        title: typeof rawTitle === "string" && rawTitle.trim() ? rawTitle : `Tài liệu #${index + 1}`,
        createdAtText: formatDocumentDate(item),
        thumbnailUrl: typeof rawThumbnail === "string" && rawThumbnail.trim() ? rawThumbnail : DEFAULT_THUMBNAIL,
        tags: Array.isArray(rawTags)
            ? rawTags
                  .map((tag) => {
                      if (typeof tag === "string") return tag;
                      if (typeof tag === "object" && tag !== null && "slug" in tag && typeof tag.slug === "string") {
                          return tag.slug;
                      }
                      return "";
                  })
                  .filter(Boolean)
            : [],
        summary: typeof item.summary === "string" ? item.summary : "",
        content: [],
    };
}

export function mapDocumentSectionsToColumns(
    sections: PublicSeoDocumentSection[],
    definitions: Array<{ key: string; fallbackTitle: string }>,
): DocumentColumn[] {
    const sectionByKey = new Map(sections.map((section) => [section.key, section]));

    return definitions.map(({ key, fallbackTitle }) => {
        const section = sectionByKey.get(key);

        return {
            id: key.replaceAll("_", "-"),
            title: section?.title ?? fallbackTitle,
            items: section?.documents.map((item, index) => toDocumentItem(item, index)) ?? [],
        };
    });
}
