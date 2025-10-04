// src/App.jsx

import React from 'react';
// 1. Import component InfoPage của bạn
//    (Đường dẫn './components/InfoPage.jsx' dựa trên ảnh chụp màn hình của bạn)
import InfoPage from './components/InfoPage.jsx';
import navigation from './components/navigation.jsx';
import content from './components/content.jsx';
import './App.css';

function App() {
  // 2. Hiển thị component InfoPage là nội dung chính của ứng dụng
  return (
   <InfoPage></InfoPage>
   <navigation>  </navigation>
   <content> </content>
  );

}

export default App;