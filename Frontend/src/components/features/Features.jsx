import React from 'react';
import featuresData from './features.json';

const FeatureItem = ({ icon, title, description, alt }) => {
  return (
    <div className="feature-item">
      <img 
        src={`./img/${icon}`} 
        alt={alt} 
        className="feature-icon" 
      />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((feature) => (
        <FeatureItem 
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          alt={feature.alt}
        />
      ))}
    </section>
  );
};

export default Features;
