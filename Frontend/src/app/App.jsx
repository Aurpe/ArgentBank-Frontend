import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Import des composants
import HomePage from "../components/homepage/HomePage";
import LoginPage from "../components/loginpage/LoginPage";
import UserPage from "../components/userpage/UserPage";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

// Import des styles
import "../app/App.scss";

const App = () => {
  // Récupérer l'état d'authentification depuis Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} userName={user?.firstName} />
      <Routes>
        {/* Route vers la page d'accueil */}
        <Route path="/" element={<HomePage />} />

        {/* Route vers la page de connexion */}
        <Route path="/sign-in" element={<LoginPage />} />

        {/* Route protégée pour la page utilisateur */}
        <Route
          path="/user"
          element={
            isAuthenticated ? <UserPage /> : <Navigate to="/sign-in" replace />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
