import { Button, Grid, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Delete, UploadFile } from "@mui/icons-material";
import { useRef } from "react";
import {
  deleteNoteByIdOnFS,
  uploadImages,
  useAppDispatch,
} from "../../../store";

type Props = {
  formattedDate: string;
};

export const NoteHeadComponent: React.FC<Props> = ({ formattedDate }) => {
  const ref = useRef<HTMLInputElement>(null);
  const onClickUpload = () => ref.current?.click();
  const dispatch = useAppDispatch();

  const onChange = () => {
    console.log(ref.current?.files);

    if (ref.current?.files) {
      dispatch(uploadImages(Array.from(ref.current.files)));
    }
  };

  const onDelete = () => {
    dispatch(deleteNoteByIdOnFS());
  };

  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      pb={2}
    >
      <Grid item>
        <Typography variant="h4">{formattedDate}</Typography>
      </Grid>
      <Grid item sx={{ gap: 1, display: "flex" }}>
        <Button sx={{ gap: 1, p: 2 }} onClick={onDelete}>
          <Delete />
        </Button>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          ref={ref}
          onChange={onChange}
        />
        <Button sx={{ gap: 1, p: 2 }} onClick={onClickUpload}>
          <UploadFile />
        </Button>
        <Button sx={{ gap: 1, p: 2 }} type="submit">
          <SaveIcon />
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
};
