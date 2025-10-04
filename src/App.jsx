import './App.css';    
import './index.css';
import { useState } from 'react';
import { Navigation, NavigationButton } from './navigation/navigation.jsx';
import Home from './home/index.jsx';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');  // ✨ Move inside component

    const contentPages = {
        home: <Home />,
    };

    const navigationPages = {
        home: 
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
        />,
        misc: 
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