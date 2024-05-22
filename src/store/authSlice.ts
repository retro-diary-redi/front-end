import { RootState } from './index';
import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  isLoggedIn: boolean;
};

const initialState: SliceState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
