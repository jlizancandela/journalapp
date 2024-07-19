export type FormComponentProps = {
  values: {
    [key: string]: InputField;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

interface InputField {
  value: string;
  error: string;
  regex?: RegExp; // Expresión regular opcional para validación
  errorMessage?: string; // Mensaje de error opcional
}
