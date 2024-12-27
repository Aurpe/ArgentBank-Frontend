import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUsername, fetchUser } from "../../store/authActions";

export function EditButton() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);  // Pour gérer les erreurs
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const loading = useSelector((state) => state.auth.loading);  // Gérer l'état de chargement
  const dispatch = useDispatch();

  // Récupérer les informations utilisateur lors du montage du composant
  useEffect(() => {
    if (!userDetails) {
      dispatch(fetchUser()); // Récupérer les infos utilisateur uniquement si elles ne sont pas dans Redux
    }
    if (userDetails?.userName) {
      setUserName(userDetails.userName);
    }
  }, [dispatch, userDetails]);

  const handleToggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSave = async () => {
    if (userName === userDetails.userName) {
      console.log('Le nom d\'utilisateur n\'a pas changé');
      setIsEditing(false);  // Ferme le formulaire
      return;  // Ignore la mise à jour du profil
    }
    try {
      const token = localStorage.getItem('token');
      const result = await dispatch(updateUsername(userName, token));  // Appel à l'action pour mettre à jour le nom d'utilisateur
      console.log("Profil utilisateur mis à jour :", result);
      setIsEditing(false);  // Ferme le formulaire après l'enregistrement
    } catch (error) {
      setError(error.message);
      console.error("Erreur lors de la mise à jour du profil utilisateur :", error);
    }
  };

  return (
    <div className="edit">
      <button className="edit-button" onClick={handleToggleEditForm}>
        Modifier le nom
      </button>
      {isEditing && isLoggedIn && (
        <div className="inputName">
          <div className="inputContainer">
            <label htmlFor="userName">Nom d'utilisateur :</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="inputButton">
            <button onClick={handleSave} disabled={loading}>
              {loading ? 'Enregistrement...' : 'Sauvegarder'}
            </button>
            <button onClick={handleToggleEditForm}>Annuler</button>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
