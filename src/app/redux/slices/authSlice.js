import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    subsCription: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    updateSubs: (state, action) => {
      state.subsCription = action.payload;
    },
  },
});

export const { updateUser, removeUser, updateSubs } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectSubs = (state) => state.auth.subsCription;

export default authSlice.reducer;
