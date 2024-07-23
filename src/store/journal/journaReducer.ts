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
    setImageUrl: (state, action) => {
      if (!state.active) return;
      state.active.imageUrls = action.payload;
      state.isSaving = false;
    },

    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.isSaving = false;
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },
  },
});

export default journalReducer.reducer;
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  deleteNoteById,
  clearNotesLogout,
} = journalReducer.actions;
