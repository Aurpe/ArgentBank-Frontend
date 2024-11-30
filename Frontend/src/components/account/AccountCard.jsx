
import '../account/AccountCard.scss';
import React from 'react';

const AccountCard = ({ 
  title, 
  amount, 
  description, 
  onViewTransactions 
}) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
        {onViewTransactions && (
          <button 
            className="transaction-button"
            onClick={onViewTransactions}
          >
            View Transactions
          </button>
        )}
      </div>
    </section>
  );
};

export default AccountCard;