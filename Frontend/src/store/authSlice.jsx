// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, fetchUser, updateUsername } from "./authActions"; // Import unifié

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
      // Connexion
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Récupération des détails utilisateur
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, userName: action.payload.userName }; // Met à jour uniquement userName
        state.error = null;
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture l'erreur pour affichage
      });
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


