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
    exams: {
        publicSeoList: "/exams/public/seo",
        publicSeoDetail: (slug: string) => `/exams/public/seo/${encodeURIComponent(slug)}`,
        publicSeoRelated: (slug: string) => `/exams/public/seo/${encodeURIComponent(slug)}/related`,
        publicSeoLatest: "/exams/public/seo/latest",
    },
    subjects: {
        publicSeoList: "/subjects/public/seo",
    },
    questions: {
        publicSeoSearch: "/questions/public/seo/search",
        publicSeoDetail: (slug: string) => `/questions/public/seo/${encodeURIComponent(slug)}`,
    },
    contact: "/contact",
} as const;
