import { createAsyncThunk } from "@reduxjs/toolkit";

// Action: Connexion
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001", {
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
      return data; // Retourne les données utilisateur
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
