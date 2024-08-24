import {
  AuthError,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "../../apis";

export const emailRegister = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    // Crear un nuevo usuario con correo y contraseña
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = resp.user;

    // Actualizar el perfil del usuario recién creado con el nombre proporcionado
    await updateProfile(resp.user, { displayName: name });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayname: name,
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
