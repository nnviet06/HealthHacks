import "./searchEngine.css";

export default function SearchEngine() {
    // Define categories data
    const categories = [
        {
            title: "Ingredients",
            description: "Discover nutritional facts, vitamins, minerals, and health benefits of food ingredients",
            icon: "🥕",
            examples: ["Fruits", "Vegetables", "Proteins", "Grains"]
        },
        {
            title: "Recipes",
            description: "Explore healthy meal ideas with step-by-step instructions and nutritional information",
            icon: "👨‍🍳",
            examples: ["Breakfast", "Lunch", "Dinner", "Snacks"]
        },
        {
            title: "Food Contamination",
            description: "Learn about foodborne illnesses, safety guidelines, and prevention methods",
            icon: "⚠️",
            examples: ["Bacteria", "Viruses", "Parasites", "Toxins"]
        }
    ];

    return (
        <>
            <h1>What's on your plate today?</h1>
            
            <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input type="search" placeholder="Type something tasty (or suspicious)…"></input>
            </div>
            
            <CategoryGrid 
                title="Featured Categories" 
                categories={categories}
            />
        </>
    )
}

function CategoryGrid({ title, categories }) {
    return (
        <div className="category-list">
            <h2 className="category-title">{title}</h2>
            <div className="category-grid">
                {categories.map((category, index) => (
                    <CategoryItem 
                        key={index}
                        title={category.title}
                        description={category.description}
                        icon={category.icon}
                        examples={category.examples}
                    />
                ))}
            </div>
        </div>
    )
}

function CategoryItem({title, description, icon, examples}) {
    return (
        <div className="category-item">
            <div className="category-icon">{icon}</div>
            <h3 className="category-item-title">{title}</h3>
            <p className="category-item-description">{description}</p>
            <div className="category-examples">
                {examples.map((example, index) => (
                    <span key={index} className="example-tag">{example}</span>
                ))}
            </div>
        </div>
    )
}
