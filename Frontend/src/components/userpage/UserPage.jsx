import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import TransactionCard from "../account/TransactionCard";
import { updateUserName, fetchUserDetails } from "../../store/authActions";
import "../userpage/UserPage.scss";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accédez aux données de l'utilisateur et à l'état de l'authentification depuis Redux
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || '');
  
  // Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchUserDetails()); // Charger les détails de l'utilisateur au montage
    }
  }, [isAuthenticated, navigate, dispatch]);

  // Gestion de l'édition du nom d'utilisateur
  const handleToggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await dispatch(updateUserName({ userName, token }));
      setIsEditing(false);  // Fermer le formulaire après l'enregistrement
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div>
      <main className="main bg-dark">
        <Header />
        <h1>Welcome, {user?.firstName || "User"}!</h1>

        {/* Section pour modifier le nom d'utilisateur */}
        <div className="edit">
          <button className="edit-button" onClick={handleToggleEditForm}>
            Edit Name
          </button>
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
          {/* Vous pouvez ajouter d'autres champs ici si nécessaire */}
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  
                  
        <TransactionCard />
      </main>
    </div>
  );
};

export default UserPage;
