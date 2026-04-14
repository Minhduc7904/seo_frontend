import Image from "next/image";

const sidebarNews = [
  {
    title: "Làn sóng từ bỏ giấc mơ du học Mỹ",
    date: "27 August, 2024",
    readTime: "20 phút",
  },
  {
    title: "Công thức 'ra lệnh' cho AI với giáo viên",
    date: "27 August, 2024",
    readTime: "20 phút",
  },
  {
    title: "Lộ trình ôn thi thông minh cho học sinh lớp 12",
    date: "27 August, 2024",
    readTime: "20 phút",
  },
  {
    title: "Kỹ năng tự học giúp tăng điểm chỉ sau 4 tuần",
    date: "27 August, 2024",
    readTime: "20 phút",
  },
  {
    title: "Bí quyết làm bài đọc hiểu môn Ngữ văn hiệu quả",
    date: "27 August, 2024",
    readTime: "20 phút",
  },
  {
    title: "Gợi ý chọn ngành phù hợp theo năng lực học sinh",
    date: "27 August, 2024",
    readTime: "20 phút",
  },
];

export default function NewsRightColumn() {
  return (
    <aside className="col-span-4 md:col-span-3 xl:col-span-4">
      <div className="rounded-xl bg-white p-2">
        <div className="inline-flex items-center justify-center gap-2.5 p-2">
          <h3 className="text-3xl font-bold uppercase leading-7 text-blue-800">TIN NỔI BẬT</h3>
        </div>

        <div className="mt-2 space-y-6 px-2">
          <div className="relative h-56 w-full overflow-hidden rounded-[5px] bg-slate-100">
            <Image src="/file.svg" alt="Tin nổi bật" fill className="object-cover p-5" />
          </div>

          {sidebarNews.map((item, index) => (
            <article key={`${item.title}-${index}`} className="inline-flex w-full flex-col items-start gap-3">
              <div className="inline-flex items-center justify-center gap-2.5 rounded px-2 py-1 outline-1 outline-slate-300">
                <span className="text-xs font-bold uppercase leading-3 tracking-wide text-gray-500">
                  BEE'S NEWS
                </span>
              </div>

              <h4 className="text-justify text-xl font-bold capitalize leading-6 text-blue-950">
                {item.title}
              </h4>

              <div className="inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <span>{item.date}</span>
                <span>{item.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
