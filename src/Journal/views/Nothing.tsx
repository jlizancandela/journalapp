import { StarBorder } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const NothingView = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "primary.main",
        p: 3,
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StarBorder sx={{ fontSize: "100px", color: "white" }} />
      <Typography variant="h5" color={"white"}>
        Agrega o selecciona una nota
      </Typography>
    </Box>
  );
};
