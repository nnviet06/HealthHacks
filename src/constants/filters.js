const MOCK_FILTERS = [
    {
        id: "topic",
        label: "Topic",
        options: ["All", "Ingredients", "Recipes", "Food Contamination"],
        default: "All",
    },
    {
        id: "category",
        label: "Food Category",
        options: ["All","Meat", "Fish", "Dairy", "Eggs", "Vegetables", "Fruits", "Grains", "Nuts", "Seeds", "Spices", "Herbs", "Condiments", "Beverages"],
        default: "All",
    },
    {
        id: "dietary",
        label: "Dietary",
        options: ["All", "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free", "Keto"],
        default: "All",
    },
    {
        id: "severity",
        label: "Severity of Risk",
        options: ["All", "Low", "Medium", "High"],
        default: "All",
    },
    {
        id: "sortBy",
        label: "Sort By",
        options: ["A-Z", "Z-A"],
        default: "A-Z",
    },
];

export const FILTER_CATEGORIES = MOCK_FILTERS;

// Helper function to get default filters
export const getDefaultFilters = () => {
    return FILTER_CATEGORIES.reduce((acc, filter) => {
        acc[filter.id] = filter.default;
        return acc;
    }, {});
};

