// Features.jsx
import React from 'react';
import featuresData from '../../assets/features.json';
import FeatureItem from './FeaturesItem';
import './Features.scss';

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((feature) => (
        <FeatureItem
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
};

export default Features;

