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

export const DOCUMENT_TAGS: DocumentTag[] = [
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

export const CHAPTER_TAG_GROUPS: ChapterTagGroup[] = [
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

export const CHAPTER_TAGS = CHAPTER_TAG_GROUPS.flatMap((group) => group.tags);

const TAG_LABEL_BY_ID = new Map(
    [...DOCUMENT_TAGS, ...SEARCH_EXTRA_TAGS, ...CHAPTER_TAGS].map((tag) => [tag.id, tag.label]),
);

export function getDocumentTagLabel(tagId: string) {
    return TAG_LABEL_BY_ID.get(tagId) ?? tagId;
}

export const DOCUMENT_COLUMNS: DocumentColumn[] = [
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
