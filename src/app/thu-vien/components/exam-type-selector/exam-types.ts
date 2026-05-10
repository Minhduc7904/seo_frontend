export type ExamType = {
    id: string;
    name: string;
    description: string;
    cardImageSrc: string;
    typeOfExam: "CK1" | "TSA" | "THPT" | "OTTHPT" | "OT" | "CK2" | "GK1" | "GK2" | "HSA";
};

export const EXAM_TYPES: ExamType[] = [
    {
        id: "cuoi-ky-1",
        name: "Cuối kỳ 1",
        description: "Bộ đề tổng hợp kiến thức học kỳ 1 theo mức độ từ cơ bản đến nâng cao.",
        cardImageSrc: "/images/tai_lieu_hoc/CuoiKy1.png",
        typeOfExam: "CK1",
    },
    {
        id: "danh-gia-tu-duy",
        name: "Đánh giá tư duy",
        description: "Rèn phản xạ lập luận và kỹ năng phân tích trong các dạng đề đánh giá tư duy.",
        cardImageSrc: "/images/tai_lieu_hoc/DanhGiaTuDuy.png",
        typeOfExam: "TSA",
    },
    {
        id: "thpt-quoc-gia",
        name: "THPT Quốc gia",
        description: "Bộ đề định dạng chuẩn kỳ thi THPT Quốc gia môn Toán theo chuyên đề trọng điểm.",
        cardImageSrc: "/images/tai_lieu_hoc/THPTQuocGia.png",
        typeOfExam: "THPT",
    },
    {
        id: "on-tap-thpt-quoc-gia",
        name: "Ôn tập THPT Quốc gia",
        description: "Lộ trình ôn tập theo giai đoạn, tập trung tăng tốc điểm số trước kỳ thi.",
        cardImageSrc: "/images/tai_lieu_hoc/OnTapTHPT.png",
        typeOfExam: "OTTHPT",
    },
    {
        id: "on-tap",
        name: "Ôn tập",
        description: "Tổng hợp tài liệu ôn tập theo chương và chủ đề để củng cố nền tảng chắc chắn.",
        cardImageSrc: "/images/tai_lieu_hoc/OnTap.png",
        typeOfExam: "OT",
    },
    {
        id: "cuoi-ky-2",
        name: "Cuối kỳ 2",
        description: "Rèn kỹ năng làm bài cuối kỳ 2 bám sát cấu trúc đề thường gặp tại trường.",
        cardImageSrc: "/images/tai_lieu_hoc/CuoiKy2.png",
        typeOfExam: "CK2",
    },
    {
        id: "giua-ky-1",
        name: "Giữa kỳ 1",
        description: "Hệ thống đề giữa kỳ 1 giúp học sinh kiểm tra tiến độ và lấp lỗ hổng kiến thức.",
        cardImageSrc: "/images/tai_lieu_hoc/GiuaKy1.png",
        typeOfExam: "GK1",
    },
    {
        id: "giua-ky-2",
        name: "Giữa kỳ 2",
        description: "Luyện các dạng bài trọng tâm giữa kỳ 2 để cải thiện độ chính xác khi làm đề.",
        cardImageSrc: "/images/tai_lieu_hoc/GiuaKy2.png",
        typeOfExam: "GK2",
    },
    {
        id: "danh-gia-nang-luc",
        name: "Đánh giá năng lực",
        description: "Luyện đề đánh giá năng lực theo định hướng tư duy tổng hợp và xử lý dữ kiện.",
        cardImageSrc: "/images/tai_lieu_hoc/DanhGiaNangLuc.png",
        typeOfExam: "HSA",
    },
];

export const EXAM_TYPE_BY_ID = Object.fromEntries(EXAM_TYPES.map((item) => [item.id, item])) as Record<
    string,
    ExamType
>;
