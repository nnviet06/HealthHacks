import './App.css';    
import './index.css';
import { useState } from 'react';
import { Navigation, NavigationButton } from './navigation/navigation.jsx';
import Home from './home/index.jsx';
import InfoPage from './info/InfoPage.jsx';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');  // ✨ Move inside component

    const contentPages = {
        home: <Home />,
        info: <InfoPage />,
    };

    const navigationPages = {
        home: 
        <Navigation
            leftButtons={
                <>
                    <NavigationButton href="#home" onClick={() => setCurrentPage('home')} className="active">
                        Home
                    </NavigationButton>
                    <NavigationButton href="#about" onClick={() => setCurrentPage('home')}>
                        About
                    </NavigationButton>
                    <NavigationButton onClick={() => setCurrentPage('info')}>
                        Info
                    </NavigationButton>
                </>
            }
            rightButtons={
                <NavigationButton href="#play" className="play-button">
                    Play
                </NavigationButton>
            }
        />,
        info:
        <Navigation
            leftButtons={
                <>
                    <NavigationButton href="#home" onClick={() => setCurrentPage('home')} className="active">
                        Home
                    </NavigationButton>
                    <NavigationButton href="#about" onClick={() => setCurrentPage('home')}>
                        About
                    </NavigationButton>
                    <NavigationButton onClick={() => setCurrentPage('info')} href="#info">
                        Info
                    </NavigationButton>
                </>
            }
            rightButtons={
                <NavigationButton href="#play" className="play-button">
                    Play
                </NavigationButton>
            }
        />,
        misc: 
        <Navigation
            leftButtons={
                <>
                    <NavigationButton href="#home" onClick={() => setCurrentPage('home')} className="active">
                        Home
                    </NavigationButton>
                    <NavigationButton href="#about" onClick={() => setCurrentPage('home')}>
                        About
                    </NavigationButton>
                </>
            }
            rightButtons={
                <NavigationButton href="#play" className="play-button">
                    Play
                </NavigationButton>
            }
        />,
    };

    function renderNavigation() {
        return navigationPages[currentPage] || navigationPages.misc;
    }

    function renderContent() {
        return contentPages[currentPage];
    }

    return (
        <>
            {renderNavigation()}
            <main className="content-container">
                {renderContent()}
            </main>
        </>
    )
}