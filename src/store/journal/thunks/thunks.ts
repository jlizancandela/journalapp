import { Note } from "../types";
import {
  doc,
  deleteDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setSaving,
} from "../journaReducer";
import { AppDispatch, RootState } from "../../store";
import { toast } from "../../../Journal/helpers/toast";
import { db } from "../../../apis";
import { multipleUploadCloudinary } from "../../../apis/cloudinary/helper/feetch";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().user;
    console.log("startNewNote");
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
        await setDoc(ref, note, { merge: true });
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

export const uploadImages = (files: File[]) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setSaving());
    const { active } = getState().journal;

    const response = await multipleUploadCloudinary(files);

    const note = { ...active };

    if (!note.imageUrls) {
      note.imageUrls = [];
    }
    toast("todo perfecto, guarda la nota");
    note.imageUrls = [...note.imageUrls, ...response];
    dispatch(setActiveNote(note));
  };
};

export const deleteNoteByIdOnFS = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().user;
    const { active } = getState().journal;
    dispatch(setSaving());
    try {
      const ref = doc(db, `${uid}/journal/notes/${active?.id}`);
      await deleteDoc(ref);
      dispatch(deleteNoteById(active?.id));
      toast("Nota eliminada");
      dispatch(setActiveNote(null));
    } catch (error) {
      console.log(error);
      toast("algo fallo");
    }
  };
};
