import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuthData, clearAuthData } = AuthSlice.actions;

export default AuthSlice.reducer;
