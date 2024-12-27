import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../store/authActions";  // Assurez-vous que vous importez l'action correcte
import "../header/Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  
  // Accédez aux données de l'utilisateur et à l'état de l'authentification depuis Redux
  const { user, loading, error } = useSelector((state) => state.auth);
  
  // État local pour gérer l'édition du nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || '');

  // Fonction pour basculer entre le mode édition et lecture
  const handleToggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  // Fonction pour gérer les changements dans le champ du nom d'utilisateur
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Fonction pour enregistrer les modifications du nom d'utilisateur
  const handleSave = async () => {
    try {
      await dispatch(updateUsername(userName));  // Mettre à jour le nom d'utilisateur via Redux
      setIsEditing(false);  // Fermer le formulaire après l'enregistrement
    } catch (error) {
      console.error("Erreur lors de la mise à jour du nom d'utilisateur :", error);
    }
  };

  return (
    <div className="header">
      <h1>Welcome Back {user?.firstName || "User"}!</h1>

      {/* Bouton pour activer ou désactiver le mode édition */}
      <button className="edit-button" onClick={handleToggleEditForm}>
        Edit Name
      </button>

      {/* Section pour modifier le nom d'utilisateur */}
      {isEditing && (
        <div className="inputName">
          <div className="inputContainer">
            <label htmlFor="userName">User name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {/* Affichage des erreurs si elles existent */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Header;

