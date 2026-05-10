type MarkdownHtmlRendererProps = {
    html?: string | null;
    className?: string;
};

const DEFAULT_CLASS_NAME = "markdown-body bee-markdown";

function normalizeHtml(html?: string | null) {
    if (typeof html !== "string") return "";
    return html.trim();
}

function hasHtmlTags(value: string) {
    return /<\/?[a-z][\s\S]*>/i.test(value);
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function textToHtml(value: string) {
    const escaped = escapeHtml(value.replace(/\r\n/g, "\n").trim());
    const paragraphs = escaped.split(/\n{2,}/g).filter(Boolean);

    if (paragraphs.length === 0) {
        return "";
    }

    return paragraphs.map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`).join("");
}

export default function MarkdownHtmlRenderer({ html, className }: MarkdownHtmlRendererProps) {
    const normalizedHtml = normalizeHtml(html);

    if (!normalizedHtml) {
        return null;
    }

    const outputHtml = hasHtmlTags(normalizedHtml) ? normalizedHtml : textToHtml(normalizedHtml);

    if (!outputHtml) {
        return null;
    }

    // The API returns HTML already processed from markdown.
    return (
        <div
            className={[DEFAULT_CLASS_NAME, className].filter(Boolean).join(" ")}
            dangerouslySetInnerHTML={{ __html: outputHtml }}
        />
    );
}
