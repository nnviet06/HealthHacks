import './App.css';    
import './index.css';
import { useState } from 'react';
import { Navigation, NavigationButton } from './navigation/navigation.jsx';
import Home from './home/index.jsx';
import Play from './play/index.jsx';
import InfoPage from './info/InfoPage.jsx';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');  // ✨ Move inside component

    const contentPages = {
        home: <Home />,
        play: <Play></Play>,
        info: <InfoPage />,
    };

    function renderContent() {
        return contentPages[currentPage];
    }

    return (
        <>
            <main className="content-container">
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
                        <NavigationButton href="#play" onClick={() => setCurrentPage('play')} className="play-button">
                            Play
                        </NavigationButton>
                    }
                />
                {renderContent()}
            </main>
        </>
    )
}