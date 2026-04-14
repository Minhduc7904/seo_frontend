import PagePoster from "@/components/common/PagePoster";

export default function ThuVienPage() {
    return (
        <div className="space-y-8">
            <PagePoster
                title="Thư viện"
                imageSrc="/images/tai_lieu_hoc/poster.png"
                imageAlt="Poster trang thư viện"
            />

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-blue-900">Thư viện</h2>
                <p className="text-base leading-7 text-slate-700">
                    Đây là trang cơ bản cho thư viện nội dung. Tài liệu học tập, hình ảnh hoạt động và video sẽ được cập nhật ở các bước tiếp theo.
                </p>
            </div>
        </div>
    );
}
