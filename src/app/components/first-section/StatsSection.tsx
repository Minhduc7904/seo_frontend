const stats = [
    { value: "250+", label: "Khóa học chất lượng" },
    { value: "1000+", label: "Học sinh đã tham gia" },
    { value: "15+", label: "Giáo viên chuyên môn cao" },
    { value: "2400+", label: "Giờ đào tạo thực tế" },
];

export default function StatsSection() {
    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 bg-slate-50">
            <div className="mx-auto w-full py-8 md:py-10 xl:max-w-[calc((var(--layout-cols-desktop)*var(--layout-desktop-col-width))+((var(--layout-cols-desktop)-1)*var(--layout-column-gap))+(var(--layout-inline-padding)*2))]">
                <div className="grid grid-cols-4 gap-y-8 md:grid-cols-8 xl:grid-cols-12">
                    {stats.map((stat, index) => (
                        <div
                            key={`${stat.value}-${index}`}
                            className={`col-span-2 text-center md:col-span-4 xl:col-span-3 xl:py-1 ${index < stats.length - 1
                                ? "xl:relative xl:after:absolute xl:after:right-0 xl:after:top-1/2 xl:after:h-14 xl:after:w-px xl:after:-translate-y-1/2 xl:after:bg-slate-200"
                                : ""
                                }`}
                        >
                            <div className="text-3xl font-semibold leading-10 text-slate-900">{stat.value}</div>
                            <div className="mt-1 text-sm font-normal leading-5 text-slate-900">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
