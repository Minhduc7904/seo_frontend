import PagePoster from "@/components/common/PagePoster";
import { PAGE_SEO_MEDIA_SLOTS } from "@/lib/api";

export default function KhoaHocOnlinePage() {
  return (
    <div className="space-y-8">
      <PagePoster
        title="Khóa học Online"
        slot={PAGE_SEO_MEDIA_SLOTS.onlineCourse.hero}
        fallbackImageSrc="/images/khoa_online/poster.png"
        imageAlt="Poster trang khóa học online"
      />

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-blue-900">Khóa học Online</h2>
        <p className="text-base leading-7 text-slate-700">
          Đây là trang cơ bản cho danh mục khóa học Online. Nội dung chi tiết về bài giảng, lịch học và gói khóa học sẽ được triển khai tiếp.
        </p>
      </div>
    </div>
  );
}
