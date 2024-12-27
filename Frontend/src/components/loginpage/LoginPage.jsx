import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../common/LoginForm";
import "../loginpage/LoginPage.scss";
import { loginUser } from "../../store/authActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer les données d'authentification du store (isAuthenticated, error)
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user"); // Rediriger l'utilisateur vers la page d'accueil une fois authentifié
    }
  }, [isAuthenticated, navigate]);

  return (
    <main>
      <section>
        {error && <p className="error-message">{error}</p>} {/* Afficher l'erreur si présente */}
        <LoginForm 
          
        />
      </section>
    </main>
  );
};

export default LoginPage;




