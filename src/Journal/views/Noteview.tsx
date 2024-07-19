import { Grid } from "@mui/material";
import { ImageGalery } from "../components/NoteView/ImageGalery";
import { Form } from "react-router-dom";
import { useNoteView } from "../hooks/useNoteView";
import { saveNote, useAppDispatch } from "../../store";
import { NoteHeadComponent } from "../components/NoteView/NoteHeadComponent";
import { ContentComponent, TitleComponent } from "../components";

export const NoteView = () => {
  const { values, formattedDate, onChange } = useNoteView();

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveNote());
  };

  return (
    <Form onSubmit={onSubmit}>
      <Grid container>
        <NoteHeadComponent formattedDate={formattedDate} />
        <Grid container gap={2}>
          <TitleComponent onChange={onChange} values={values.title} />
          <ContentComponent onChange={onChange} values={values.content} />
        </Grid>
        <Grid container width={"100%"} mt={2} mb={4}>
          <ImageGalery />
        </Grid>
      </Grid>
    </Form>
  );
};
