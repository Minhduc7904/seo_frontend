import PagePoster from "@/components/common/PagePoster";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

export default function ThanhTichPage() {
  return (
    <div className="space-y-8">
      <PagePoster
        title="Thành tích"
        slot={PAGE_SEO_MEDIA_SLOTS.achievements.hero}
        fallbackImageSrc="/images/thanh_tich/poster.png"
        imageAlt="Poster trang thành tích"
      />

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-blue-900">Thành tích</h2>
        <p className="text-base leading-7 text-slate-700">
          Đây là trang cơ bản tổng hợp thành tích. Danh sách chi tiết theo năm học và từng chương trình sẽ được bổ sung sau.
        </p>
      </div>
    </div>
  );
}
