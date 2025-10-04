import './App.css';    
import './index.css';
import { useState } from 'react';
import { Navigation, NavigationButton } from './navigation/navigation.jsx';
import Home from './home/index.jsx';
import InfoPage from './info/InfoPage.jsx';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const contentPages = {
        home: <Home />,
        info: <InfoPage />,
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
                            onClick={() => setCurrentPage('home')} 
                            className={currentPage === 'home' ? 'active' : ''}
                        >
                            Home
                        </NavigationButton>
                        <NavigationButton 
                            href="#about" 
                            onClick={() => setCurrentPage('home')}
                        >
                            About
                        </NavigationButton>
                        <NavigationButton 
                            href="#info"
                            onClick={() => setCurrentPage('info')}
                            className={currentPage === 'info' ? 'active' : ''}
                        >
                            Info
                        </NavigationButton>
                    </>
                }
                rightButtons={
                    <NavigationButton href="#play" className="play-button">
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