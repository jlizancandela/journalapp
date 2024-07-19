export const initialValues = {
  email: {
    value: "",
    error: "",
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Dirección de email inválida",
  },
  password: {
    value: "",
    error: "",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/,
    errorMessage:
      "La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial",
  },
  name: {
    value: "",
    error: "",
    regex: /^[a-zA-Z0-9]{4,10}$/,
    errorMessage:
      "El nombre de usuario debe tener entre 4 y 10 caracteres alfanuméricos",
  },
};
