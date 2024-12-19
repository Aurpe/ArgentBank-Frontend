import { createSlice } from "@reduxjs/toolkit";
import { updateUserName } from "./userAction";

const initialState = {
  userDetails: {
    userName: "",
    firstName: "",
    lastName: "",
  },
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails.userName = action.payload.userName; // Mise à jour du nom d'utilisateur dans Redux
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
