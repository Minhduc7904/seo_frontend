import Image from "next/image";
import Link from "next/link";

const aboutLinks = [
    "Giới thiệu Bee",
    "Thư viện",
    "Đội ngũ",
    "Thành tích",
    "Khóa học",
    "Liên hệ",
];

const programLinks = [
    "Tiểu học",
    "Trung học cơ sở",
    "Trung học phổ thông",
    "Ôn thi Đánh giá năng lực",
    "Ôn thi Đánh giá tư duy",
    "Luyện thi IELTS",
];

export default function Footer() {
    return (
        <footer className="col-span-full relative left-1/2 mt-14 w-screen -translate-x-1/2 bg-blue-800 text-white">
            <div className="layout-shell pb-12 pt-8">
                <div className="grid grid-cols-4 gap-x-5 gap-y-8 md:grid-cols-8 xl:grid-cols-12">
                    <h2 className="col-span-full text-2xl font-bold md:text-3xl">
                        HỆ THỐNG GIÁO DỤC CHẤT LƯỢNG TẠI VIỆT NAM
                    </h2>

                    <div className="col-span-full h-0.5 w-full bg-cyan-300" />

                    <section className="col-span-4 md:col-span-8 xl:col-span-5 xl:pl-4">
                        <div className="inline-flex items-center rounded-md px-3 py-2">
                            <Image src="/images/footer/Logo.svg" alt="Bee logo" width={153} height={100} className="h-16 w-auto" />
                        </div>
                        <div className="mt-7 inline-flex flex-col items-center gap-3 rounded-[36px] bg-white px-5 py-4 text-blue-800">
                            <p className="text-xl font-semibold">Kết nối với Bee tại</p>
                            <div className="inline-flex items-center gap-6">
                                <Link
                                    href="#"
                                    aria-label="Facebook"
                                    className="inline-flex h-8 w-8 items-center justify-center"
                                >
                                    <Image src="/images/footer/Facebook.svg" alt="Facebook" width={32} height={32} className="h-8 w-8" />
                                </Link>
                                <Link
                                    href="#"
                                    aria-label="Zalo"
                                    className="inline-flex h-8 w-8 items-center justify-center"
                                >
                                    <Image src="/images/footer/Zalo.svg" alt="Zalo" width={32} height={32} className="h-8 w-8" />
                                </Link>
                            </div>
                        </div>
                        <div className="mt-7 space-y-4 text-xl">
                            <p className="inline-flex items-center gap-4">
                                <Image src="/images/footer/Telephone.svg" alt="Điện thoại" width={26} height={26} className="h-6 w-6" />
                                <span>0333726202</span>
                            </p>

                            <p className="inline-flex items-start gap-4">
                                <Image src="/images/footer/Destination.svg" alt="Địa chỉ" width={26} height={32} className="h-7 w-6" />
                                <span>315 Bạch Mai, Hai Bà Trưng, Hà Nội</span>
                            </p>

                            <p className="inline-flex items-center gap-4">
                                <Image src="/images/footer/Email.svg" alt="Email" width={26} height={22} className="h-5 w-6" />
                                <a href="mailto:info@example.com" className="underline">
                                    info@example.com
                                </a>
                            </p>
                        </div>
                    </section>
                    <section className="col-span-4 md:col-span-4 xl:col-span-3">
                        <h3 className="text-3xl font-bold">VỀ BEE</h3>
                        <ul className="mt-6 space-y-4">
                            {aboutLinks.map((item) => (
                                <li key={item}>
                                    <Link href="#" className="inline-flex items-center gap-4 text-xl font-semibold">
                                        <Image src="/images/footer/Arrow.svg" alt="Mũi tên" width={12} height={24} className="h-6 w-3" />
                                        <span>{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="col-span-4 md:col-span-4 xl:col-span-4">
                        <h3 className="text-3xl font-bold">CHƯƠNG TRÌNH HỌC</h3>
                        <ul className="mt-6 space-y-4">
                            {programLinks.map((item) => (
                                <li key={item} className="inline-flex items-center gap-4 text-xl font-semibold">
                                    <Image src="/images/footer/Arrow.svg" alt="Mũi tên" width={12} height={24} className="h-6 w-3" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </footer>
    );
}
