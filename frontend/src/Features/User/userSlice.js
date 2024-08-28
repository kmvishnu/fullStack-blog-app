import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '', 
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  user: localStorage.getItem('user') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.name;
      
    },
    clearToken: (state) => {
      state.token = null;
      state.refreshToken=null;
      state.user = null;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setToken, setAuthToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
