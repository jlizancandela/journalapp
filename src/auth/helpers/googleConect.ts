import { AuthError, signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "../../apis";

export const googleConect = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;
    console.log({ displayName, email, photoURL, uid });
    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
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
