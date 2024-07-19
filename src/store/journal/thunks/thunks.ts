import { Note } from "../types";
import { doc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
} from "../journaReducer";
import { AppDispatch, RootState } from "../../store";
import { toast } from "../../../Journal/helpers/toast";
import { db } from "../../../apis";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().user;

    dispatch(setSaving());

    const newNote: Note = {
      title: "Nueva nota",
      body: "Escribe algo ...",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const ref = collection(db, `${uid}/journal/notes`);

    const resp = await addDoc(ref, newNote);

    newNote.id = resp.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const saveNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().user;

    const { active: note } = getState().journal;
    if (note) {
      const ref = doc(db, `${uid}/journal/notes/${note.id}`);
      try {
        await setDoc(ref, note);
        dispatch(setSaving());
        dispatch(setActiveNote(note));
        dispatch(loadNotes());
        toast("todo perfecto");
      } catch {
        toast("algo fallo");
      }
    }
  };
};
export const loadNotes = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().user;
    const ref = collection(db, `${uid}/journal/notes`);
    const querySnapshot = await getDocs(ref);

    const notes = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch(setNotes(notes));
  };
};
