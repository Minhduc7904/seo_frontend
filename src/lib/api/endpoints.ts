export const API_ENDPOINTS = {
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
        me: "/auth/me",
    },
    posts: {
        list: "/posts",
        detail: (id: string | number) => `/posts/${id}`,
    },
    seoMedia: {
        publicSlotItems: (code: string) =>
            `/seo-media/public/slots/${encodeURIComponent(code)}/items`,
    },
    contact: "/contact",
} as const;
