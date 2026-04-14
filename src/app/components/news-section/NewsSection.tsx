import NewsLeftColumn from "./NewsLeftColumn";
import NewsRightColumn from "./NewsRightColumn";

export default function NewsSection() {
    return (
        <section className="col-span-full mt-12">
            <div className="grid grid-cols-4 gap-5 md:grid-cols-8 xl:grid-cols-12">
                <NewsLeftColumn />
                <NewsRightColumn />
            </div>
        </section>
    );
}
