import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/homepage/HomePage';
import LoginPage from '../components/loginpage/LoginPage';
import UserPage from '../components/userpage/UserPage';
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import '../app/App.scss';

const App = () => {
  return (
    <Router>  
      <Navbar /> 
      <Routes>  
        <Route path="/" element={<HomePage />} /> 
        <Route path="/sign-in" element={<LoginPage />} /> 
        <Route path="/user" element={<UserPage />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
