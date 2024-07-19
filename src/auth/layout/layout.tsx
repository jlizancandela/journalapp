import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UserState } from "../../store";

export const AuthLayout = () => {
  const { status } = useSelector((state: { user: UserState }) => state.user);

  if (status === "connected") {
    return <Navigate to="/" />;
  }

  const containerStyles = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: "10px",
  };

  const subContainerStyles = {
    backgroundColor: "white",
    pt: 2,
    pb: 2,
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    border: "1px solid #ccc",
  };

  return (
    <>
      <Container sx={containerStyles} maxWidth="md">
        <Container maxWidth="sm" sx={subContainerStyles}>
          <Outlet />
        </Container>
      </Container>
    </>
  );
};
