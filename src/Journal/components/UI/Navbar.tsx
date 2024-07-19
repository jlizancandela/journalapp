import { Logout } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { logoutUserThunk, useAppDispatch, UserState } from "../../../store";

export const Navbar = ({ drawerWidth }: { drawerWidth: number }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { name, photoUrl } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const handleLogout = () => {
    dispatch(logoutUserThunk());

    navigate("/auth/", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Typography variant="h6" noWrap component="div">
          JournalApp
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!photoUrl ? (
            <AccountCircleRoundedIcon />
          ) : (
            <img
              src={photoUrl}
              alt={name}
              style={{ width: "30px", borderRadius: "50%" }}
            />
          )}
          <Button variant="contained" onClick={handleLogout}>
            <Logout sx={{ color: "white" }} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
