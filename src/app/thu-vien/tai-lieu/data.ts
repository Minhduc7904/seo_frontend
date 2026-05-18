export type DocumentTag = {
    id: string;
    label: string;
};

export type DocumentItem = {
    id: string;
    title: string;
    createdAtText: string;
    thumbnailUrl: string;
    tags: string[];
    summary: string;
    content: string[];
};

export type DocumentColumn = {
    id: string;
    title: string;
    items: DocumentItem[];
};

export type ChapterTagGroup = {
    id: string;
    title: string;
    tags: DocumentTag[];
};

export const DOCUMENT_TYPE_TAGS = [
    { name: "ĐỀ THI THỬ THPT", slug: "de-thi-thu-thpt" },
    { name: "ĐỀ THPT CHÍNH THỨC", slug: "de-thpt-chinh-thuc" },
    { name: "ĐỀ ĐÁNH GIÁ NĂNG LỰC", slug: "de-danh-gia-nang-luc" },
    { name: "TÀI LIỆU ÔN THI THPT", slug: "tai-lieu-on-thi-thpt" },
    { name: "TÀI LIỆU TOÁN 12", slug: "tai-lieu-toan-12" },
    { name: "ĐỀ CƯƠNG TOÁN 12", slug: "de-cuong-toan-12" },
    { name: "ĐỀ GIỮA HK1 TOÁN 12", slug: "de-giua-hk1-toan-12" },
    { name: "ĐỀ HK 1 TOÁN 12", slug: "de-hk-1-toan-12" },
    { name: "ĐỀ GIỮA HK2 TOÁN 12", slug: "de-giua-hk2-toan-12" },
    { name: "ĐỀ HK 2 TOÁN 12", slug: "de-hk-2-toan-12" },
    { name: "ĐỀ KHẢO SÁT TOÁN 12", slug: "de-khao-sat-toan-12" },
    { name: "ĐỀ HSG TOÁN 12", slug: "de-hsg-toan-12" },
    { name: "GIÁO ÁN TOÁN 12", slug: "giao-an-toan-12" },
    { name: "TIPS GIẢI TOÁN 12", slug: "tips-giai-toan-12" },
    { name: "TÀI LIỆU TOÁN 11", slug: "tai-lieu-toan-11" },
    { name: "ĐỀ CƯƠNG TOÁN 11", slug: "de-cuong-toan-11" },
    { name: "ĐỀ GIỮA HK1 TOÁN 11", slug: "de-giua-hk1-toan-11" },
    { name: "ĐỀ HK1 TOÁN 11", slug: "de-hk1-toan-11" },
    { name: "ĐỀ GIỮA HK2 TOÁN 11", slug: "de-giua-hk2-toan-11" },
    { name: "ĐỀ HK2 TOÁN 11", slug: "de-hk2-toan-11" },
    { name: "ĐỀ KHẢO SÁT TOÁN 11", slug: "de-khao-sat-toan-11" },
    { name: "ĐỀ HSG TOÁN 11", slug: "de-hsg-toan-11" },
    { name: "GIÁO ÁN TOÁN 11", slug: "giao-an-toan-11" },
    { name: "TIPS GIẢI TOÁN 11", slug: "tips-giai-toan-11" },
    { name: "TÀI LIỆU TOÁN 10", slug: "tai-lieu-toan-10" },
    { name: "ĐỀ CƯƠNG TOÁN 10", slug: "de-cuong-toan-10" },
    { name: "ĐỀ GIỮA HK1 TOÁN 10", slug: "de-giua-hk1-toan-10" },
    { name: "ĐỀ HK1 TOÁN 10", slug: "de-hk1-toan-10" },
    { name: "ĐỀ GIỮA HK2 TOÁN 10", slug: "de-giua-hk2-toan-10" },
    { name: "ĐỀ HK2 TOÁN 10", slug: "de-hk2-toan-10" },
    { name: "ĐỀ KHẢO SÁT TOÁN 10", slug: "de-khao-sat-toan-10" },
    { name: "ĐỀ HSG TOÁN 10", slug: "de-hsg-toan-10" },
    { name: "GIÁO ÁN TOÁN 10", slug: "giao-an-toan-10" },
    { name: "TIPS GIẢI TOÁN 10", slug: "tips-giai-toan-10" },
    { name: "SÁCH GIÁO KHOA THPT", slug: "sach-giao-khoa-thpt" },
    { name: "SÁCH GIÁO KHOA THCS", slug: "sach-giao-khoa-thcs" },
    { name: "ĐỀ THI VÀO LỚP 10", slug: "de-thi-vao-lop-10" },
    { name: "TÀI LIỆU THI VÀO LỚP 10", slug: "tai-lieu-thi-vao-lop-10" },
    { name: "TÀI LIỆU TOÁN 9", slug: "tai-lieu-toan-9" },
    { name: "ĐỀ CƯƠNG TOÁN 9", slug: "de-cuong-toan-9" },
    { name: "ĐỀ GIỮA HK1 TOÁN 9", slug: "de-giua-hk1-toan-9" },
    { name: "ĐỀ HK1 TOÁN 9", slug: "de-hk1-toan-9" },
    { name: "ĐỀ GIỮA HK2 TOÁN 9", slug: "de-giua-hk2-toan-9" },
    { name: "ĐỀ HK2 TOÁN 9", slug: "de-hk2-toan-9" },
    { name: "ĐỀ KHẢO SÁT TOÁN 9", slug: "de-khao-sat-toan-9" },
    { name: "ĐỀ HSG TOÁN 9", slug: "de-hsg-toan-9" },
    { name: "TÀI LIỆU TOÁN 8", slug: "tai-lieu-toan-8" },
    { name: "ĐỀ CƯƠNG TOÁN 8", slug: "de-cuong-toan-8" },
    { name: "ĐỀ GIỮA HK1 TOÁN 8", slug: "de-giua-hk1-toan-8" },
    { name: "ĐỀ HK1 TOÁN 8", slug: "de-hk1-toan-8" },
    { name: "ĐỀ GIỮA HK2 TOÁN 8", slug: "de-giua-hk2-toan-8" },
    { name: "ĐỀ HK2 TOÁN 8", slug: "de-hk2-toan-8" },
    { name: "ĐỀ KHẢO SÁT TOÁN 8", slug: "de-khao-sat-toan-8" },
    { name: "ĐỀ HSG TOÁN 8", slug: "de-hsg-toan-8" },
    { name: "TÀI LIỆU TOÁN 7", slug: "tai-lieu-toan-7" },
    { name: "ĐỀ CƯƠNG TOÁN 7", slug: "de-cuong-toan-7" },
    { name: "ĐỀ GIỮA HK1 TOÁN 7", slug: "de-giua-hk1-toan-7" },
    { name: "ĐỀ HK1 TOÁN 7", slug: "de-hk1-toan-7" },
    { name: "ĐỀ GIỮA HK2 TOÁN 7", slug: "de-giua-hk2-toan-7" },
    { name: "ĐỀ HK2 TOÁN 7", slug: "de-hk2-toan-7" },
    { name: "ĐỀ KHẢO SÁT TOÁN 7", slug: "de-khao-sat-toan-7" },
    { name: "ĐỀ HSG TOÁN 7", slug: "de-hsg-toan-7" },
    { name: "TÀI LIỆU TOÁN 6", slug: "tai-lieu-toan-6" },
    { name: "ĐỀ CƯƠNG TOÁN 6", slug: "de-cuong-toan-6" },
    { name: "ĐỀ GIỮA HK1 TOÁN 6", slug: "de-giua-hk1-toan-6" },
    { name: "ĐỀ HK1 TOÁN 6", slug: "de-hk1-toan-6" },
    { name: "ĐỀ GIỮA HK2 TOÁN 6", slug: "de-giua-hk2-toan-6" },
    { name: "ĐỀ HK2 TOÁN 6", slug: "de-hk2-toan-6" },
    { name: "ĐỀ KHẢO SÁT TOÁN 6", slug: "de-khao-sat-toan-6" },
    { name: "ĐỀ HSG TOÁN 6", slug: "de-hsg-toan-6" },
] as const;

export type DocumentTypeSlug = (typeof DOCUMENT_TYPE_TAGS)[number]["slug"];

type DocumentFilter = {
    includeAnyTags?: string[];
    includeAllTags?: string[];
    limit?: number;
};

export const DOCUMENT_TAGS: DocumentTag[] = [
    { id: "lop-6", label: "Tài liệu lớp 6" },
    { id: "lop-7", label: "Tài liệu lớp 7" },
    { id: "lop-8", label: "Tài liệu lớp 8" },
    { id: "lop-9", label: "Tài liệu lớp 9" },
    { id: "lop-10", label: "Tài liệu lớp 10" },
    { id: "lop-11", label: "Tài liệu lớp 11" },
    { id: "lop-12", label: "Tài liệu lớp 12" },
];

export const SEARCH_EXTRA_TAGS: DocumentTag[] = [
    { id: "chuyen-de", label: "Tài liệu chuyên đề" },
    { id: "cong-thuc", label: "Tài liệu công thức" },
    { id: "on-tap", label: "Tài liệu ôn tập" },
    { id: "luyen-thi", label: "Tài liệu luyện thi" },
    { id: "kiem-tra", label: "Đề kiểm tra" },
    { id: "tom-tat", label: "Tài liệu tóm tắt" },
];

export const THCS_CHAPTER_TAG_GROUPS: ChapterTagGroup[] = [
    {
        id: "lop-6",
        title: "Chương lớp 6",
        tags: [
            { id: "lop-6-chuong-1", label: "Chương 1: Số tự nhiên" },
            { id: "lop-6-chuong-2", label: "Chương 2: Số nguyên" },
            { id: "lop-6-chuong-3", label: "Chương 3: Phân số" },
        ],
    },
    {
        id: "lop-7",
        title: "Chương lớp 7",
        tags: [
            { id: "lop-7-chuong-1", label: "Chương 1: Số hữu tỉ" },
            { id: "lop-7-chuong-2", label: "Chương 2: Số thực" },
            { id: "lop-7-chuong-3", label: "Chương 3: Góc và đường thẳng" },
        ],
    },
    {
        id: "lop-8",
        title: "Chương lớp 8",
        tags: [
            { id: "lop-8-chuong-1", label: "Chương 1: Đa thức" },
            { id: "lop-8-chuong-2", label: "Chương 2: Hằng đẳng thức" },
            { id: "lop-8-chuong-3", label: "Chương 3: Tứ giác" },
        ],
    },
    {
        id: "lop-9",
        title: "Chương lớp 9",
        tags: [
            { id: "lop-9-chuong-1", label: "Chương 1: Căn bậc hai" },
            { id: "lop-9-chuong-2", label: "Chương 2: Hàm số bậc nhất" },
            { id: "lop-9-chuong-3", label: "Chương 3: Hệ thức lượng" },
        ],
    },
];

export const THPT_CHAPTER_TAG_GROUPS: ChapterTagGroup[] = [
    {
        id: "lop-10",
        title: "Chương lớp 10",
        tags: [
            { id: "lop-10-chuong-1", label: "Chương 1: Mệnh đề - Tập hợp" },
            { id: "lop-10-chuong-2", label: "Chương 2: Hàm số" },
            { id: "lop-10-chuong-3", label: "Chương 3: Phương trình" },
            { id: "lop-10-chuong-4", label: "Chương 4: Bất đẳng thức" },
        ],
    },
    {
        id: "lop-11",
        title: "Chương lớp 11",
        tags: [
            { id: "lop-11-chuong-1", label: "Chương 1: Hàm số lượng giác" },
            { id: "lop-11-chuong-2", label: "Chương 2: Tổ hợp - Xác suất" },
            { id: "lop-11-chuong-3", label: "Chương 3: Dãy số" },
            { id: "lop-11-chuong-4", label: "Chương 4: Giới hạn" },
        ],
    },
    {
        id: "lop-12",
        title: "Chương lớp 12",
        tags: [
            { id: "lop-12-chuong-1", label: "Chương 1: Ứng dụng đạo hàm" },
            { id: "lop-12-chuong-2", label: "Chương 2: Mũ - Logarit" },
            { id: "lop-12-chuong-3", label: "Chương 3: Nguyên hàm" },
            { id: "lop-12-chuong-4", label: "Chương 4: Số phức" },
        ],
    },
];

export const CHAPTER_TAG_GROUPS = [...THCS_CHAPTER_TAG_GROUPS, ...THPT_CHAPTER_TAG_GROUPS];
export const CHAPTER_TAGS = CHAPTER_TAG_GROUPS.flatMap((group) => group.tags);

const TAG_LABEL_BY_ID = new Map(
    [...DOCUMENT_TAGS, ...SEARCH_EXTRA_TAGS, ...CHAPTER_TAGS].map((tag) => [tag.id, tag.label]),
);

export function getDocumentTagLabel(tagId: string) {
    return TAG_LABEL_BY_ID.get(tagId) ?? tagId;
}

export const THPT_DOCUMENT_COLUMNS: DocumentColumn[] = [
    {
        id: "on-tap",
        title: "Tài liệu ôn tập",
        items: [
            {
                id: "on-tap-1",
                title: "Ôn tập hàm số và đồ thị",
                createdAtText: "10/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/OnTap.png",
                tags: ["lop-10", "on-tap", "chuyen-de", "lop-10-chuong-2"],
                summary: "Tổng hợp các dạng bài cơ bản về hàm số và đồ thị, kèm bài tập tự luyện.",
                content: [
                    "Tài liệu hệ thống hóa kiến thức về hàm số bậc nhất, bậc hai và các bước khảo sát đồ thị.",
                    "Mỗi phần có ví dụ minh họa và bài tập luyện tập từ cơ bản đến nâng cao.",
                    "Phù hợp cho học sinh cần ôn tập nhanh trước kiểm tra hoặc luyện thi.",
                ],
            },
            {
                id: "on-tap-2",
                title: "Tổng hợp công thức lượng giác",
                createdAtText: "08/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/OnTapChung.png",
                tags: ["lop-11", "on-tap", "cong-thuc", "lop-11-chuong-1"],
                summary: "Bảng công thức lượng giác đầy đủ, dễ tra cứu và hệ thống theo nhóm.",
                content: [
                    "Tổng hợp công thức cơ bản, công thức biến đổi và các hệ thức lượng giác nâng cao.",
                    "Có phần ghi chú nhanh giúp nhớ công thức quan trọng và cách áp dụng.",
                    "Thích hợp dùng như tài liệu tra cứu khi giải bài tập.",
                ],
            },
            {
                id: "on-tap-3",
                title: "Chuyên đề giới hạn và liên tục",
                createdAtText: "04/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/GiuaKy1.png",
                tags: ["lop-12", "on-tap", "chuyen-de", "lop-12-chuong-1"],
                summary: "Chuyên đề trọng tâm về giới hạn, liên tục với bài tập chọn lọc.",
                content: [
                    "Trình bày lý thuyết cốt lõi về giới hạn, liên tục và tính liên tục của hàm số.",
                    "Bài tập phân loại theo dạng kèm hướng dẫn giải chi tiết.",
                    "Giúp học sinh nắm chắc nền tảng trước khi học đạo hàm.",
                ],
            },
        ],
    },
    {
        id: "kiem-tra",
        title: "Đề kiểm tra",
        items: [
            {
                id: "kiem-tra-1",
                title: "Đề giữa kỳ 1 - Toán 11",
                createdAtText: "02/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/GiuaKy2.png",
                tags: ["lop-11", "kiem-tra", "lop-11-chuong-2"],
                summary: "Đề kiểm tra giữa kỳ 1 theo cấu trúc chuẩn và bám sát chương trình.",
                content: [
                    "Đề gồm các dạng bài trọng tâm của nửa đầu học kỳ 1 Toán 11.",
                    "Có phần trắc nghiệm và tự luận để luyện kỹ năng phân bổ thời gian.",
                    "Gợi ý cách làm nhanh cho một số câu nâng cao.",
                ],
            },
            {
                id: "kiem-tra-2",
                title: "Đề cuối kỳ 1 - Toán 10",
                createdAtText: "28/04/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/CuoiKy1.png",
                tags: ["lop-10", "kiem-tra", "lop-10-chuong-1"],
                summary: "Đề cuối kỳ 1 tổng hợp kiến thức Toán 10, kèm thang điểm tham khảo.",
                content: [
                    "Bộ đề giúp học sinh luyện tập trước kỳ thi với mức độ từ dễ đến khó.",
                    "Phù hợp dùng để tự kiểm tra mức độ nắm vững kiến thức học kỳ 1.",
                    "Có gợi ý đáp án cho câu hỏi quan trọng.",
                ],
            },
            {
                id: "kiem-tra-3",
                title: "Đề cuối kỳ 2 - Toán 12",
                createdAtText: "20/04/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/CuoiKy2.png",
                tags: ["lop-12", "kiem-tra", "lop-12-chuong-2"],
                summary: "Đề cuối kỳ 2 tổng hợp chương trình Toán 12 và định hướng thi THPT.",
                content: [
                    "Đề bao phủ các chủ đề trọng tâm như đạo hàm, tích phân và số phức.",
                    "Có phần bài tập ứng dụng thực tế để rèn kỹ năng phân tích.",
                    "Thích hợp cho giai đoạn tổng ôn cuối năm.",
                ],
            },
        ],
    },
    {
        id: "luyen-thi",
        title: "Luyện thi THPT",
        items: [
            {
                id: "luyen-thi-1",
                title: "Đề luyện THPT Quốc gia",
                createdAtText: "18/04/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/THPTQuocGia.png",
                tags: ["lop-12", "luyen-thi", "lop-12-chuong-1"],
                summary: "Đề luyện theo cấu trúc THPT Quốc gia, thời lượng chuẩn.",
                content: [
                    "Bộ đề mô phỏng sát dạng đề thi thật với độ khó phân hóa.",
                    "Kèm hướng dẫn phân bổ thời gian làm bài hợp lý.",
                    "Phù hợp cho học sinh luyện đề ở giai đoạn nước rút.",
                ],
            },
            {
                id: "luyen-thi-2",
                title: "Đề đánh giá năng lực",
                createdAtText: "12/04/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/DanhGiaNangLuc.png",
                tags: ["lop-12", "luyen-thi", "lop-12-chuong-3"],
                summary: "Đề luyện đánh giá năng lực, bám sát cấu trúc của các kỳ thi lớn.",
                content: [
                    "Hệ thống câu hỏi đa dạng, yêu cầu tư duy tổng hợp và vận dụng.",
                    "Gợi ý chiến lược làm bài cho phần câu hỏi khó.",
                    "Phù hợp cho học sinh luyện thi đánh giá năng lực.",
                ],
            },
            {
                id: "luyen-thi-3",
                title: "Đề đánh giá tư duy",
                createdAtText: "09/04/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/DanhGiaTuDuy.png",
                tags: ["lop-12", "luyen-thi", "lop-12-chuong-4"],
                summary: "Đề luyện đánh giá tư duy với bài toán mở và câu hỏi phân loại.",
                content: [
                    "Tập trung vào kỹ năng lập luận, mô hình hóa và giải quyết vấn đề.",
                    "Có phần câu hỏi gợi mở giúp rèn tư duy phản biện.",
                    "Dùng để làm quen với phong cách đề thi mới.",
                ],
            },
        ],
    },
];

export const THCS_DOCUMENT_COLUMNS: DocumentColumn[] = [
    {
        id: "nen-tang",
        title: "Tài liệu nền tảng",
        items: [
            {
                id: "thcs-nen-tang-1",
                title: "Ôn tập số tự nhiên và phép tính",
                createdAtText: "16/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/OnTap.png",
                tags: ["lop-6", "on-tap", "tom-tat", "lop-6-chuong-1"],
                summary: "Tóm tắt kiến thức cốt lõi về số tự nhiên, ước bội và thứ tự thực hiện phép tính.",
                content: [
                    "Hệ thống lý thuyết trọng tâm lớp 6 theo từng dạng bài thường gặp.",
                    "Có ví dụ minh họa ngắn và bài luyện tập giúp học sinh củng cố nền tảng.",
                    "Phù hợp để ôn lại kiến thức đầu cấp trung học cơ sở.",
                ],
            },
            {
                id: "thcs-nen-tang-2",
                title: "Công thức hình học cơ bản lớp 7",
                createdAtText: "14/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/OnTapChung.png",
                tags: ["lop-7", "cong-thuc", "tom-tat", "lop-7-chuong-3"],
                summary: "Bảng công thức và định lý hình học cơ bản, trình bày ngắn gọn để dễ ghi nhớ.",
                content: [
                    "Tổng hợp các định lý về góc, đường thẳng song song và tam giác.",
                    "Kèm sơ đồ ghi nhớ giúp học sinh tra cứu nhanh khi làm bài.",
                    "Thích hợp dùng trước các bài kiểm tra chương hình học.",
                ],
            },
            {
                id: "thcs-nen-tang-3",
                title: "Chuyên đề hằng đẳng thức đáng nhớ",
                createdAtText: "11/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/GiuaKy1.png",
                tags: ["lop-8", "chuyen-de", "on-tap", "lop-8-chuong-2"],
                summary: "Chuyên đề trọng tâm giúp nhận diện và vận dụng hằng đẳng thức trong biến đổi biểu thức.",
                content: [
                    "Trình bày từng hằng đẳng thức với ví dụ minh họa trực quan.",
                    "Bài tập được chia theo mức độ từ nhận biết đến vận dụng.",
                    "Giúp học sinh xây chắc nền đại số trước khi lên lớp 9.",
                ],
            },
        ],
    },
    {
        id: "kiem-tra-thcs",
        title: "Đề kiểm tra THCS",
        items: [
            {
                id: "thcs-kiem-tra-1",
                title: "Đề giữa kỳ 1 - Toán 6",
                createdAtText: "09/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/GiuaKy2.png",
                tags: ["lop-6", "kiem-tra", "lop-6-chuong-2"],
                summary: "Đề giữa kỳ 1 bám sát chương trình Toán 6, phù hợp để tự luyện theo thời gian.",
                content: [
                    "Bao quát các dạng bài về số nguyên, phép tính và bài toán thực tế.",
                    "Có cấu trúc cân đối giữa phần nhận biết và vận dụng.",
                    "Hỗ trợ học sinh làm quen với cách trình bày lời giải.",
                ],
            },
            {
                id: "thcs-kiem-tra-2",
                title: "Đề cuối kỳ 1 - Toán 8",
                createdAtText: "06/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/CuoiKy1.png",
                tags: ["lop-8", "kiem-tra", "lop-8-chuong-1"],
                summary: "Đề tổng hợp đại số và hình học Toán 8, có mức độ phân hóa rõ ràng.",
                content: [
                    "Tập trung vào đa thức, hằng đẳng thức và các bài toán tứ giác.",
                    "Phù hợp để kiểm tra tiến độ học tập trước kỳ thi học kỳ.",
                    "Có gợi ý đáp án cho các dạng bài chính.",
                ],
            },
            {
                id: "thcs-kiem-tra-3",
                title: "Đề cuối kỳ 2 - Toán 9",
                createdAtText: "03/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/CuoiKy2.png",
                tags: ["lop-9", "kiem-tra", "lop-9-chuong-2"],
                summary: "Đề cuối kỳ 2 giúp hệ thống lại kiến thức trọng tâm Toán 9 trước giai đoạn ôn thi.",
                content: [
                    "Bao gồm hàm số bậc nhất, hệ phương trình và hình học.",
                    "Câu hỏi được sắp xếp theo mức độ từ cơ bản đến nâng cao.",
                    "Phù hợp để đánh giá năng lực trước khi bước vào lớp 10.",
                ],
            },
        ],
    },
    {
        id: "on-thi-vao-10",
        title: "Ôn thi vào lớp 10",
        items: [
            {
                id: "thcs-on-thi-1",
                title: "Tổng ôn đại số lớp 9",
                createdAtText: "01/05/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/THPTQuocGia.png",
                tags: ["lop-9", "luyen-thi", "on-tap", "lop-9-chuong-1"],
                summary: "Tài liệu tổng ôn đại số lớp 9 phục vụ giai đoạn nước rút trước kỳ thi vào 10.",
                content: [
                    "Hệ thống căn thức, hàm số, phương trình và hệ phương trình.",
                    "Mỗi chuyên đề có ví dụ mẫu và bài luyện theo dạng.",
                    "Giúp học sinh rà soát nhanh phần kiến thức dễ mất điểm.",
                ],
            },
            {
                id: "thcs-on-thi-2",
                title: "Chuyên đề hình học ôn thi vào 10",
                createdAtText: "27/04/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/DanhGiaNangLuc.png",
                tags: ["lop-9", "luyen-thi", "chuyen-de", "lop-9-chuong-3"],
                summary: "Chuyên đề hình học lớp 9 với các dạng bài thường xuất hiện trong đề tuyển sinh lớp 10.",
                content: [
                    "Tập trung vào hệ thức lượng, đường tròn và chứng minh hình học.",
                    "Có chiến lược nhận diện giả thiết và dựng hướng giải.",
                    "Phù hợp cho học sinh cần nâng điểm phần hình học.",
                ],
            },
            {
                id: "thcs-on-thi-3",
                title: "Bộ đề luyện thi vào lớp 10",
                createdAtText: "24/04/2026",
                thumbnailUrl: "/images/tai_lieu_hoc/DanhGiaTuDuy.png",
                tags: ["lop-9", "luyen-thi", "kiem-tra", "lop-9-chuong-2"],
                summary: "Bộ đề luyện thi vào lớp 10 theo cấu trúc quen thuộc, hỗ trợ rèn tốc độ làm bài.",
                content: [
                    "Đề được sắp xếp theo mức độ để học sinh luyện theo lộ trình.",
                    "Có phần gợi ý cách phân bổ thời gian và kiểm tra kết quả.",
                    "Dùng tốt cho giai đoạn luyện đề tổng hợp.",
                ],
            },
        ],
    },
];

export const DOCUMENT_COLUMNS = [...THPT_DOCUMENT_COLUMNS, ...THCS_DOCUMENT_COLUMNS];
export const DOCUMENT_ITEMS = DOCUMENT_COLUMNS.flatMap((column) => column.items);

export function getDocumentDetailPath(documentId: string) {
    return `/thu-vien/tai-lieu/chi-tiet/${documentId}`;
}

export function getDocumentById(documentId: string) {
    return DOCUMENT_ITEMS.find((item) => item.id === documentId) ?? null;
}

export function getRelatedDocuments(documentId: string, limit = 6) {
    const current = getDocumentById(documentId);
    if (!current) return [];

    const related = DOCUMENT_ITEMS.filter((item) => {
        if (item.id === documentId) return false;
        return item.tags.some((tag) => current.tags.includes(tag));
    });

    return related.slice(0, limit);
}

function parseDateText(dateText: string) {
    const [day, month, year] = dateText.split("/").map((value) => Number(value));
    if (!day || !month || !year) return 0;
    return new Date(year, month - 1, day).getTime();
}

export function getLatestDocuments(limit = 4, excludeId?: string) {
    const items = excludeId ? DOCUMENT_ITEMS.filter((item) => item.id !== excludeId) : [...DOCUMENT_ITEMS];
    return items
        .slice()
        .sort((a, b) => parseDateText(b.createdAtText) - parseDateText(a.createdAtText))
        .slice(0, limit);
}

export function getDocumentsByTags({
    includeAnyTags = [],
    includeAllTags = [],
    limit,
}: DocumentFilter) {
    const items = DOCUMENT_ITEMS.filter((item) => {
        const matchesAny = includeAnyTags.length === 0 || includeAnyTags.some((tag) => item.tags.includes(tag));
        const matchesAll = includeAllTags.length === 0 || includeAllTags.every((tag) => item.tags.includes(tag));
        return matchesAny && matchesAll;
    }).sort((a, b) => parseDateText(b.createdAtText) - parseDateText(a.createdAtText));

    return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function filterDocuments({
    search = "",
    tags = [],
}: {
    search?: string;
    tags?: string[];
}) {
    const normalizedSearch = search.trim().toLowerCase();
    const activeTags = tags.filter(Boolean);

    return DOCUMENT_ITEMS.filter((item) => {
        const matchesSearch = !normalizedSearch || item.title.toLowerCase().includes(normalizedSearch);
        const matchesTags =
            activeTags.length === 0 || activeTags.every((tag) => item.tags.includes(tag));
        return matchesSearch && matchesTags;
    });
}
