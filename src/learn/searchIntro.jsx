import "./searchIntro.css";
import { TOPICS } from "../constants/topics.js";

export default function SearchIntro({ searchInput, setSearchInput, onSubmit, onTopicClick }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchInput);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <>
            <h1>What's on your plate today?</h1>
            
            <form className="search-wrapper" onSubmit={handleSubmit}>
                <span className="search-icon">🔍</span>
                <input
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type something tasty (or suspicious)…"
                />
            </form>
            
            <TopicGrid 
                title="Featured Topics" 
                topics={TOPICS}
                onTopicClick={onTopicClick}
            />
        </>
    )
}

function TopicGrid({ title, topics, onTopicClick }) {
    return (
        <div className="topic-list">
            <h2 className="topic-title">{title}</h2>
            <div className="topic-grid">
                {topics.map((topic, index) => (
                    <TopicItem 
                        key={index}
                        title={topic.title}
                        description={topic.description}
                        icon={topic.icon}
                        examples={topic.examples}
                        onClick={() => onTopicClick(topic.topicFilter)}
                    />
                ))}
            </div>
        </div>
    )
}

function TopicItem({title, description, icon, examples, onClick}) {
    return (
        <div className="topic-item" onClick={onClick}>
            <div className="topic-icon">{icon}</div>
            <h3 className="topic-item-title">{title}</h3>
            <p className="topic-item-description">{description}</p>
        </div>
    )
}
