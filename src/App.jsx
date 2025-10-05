import './App.css';    
import './index.css';
import { useState, useEffect } from 'react';
import { Navigation, NavigationButton } from './navigation/navigation.jsx';
import Home from './home/index.jsx';
import Play from './play/index.jsx';
import Learn from './learn/index.jsx';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [activeSection, setActiveSection] = useState('home');

    const contentPages = {
        home: <Home />,
        play: <Play></Play>,
        learn: <Learn></Learn>,
    };

    // Scroll detection for sections
    useEffect(() => {
        if (currentPage !== 'home') {
            // For non-home pages, set active section to current page
            setActiveSection(currentPage);
            return;
        }

        const handleScroll = () => {
            const sections = ['home', 'about'];
            const scrollPosition = window.scrollY + 150; // Offset for navbar height

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        handleScroll(); // Check initial position
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage]);

    const handleNavClick = (page, sectionId = null) => {
        setCurrentPage(page);
        if (sectionId && page === 'home') {
            // Smooth scroll to section after a brief delay to let page render
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Scroll to top for non-home pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    function renderContent() {
        return contentPages[currentPage];
    }

    return (
        <>
        <Navigation
                leftButtons={
                    <>
                        <NavigationButton 
                            href="#home" 
                            onClick={() => handleNavClick('home', 'home')} 
                            className={activeSection === 'home' ? 'active' : ''}
                        >
                            Home
                        </NavigationButton>
                        <NavigationButton 
                            href="#about" 
                            onClick={() => handleNavClick('home', 'about')}
                            className={activeSection === 'about' ? 'active' : ''}
                        >
                            About
                        </NavigationButton>
                        <NavigationButton 
                            href="#learn" 
                            onClick={() => handleNavClick('learn')}
                            className={activeSection === 'learn' ? 'active' : ''}
                        >
                            Learn
                        </NavigationButton>
                    </>
                }
                rightButtons={
                    <NavigationButton 
                        href="#play" 
                        onClick={() => handleNavClick('play')} 
                        className={`play-button${activeSection === 'play' ? ' active' : ''}`}
                    >
                        Play
                    </NavigationButton>
                }
            />
            <main className="content-container">
                {renderContent()}
            </main>
        </>
    )
}