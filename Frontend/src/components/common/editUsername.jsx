import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../store/authActions";

const UpdateUsernameForm = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth); // Récupérez l'utilisateur du state global

  const [newUsername, setNewUsername] = useState(user?.username || ""); // Valeur initiale

  const handleInputChange = (e) => {
    setNewUsername(e.target.value); // Met à jour l'état local
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appelle l'action updateUsername avec le nouveau nom d'utilisateur
      await dispatch(updateUsername({ username: newUsername }));
      alert("Nom d'utilisateur mis à jour !");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  return (
    <div>
      <h2>Modifier le nom d'utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur actuel :</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={handleInputChange}
            placeholder="Entrez un nouveau nom"
          />
        </div>
        {loading && <p>Enregistrement en cours...</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Mettre à jour"}
        </button>
      </form>
      <p>Nom d'utilisateur actuel : {user?.username || "Non défini"}</p>
    </div>
  );
};

export default UpdateUsernameForm;
