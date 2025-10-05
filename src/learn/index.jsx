import "./index.css";
import { useState, useMemo } from "react";
import SearchIntro from "./searchIntro.jsx";
import ResultPage from "./resultPage.jsx";
import { getDefaultFilters, FILTER_CATEGORIES } from "../constants/filters.js";
import { DATA } from "../constants/data.js";

export default function Learn() {
    const [currentPage, setCurrentPage] = useState("search");
    const [searchInput, setSearchInput] = useState("");
    const [searchedQuery, setSearchedQuery] = useState("");
    const [filters, setFilters] = useState(getDefaultFilters());
    const [pendingFilters, setPendingFilters] = useState(getDefaultFilters());

    // Dynamic filtering and sorting based on FILTER_CATEGORIES constant
    const filteredResults = useMemo(() => {
        let results = DATA.filter((item) => {
            // 1. Apply all filter categories (except sortBy)
            for (const filterCategory of FILTER_CATEGORIES) {
                const filterValue = filters[filterCategory.id];
                
                // Skip if filter is set to "All" or is "sortBy"
                if (filterValue === "All" || filterCategory.id === "sortBy") continue;

                const itemValue = item[filterCategory.id];

                if (filterCategory.id === "dietary") {
                    // dietary can be an array
                    // Pass if itemValue includes filterValue
                    if (!itemValue.includes(filterValue)) return false;
                } else {
                    // Existing logic for single-value filters
                    if (itemValue !== filterValue && itemValue !== "All") return false;
                }
            }

            // 2. Search query filter with null safety
            if (searchedQuery) {
                const searchLower = searchedQuery.toLowerCase();
                const matchesName = item.name?.toLowerCase().includes(searchLower) || false;
                const matchesDesc = item.description?.toLowerCase().includes(searchLower) || false;
                
                if (!matchesName && !matchesDesc) {
                    return false;
                }
            }

            return true;
        });

        // Sort results
        const sortBy = filters.sortBy;
        if (sortBy === "A-Z") {
            results.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "Z-A") {
            results.sort((a, b) => b.name.localeCompare(a.name));
        }

        return results;
    }, [searchedQuery, filters]);

    const handleSubmit = (input) => {
        const trimmedInput = input.trim();
        
        // Apply both search and filters together
        setSearchedQuery(trimmedInput);
        setSearchInput(trimmedInput);
        setFilters(pendingFilters); // Commit pending filters
        
        if (currentPage === "search") {
            setCurrentPage("result");
        }
    };

    const handleTopicClick = (topicFilter) => {
        const newFilters = getDefaultFilters();
        newFilters.topic = topicFilter;
        setFilters(newFilters);
        setPendingFilters(newFilters);
        setSearchedQuery("");
        setSearchInput("");
        setCurrentPage("result");
    };

    // Update pending filters (doesn't trigger filtering yet)
    const handleFilterChange = (filterId, value) => {
        setPendingFilters(prev => ({
            ...prev,
            [filterId]: value
        }));
    };

    // Reset filters to default
    const handleResetFilters = () => {
        const defaults = getDefaultFilters();
        setPendingFilters(defaults);
        setFilters(defaults);
    };

    return (
        <div className="learn-container">
            {currentPage === "search" ? (
                <SearchIntro
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    onSubmit={handleSubmit}
                    onTopicClick={handleTopicClick}
                />
            ) : (
                <ResultPage
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    searchedQuery={searchedQuery}
                    filters={pendingFilters}
                    appliedFilters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                    onSubmit={handleSubmit}
                    results={filteredResults}
                />
            )}
        </div>
    );
}
