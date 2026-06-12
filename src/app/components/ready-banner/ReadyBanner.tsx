import { STUDENT_LOGIN_URL } from "@/lib/student-login";

export default function ReadyBanner() {
    return (
        <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2 bg-[#FDD22C] py-2">
            <div className="mx-auto inline-flex w-full items-center justify-center gap-2 px-4 text-center">
                <p className="text-base font-normal text-black ">
                    Bạn đã sẵn sàng học cùng Bee?
                </p>
                <a
                    href={STUDENT_LOGIN_URL}
                    className="inline-flex items-center justify-center gap-2.5 text-base font-semibold text-blue-800"
                >
                    Đăng ký ngay
                </a>
            </div>
        </section>
    );
}
