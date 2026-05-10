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
        name: "Cuoi ky 1",
        description: "Bo de tong hop kien thuc hoc ky 1 theo muc do tu co ban den nang cao.",
        cardImageSrc: "/images/tai_lieu_hoc/CuoiKy1.png",
        typeOfExam: "CK1",
    },
    {
        id: "danh-gia-tu-duy",
        name: "Danh gia tu duy",
        description: "Ren phan xa lap luan va ky nang phan tich trong cac dang de danh gia tu duy.",
        cardImageSrc: "/images/tai_lieu_hoc/DanhGiaTuDuy.png",
        typeOfExam: "TSA",
    },
    {
        id: "thpt-quoc-gia",
        name: "THPT Quoc gia",
        description: "Bo de dinh dang chuan ky thi THPT Quoc gia mon Toan theo chuyen de trong diem.",
        cardImageSrc: "/images/tai_lieu_hoc/THPTQuocGia.png",
        typeOfExam: "THPT",
    },
    {
        id: "on-tap-thpt-quoc-gia",
        name: "On tap THPT Quoc gia",
        description: "Lo trinh on tap theo giai doan, tap trung tang toc diem so truoc ky thi.",
        cardImageSrc: "/images/tai_lieu_hoc/OnTapTHPT.png",
        typeOfExam: "OTTHPT",
    },
    {
        id: "on-tap",
        name: "On tap",
        description: "Tong hop tai lieu on tap theo chuong va chu de de cung co nen tang chac chan.",
        cardImageSrc: "/images/tai_lieu_hoc/OnTap.png",
        typeOfExam: "OT",
    },
    {
        id: "cuoi-ky-2",
        name: "Cuoi ky 2",
        description: "Ren ky nang lam bai cuoi ky 2 bam sat cau truc de thuong gap tai truong.",
        cardImageSrc: "/images/tai_lieu_hoc/CuoiKy2.png",
        typeOfExam: "CK2",
    },
    {
        id: "giua-ky-1",
        name: "Giua ky 1",
        description: "He thong de giua ky 1 giup hoc sinh kiem tra tien do va lap lo hong kien thuc.",
        cardImageSrc: "/images/tai_lieu_hoc/GiuaKy1.png",
        typeOfExam: "GK1",
    },
    {
        id: "giua-ky-2",
        name: "Giua ky 2",
        description: "Luyen cac dang bai trong tam giua ky 2 de cai thien do chinh xac khi lam de.",
        cardImageSrc: "/images/tai_lieu_hoc/GiuaKy2.png",
        typeOfExam: "GK2",
    },
    {
        id: "danh-gia-nang-luc",
        name: "Danh gia nang luc",
        description: "Luyen de danh gia nang luc theo dinh huong tu duy tong hop va xu ly du kien.",
        cardImageSrc: "/images/tai_lieu_hoc/DanhGiaNangLuc.png",
        typeOfExam: "HSA",
    },
];

export const EXAM_TYPE_BY_ID = Object.fromEntries(EXAM_TYPES.map((item) => [item.id, item])) as Record<
    string,
    ExamType
>;