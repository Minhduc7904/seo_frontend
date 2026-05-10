type YouTubeEmbedProps = {
    url?: string | null;
    title?: string;
    className?: string;
};

function extractYouTubeId(url: string) {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "");

        if (host === "youtu.be") {
            return parsed.pathname.split("/").filter(Boolean)[0] ?? "";
        }

        if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
            const videoId = parsed.searchParams.get("v");
            if (videoId) return videoId;

            const parts = parsed.pathname.split("/").filter(Boolean);
            const embedIndex = parts.findIndex((part) => part === "embed" || part === "shorts");
            if (embedIndex >= 0 && parts[embedIndex + 1]) {
                return parts[embedIndex + 1];
            }
        }
    } catch {
        return "";
    }

    return "";
}

export default function YouTubeEmbed({ url, title = "Video YouTube", className }: YouTubeEmbedProps) {
    if (!url) return null;

    const videoId = extractYouTubeId(url);
    if (!videoId) return null;

    const src = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div
            className={
                className ??
                "aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black/5"
            }
        >
            <iframe
                src={src}
                title={title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    );
}
