
import React from 'react';
import iconChat from '../../assets/img/icon-chat.webp';
import iconMoney from '../../assets/img/icon-money.webp';
import iconSecurity from '../../assets/img/icon-security.webp';
import './Features.scss';


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

export default FeatureItem;
