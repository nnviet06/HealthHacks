import './index.css';
import { gameHTML, gameName } from '../constants/gameinfo'; 

export default function Play() {
  
  const hasGameHTML = gameHTML && gameHTML.trim() !== '';

  const Placeholder = (
    <div className="placeholder-html">
      <div className="placeholder-icon">🎮</div>
      <h2>No Game Loaded</h2>
      <p>Your game embed HTML is missing or invalid.</p>
      <p className="placeholder-hint">Add your game embed code to get started!</p>
    </div>
  );

  return (
    <div id="play" className="play-container">
      <div className="play-header">
        <h1 className="game-title">{gameName || "Embedded Game"}</h1>
        <p className="game-subtitle">Use arrow keys to move, avoid obstacles, and have fun!</p>
      </div>
      
      <div className="game-section">
        {hasGameHTML ? (
          <div className="game-frame-container">
            <div 
              className="embedded-game-wrapper" 
              dangerouslySetInnerHTML={{ __html: gameHTML }} 
            />
          </div>
        ) : (
          Placeholder
        )}
      </div>

      <div className="game-instructions">
        <h2>How to Play</h2>
        <div className="instructions-grid">
          <div className="instruction-card">
            <span className="instruction-icon">⌨️</span>
            <h3>Controls</h3>
            <p>Use arrow keys or WASD to move around</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-icon">🎯</span>
            <h3>Objective</h3>
            <p>Complete challenges and reach the goal</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-icon">⭐</span>
            <h3>Tips</h3>
            <p>Collect power-ups to boost your score</p>
          </div>
        </div>
      </div>
    </div>
  );
}