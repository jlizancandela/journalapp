import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
  status: "connected" | "disconnected" | "checking";
  error: string;
  photoUrl: string;
  uid: string;
}

interface UserPayload {
  name: string;
  email: string;
  status: "connected" | "disconnected" | "checking";
  error: string;
  photoUrl: string;
  uid: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  status: "disconnected",
  error: "",
  photoUrl: "",
  uid: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUser: (state) => {
      state.status = "checking";
    },
    setUser: (state, action: { payload: UserPayload }) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.status = action.payload.status;
      state.error = action.payload.error;
      state.photoUrl = action.payload.photoUrl;
      state.uid = action.payload.uid;
    },

    logoutUser: (state) => {
      state.name = "";
      state.email = "";
      state.status = "disconnected";
      state.error = "";
      state.photoUrl = "";
      state.uid = "";
    },
  },
});

export default userReducer.reducer;

export const { checkUser, setUser, logoutUser } = userReducer.actions;
