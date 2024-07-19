import { Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { SideBarTask } from "./SideBarTask";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  JournalState,
  loadNotes,
  useAppDispatch,
  UserState,
} from "../../../../store";

export const SideBar = ({ drawerWidth }: { drawerWidth: number }) => {
  const { name } = useSelector((state: { user: UserState }) => state.user);

  const { notes } = useSelector(
    (state: { journal: JournalState }) => state.journal
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {name}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {notes.map(({ title, id, body, date }) => (
          <SideBarTask id={id} title={title} body={body} key={id} date={date} />
        ))}
      </List>
    </Drawer>
  );
};
