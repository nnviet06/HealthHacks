// src/components/InfoPage.jsx
import React, { useState } from 'react';
import './InfoPage.css'; // Import file CSS

// --- Navigation Bar Component ---
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Web Name
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};


// ---  Carousel ---
const foodItems = [
  { id: 1, name: 'Chicken', image: 'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Chicken' },
  { id: 2, name: 'Broccoli', image: 'https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Broccoli' },
  { id: 3, name: 'Salmon', image: 'https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Salmon' },
  { id: 4, name: 'Tomato', image: 'https://via.placeholder.com/400x300/FF33D4/FFFFFF?text=Tomato' },
];


// --- Main Page Component ---
const InfoPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? foodItems.length - 1 : prevIndex - 1
    );
  };

  const currentFood = foodItems[currentIndex];

  return (
    <div>
      <Navbar /> {/* Navigation Bar */}

      <div className="home-container">
        {/* Title section */}
        <h1 className="main-question">What food do you want to learn about today?</h1>

        {/*Carousel */}
        <div className="carousel-section">
          <button className="carousel-arrow left-arrow" onClick={goToPrevious}>
            &lt;
          </button>
          <div className="carousel-content">
            <img src={currentFood.image} alt={currentFood.name} className="carousel-image" />
            <div className="carousel-food-name">{currentFood.name}</div>
          </div>
          <button className="carousel-arrow right-arrow" onClick={goToNext}>
            &gt;
          </button>
        </div>

        {/* Detail Section */}
        <div className="info-cards-section">
          <div className="info-card">
            <h3>Ingredients</h3>
            <p>Learn about the basic components of your meal.</p>
          </div>
          <div className="info-card">
            <h3>Processed Food</h3>
            <p>Understand how food is processed and its implications.</p>
          </div>
          <div className="info-card">
            <h3>Preservation</h3>
            <p>Discover methods to keep your food fresh and safe longer.</p>
          </div>
          <div className="info-card small-card">
            <h4>Food</h4>
            <p>General information about various food types.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;