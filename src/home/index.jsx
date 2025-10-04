import "./index.css";
import { Navigation, NavigationButton } from "../navigation/navigation.jsx";
import HomeSection from "./homeSection.jsx";
import AboutSection from "./aboutSection.jsx";

export default function Home() {
    return (
        <div className="home-container">
            <Navigation
                leftButtons={
                    <>
                        <NavigationButton href="#home" className="active">
                            Home
                        </NavigationButton>
                        <NavigationButton href="#about">
                            About
                        </NavigationButton>
                    </>
                }
                rightButtons={
                    <NavigationButton href="#play" className="play-button">
                        Play
                    </NavigationButton>
                }
            />
            <main className="home-content">
                <HomeSection />
                <AboutSection />
            </main>
        </div>
    )
}