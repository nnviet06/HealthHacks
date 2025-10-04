import './index.css';
// Ensure the path and names are correct:
// Assuming '../constants/gameinfo' exports an object with keys 'gameHTML' and 'gameName'.
import { gameHTML, gameName } from '../constants/gameinfo'; 

export default function Play() {
  
  // 1. Check if gameHTML is provided and not an empty string
  const hasGameHTML = gameHTML && gameHTML.trim() !== '';

  // Define the placeholder for when no game is loaded
  const Placeholder = (
    <div className="placeholder-html">
      <p>Your game Embed HTML is missing or invalid.</p>
    </div>
  );

  return (
    <div className="play-container">
      {/* 2. Display the game name, defaulting if necessary */}
      <h1>{gameName || "Embedded Game"}</h1>
      
      {/* 3. FIX: Use dangerouslySetInnerHTML to correctly render the iframe string */}
      {/* 4. RE-ADD: Conditional logic to render the placeholder if needed */}
      {hasGameHTML ? (
        <div 
          className="embedded-game-wrapper" 
          dangerouslySetInnerHTML={{ __html: gameHTML }} 
        />
      ) : (
        Placeholder
      )}
    </div>
  );
}