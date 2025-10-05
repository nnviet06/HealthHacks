const gameHTMLSize = 700;

// Use backticks (`) to enable template literals
const gameHTML = `<iframe 
  src="https://scratch.mit.edu/projects/1224959094/embed" 
  allowtransparency="true" 
  width="${gameHTMLSize}" 
  height="${gameHTMLSize * 402 / 485}" 
  frameborder="0" 
  scrolling="no" 
  allowfullscreen>
</iframe>`;

const gameName = "HellTHKitchen";

export { gameName, gameHTML, gameHTMLSize };