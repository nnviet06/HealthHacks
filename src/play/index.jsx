import './index.css';
import { gameHTML, gameName } from '../constants/gameinfo'; 

export default function Play() {
  

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
        {gameHTML}
      </div>
    </div>
  );
}