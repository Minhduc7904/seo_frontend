import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "https://beeedu.vn";

function resolveSiteUrl() {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

    try {
        const url = new URL(configured);
        return url.origin;
    } catch {
        return DEFAULT_SITE_URL;
    }
}

export default function robots(): MetadataRoute.Robots {
    const siteUrl = resolveSiteUrl();

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
