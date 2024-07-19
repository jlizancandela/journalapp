import { useState } from "react";

interface InputField {
  value: string;
  error: string;
  regex?: RegExp; // Expresión regular opcional para validación
  errorMessage?: string; // Mensaje de error opcional
}

export interface InputValues {
  [key: string]: InputField;
}

export const useInput = (initialValues: InputValues = {}) => {
  const [values, setValues] = useState<InputValues>(initialValues);
  const [formError, setFormError] = useState(false);

  const validateValues = (values: InputValues) => {
    for (const key in values) {
      const field = values[key];
      if (field.regex && !field.regex.test(field.value)) {
        return true;
      }
    }
    return false;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    if (values[name]?.regex && !values[name].regex!.test(value)) {
      error = values[name].errorMessage || "Valor inválido";
    }

    const updatedValues = {
      ...values,
      [name]: { ...values[name], value, error },
    };

    setValues(updatedValues);
    setFormError(validateValues(updatedValues));
  };

  const reset = () => {
    setValues(initialValues);
    setFormError(false);
  };

  const newValues = (values: InputValues) => {
    const updatedValues = {
      ...values,
    };
    setValues(updatedValues);
    setFormError(validateValues(updatedValues));
  };

  return { values, formError, onChange, reset, newValues };
};
