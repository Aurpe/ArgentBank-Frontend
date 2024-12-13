import "../account/AccountCard.scss";
import React from "react";

export function AccountCard() {
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  const handleViewTransactions = () => {
    console.log("Viewing transactions...");
  };

  return (
    <div className="transactions">
      {accounts.map((account, index) => (
        <AccountCard
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
          onViewTransactions={handleViewTransactions}
        />
      ))}
    </div>
  );
}

export default AccountCard;
