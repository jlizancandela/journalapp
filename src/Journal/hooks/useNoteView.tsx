import { useEffect, useMemo } from "react";
import { setActiveNote, useAppDispatch, useAppSelector } from "../../store";
import { useInput } from "../../auth";
import { dateToString } from "../helpers/dateToString";

export const useNoteView = () => {
  const { active } = useAppSelector((state) => state.journal);

  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      title: {
        value: active?.title || "",
        error: "",
      },
      content: {
        value: active?.body || "",
        error: "",
      },
    };
  }, [active]);

  const { values, onChange, reset, newValues } = useInput(initialValues);

  const formattedDate = dateToString(active?.date || 0);

  //Cambia el estado de redux cada vez que cambian los inputs
  useEffect(() => {
    dispatch(
      setActiveNote({
        id: active?.id || "",
        date: active?.date || 0,
        body: values.content.value,
        title: values.title.value,
      })
    );
  }, [active, dispatch, values]);

  //Cambia el estado del hook cada vez que se asigna una nueva nota
  useEffect(() => {
    newValues(initialValues);
  }, [active?.id, initialValues, newValues]);

  return { values, onChange, reset, newValues, formattedDate };
};
