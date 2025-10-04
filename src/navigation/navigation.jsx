import "./navigation.css";
import { logo, brandName } from "../constants/theme";

export function Navigation({ leftButtons, rightButtons }) {
    return (
        <nav className="navigation-container">
            <div className="navigation-side">
                <div className="navigation-button logo-button">
                    <img src={logo} alt={`${brandName} logo`} />
                    <span>{brandName}</span>
                </div>
                {leftButtons}  {/* Left side buttons go here */}
            </div>
            <div className="navigation-side">
                {rightButtons}  {/* Right side buttons go here */}
            </div>
        </nav>
    )
}

export function NavigationButton({ href, children, className = "" }) {
    return (
        <a href={href} className={`navigation-button ${className}`}>
            {children}
        </a>
    )
}