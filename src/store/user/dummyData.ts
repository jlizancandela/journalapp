import { UserState } from "./userReducer";

export const initialState: UserState = {
  name: "",
  email: "",
  status: "disconnected",
  error: "",
  photoUrl: "",
  uid: "",
};

export const loggedState: UserState = {
  name: "Jorge",
  email: "ZCQ9c@example.com",
  status: "connected",
  error: "",
  photoUrl: "https://example.com/jorge.png",
  uid: "123456789",
};

export const logoutState: UserState = {
  name: "",
  email: "",
  status: "disconnected",
  error: "",
  photoUrl: "",
  uid: "",
};
