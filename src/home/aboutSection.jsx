import './aboutSection.css';

export default function AboutSection() {
    return (
        <section className="about-section-container" id="about">
            <h1>Discover, Learn, Eat Smart</h1>
            <div className="purpose-container">
                <PurposeBox 
                    emoji="🥕"
                    description="Discover nutritional facts, vitamins, and health benefits of everyday food ingredients"
                />
                <PurposeBox 
                    emoji="👨‍🍳"
                    description="Explore meal ideas with dietary filters, allergen info, and step-by-step instructions"
                />
                <PurposeBox 
                    emoji="⚠️"
                    description="Learn about contamination risks, proper storage, and safe food handling practices"
                />
            </div>
        </section>
    )
}

function PurposeBox({ emoji, description }) {
    return (
        <div className="purpose-box">
            <div className="purpose-emoji">{emoji}</div>
            <p>{description}</p>
        </div>
    )
}