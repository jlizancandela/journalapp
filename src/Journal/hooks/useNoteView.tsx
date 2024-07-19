import { useEffect, useMemo } from "react";
import { setActiveNote, useAppDispatch, useAppSelector } from "../../store";
import { useInput } from "../../auth";
import { dateToString } from "../helpers/dateToString";

export const useNoteView = () => {
  const {
    active: { date, body, title: noteTitle, id },
  } = useAppSelector((state) => state.journal);

  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      title: {
        value: noteTitle,
        error: "",
      },
      content: {
        value: body,
        error: "",
      },
    };
  }, [noteTitle, body]);

  const { values, onChange, reset, newValues } = useInput(initialValues);

  const formattedDate = dateToString(date);

  //Cambia el estado de redux cada vez que cambian los inputs
  useEffect(() => {
    dispatch(
      setActiveNote({
        id: id,
        date: date,
        body: values.content.value,
        title: values.title.value,
      })
    );
  }, [date, dispatch, id, values]);

  //Cambia el estado del hook cada vez que se asigna una nueva nota
  useEffect(() => {
    newValues(initialValues);
  }, [id, initialValues, newValues]);

  return { values, onChange, reset, newValues, formattedDate };
};
