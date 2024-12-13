import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

// Action: Récupérer les informations utilisateur
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile");
      }

      const data = await response.json();
      return data.body; // Renvoyer uniquement les informations de l'utilisateur
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
        localStorage.setItem("token", action.payload.token); // Stocker le token dans le localStorage
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
