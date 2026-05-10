type MarkdownHtmlRendererProps = {
    html?: string | null;
    className?: string;
};

const DEFAULT_CLASS_NAME = "markdown-body bee-markdown";

function normalizeHtml(html?: string | null) {
    if (typeof html !== "string") return "";
    return html.trim();
}

export default function MarkdownHtmlRenderer({ html, className }: MarkdownHtmlRendererProps) {
    const normalizedHtml = normalizeHtml(html);

    if (!normalizedHtml) {
        return null;
    }

    // The API returns HTML already processed from markdown.
    return (
        <div
            className={[DEFAULT_CLASS_NAME, className].filter(Boolean).join(" ")}
            dangerouslySetInnerHTML={{ __html: normalizedHtml }}
        />
    );
}
