
import { createAsyncThunk } from "@reduxjs/toolkit";

// URL de base pour l'API
const API_BASE_URL = "http://localhost:3001/api/v1";

// Action: Connexion (login)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action: Récupérer les détails de l'utilisateur
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token, { rejectWithValue }) => {
    // Vérifier si le token existe avant de continuer
    if (!token) {
      return rejectWithValue("Le token d'authentification est manquant.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const jsonError = JSON.parse(errorData);
          throw new Error(jsonError.message || "Échec de la récupération du profil utilisateur");
        } catch (jsonError) {
          throw new Error("Échec de la récupération du profil utilisateur, réponse non JSON");
        }
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("La réponse n'est pas au format JSON");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Action: Mettre à jour le nom d'utilisateur
export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async ({ UpdateUsername }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ UpdateUsername }), // Utilisez la clé correcte
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update username");
      }

      const data = await response.json();
      console.log("Données reçues après mise à jour :", data);
      return data; // Retourne les données utilisateur mises à jour
    } catch (error) {
      console.error("Erreur attrapée :", error.message);
      return rejectWithValue(error.message); // Gestion des erreurs
    }
  }
);

