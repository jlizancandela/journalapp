import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../apis";

type response = {
  ok: boolean;
  errorMessage?: string | null;
  uid?: string | null;
  photoURL?: string | null;
  displayName?: string | null;
};

type props = {
  email: string;
  password: string;
};

type emailConect = ({ email, password }: props) => Promise<response>;

export const emailConect: emailConect = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    const firebaseError = error as AuthError;
    const errorMessage = firebaseError.message || "An error occurred";
    return {
      ok: false,
      errorMessage,
    };
  }
};
