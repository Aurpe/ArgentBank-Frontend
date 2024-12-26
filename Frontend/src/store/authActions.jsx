import { createAsyncThunk } from '@reduxjs/toolkit';
import UserNameUpdate  from '../api/UserNameUpdate';
import { loginUser as loginApi } from '../api/LoginUser';
import { fetchUser as fetchUserApi } from '../api/User';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi;
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserName = createAsyncThunk(
  'auth/updateUserName',
  async ({ userName, token }, { rejectWithValue }) => {
    try {
      const response = await UserNameUpdate(userName, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
