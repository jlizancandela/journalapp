import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../auth/layout/layout";
import { JournalLayout } from "../Journal/layout/layout";
import { LoginPage } from "../auth/pages/login";
import { RegisterPage } from "../auth/pages/register";
import { HomePage } from "../Journal/Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <JournalLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <Navigate to="/auth/login" />,
      },
    ],
  },
]);
