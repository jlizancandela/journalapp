import { AppDispatch } from "../../store";
import { checkUser } from "../userReducer";

export const checkUserThunk = () => async (dispatch: AppDispatch) => {
  dispatch(checkUser());
};
