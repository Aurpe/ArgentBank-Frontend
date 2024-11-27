import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';


const App = () => {
  return (
    <Router>  
      <Navbar /> 
      <Routes>  
        <Route path="/" element={<HomePage />} /> 
        <Route path="/about" element={<LoginPage />} /> 
        <Route path="/contact" element={<UserPage />} /> 
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
