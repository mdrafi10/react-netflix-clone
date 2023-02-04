import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    subsCription: null,
    singleMovie: {},
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
    updateSingleMovie: (state, action) => {
      state.singleMovie = action.payload;
    },
  },
});

export const { updateUser, removeUser, updateSubs, updateSingleMovie } =
  authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectSubs = (state) => state.auth.subsCription;
export const selectSingleMovie = (state) => state.auth.singleMovie;

export default authSlice.reducer;
