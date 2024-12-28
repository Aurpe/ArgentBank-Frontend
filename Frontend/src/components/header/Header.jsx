import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../store/authActions";  // Assurez-vous que vous importez l'action correcte
import "../header/Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  
  // Accédez aux données de l'utilisateur et à l'état de l'authentification depuis Redux
  const { user, loading, error } = useSelector((state) => state.auth);
  
  // État local pour gérer l'édition du nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");

  // Synchroniser userName avec user
  useEffect(() => {
    if (user) {
      setUserName(user.body?.userName || ""); // Utilisez une chaîne vide comme valeur par défaut
    }
  }, [user]);

  // Journaliser les données utilisateur pour déboguer
  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  // Gestion de l'édition du nom d'utilisateur
  const handleToggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Fonction pour enregistrer le nouveau nom d'utilisateur
  const handleSave = async () => {
    try {
      const result = await dispatch(
        updateUsername({ UpdateUsername: userName })
      ).unwrap(); // Utilisation de unwrap pour obtenir la réponse directement
      setUserName(result.userName); // Mettez à jour localement avec les données retournées
      setIsEditing(false); // Fermer le formulaire d'édition
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="header">
      {loading ? (
        <p>Chargement des données utilisateur...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : user ? (
        <div>
          <h1>Welcome, {userName} !</h1>
          <p>
            {user.body?.firstName} {user.body?.lastName}
          </p>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={userName || ""} // Toujours utiliser une chaîne vide
                onChange={handleUserNameChange}
              />
              <button onClick={handleSave}>Sauvegarder</button>
              <button onClick={handleToggleEditForm}>Annuler</button>
            </div>
          ) : (
            <button className="edit-button" onClick={handleToggleEditForm}>
              Edit Name
            </button>
          )}
        </div>
      ) : (
        <p>Aucune donnée utilisateur trouvée.</p>
      )}
    </div>
  );
};

export default Header;




    


