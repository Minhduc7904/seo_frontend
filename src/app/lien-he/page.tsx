import PagePoster from "@/components/common/PagePoster";

export default function LienHePage() {
    return (
        <div className="space-y-8">
            <PagePoster
                title="Liên hệ"
                imageSrc="/images/lien_he/poster.png"
                imageAlt="Poster trang liên hệ"
            />

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-blue-900">Liên hệ</h2>
                <p className="text-base leading-7 text-slate-700">
                    Đây là trang liên hệ cơ bản. Form đăng ký tư vấn và thông tin chăm sóc học sinh sẽ được hoàn thiện ở bước thiết kế tiếp theo.
                </p>
            </div>
        </div>
    );
}
