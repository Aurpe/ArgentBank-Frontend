import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUsername, loginUser, fetchUser } from "../../store/authActions";
import Header from "../header/Header";
import TransactionCard from "../account/TransactionCard";
import "../userpage/UserPage.scss";
import EditUsername from "../common/editUsername"

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accédez aux données de l'utilisateur et à l'état de l'authentification depuis Redux
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.auth
  );

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || '');

  // Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch((updateUsername)); // Charger les détails de l'utilisateur au montage
    }
  }, [isAuthenticated, navigate, dispatch]);

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
      const token = localStorage.getItem('token');
      await dispatch(updateUsername(userName)); // Dispatcher seulement le nouveau nom d'utilisateur
      setIsEditing(false);  // Fermer le formulaire après l'enregistrement
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div>
      <main className="main bg-dark">
        <Header />
        <EditUsername />
      
        <TransactionCard />
      </main>
    </div>
  );
};

export default UserPage;
