import PagePoster from "@/components/common/PagePoster";

export default function KhoaHocOfflinePage() {
    return (
        <div className="space-y-8">
            <PagePoster
                title="Khóa học Offline"
                imageSrc="/images/khoa_offline/poster.png"
                imageAlt="Poster trang khóa học offline"
            />

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-blue-900">Khóa học Offline</h2>
                <p className="text-base leading-7 text-slate-700">
                    Đây là trang cơ bản cho danh mục khóa học Offline. Thông tin lịch khai giảng, cấp độ và học phí sẽ được bổ sung sau.
                </p>
            </div>
        </div>
    );
}
