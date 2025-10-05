// src/components/InfoPage.jsx
import React, { useState, useEffect } from 'react';
import './InfoPage.css';

// 1. Import các công cụ của Firestore
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Component InfoPage của bạn
const InfoPage = () => {
  // 2. Tạo state để lưu dữ liệu tải về từ Firebase
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Thêm state để theo dõi trạng thái tải

  // 3. Dùng useEffect để tải dữ liệu MỘT LẦN DUY NHẤT
  useEffect(() => {
    const fetchFoodData = async () => {
      const db = getFirestore();
      const foodsCollection = collection(db, 'foods');
      const foodSnapshot = await getDocs(foodsCollection);
      const foodList = foodSnapshot.docs.map(doc => doc.data());
      
      setFoodItems(foodList); // Cập nhật state với dữ liệu từ Firebase
      setIsLoading(false); // Đánh dấu đã tải xong
    };

    fetchFoodData();
  }, []); // [] đảm bảo hook chỉ chạy một lần khi component được render

  // ... code cho carousel của bạn (goToNext, goToPrevious) ...
  
  // Hiển thị thông báo "Loading..." trong khi chờ dữ liệu
  if (isLoading) {
    return <div>Loading data from Firebase...</div>;
  }

  // Sau khi có dữ liệu, hiển thị nội dung trang
  return (
    <>
      {/* ... Navigation Bar của bạn ... */}
      <div className="home-container">
        {/* ... Toàn bộ nội dung trang, sử dụng biến foodItems ... */}
      </div>
    </>
  );
};

export default InfoPage;

// ---  Carousel ---
const foodItems = [
  { id: 1, name: 'Chicken', image: '' },
  { id: 2, name: 'Broccoli', image: '' },
  { id: 3, name: 'Salmon', image: '' },
  { id: 4, name: 'Tomato', image: '' },
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
          <div className="info-card">
            <h3>Foods for safety</h3>
            <p>General information about various food types.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;