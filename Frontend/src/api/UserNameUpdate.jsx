import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:3001/api/v1";

const UserNameUpdate = async (userName, token) => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update username");
  }

  return response.json();
};

export default UserNameUpdate;

export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async ({ userName, token }, { rejectWithValue }) => {
    try {
      const response = await UserNameUpdate(userName, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
