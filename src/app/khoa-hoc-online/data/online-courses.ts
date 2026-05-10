export type OnlineCourse = {
    id: string;
    slug: string;
    title: string;
    track: "THPT" | "HSA" | "TSA" | "CO_BAN";
    grade: "10" | "11" | "12";
    duration: string;
    format: string;
    summary: string;
    price: string;
    highlights: string[];
    imageSrc?: string;
};

export type OnlineCourseDetail = OnlineCourse & {
    breadcrumbs: string[];
    tagline: string;
    rating: number;
    ratingText: string;
    studentsCount: string;
    lessonsCount: string;
    totalDuration: string;
    instructor: string;
    oldPrice?: string;
    priceNote?: string;
    learningItems: string[];
    relatedTopics: string[];
    contentSections: Array<{ title: string; lessons: string; duration: string }>;
};

export const DEFAULT_COURSE_IMAGE_SRC = "/images/khoa_online/defaultcourse.jpg";

export const ONLINE_COURSE_DETAILS: OnlineCourseDetail[] = [
    {
        id: "online-thpt-12",
        slug: "luyen-thi-thpt-quoc-gia-toan-12",
        title: "Luyện thi THPT Quốc gia Toán 12",
        track: "THPT",
        grade: "12",
        duration: "12 tuần",
        format: "Live + video",
        summary: "Lộ trình sát cấu trúc đề, tăng tốc điểm số với bộ đề tổng hợp.",
        price: "1.200.000đ/tháng",
        highlights: ["Live tuần + bài giảng video", "Luyện đề hàng tuần", "Có lộ trình theo dõi tiến độ"],
        breadcrumbs: ["Khóa online", "Khóa học THPT", "Môn Toán"],
        tagline: "Khóa học luyện thi bài bản cho mục tiêu 8+ điểm",
        rating: 4.9,
        ratingText: "4.9 / 5.0",
        studentsCount: "5.147",
        lessonsCount: "67",
        totalDuration: "12 giờ 43 phút",
        instructor: "Khắc Ngọc",
        oldPrice: "1.493.000đ",
        priceNote: "Giảm 13 giờ tới đợt giảm giá này!",
        learningItems: [
            "Kỹ năng xử lý nhanh các dạng đề trắc nghiệm chuẩn THPT Quốc gia",
            "Hệ thống công thức và phương pháp giải theo chuyên đề",
            "Chiến lược phân bổ thời gian làm bài thi 50 câu",
            "Bộ đề tổng hợp kèm hướng dẫn giải chi tiết",
        ],
        relatedTopics: ["Toán", "Ôn thi", "THPT", "Trắc nghiệm"],
        contentSections: [
            { title: "Khởi động và định hướng", lessons: "10 bài", duration: "1 giờ 05 phút" },
            { title: "Hàm số và đồ thị", lessons: "12 bài", duration: "2 giờ 10 phút" },
            { title: "Mũ - logarit", lessons: "8 bài", duration: "1 giờ 20 phút" },
            { title: "Tích phân và ứng dụng", lessons: "9 bài", duration: "1 giờ 45 phút" },
            { title: "Tổng ôn đề chuẩn", lessons: "28 bài", duration: "6 giờ 23 phút" },
        ],
    },
    {
        id: "online-hsa-12",
        slug: "on-luyen-hsa-toan-tong-hop",
        title: "Ôn luyện HSA Toán tổng hợp",
        track: "HSA",
        grade: "12",
        duration: "10 tuần",
        format: "Video + bài tập",
        summary: "Rèn tư duy và kỹ năng xử lý dữ liệu cho kỳ thi đánh giá năng lực.",
        price: "980.000đ/tháng",
        highlights: ["Đề thi thử định kỳ", "Hệ thống tổng hợp công thức", "Bộ câu hỏi theo chuyên đề"],
        breadcrumbs: ["Khóa online", "Khóa học HSA", "Môn Toán"],
        tagline: "Lộ trình rèn tư duy phân tích cho kỳ thi HSA",
        rating: 4.8,
        ratingText: "4.8 / 5.0",
        studentsCount: "2.314",
        lessonsCount: "52",
        totalDuration: "10 giờ 05 phút",
        instructor: "Khắc Ngọc",
        oldPrice: "1.090.000đ",
        priceNote: "Ưu đãi áp dụng đến cuối tuần.",
        learningItems: [
            "Rèn kỹ năng đọc hiểu dữ liệu và bảng biểu",
            "Hệ thống bài tập theo chủ đề tư duy tổng hợp",
            "Luyện đề mô phỏng HSA kèm đáp án",
            "Gợi ý chiến lược làm bài và phân loại câu hỏi",
        ],
        relatedTopics: ["HSA", "Tư duy", "Toán tổng hợp", "Dữ liệu"],
        contentSections: [
            { title: "Tư duy số học", lessons: "9 bài", duration: "1 giờ 20 phút" },
            { title: "Đại số tổng hợp", lessons: "11 bài", duration: "2 giờ 05 phút" },
            { title: "Hình học tư duy", lessons: "8 bài", duration: "1 giờ 15 phút" },
            { title: "Đề mô phỏng", lessons: "24 bài", duration: "5 giờ 25 phút" },
        ],
    },
    {
        id: "online-tsa-11",
        slug: "danh-gia-tu-duy-tsa-lop-11",
        title: "Đánh giá tư duy TSA - Lớp 11",
        track: "TSA",
        grade: "11",
        duration: "8 tuần",
        format: "Live + tự ôn tập",
        summary: "Tập trung kỹ năng tư duy logic và các dạng bài thường gặp.",
        price: "850.000đ/tháng",
        highlights: ["Lớp live giải đề", "Tài liệu tổng hợp", "Hỗ trợ giải bài"],
        breadcrumbs: ["Khóa online", "Khóa học TSA", "Môn Toán"],
        tagline: "Bứt tốc tư duy logic cho kỳ thi TSA",
        rating: 4.7,
        ratingText: "4.7 / 5.0",
        studentsCount: "1.428",
        lessonsCount: "44",
        totalDuration: "8 giờ 40 phút",
        instructor: "Khắc Ngọc",
        oldPrice: "990.000đ",
        priceNote: "Giữ chỗ sớm để nhận bộ đề bonus.",
        learningItems: [
            "Tư duy logic và suy luận nhanh",
            "Luyện đề TSA theo chuyên đề",
            "Kỹ thuật xử lý câu hỏi bẫy",
            "Hướng dẫn chiến lược làm bài tối ưu thời gian",
        ],
        relatedTopics: ["TSA", "Logic", "Luyện đề", "Tư duy"],
        contentSections: [
            { title: "Khởi động tư duy", lessons: "6 bài", duration: "1 giờ 05 phút" },
            { title: "Tư duy logic", lessons: "12 bài", duration: "2 giờ 10 phút" },
            { title: "Bài tập nâng cao", lessons: "10 bài", duration: "1 giờ 50 phút" },
            { title: "Đề TSA tổng hợp", lessons: "16 bài", duration: "3 giờ 35 phút" },
        ],
    },
    {
        id: "online-co-ban-10",
        slug: "nen-tang-toan-10-online",
        title: "Nền tảng Toán 10 cho học online",
        track: "CO_BAN",
        grade: "10",
        duration: "12 tuần",
        format: "Video + bài tập",
        summary: "Xây nền vững chắc để theo kịp lớp học và tự tin lên lớp trên.",
        price: "700.000đ/tháng",
        highlights: ["Video bài giảng ngắn", "Bài tập củng cố", "Hướng dẫn làm bài"],
        breadcrumbs: ["Khóa online", "Khóa nền tảng", "Môn Toán"],
        tagline: "Củng cố nền tảng vững chắc ngay từ lớp 10",
        rating: 4.9,
        ratingText: "4.9 / 5.0",
        studentsCount: "2.050",
        lessonsCount: "58",
        totalDuration: "11 giờ 10 phút",
        instructor: "Khắc Ngọc",
        oldPrice: "820.000đ",
        priceNote: "Ưu đãi áp dụng cho học viên mới.",
        learningItems: [
            "Nắm chắc kiến thức trọng tâm lớp 10",
            "Bài tập củng cố theo từng chương",
            "Video hướng dẫn từng bước giải",
            "Chuẩn bị nền tảng cho chương trình lớp 11",
        ],
        relatedTopics: ["Nền tảng", "Toán 10", "Tự học", "Bài tập"],
        contentSections: [
            { title: "Đại số cơ bản", lessons: "15 bài", duration: "3 giờ 10 phút" },
            { title: "Hình học cơ bản", lessons: "14 bài", duration: "2 giờ 40 phút" },
            { title: "Tổng ôn chương", lessons: "29 bài", duration: "5 giờ 20 phút" },
        ],
    },
];

export const ONLINE_COURSES: OnlineCourse[] = ONLINE_COURSE_DETAILS.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    track: course.track,
    grade: course.grade,
    duration: course.duration,
    format: course.format,
    summary: course.summary,
    price: course.price,
    highlights: course.highlights,
    imageSrc: course.imageSrc,
}));

export function getOnlineCourseBySlug(slug: string) {
    return ONLINE_COURSE_DETAILS.find((course) => course.slug === slug) ?? null;
}
