import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "./types";

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

const journalReducer = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
      state.isSaving = false;
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setSaving: (state) => {
      state.isSaving = true;
    },

    updateNote: (state, action) => {
      state.isSaving = false;
      state.active!.title = action.payload.title;
      state.active!.body = action.payload.body;
    },
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export default journalReducer.reducer;
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalReducer.actions;
