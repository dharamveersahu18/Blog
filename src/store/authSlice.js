//also create postSlices
// Redux section => store the is  used to keep the logged-in user available across the entire application.
// prop drilling.
// It creates one global store.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

// one section of the the redux store
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Reducers change the state.
    login: (state, action) => {
      state.status = true; // immer state
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});
// This creates action creators automatically.
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
