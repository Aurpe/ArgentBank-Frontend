// src/store/userReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { updateUserName, fetchUserDetails } from './authActions';

const initialState = {
  userDetails: null, // Détails de l'utilisateur
  isLoggedIn: false, // État de connexion
  loading: false,    // État de chargement
  error: null,       // Message d'erreur
};

const userReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userDetails = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Récupération des détails utilisateur
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mise à jour du nom d'utilisateur
      .addCase(updateUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails.userName = action.payload.userName;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userReducer.actions;
export default userReducer.reducer;

