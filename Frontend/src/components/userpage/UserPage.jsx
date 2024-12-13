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
        <h1>Welcome, {user?.firstName || "User"}!</h1>
        <button className="edit-button">Edit Name</button>
        <AccountCard />
      </main>
    </div>
  );
};

export default UserPage;
