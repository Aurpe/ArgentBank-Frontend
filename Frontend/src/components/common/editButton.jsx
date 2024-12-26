import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserNameUpdate  from '../../api/UserNameUpdate';
import User from '../../api/User';  
import userReducer from '../../store/userReducer';

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
      dispatch(User()); // Récupérer les infos utilisateur uniquement si elles ne sont pas dans Redux
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
    try {
      const token = localStorage.getItem('token');
      const result = await UserNameUpdate(userName, token);
      console.log("User profile updated:", result);
      dispatch(userReducer({ userName }));
      setIsEditing(false);  // Fermer le formulaire après l'enregistrement
    } catch (error) {
      setError;
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="edit">
      <button className="edit-button" onClick={handleToggleEditForm}>
        Edit Name
      </button>
      {isEditing && isLoggedIn && (
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
          <div className="inputButton">
            <button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleToggleEditForm}>Cancel</button>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
  
  

