import PagePoster from "@/components/common/PagePoster";

export default function GioiThieuPage() {
    return (
        <div className="space-y-8">
            <PagePoster
                title="Giới thiệu Bee Academy"
                imageSrc="/images/gioi_thieu/poster.png"
                imageAlt="Poster trang giới thiệu Bee Academy"
            />

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-blue-900">Giới thiệu Bee Academy</h2>
                <p className="text-base leading-7 text-slate-700">
                    Đây là trang giới thiệu cơ bản. Nội dung chi tiết về tầm nhìn, sứ mệnh và giá trị khác biệt sẽ được cập nhật ở bước thiết kế tiếp theo.
                </p>
            </div>
        </div>
    );
}
