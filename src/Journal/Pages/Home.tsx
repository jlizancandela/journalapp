import { useAppSelector } from "../../store";
import { NoteView } from "../views/Noteview";
import { NothingView } from "../views/Nothing";

export const HomePage = () => {
  const { active } = useAppSelector((state) => state.journal);

  return active ? <NoteView /> : <NothingView />;
};
