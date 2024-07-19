import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Note, setActiveNote, useAppDispatch } from "../../../../store";

export const SideBarTask = ({ title, date, body, id }: Note) => {
  const dispatch = useAppDispatch();

  const shortTitle = title.length > 10 ? title.substring(0, 10) + "..." : title;

  const shortBody = body.length > 15 ? body.substring(0, 15) + "..." : body;

  const onClick = () => {
    dispatch(setActiveNote({ id, date, body, title }));
  };

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <BookmarkBorderIcon />
        </ListItemIcon>
        <Grid container direction={"column"}>
          <ListItemText primary={shortTitle} sx={{ fontWeight: "bold" }} />
          <ListItemText secondary={shortBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
