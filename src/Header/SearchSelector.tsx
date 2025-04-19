'use client'
// components/SearchSelector.tsx
import React, { useEffect, useState, useRef } from "react";
import useOutsideAlerter from "./hooks/useOutsideAlerter";
import HeroSearchFormSmall from "./HeroSearchForm/HeroSearchFormSmall";

export type StaySearchFormField = "Type of Care" | "Zip Code" | "Radius" | null;

interface SearchSelectorProps {
    servicesTag?: string;
    locationValue?: string;
    radiusValue?: string;
    onFieldSelect?: (field: StaySearchFormField) => void;
}

const SearchSelector: React.FC<SearchSelectorProps> = ({
    servicesTag,
    locationValue,
    radiusValue,
    onFieldSelect,
}) => {
    const [showHeroSearch, setShowHeroSearch] = useState<StaySearchFormField>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(wrapperRef, (event: MouseEvent) => {
        if (
            (event.target as HTMLElement).closest(".pac-container") ||
            (event.target as HTMLElement).closest(".drawer-container") ||
            (event.target as HTMLElement).closest(".dialogContainer")
        ) {
            return;
        }
        setShowHeroSearch(null);
    });

    return (
        <div className="relative" ref={wrapperRef}>
            {/* BACKDROP */}
            {showHeroSearch && (
                <div className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50" />
            )}

            {/* SEARCH TRIGGER BUTTON */}
            <div
                className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all z-50 ${showHeroSearch
                    ? "translate-y-20 scale-110 opacity-0 pointer-events-none invisible"
                    : "visible"
                    }`}
            >
                <div className="flex items-center font-medium text-sm">
                    <span
                        className="block pl-5 pr-4 cursor-pointer py-3 overflow-hidden text-ellipsis"
                        onClick={() => {
                            setShowHeroSearch("Type of Care");
                            onFieldSelect?.("Type of Care");
                        }}
                    >
                        {servicesTag || "Type of care"}
                    </span>
                    <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
                    <span
                        className="block px-4 cursor-pointer py-3 overflow-hidden text-ellipsis"
                        onClick={() => {
                            setShowHeroSearch("Zip Code");
                            onFieldSelect?.("Zip Code");
                        }}
                    >
                        {locationValue || "Location"}
                    </span>
                    <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
                    <span
                        className="block px-4 cursor-pointer py-3 overflow-hidden text-ellipsis"
                        onClick={() => {
                            setShowHeroSearch("Radius");
                            onFieldSelect?.("Radius");
                        }}
                    >
                        {radiusValue || "Distance"}
                    </span>
                </div>
                <div
                    className="flex-shrink-0 ml-auto pr-2 cursor-pointer"
                    onClick={() => {
                        setShowHeroSearch("Type of Care");
                        onFieldSelect?.("Type of Care");
                    }}
                >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-6000 text-white">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.55 7.55 4.75 11 4.75C14.45 4.75 17.25 7.55 17.25 11C17.25 14.45 14.45 17.25 11 17.25C7.55 17.25 4.75 14.45 4.75 11Z"
                            />
                        </svg>
                    </span>
                </div>
            </div>

            {/* EXPANDED HERO SEARCH FORM */}
            {showHeroSearch && (
                <div className="absolute inset-x-0 top-12 z-50 transition-all">
                    <div className="w-full max-w-5xl mx-auto pb-6">
                        <HeroSearchFormSmall />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchSelector;
