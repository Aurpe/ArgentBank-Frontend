import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUsername, fetchUser } from "../../store/authActions";
import Header from "../header/Header";
import TransactionCard from "../account/TransactionCard";
import "../userpage/UserPage.scss";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accédez aux données de l'utilisateur et à l'état de l'authentification depuis Redux
  const { isAuthenticated, user, loading, error } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(""); // Initialisez à vide

  // Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser(token));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // Synchroniser userName avec user
  useEffect(() => {
    if (user) {
      setUserName(user.body.userName || ""); // Utilisez une chaîne vide comme valeur par défaut
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
      const token = localStorage.getItem("token");
      const result = await dispatch(
        updateUsername({ UpdateUsername: userName })
      ).unwrap();
      setUserName(result.userName); // Mettez à jour localement avec les données retournées
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };


  return (
    <div>
      <main className="main bg-dark">
        <Header />
        <TransactionCard />
      </main>
    </div>
  );
};

export default UserPage;
