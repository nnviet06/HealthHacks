import "./index.css";
import HomeSection from "./homeSection.jsx";
import AboutSection from "./aboutSection.jsx";

export default function Home() {
    return (
        <>
            <div className="home-content">
                <HomeSection></HomeSection>
                <AboutSection></AboutSection>
            </div>
        </>
    )
}