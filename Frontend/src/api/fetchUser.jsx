import { createAsyncThunk } from "@reduxjs/toolkit";

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
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
