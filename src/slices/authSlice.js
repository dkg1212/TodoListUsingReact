import { createSlice } from '@reduxjs/toolkit';

const getInitialAuthState = () =>
  JSON.parse(localStorage.getItem('authUser')) || {
    isAuthenticated: false,
    user: null,
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('authUser', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('authUser');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
