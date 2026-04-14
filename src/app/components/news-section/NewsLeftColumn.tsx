import Image from "next/image";

const listNews = [
    {
        title: "Lịch thi đánh giá năng lực Đại học Quốc gia Hà Nội từ tháng 3/2026",
        date: "27 August, 2024",
        readTime: "20 phút",
        summary:
            "Lịch thi dự kiến được tổ chức theo nhiều đợt, giúp học sinh linh hoạt lựa chọn thời điểm phù hợp để tối ưu kết quả.",
    },
    {
        title: "Hà Nội dự kiến thi lớp 10 vào cuối tháng 6/2026",
        date: "27 August, 2024",
        readTime: "20 phút",
        summary:
            "Cập nhật thông tin mới nhất về lịch thi, chỉ tiêu và những điểm cần lưu ý trước kỳ thi.",
    },
    {
        title: "Hai trường công lập mới tuyển 900 học sinh trượt lớp 10",
        date: "27 August, 2024",
        readTime: "20 phút",
        summary:
            "Phụ huynh và học sinh có thêm lựa chọn khi có hai trường công lập dự kiến mở mới trong năm học tới.",
    },
    {
        title: "Đạt IELTS 5.5 rộng cửa vào lớp 10 trường tư ở Hà Nội",
        date: "27 August, 2024",
        readTime: "20 phút",
        summary:
            "Nhiều trường trung học tư thục đã bổ sung tiêu chí IELTS vào xét tuyển đầu vào.",
    },
];

function MetaRow({ date, readTime }: { date: string; readTime: string }) {
    return (
        <div className="inline-flex items-center gap-4 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <span>{date}</span>
            <span>{readTime}</span>
        </div>
    );
}

export default function NewsLeftColumn() {
    return (
        <section className="col-span-4 inline-flex flex-col items-start gap-6 md:col-span-5 xl:col-span-8">
            <div className="inline-flex items-center justify-center gap-2.5 p-2">
                <h2 className="text-3xl font-bold uppercase leading-8 text-blue-800">TIN GIÁO DỤC</h2>
            </div>

            <div className="flex w-full flex-col items-start gap-8">

                <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-2">
                    {listNews.map((item, index) => (
                        <article key={`${item.title}-${index}`} className="inline-flex flex-col items-start gap-3">
                            <div className="relative h-72 w-full overflow-hidden rounded-md bg-slate-100">
                                <Image src="/file.svg" alt={item.title} fill className="object-cover p-6" />
                                <span className="absolute left-6 top-6 rounded-[3px] bg-red-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                                    {index === 0 ? "Thi cử" : index === 1 ? "Tuyển sinh" : "Du học"}
                                </span>
                            </div>

                            <div className="flex w-full flex-col items-start gap-2">
                                <h3 className="px-3 text-xl font-bold capitalize leading-8 text-blue-950">{item.title}</h3>
                                <MetaRow date={item.date} readTime={item.readTime} />
                                <p className="px-3 py-2 text-justify text-base font-normal capitalize leading-7 text-gray-600">
                                    {item.summary}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
