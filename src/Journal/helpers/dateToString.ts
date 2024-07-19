import { timeProps } from "../../store";

export const dateToString = (date: number) => {
  const options: timeProps = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("es-ES", options);
};
