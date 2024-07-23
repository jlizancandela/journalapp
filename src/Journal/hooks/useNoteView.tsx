import { useEffect } from "react";
import { useInput } from "../../auth";
import { setActiveNote, useAppDispatch, useAppSelector } from "../../store";
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setActiveNote({
        id: active?.id || "",
        date: active?.date || 0,
        body: values.content.value || "",
        title: values.title.value || "",
        imageUrls: active?.imageUrls || [],
      })
    );
  }, [active?.id, active?.date, dispatch, values, active?.imageUrls]);

  const formattedDate = dateToString(active?.date || 0);

  //Cambia el estado del hook cada vez que se asigna una nueva nota

  return { values, onChange, reset, newValues, formattedDate };
};
