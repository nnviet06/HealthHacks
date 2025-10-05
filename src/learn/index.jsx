import "./index.css";
import { useState, useMemo } from "react";
import SearchIntro from "./searchIntro.jsx";
import ResultPage from "./resultPage.jsx";
import { getDefaultFilters, FILTER_CATEGORIES } from "../constants/filters.js";
import { MOCK_DATA } from "../constants/mock-data.js";

export default function Learn() {
    const [currentPage, setCurrentPage] = useState("search");
    const [searchInput, setSearchInput] = useState("");
    const [searchedQuery, setSearchedQuery] = useState("");
    const [filters, setFilters] = useState(getDefaultFilters());
    const [pendingFilters, setPendingFilters] = useState(getDefaultFilters());

    // Dynamic filtering and sorting based on FILTER_CATEGORIES constant
    const filteredResults = useMemo(() => {
        // First, filter the results
        let results = MOCK_DATA.filter((item) => {
            // 1. Apply all filter categories (except sortBy)
            for (const filterCategory of FILTER_CATEGORIES) {
                const filterValue = filters[filterCategory.id];
                
                // Skip if filter is set to "All" or is "sortBy" (sorting, not filtering)
                if (filterValue === "All" || filterCategory.id === "sortBy") continue;

                const itemValue = item[filterCategory.id];
                
                // Item passes if it matches the filter OR if item's value is "All"
                if (itemValue !== filterValue && itemValue !== "All") {
                    return false;
                }
            }

            // 2. Search query filter (searches in name and description)
            // Applied AFTER filters, only on items that passed filter criteria
            if (searchedQuery) {
                const matchesSearch = 
                    item.name.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchedQuery.toLowerCase());
                if (!matchesSearch) return false;
            }

            return true;
        });

        // Then, sort the filtered results
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
