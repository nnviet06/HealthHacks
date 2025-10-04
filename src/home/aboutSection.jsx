import './aboutSection.css';

export default function AboutSection() {
    return (
        <section className="about-section-container" id="about">
            <h1>About HealthHacks</h1>
            <div className="purpose-container">
                <PurposeBox 
                    image="/placeholder-icon-1.png"
                    description="Track your daily health metrics and build sustainable wellness habits"
                />
                <PurposeBox 
                    image="/placeholder-icon-2.png"
                    description="Get personalized insights and recommendations based on your health data"
                />
                <PurposeBox 
                    image="/placeholder-icon-3.png"
                    description="Join a community committed to achieving their health goals together"
                />
            </div>
        </section>
    )
}

function PurposeBox({ image, description }) {
    return (
        <div className="purpose-box">
            <img src={image} alt="purpose-image" />
            <p>{description}</p>
        </div>
    )
}