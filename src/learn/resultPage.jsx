import "./resultPage.css";
import { FILTER_CATEGORIES } from "../constants/filters.js";

// Color palette for tags - cycles through these colors
const TAG_COLORS = [
    { bg: "#E8F5E9", text: "#2E7D32" },  // Green
    { bg: "#E3F2FD", text: "#1565C0" },  // Blue
    { bg: "#FFF3E0", text: "#E65100" },  // Orange
    { bg: "#F3E5F5", text: "#7B1FA2" },  // Purple
    { bg: "#E0F2F1", text: "#00695C" },  // Teal
    { bg: "#FFF8E1", text: "#F57F17" },  // Amber
    { bg: "#FCE4EC", text: "#C2185B" },  // Pink
    { bg: "#E8EAF6", text: "#283593" },  // Indigo
];

// Get color for a filter category by its index
const getTagColor = (filterCategoryId) => {
    const index = FILTER_CATEGORIES.findIndex(cat => cat.id === filterCategoryId);
    return TAG_COLORS[index % TAG_COLORS.length]; // Cycles if more filters than colors
};

export default function ResultPage({ 
    searchInput,
    setSearchInput,
    searchedQuery,
    filters,
    appliedFilters,
    onFilterChange,
    onResetFilters,
    onSubmit,
    results = []
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchInput);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const hasUnappliedChanges = JSON.stringify(filters) !== JSON.stringify(appliedFilters);

    return (
        <div className="result-page">
            {/* Search Bar */}
            <div className="search-section">
                <h2 className="search-title">Search Results for "{searchedQuery}"</h2>
                <form className="search-bar" onSubmit={handleSubmit}>
                    <span className="search-icon">🔍</span>
                    <input
                        type="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search again..."
                    />
                    <button type="submit" className="search-submit">
                        {hasUnappliedChanges ? "Apply & Search" : "Search"}
                    </button>
                </form>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar">
                <div className="filter-header">
                    <h3 className="filter-title">Filter Results</h3>
                    <button onClick={onResetFilters} className="filter-reset-btn">
                        Reset
                    </button>
                </div>
                <div className="filters-container">
                    {FILTER_CATEGORIES.map((filterGroup) => (
                        <FilterGroup
                            key={filterGroup.id}
                            label={filterGroup.label}
                            options={filterGroup.options}
                            active={filters[filterGroup.id]}
                            applied={appliedFilters[filterGroup.id]}
                            onChange={(value) => onFilterChange(filterGroup.id, value)}
                        />
                    ))}
                </div>
                {hasUnappliedChanges && (
                    <div className="filter-notice">
                        💡 Press Enter or click Search to apply filter changes
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="results-info">
                <p className="results-count">{results.length} results found</p>
            </div>

            {/* Results Grid */}
            <ResultsGrid results={results} />
        </div>
    );
}

function FilterGroup({ label, options, active, applied, onChange }) {
    const hasChanged = active !== applied;
    
    return (
        <div className="filter-group">
            <label className="filter-label">
                {label}
                {hasChanged && <span className="filter-changed-indicator">●</span>}
            </label>
            <select 
                className={`filter-select ${hasChanged ? 'filter-changed' : ''}`}
                value={active}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

function ResultsGrid({ results }) {
    if (results.length === 0) {
        return (
            <div className="no-results">
                <span className="no-results-icon">🔍</span>
                <h3>No results found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        );
    }

    return (
        <div className="results-grid">
            {results.map((result) => (
                <ResultCard
                    key={result.id}
                    item={result}
                />
            ))}
        </div>
    );
}

function ResultCard({ item }) {
    // Get filter categories that should be displayed as tags (exclude sortBy)
    const filterCategories = FILTER_CATEGORIES.filter(cat => cat.id !== "sortBy");
    
    return (
        <div className="result-card">
            <div className="result-icon">
                <span className="icon-emoji">{item.icon}</span>
            </div>
            <div className="result-content">
                <h3 className="result-title">{item.name}</h3>
                <p className="result-description">{item.description}</p>
                
                {/* Dynamically render tags for all filter categories */}
                <div className="result-tags">
                    {filterCategories.map((filterCategory) => {
                        const value = item[filterCategory.id];
                        
                        // Skip if value is "All" or doesn't exist
                        if (!value || value === "All") return null;
                        
                        // Get color based on filter position
                        const colors = getTagColor(filterCategory.id);
                        
                        // Special handling for severity with icons
                        let displayValue = value;
                        if (filterCategory.id === "severity") {
                            if (value === "High") displayValue = "⚠️ " + value;
                            if (value === "Medium") displayValue = "⚡ " + value;
                        }
                        
                        return (
                            <span 
                                key={filterCategory.id}
                                className="result-tag"
                                style={{
                                    backgroundColor: colors.bg,
                                    color: colors.text
                                }}
                            >
                                {displayValue}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}