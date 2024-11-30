import React from 'react';
import featuresData from '../../assets/features.json';
import iconChat from '../../assets/img/icon-chat.png';
import iconMoney from '../../assets/img/icon-money.png';
import iconSecurity from '../../assets/img/icon-security.png';
import '../features/Features.scss';

// Mapping des icônes importées
const iconMap = {
  'icon-chat.png': iconChat,
  'icon-money.png': iconMoney,
  'icon-security.png': iconSecurity
};

const FeatureItem = ({ icon, title, description, alt }) => {
  return (
    <div className="feature-item">
      <img
        src={iconMap[icon]}
        alt={alt || title}
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
