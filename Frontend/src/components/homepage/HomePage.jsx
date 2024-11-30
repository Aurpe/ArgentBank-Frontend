import React from 'react';
import Features from '../features/Features';
import Hero from '../hero/Hero';
import '../features/Features.scss';
import '../hero/Hero.scss';


const HomePage = () => {
    return (
        <div>
            
            <Hero />
            
            <Features />

        </div>
    );
};

export default HomePage;
