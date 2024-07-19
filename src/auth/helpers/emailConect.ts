import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../apis";

type response = {
  ok: boolean;
  errorMessage?: string;
  uid?: string;
  photoURL?: string;
  displayName?: string;
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
      photoURL: photoURL ?? undefined,
      displayName: displayName ?? undefined,
    };
  } catch (error) {
    const firebaseError = error as AuthError;
    const errorMessage = firebaseError.message || "Ocurrió un error";

    return {
      ok: false,
      errorMessage,
    };
  }
};
