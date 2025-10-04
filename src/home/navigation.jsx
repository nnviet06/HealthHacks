import "./navigation.css";

export default function Navigation() {
    return (
        <div className = "navigation-container">
            <div className="navigation-side">
                <div className="navigation-button">Logo and Web name</div>
                <a className="navigation-button">Home</a>
                <a className="navigation-button">About</a>
            </div>
            <div className="navigation-side right">
                <a className="navigation-button play-button">Play</a>
            </div>
        </div>
    )
}