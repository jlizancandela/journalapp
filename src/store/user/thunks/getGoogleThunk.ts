import { googleConect } from "../../../auth/helpers/googleConect";
import { AppDispatch } from "../../store";
import { setUser, checkUser } from "../userReducer";

export const getGoogleThunk = () => async (dispatch: AppDispatch) => {
  dispatch(checkUser());
  const data = await googleConect();
  dispatch(
    setUser({
      name: data.displayName ? data.displayName : "",
      email: data.email ? data.email : "",
      status: data.errorMessage ? "disconnected" : "connected",
      error: data.errorMessage ? data.errorMessage : "",
      photoUrl: data.photoURL ? data.photoURL : "",
      uid: data.uid ? data.uid : "",
    })
  );
};
