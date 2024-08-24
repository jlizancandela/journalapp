import { emailConect } from "../../../auth/helpers/emailConect";
import { AppDispatch } from "../../store";
import { checkUser, setUser } from "../userReducer";

export const loginUserThunk =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(checkUser());
    const data = await emailConect({ email, password });
    dispatch(
      setUser({
        name: data.displayName ?? "",
        email: email,
        status: data.errorMessage ? "disconnected" : "connected",
        error: data.errorMessage ?? "",
        photoUrl: data.photoURL ?? "",
        uid: data.uid ?? "",
      })
    );
  };
