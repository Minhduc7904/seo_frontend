export const PAGE_ENDPOINTS = {
    home: "/",
    about: "/gioi-thieu",
    offlineCourse: "/khoa-hoc-offline",
    onlineCourse: "/khoa-hoc-online",
    achievements: "/thanh-tich",
    library: "/thu-vien",
    team: "/doi-ngu",
    contact: "/lien-he",
} as const;

export const PAGE_SEO_MEDIA_SLOTS = {
    home: {
        hero: "home_hero",
        gallery: "home_gallery",
        learningEnvironment: "home_learning_environment",
        studentReviews: "home_student_reviews",
        teacherTeam: "home_teacher_team",
        footerBanner: "footer_banner",
    },
    about: {
        hero: "about_hero_center",
        gallery: "about_gallery",
        banner: "about_banner",
    },
    offlineCourse: {
        hero: "offline_course_hero",
        gallery: "offline_course_gallery",
        banner: "offline_course_banner",
    },
    onlineCourse: {
        hero: "online_course_hero",
        gallery: "online_course_gallery",
        banner: "online_course_banner",
    },
    achievements: {
        hero: "achievements_hero",
        gallery: "achievements_gallery",
        banner: "achievements_banner",
    },
    library: {
        hero: "library_hero",
        gallery: "library_gallery",
        banner: "library_banner",
    },
    team: {
        hero: "team_hero",
        gallery: "team_gallery",
        banner: "team_banner",
    },
    contact: {
        hero: "contact_hero",
        gallery: "contact_gallery",
        banner: "contact_banner",
    },
} as const;

export type PageKey = keyof typeof PAGE_ENDPOINTS;
export type PageEndpoint = (typeof PAGE_ENDPOINTS)[PageKey];
export type PageSeoMediaSlots = typeof PAGE_SEO_MEDIA_SLOTS;
