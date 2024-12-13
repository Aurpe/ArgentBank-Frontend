import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate pour la redirection
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../api/fetchLoginUser"; // Assure-toi d'importer l'action loginUser

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialisation de useNavigate

  // Utilisation de useSelector pour récupérer l'état de l'authentification, y compris l'erreur et le chargement
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Si l'utilisateur est déjà authentifié, rediriger immédiatement vers la page de l'utilisateur
  if (isAuthenticated) {
    navigate("/user");
  }

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatche l'action loginUser avec l'email et le mot de passe
    await dispatch(loginUser({ email, password }));
  };

  // Gestion des changements des champs de saisie
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        {/* Affichage du message d'erreur s'il y en a une */}
        {error && <p className="error-message">{error}</p>}

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit}>
          {/* Champ Email */}
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password} // Lier l'état à la valeur du champ
              autoComplete="current-password"
              onChange={handlePasswordChange} // Met à jour l'état lors du changement
              required
            />
          </div>

          {/* Case à cocher "Se souvenir de moi" */}
          <div className="input-remember">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginForm;
