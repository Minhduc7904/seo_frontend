export type OfflineSubject = {
    id: string;
    name: string;
    description: string;
    cardImageSrc: string;
};

export type GradeGroup = {
    id: "tieu-hoc" | "thcs" | "thpt";
    name: string;
    grades: number[];
    note: string;
};

export type OfflineTeacher = {
    id: string;
    name: string;
    title: string;
    avatarImageSrc: string;
    subjects: string[];
    gradeGroups: GradeGroup["id"][];
    phone: string;
    zalo: string;
    email: string;
    location: string;
    schedule: string;
    bio: string;
};

type TeacherNameSeed = {
    name: string;
    avatarImageSrc: string;
};

export const OFFLINE_SUBJECTS: OfflineSubject[] = [
    {
        id: "toan",
        name: "Toán",
        description: "Nền tảng tư duy, kỹ năng giải nhanh và luyện đề theo mục tiêu điểm số.",
        cardImageSrc: "/images/khoa_offline/MathCard.png",
    },
    {
        id: "tieng-anh",
        name: "Tiếng Anh",
        description: "Củng cố ngữ pháp, từ vựng và phản xạ làm bài thi theo từng cấp độ.",
        cardImageSrc: "/images/khoa_offline/EnglishCard.png",
    },
    {
        id: "vat-ly",
        name: "Vật lý",
        description: "Làm chắc bản chất hiện tượng, công thức trọng tâm và chiến lược làm bài.",
        cardImageSrc: "/images/khoa_offline/PhysicCard.png",
    },
    {
        id: "hoa-hoc",
        name: "Hóa học",
        description: "Hệ thống hóa chuyên đề, tăng tốc kỹ năng cân bằng và xử lý bài tập tính toán.",
        cardImageSrc: "/images/khoa_offline/ChemistryCard.png",
    },
    {
        id: "sinh-hoc",
        name: "Sinh học",
        description: "Học theo sơ đồ tư duy, ghi nhớ hiệu quả và luyện đề theo dạng câu hỏi trọng điểm.",
        cardImageSrc: "/images/khoa_offline/BiologyCard.png",
    },
];

export const GRADE_GROUPS: GradeGroup[] = [
    {
        id: "tieu-hoc",
        name: "Tiểu học",
        grades: [1, 2, 3, 4, 5],
        note: "Khối/Lớp 1-5",
    },
    {
        id: "thcs",
        name: "Trung học cơ sở",
        grades: [6, 7, 8, 9],
        note: "Khối/Lớp 6-9",
    },
    {
        id: "thpt",
        name: "Trung học phổ thông",
        grades: [10, 11, 12],
        note: "Khối/Lớp 10-12",
    },
];

const TEACHER_NAME_SEEDS: TeacherNameSeed[] = [
    { name: "Thầy Nguyễn Khắc Ngọc", avatarImageSrc: "/icon/Face1.png" },
    { name: "Cô Trần Mai Anh", avatarImageSrc: "/icon/Face2.png" },
    { name: "Thầy Phạm Hữu Đạt", avatarImageSrc: "/icon/Face3.png" },
    { name: "Cô Lê Khánh Linh", avatarImageSrc: "/icon/Face4.png" },
    { name: "Thầy Đinh Minh Quân", avatarImageSrc: "/icon/Face1.png" },
    { name: "Cô Ngô Thu Hằng", avatarImageSrc: "/icon/Face2.png" },
    { name: "Thầy Bùi Quang Huy", avatarImageSrc: "/icon/Face3.png" },
    { name: "Cô Vũ Thanh Nhàn", avatarImageSrc: "/icon/Face4.png" },
    { name: "Thầy Lương Quốc Bảo", avatarImageSrc: "/icon/Face1.png" },
    { name: "Cô Đỗ Hoài An", avatarImageSrc: "/icon/Face2.png" },
    { name: "Thầy Nguyễn Đức Sơn", avatarImageSrc: "/icon/Face3.png" },
    { name: "Cô Trịnh Thùy Dương", avatarImageSrc: "/icon/Face4.png" },
    { name: "Thầy Võ Thành Nam", avatarImageSrc: "/icon/Face1.png" },
    { name: "Cô Phạm Hải Yến", avatarImageSrc: "/icon/Face2.png" },
    { name: "Thầy Trần Hoàng Long", avatarImageSrc: "/icon/Face3.png" },
];

const LOCATION = "315 Bạch Mai, Hai Bà Trưng, Hà Nội";

const ADVISORY_SCHEDULE_BY_GROUP: Record<GradeGroup["id"], string> = {
    "tieu-hoc": "Thứ 2 - Thứ 6, 16:30 - 19:00",
    thcs: "Thứ 2 - Thứ 7, 18:00 - 20:30",
    thpt: "Thứ 2 - Chủ nhật, 19:00 - 21:30",
};

function createMockTeachers() {
    const teachers: OfflineTeacher[] = [];
    let seedIndex = 0;
    let phoneSeed = 1000000;

    OFFLINE_SUBJECTS.forEach((subject, subjectIndex) => {
        GRADE_GROUPS.forEach((group, groupIndex) => {
            for (let index = 0; index < 3; index += 1) {
                const seed = TEACHER_NAME_SEEDS[seedIndex % TEACHER_NAME_SEEDS.length];
                seedIndex += 1;
                phoneSeed += 37;

                const last7Digits = String(phoneSeed).padStart(7, "0");
                const phone = `09${subjectIndex + 1}${groupIndex + 2} ${last7Digits.slice(0, 3)} ${last7Digits.slice(3)}`;
                const phoneDigits = phone.replace(/\s/g, "");

                teachers.push({
                    id: `${subject.id}-${group.id}-${index + 1}`,
                    name: seed.name,
                    title: `Giáo viên ${subject.name} - ${group.name}`,
                    avatarImageSrc: seed.avatarImageSrc,
                    subjects: [subject.id],
                    gradeGroups: [group.id],
                    phone,
                    zalo: `https://zalo.me/${phoneDigits}`,
                    email: `gv.${subject.id}.${group.id}.${index + 1}@beeedu.vn`,
                    location: LOCATION,
                    schedule: ADVISORY_SCHEDULE_BY_GROUP[group.id],
                    bio: `Đồng hành luyện ${subject.name} theo lộ trình sát chuẩn ${group.name.toLowerCase()}, tập trung nền tảng và tăng tốc kết quả học tập.`,
                });
            }
        });
    });

    return teachers;
}

export const OFFLINE_TEACHERS: OfflineTeacher[] = createMockTeachers();
