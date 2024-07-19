import { AddCircle } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { startNewNote, useAppDispatch, useAppSelector } from "../../../store";

export const AddButton = () => {
  const dispach = useAppDispatch();

  const { isSaving } = useAppSelector((state) => state.journal);

  const handleClick = () => {
    dispach(startNewNote());
  };

  return (
    <Grid
      container
      position={"fixed"}
      bottom={50}
      right={50}
      display={"flex"}
      zIndex={1000}
      sx={{ width: "auto" }}
    >
      <Button onClick={handleClick} disabled={isSaving}>
        <AddCircle
          sx={{
            color: "primary.main",
            fontSize: "60px",
            backgroundColor: "whitesmoke",
            borderRadius: "50%",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.439)",
            cursor: "pointer",
          }}
        />
      </Button>
    </Grid>
  );
};
