import { Button, Grid, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

type Props = {
  formattedDate: string;
};

export const NoteHeadComponent: React.FC<Props> = ({ formattedDate }) => {
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
      <Grid item>
        <Button sx={{ gap: 1, p: 2 }} type="submit">
          <SaveIcon />
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
};
