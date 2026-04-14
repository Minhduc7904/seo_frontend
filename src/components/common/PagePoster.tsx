import Image from "next/image";

type PagePosterProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export default function PagePoster({ title, imageSrc, imageAlt }: PagePosterProps) {
  return (
    <section className="col-span-full relative left-1/2 w-screen -translate-x-1/2">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={1440}
        height={300}
        priority
        className="block h-auto w-full"
        sizes="100vw"
      />
      <h1 className="sr-only">{title}</h1>
    </section>
  );
}
