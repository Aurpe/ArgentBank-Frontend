// @ts-nocheck
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../layouts/Navbar.scss";
import { logout } from "../../store/authSlice";
import argentBankLogo from "../../assets/img/argentBankLogo.webp";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupération des données utilisateur et de l'état d'authentification
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Extraction sécurisée du nom d'utilisateur
  const userName = user?.body?.userName || "Guest";

  const handleLogout = () => {
    dispatch(logout()); // Déconnexion via Redux Toolkit
    navigate("/sign-in"); // Redirection vers la page de connexion
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />

      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {userName}
            </Link>
            <Link className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
