export { apiClient } from "./client";
export { API_ENDPOINTS } from "./endpoints";
export { PAGE_ENDPOINTS, PAGE_SEO_MEDIA_SLOTS } from "./constants/page-slots";
export { examService } from "./services/exam.service";
export { seoMediaService } from "./services/seo-media.service";
export type { PageEndpoint, PageKey, PageSeoMediaSlots } from "./constants/page-slots";
export type {
    ApiResponse,
    PublicSeoExamDetail,
    PublicSeoExamItem,
    PublicSeoExamListQueryParams,
    PublicSeoExamListResponse,
} from "./services/exam.service";
export type {
    ApiListResponse,
    GetPublicSeoMediaItemsParams,
    PaginationMeta,
    SeoMediaItem,
    SeoMediaSlotCode,
} from "./services/seo-media.service";
