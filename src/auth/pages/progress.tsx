import { Grid, LinearProgress, Typography } from "@mui/material";

export const Progress = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: "20px",
      }}
    >
      <Typography variant="h5">Cargando...</Typography>
      <LinearProgress sx={{ height: "10px", width: "60%" }} />
    </Grid>
  );
};
