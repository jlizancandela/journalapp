export type Note = {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageUrls: string[];
};

export type JournalState = {
  isSaving: boolean; // saving state
  messageSaved: string; // message saved
  notes: Note[]; // array of notes
  active: Note | null; // active note
};

export type NotePayload = {
  id: string;
  title: string;
  body: string;
  date: number;
  imageUrls?: string[];
};

export interface timeProps extends Intl.DateTimeFormatOptions {
  weekday: "long" | "short" | "narrow";
  year: "numeric" | "2-digit";
  month: "long" | "short" | "narrow" | "numeric" | "2-digit";
  day: "numeric" | "2-digit";
}
