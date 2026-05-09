import PagePoster from "@/components/common/PagePoster";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

export default function DoiNguPage() {
    return (
        <div className="space-y-8">
            <PagePoster
                title="Đội ngũ"
                slot={PAGE_SEO_MEDIA_SLOTS.team.hero}
                fallbackImageSrc="/images/doi_ngu/poster.png"
                imageAlt="Poster trang đội ngũ"
            />

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-blue-900">Đội ngũ</h2>
                <p className="text-base leading-7 text-slate-700">
                    Đây là trang cơ bản giới thiệu đội ngũ. Hồ sơ Giáo viên, chuyên môn và thành tựu sẽ được hiển thị chi tiết ở phiên bản tiếp theo.
                </p>
            </div>
        </div>
    );
}
