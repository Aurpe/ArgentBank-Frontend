
import "../account/TransactionCard.scss";
import React from "react";
import transactionJson from "../../assets/transaction.json";

const TransactionCard = () => { 
  return (
    <div> 
      <h2 className="sr-only">Accounts</h2>
      {transactionJson.map((account, index) => (
        <section className="account" key={index}> 
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default TransactionCard; // Assurez-vous de l'exportation avec le nom correct
