"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type DocumentSearchContextValue = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    toggleTag: (tagId: string) => void;
    removeTag: (tagId: string) => void;
    tagSearchValue: string;
    setTagSearchValue: (value: string) => void;
};

type DocumentSearchProviderProps = {
    initialSearch?: string;
    initialTags?: string[];
    children: React.ReactNode;
};

const DocumentSearchContext = createContext<DocumentSearchContextValue | null>(null);

export function DocumentSearchProvider({
    initialSearch = "",
    initialTags = [],
    children,
}: DocumentSearchProviderProps) {
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(initialSearch);
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
    const [tagSearchValue, setTagSearchValue] = useState("");

    const urlSearch = searchParams.get("search") ?? "";
    const urlTagsRaw = searchParams.get("tags") ?? "";
    const urlTags = useMemo(() => {
        if (!urlTagsRaw) return [];
        return decodeURIComponent(urlTagsRaw)
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }, [urlTagsRaw]);

    const resolvedSearch = urlSearch || initialSearch;
    const resolvedTags = urlTags.length > 0 ? urlTags : initialTags;
    const resolvedTagsKey = useMemo(() => resolvedTags.join("|"), [resolvedTags]);

    const areTagsEqual = (left: string[], right: string[]) => {
        if (left.length !== right.length) return false;
        return left.every((tag, index) => tag === right[index]);
    };

    useEffect(() => {
        setSearchValue((current) => (current === resolvedSearch ? current : resolvedSearch));
    }, [resolvedSearch]);

    useEffect(() => {
        setSelectedTags((current) => (areTagsEqual(current, resolvedTags) ? current : resolvedTags));
    }, [resolvedTagsKey]);

    const toggleTag = (tagId: string) => {
        setSelectedTags((current) =>
            current.includes(tagId) ? current.filter((tag) => tag !== tagId) : [...current, tagId],
        );
    };

    const removeTag = (tagId: string) => {
        setSelectedTags((current) => current.filter((tag) => tag !== tagId));
    };

    const value = useMemo(
        () => ({
            searchValue,
            setSearchValue,
            selectedTags,
            setSelectedTags,
            toggleTag,
            removeTag,
            tagSearchValue,
            setTagSearchValue,
        }),
        [searchValue, selectedTags, tagSearchValue],
    );

    return <DocumentSearchContext.Provider value={value}>{children}</DocumentSearchContext.Provider>;
}

export function useDocumentSearch() {
    const context = useContext(DocumentSearchContext);
    if (!context) {
        throw new Error("useDocumentSearch must be used within DocumentSearchProvider");
    }
    return context;
}
