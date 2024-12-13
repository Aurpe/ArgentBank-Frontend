import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import AccountCard from "../account/AccountCard";
import "../userpage/UserPage.scss";

const UserPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirection si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    navigate("/login");
  }
  // editer username , au clik sur edit name, une fois edité, le dispactcher a redux
  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <h2>Welcome, {user?.firstName || "User"}!</h2>
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
          onViewTransactions={() => {
            console.log("View transactions for checking account");
          }}
        />
        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          onViewTransactions={() => {
            console.log("View transactions for savings account");
          }}
        />
        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
          onViewTransactions={() => {
            console.log("View transactions for savings account");
          }}
        />
      </main>
    </div>
  );
};

export default UserPage;
