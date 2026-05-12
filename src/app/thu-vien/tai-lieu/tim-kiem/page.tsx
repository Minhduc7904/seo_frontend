import SearchResultsClient from "@/app/thu-vien/tai-lieu/tim-kiem/SearchResultsClient";
import { filterDocuments } from "@/app/thu-vien/tai-lieu/data";
type SearchPageProps = {
    searchParams?: {
        search?: string;
        tags?: string | string[];
    };
};

function parseTagList(tags: string | string[] | undefined) {
    const raw = Array.isArray(tags) ? tags.join(",") : tags ?? "";
    return raw
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
}

export default function TaiLieuSearchPage({ searchParams }: SearchPageProps) {
    const searchValue = typeof searchParams?.search === "string" ? searchParams.search : "";
    const selectedTags = parseTagList(searchParams?.tags);
    const results = filterDocuments({ search: searchValue, tags: selectedTags });

    return (
        <div className="space-y-10 pb-16">
            <SearchResultsClient searchValue={searchValue} selectedTags={selectedTags} results={results} />
        </div>
    );
}
