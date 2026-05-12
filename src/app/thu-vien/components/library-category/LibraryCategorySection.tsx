import Link from "next/link";
import { BookOpenText, Check, CircleHelp, FileText } from "lucide-react";

type CategoryCard = {
  href: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  featured?: boolean;
};

const CATEGORIES: CategoryCard[] = [
  {
    href: "/thu-vien/tai-lieu",
    title: "Kho tài liệu",
    description: "Tổng hợp tài liệu ôn tập và chuyên đề trọng tâm.",
    Icon: FileText,
    highlights: [
      "Tài liệu theo chuyên đề",
      "Tóm tắt kiến thức trọng tâm",
      "Hệ thống công thức cần nhớ",
      "Gợi ý lộ trình tự học",
    ],
  },
  {
    href: "/thu-vien/de-thi",
    title: "Thư viện đề thi",
    description: "Chọn loại đề thi theo nhu cầu ôn tập.",
    Icon: BookOpenText,
    highlights: [
      "1000+ đề thi tổng hợp từ mọi người",
      "Phân loại theo từng loại đề",
      "6+ môn học",
      "Ôn luyện HSA, TSA, THPT Quốc gia",
    ],
    featured: true,
  },
  {
    href: "/thu-vien/cau-hoi",
    title: "Ngân hàng câu hỏi",
    description: "Tìm kiếm câu hỏi theo từ khóa và bộ lọc.",
    Icon: CircleHelp,
    highlights: [
      "Tìm kiếm câu hỏi theo từ khóa",
      "Lời giải rõ ràng, dễ hiểu",
      "Phân loại theo chuyên đề",
      "Luyện tập từ cơ bản đến nâng cao",
    ],
  },
];

export default function LibraryCategorySection() {
  return (
    <section className="rounded-[1.6rem] bg-white p-6 md:p-7">
      <h2 className="text-center text-2xl font-extrabold leading-tight text-slate-900">
        Chọn thư viện
      </h2>

      <div className="mt-6 layout-grid gap-5">
        {CATEGORIES.map(
          ({ href, title, description, Icon, highlights, featured }) => {
            const baseClasses =
              "group flex h-full flex-col rounded-3xl border p-6 transition hover:-translate-y-0.5";
            const themeClasses = featured
              ? "border-transparent bg-[#0B3A82] text-white shadow-[0_24px_50px_rgba(11,58,130,0.35)]"
              : "border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)]";
            const iconClasses = featured
              ? "bg-white/15 text-white"
              : "bg-blue-50 text-blue-700";
            const descriptionClasses = featured
              ? "text-blue-100"
              : "text-slate-600";
            const listTextClasses = featured
              ? "text-blue-50"
              : "text-slate-700";
            const bulletClasses = featured ? "text-white" : "text-blue-700";
            const buttonClasses = featured
              ? "bg-white text-[#0B3A82]"
              : "border border-slate-200 text-slate-800 group-hover:border-blue-400";

            return (
              <Link
                key={href}
                href={href}
                className={`${baseClasses} ${themeClasses} col-span-4 md:col-span-4 xl:col-span-4`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconClasses}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-lg font-bold">{title}</p>
                </div>
                <p className={`mt-3 text-sm leading-6 ${descriptionClasses}`}>
                  {description}
                </p>
                <ul
                  className={`mt-5 space-y-2 text-sm leading-6 ${listTextClasses}`}
                >
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${bulletClasses}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-6 inline-flex w-fit items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${buttonClasses}`}
                >
                  Xem chi tiết
                </span>
              </Link>
            );
          }
        )}
      </div>
    </section>
  );
}
