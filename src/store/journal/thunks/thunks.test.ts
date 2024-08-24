import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import {
  deleteNoteByIdOnFS,
  loadNotes,
  saveNote,
  startNewNote,
  uploadImages,
} from "./thunks";
import { UserState } from "../../user/userReducer";
import { JournalState, Note } from "../types";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../apis";

// -------------------------------------------------------------------
//                             TYPES
// -------------------------------------------------------------------

type ApState = {
  user: UserState;
  journal: JournalState;
};

// -------------------------------------------------------------------
//                          DUMMY DATA
// -------------------------------------------------------------------

const state: ApState = {
  user: {
    uid: "test",
    name: "test",
    email: "test",
    photoUrl: "test",
    status: "connected",
    error: "",
  },
  journal: { notes: [], active: null, isSaving: false, messageSaved: "" },
};

const newNote = {
  id: expect.any(String),
  date: expect.any(Number),
  body: "Escribe algo ...",
  title: "Nueva nota",
  imageUrls: [],
};

const urls = [
  "https://res.cloudinary.com/demo/image/upload/example.png",
  "https://res.cloudinary.com/demo/image/upload/example.png",
];

// -------------------------------------------------------------------
//                             MOCKS
// -------------------------------------------------------------------

const dispatch = vi.fn();

const getState = vi.fn(() => state);

vi.mock("../../../apis/cloudinary/helper/feetch", () => ({
  uploadCloudinary: vi.fn(),
  multipleUploadCloudinary: vi.fn(() => urls),
}));

// -------------------------------------------------------------------
//                          HELPERS
// -------------------------------------------------------------------

const deleteCollection = async () => {
  const ref = collection(db, `${state.user.uid}/journal/notes`);
  const docs = await getDocs(ref);
  docs.forEach((doc) => deleteDoc(doc.ref));
};

const lastNote = async () => {
  const ref = collection(db, `${state.user.uid}/journal/notes`);
  const docs = await getDocs(ref);
  return docs.docs[docs.docs.length - 1];
};

const createNewNote = async () => {
  const thunk = startNewNote();
  await thunk(dispatch, getState);
};

// -------------------------------------------------------------------
//                             TESTS
// -------------------------------------------------------------------

describe("Journal thunks", () => {
  afterAll(async () => {
    await deleteCollection();
  });

  beforeAll(async () => {
    await deleteCollection();
  });

  test("debe de llamar a startNewNote", async () => {
    await createNewNote();

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setSaving",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/addNewEmptyNote",
      payload: newNote,
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setActiveNote",
      payload: newNote,
    });
  });

  test("debe de llamar a saveNewNote", async () => {
    const thunk = saveNote();
    const last = await lastNote();

    state.journal.active = { ...(last.data() as Note), id: last.id };

    expect(state.journal.active).toEqual(newNote);
    await thunk(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setSaving",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setActiveNote",
      payload: newNote,
    });
  });

  test("debe de llamar a loadNotes", async () => {
    const thunk = loadNotes();
    await thunk(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setNotes",
      payload: [newNote],
    });
  });

  test("debe de llamar a uploadImages", async () => {
    const thunk = uploadImages([]);
    await thunk(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setSaving",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setActiveNote",
      payload: { ...newNote, imageUrls: urls },
    });
  });

  test("debe de llamar a deleteNote", async () => {
    await createNewNote();

    const thunk = deleteNoteByIdOnFS();

    const last = await lastNote();
    state.journal.active = { ...(last.data() as Note), id: last.id };
    expect(state.journal.active).toEqual(newNote);

    await thunk(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setSaving",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/deleteNoteById",
      payload: newNote.id,
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "journal/setActiveNote",
      payload: null,
    });
  });
});
