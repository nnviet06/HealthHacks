import "./resultModal.css";
import { FILTER_CATEGORIES } from "../constants/filters.js";

// Color palette for tags
const TAG_COLORS = [
    { bg: "#E8F5E9", text: "#2E7D32" },
    { bg: "#E3F2FD", text: "#1565C0" },
    { bg: "#FFF3E0", text: "#E65100" },
    { bg: "#F3E5F5", text: "#7B1FA2" },
    { bg: "#E0F2F1", text: "#00695C" },
    { bg: "#FFF8E1", text: "#F57F17" },
    { bg: "#FCE4EC", text: "#C2185B" },
    { bg: "#E8EAF6", text: "#283593" },
];

const getTagColor = (filterCategoryId) => {
    const index = FILTER_CATEGORIES.findIndex(cat => cat.id === filterCategoryId);
    return TAG_COLORS[index % TAG_COLORS.length];
};

// Define the order for details fields BY TOPIC
const DETAILS_ORDER_BY_TOPIC = {
    "Ingredients": [
        { key: 'healthBenefits', label: 'Health Benefits', emoji: '💚' },
        { key: 'storageGuide', label: 'Storage Guide', emoji: '🧊' },
        { key: 'cookingGuide', label: 'Cooking Guide', emoji: '👨‍🍳' },
        { key: 'servingTips', label: 'Serving Tips', emoji: '🍽️' },
        { key: 'pairingSuggestions', label: 'Pairing Suggestions', emoji: '🤝' },
        { key: 'defrostingGuide', label: 'Defrosting Guide', emoji: '❄️' },
        { key: 'proTips', label: 'Pro Tips', emoji: '💡' },
        { key: 'cautions', label: 'Cautions', emoji: '⚠️' },
        { key: 'ingredientsToAvoid', label: 'Ingredients to Avoid', emoji: '🚫' },
    ],
    "Recipes": [
        { key: 'preparationSteps', label: 'Preparation Steps', emoji: '📋' },
        { key: 'healthBenefits', label: 'Health Benefits', emoji: '💚' },
        { key: 'storageGuide', label: 'Storage Guide', emoji: '🧊' },
        { key: 'proTips', label: 'Pro Tips', emoji: '💡' },
        { key: 'cautions', label: 'Cautions', emoji: '⚠️' },
    ],
    "Food Contamination": [
        { key: 'commonSymptoms', label: 'Common Symptoms', emoji: '🤒' },
        { key: 'causesAndRisks', label: 'Causes & Risks', emoji: '⚠️' },
        { key: 'preventionAndTreatment', label: 'Prevention & Treatment', emoji: '💊' },
    ]
};

export default function ItemDetailModal({ item, onClose }) {
    if (!item) return null;

    const filterCategories = FILTER_CATEGORIES.filter(cat => cat.id !== "sortBy");
    
    // Get the appropriate details order based on topic
    const detailsOrder = DETAILS_ORDER_BY_TOPIC[item.topic] || DETAILS_ORDER_BY_TOPIC["Ingredients"];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-red" onClick={onClose} aria-label="Close">✕</button>
                
                <div className="modal-scroll-wrap">
                    {/* Icon, Name, Description */}
                    <div className="modal-main-header">
                        <div className="modal-icon-huge">{item.icon}</div>
                        <h1 className="modal-name">{item.name}</h1>
                        <p className="modal-desc">{item.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="modal-tags-section">
                        {filterCategories.map((filterCategory) => {
                            const value = item[filterCategory.id];
                            if (!value || value === "All") return null;
                            
                            const colors = getTagColor(filterCategory.id);
                            const values = Array.isArray(value) ? value : [value];
                            
                            return values.map((val, idx) => {
                                let displayValue = val;
                                if (filterCategory.id === "severity") {
                                    if (val === "High") displayValue = "⚠️ " + val;
                                    if (val === "Medium") displayValue = "⚡ " + val;
                                }
                                
                                return (
                                    <span 
                                        key={`${filterCategory.id}-${idx}`}
                                        className="modal-tag-large"
                                        style={{
                                            backgroundColor: colors.bg,
                                            color: colors.text
                                        }}
                                    >
                                        {displayValue}
                                    </span>
                                );
                            });
                        })}
                    </div>

                    {/* Category, Dietary, Severity */}
                    <div className="modal-quick-info">
                        <div className="quick-info-item">
                            <span className="quick-info-label">📂 Category</span>
                            <span className="quick-info-value">{item.category}</span>
                        </div>
                        <div className="quick-info-item">
                            <span className="quick-info-label">🥗 Dietary</span>
                            <span className="quick-info-value">
                                {Array.isArray(item.dietary) ? item.dietary.join(", ") : item.dietary}
                            </span>
                        </div>
                        <div className="quick-info-item">
                            <span className="quick-info-label">⚡ Severity</span>
                            <span className={`quick-info-value severity-${item.severity?.toLowerCase()}`}>
                                {item.severity}
                            </span>
                        </div>
                    </div>

                    {/* Details Section - Rendered based on topic */}
                    {item.details && Object.keys(item.details).length > 0 && (
                        <div className="modal-details-section">
                            <h2 className="details-heading">📝 Detailed Information</h2>
                            <div className="details-list">
                                {detailsOrder.map(({ key, label, emoji }) => {
                                    const value = item.details[key];
                                    if (!value || value === "N/A") return null;
                                    
                                    return (
                                        <div key={key} className="detail-block">
                                            <h3 className="detail-title">
                                                <span className="detail-emoji">{emoji}</span>
                                                {label}
                                            </h3>
                                            <p className="detail-content">{value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
