import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../api/fetchLoginUser";
import { fetchUser } from "../api/fetchUser";

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Connexion réussie
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user; // Sauvegarder l'utilisateur également
        localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      // Échec de la connexion
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
      })
      // Récupération des informations utilisateur réussie
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      // Échec de la récupération des informations utilisateur
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
