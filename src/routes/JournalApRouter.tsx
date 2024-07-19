import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useObserver } from "../auth/helpers/observer";
import { Progress } from "../auth/pages/progress";

export const JournalApRouter = () => {
  const { status, checking } = useObserver();

  if (status === "checking" || checking) {
    return <Progress />;
  }

  return <RouterProvider router={router} />;
};
