import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserName } from "../api/UserNameCall";

// Action asynchrone pour mettre à jour le nom d'utilisateur via l'API
export const updateUserName = createAsyncThunk(
  "auth/updateUserName",
  async ({ newUserName, token }, { rejectWithValue }) => {
    try {
      const response = await UserName(newUserName, token);
      return response; // Retourner la réponse de l'API (mise à jour réussie)
    } catch (error) {
      return rejectWithValue(error.message); // Retourner une erreur si la mise à jour échoue
    }
  }
);
