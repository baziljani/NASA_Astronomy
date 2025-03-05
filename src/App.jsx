import ImageDetailsPage from './ImageDetailsPage';  
import ImageListingPage from './ImageListingPage';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import React from 'react';  

const App = () => {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<ImageListingPage />} />  
        <Route path="/details/:date" element={<ImageDetailsPage />} />  
      </Routes>  
    </Router>  
  );  
};  

export default App;

