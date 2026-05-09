import { Mail, MapPin, PhoneCall, UserRound, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { OfflineTeacher } from "./data";

type StepTeacherInfoProps = {
    teacher: OfflineTeacher;
};

export default function StepTeacherInfo({ teacher }: StepTeacherInfoProps) {
    return (
        <section className="rounded-[1.6rem] bg-white p-6 md:p-7">

            <article className="mt-5 rounded-2xl border border-[#0D41A9]/15 bg-[#F6F8FC] p-4 md:p-5">
                <div className="grid gap-6 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-7">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#0D41A9]/20 bg-white">
                        <Image
                            src={teacher.avatarImageSrc}
                            alt={`Ảnh giáo viên ${teacher.name}`}
                            fill
                            sizes="(min-width: 768px) 320px, 100vw"
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <div className="inline-flex items-center rounded-full bg-[#0D41A9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0D41A9]">
                            Hồ sơ giảng dạy
                        </div>
                        <h4 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 md:text-[2rem]">{teacher.name}</h4>
                        <p className="mt-1 text-sm font-medium text-[#0D41A9]">{teacher.title}</p>

                        <p className="mt-4 text-sm leading-7 text-slate-700">{teacher.bio}</p>

                        <div className="mt-5 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                            <p className="inline-flex items-start gap-2">
                                <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#0D41A9]" aria-hidden="true" />
                                <span>Lịch tư vấn: {teacher.schedule}</span>
                            </p>
                            <p className="inline-flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0D41A9]" aria-hidden="true" />
                                <span>{teacher.location}</span>
                            </p>
                            <p className="inline-flex items-start gap-2">
                                <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[#0D41A9]" aria-hidden="true" />
                                <span>{teacher.phone}</span>
                            </p>
                            <p className="inline-flex items-start gap-2">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0D41A9]" aria-hidden="true" />
                                <span>{teacher.email}</span>
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/lien-he"
                                className="inline-flex items-center gap-2 rounded-full bg-[#0D41A9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A3588]"
                            >
                                <UserRound className="h-4 w-4" aria-hidden="true" />
                                Đăng ký học thử với {teacher.name}
                            </Link>
                            <Link
                                href={teacher.zalo}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[#0D41A9] bg-white px-5 py-2.5 text-sm font-semibold text-[#0D41A9] transition hover:bg-[#0D41A9]/5"
                            >
                                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                                Nhắn Zalo tư vấn
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}
