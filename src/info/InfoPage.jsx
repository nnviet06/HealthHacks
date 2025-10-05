// src/info/InfoPage.jsx
import React, { useState, useEffect } from 'react';
import './InfoPage.css';

// 1. Import Firestore functions
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';

// Local Fall back data
const defaultFoodItems = [
  { id: 1, name: 'Chicken', image: '' },
  { id: 2, name: 'Broccoli', image: '' },
  { id: 3, name: 'Salmon', image: '' },
  { id: 4, name: 'Tomato', image: '' },
];

const InfoPage = () => {
  // Firebase-fetched data
  const [fetchedFoodItems, setFetchedFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from Firestore on mount
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        // Use the initialized Firestore instance exported from firebase.js
        const foodsCollection = collection(db, 'foods');
        const foodSnapshot = await getDocs(foodsCollection);
        const foodList = foodSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFetchedFoodItems(foodList);
      } catch (err) {
        // Keep fetchedFoodItems empty and rely on fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  const items = fetchedFoodItems.length > 0 ? fetchedFoodItems : defaultFoodItems;

  // Ensure currentIndex stays in bounds 
  useEffect(() => {
    if (currentIndex >= items.length) {
      setCurrentIndex(0);
    }
  }, [items, currentIndex]);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  if (isLoading) {
    return <div>Loading data from Firebase...</div>;
  }

  const currentFood = items[currentIndex] || { name: 'No item', image: '' };

  return (
    <div className="home-container">
      <h1 className="main-question">What food do you want to learn about today?</h1>

      {/* Carousel */}
      <div className="carousel-section">
        <button className="carousel-arrow left-arrow" onClick={goToPrevious}>
          &lt;
        </button>
        <div className="carousel-content">
          {currentFood.image ? (
            <img src={currentFood.image} alt={currentFood.name} className="carousel-image" />
          ) : (
            <div className="carousel-image placeholder">No image</div>
          )}
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
        <div className="info-card">
          <h3>Foods for safety</h3>
          <p>General information about various food types.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;