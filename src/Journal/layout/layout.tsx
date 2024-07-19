import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { Navbar, SideBar, AddButton } from "../components";
import { UserState } from "../../store";

const drawerWidth = 240;

export const JournalLayout = () => {
  const { status } = useSelector((state: { user: UserState }) => state.user);

  if (status === "disconnected") {
    return <Navigate to="/auth/" />;
  }

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Navbar drawerWidth={drawerWidth} />
        <SideBar drawerWidth={drawerWidth} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          <Outlet />
          <AddButton />
        </Box>
      </Box>
    </>
  );
};
