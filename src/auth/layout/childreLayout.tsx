import { Container } from "@mui/material";

export const ChildreLayout = ({ children }: { children: React.ReactNode }) => {
  const containerStyles = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: "10px",
  };

  const subContainerStyles = {
    backgroundColor: "white",
    pt: 2,
    pb: 2,
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    border: "1px solid #ccc",
  };

  return (
    <>
      <Container sx={containerStyles} maxWidth="md">
        <Container maxWidth="sm" sx={subContainerStyles}>
          {children}
        </Container>
      </Container>
    </>
  );
};
