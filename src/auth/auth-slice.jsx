import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  userData: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state.isLogin = true;
      state.userData = action.payload;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    authLogout: (state) => {
      state.isLogin = false;
      state.userData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
