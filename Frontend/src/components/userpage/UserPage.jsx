import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import TransactionCard from "../account/TransactionCard";
import "../userpage/UserPage.scss";
import { EditButton } from "../common/editButton";

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
        <h1>Welcome, {user?.firstName || "User"}!</h1>
        <EditButton />

        <TransactionCard />
      </main>
    </div>
  );
};

export default UserPage;
