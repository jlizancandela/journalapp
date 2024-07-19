import { firebaseAuth } from "../../../apis";
import { AppDispatch } from "../../store";
import { logoutUser } from "../userReducer";
import { signOut } from "firebase/auth";

export const logoutUserThunk = () => async (dispatch: AppDispatch) => {
  signOut(firebaseAuth);
  dispatch(logoutUser());
  console.log("logoutUserThunk");
};
