import { emailRegister } from "../../../auth/helpers/emailRegister";
import { AppDispatch } from "../../store";
import { checkUser, logoutUser, setUser } from "../userReducer";

export const registerUserThunk =
  ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(checkUser());

    const data = await emailRegister(email, password, name);
    console.log(email, password, name);
    if (data) {
      const { ok, photoURL, uid } = data;

      if (ok) {
        dispatch(
          setUser({
            uid: uid ?? "",
            name: name ?? "",
            email: email,
            status: "connected",
            error: "",
            photoUrl: photoURL ? photoURL : "",
          })
        );
      } else {
        dispatch(logoutUser());
      }
    }
  };
