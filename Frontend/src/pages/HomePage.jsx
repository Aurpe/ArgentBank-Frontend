import React from 'react';
import Navigation from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import Features from '../components/features/Features';
import Hero from '../components/hero';

const HomePage = () => {
    return (
        <div>
            {/* Navbar */}
            <Navigation />

            {/* Hero Section - Introduction */}
            <Hero />
            
            {/* Features Section - Highlighting Features */}
            <Features />

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default HomePage;
