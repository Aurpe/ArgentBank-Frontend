import { createAsyncThunk } from "@reduxjs/toolkit";

// URL de base pour l'API
const API_BASE_URL = "http://localhost:3001/api/v1";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  // @ts-ignore
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
      console.log("Réponse brute de l'API loginUser :", data);

      // Extraire le token de la réponse
      const token = data?.body?.token;
      if (!token) {
        throw new Error("Le token est manquant dans la réponse de l'API.");
      }

      return { token }; // Retourne uniquement le token
    } catch (error) {
      console.error("Erreur attrapée dans loginUser :", error.message);
      return rejectWithValue(error.message);
    }
  }
);


export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token, { rejectWithValue }) => {
    // @ts-ignore
    if (!token) {
      return rejectWithValue("Le token d'authentification est manquant.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le token dans les en-têtes
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Échec de la récupération des informations utilisateur"
        );
      }

      const data = await response.json();
      console.log("Données utilisateur récupérées :", data);
      return data;
    } catch (error) {
      console.error ("Echec recuperation utilisateur:", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Action: Mettre à jour le nom d'utilisateur
export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  // @ts-ignore
  async ({ UpdateUsername }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userName: UpdateUsername }), // Correctez la clé ici
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update username");
      }

      const data = await response.json();
      console.log("Données reçues après mise à jour :", data);
      return data.body; // Retourne les données utilisateur mises à jour
    } catch (error) {
      console.error("Erreur attrapée :", error.message);
      return rejectWithValue(error.message);
    }
  }
);

