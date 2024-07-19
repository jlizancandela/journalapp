import { useEffect } from "react";
import { useInput } from "../../auth";
import { useAppSelector } from "../../store";
import { dateToString } from "../helpers/dateToString";

export const useNoteView = () => {
  const { active } = useAppSelector((state) => state.journal);

  const { values, onChange, reset, newValues } = useInput({
    title: {
      value: active?.title || "",
      error: "",
    },
    content: {
      value: active?.body || "",
      error: "",
    },
  });

  useEffect(() => {
    reset();
    console.log("reset");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id]);

  const formattedDate = dateToString(active?.date || 0);

  //Cambia el estado del hook cada vez que se asigna una nueva nota

  return { values, onChange, reset, newValues, formattedDate };
};
