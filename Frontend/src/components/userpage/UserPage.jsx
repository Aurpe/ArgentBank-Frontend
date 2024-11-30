import React from 'react';
import Header from '../header/Header'; 
import AccountCard from '../account/AccountCard';
import '../userpage/UserPage.scss';

const UserPage = () => {
  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <AccountCard 
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
          onViewTransactions={() => {
            console.log('View transactions for checking account');
          }}
        />
        <AccountCard 
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          onViewTransactions={() => {
            console.log('View transactions for savings account');
          }}
        />
        <AccountCard 
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          onViewTransactions={() => {
            console.log('View transactions for savings account');
          }}
        />
      </main>
    </div>
  );
};

export default UserPage;