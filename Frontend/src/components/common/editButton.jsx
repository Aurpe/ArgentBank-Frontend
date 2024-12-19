import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../../store/userAction"; // Import de l'action Redux

export function EditButton() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");

  const { userDetails, isLoggedIn, loading, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Initialise le userName avec celui récupéré dans Redux (userDetails)
    setUserName(userDetails?.userName || "");
  }, [userDetails]);

  const handleToggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token"); // Récupération du token d'authentification
    if (token) {
      // Appel de l'action Redux pour mettre à jour le nom d'utilisateur via l'API
      dispatch(updateUserName({ newUserName: userName, token }));
    } else {
      console.error("Token is missing");
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
          <div className="inputContainer">
            <label htmlFor="firstName">First name:</label>
            <input
              className="readOnly"
              type="text"
              id="firstName"
              value={userDetails?.firstName}
              readOnly
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="lastName">Last name:</label>
            <input
              className="readOnly"
              type="text"
              id="lastName"
              value={userDetails?.lastName}
              readOnly
            />
          </div>
          <div className="inputButton">
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button onClick={handleToggleEditForm}>Cancel</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}
