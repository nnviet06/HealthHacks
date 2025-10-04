import "./index.css";
import Navigation from "./navigation.jsx";
import HomeSection from "./homeSection.jsx";
import AboutSection from "./aboutSection.jsx";

export default function Home() {
    return (
        <div className = "home-container">
            <Navigation></Navigation>
            <div className = "home-content">
                <HomeSection></HomeSection>
                <AboutSection></AboutSection>
            </div>
        </div>
    )
}