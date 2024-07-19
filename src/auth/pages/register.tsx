import { Link, Button, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { registerUserThunk, useAppDispatch } from "../../store";
import { useInput } from "../hooks";
import * as Register from "../components/register";
import { initialValues } from "../validations";

export const RegisterPage = () => {
  const fieldsetStyles = {
    border: "none",
  };

  const dispach = useAppDispatch();

  const { values, onChange, reset, formError } = useInput(initialValues);

  const handleRegister = (e: React.FormEvent) => {
    if (formError) return;
    e.preventDefault();
    dispach(
      registerUserThunk({
        name: values.name.value,
        email: values.email.value,
        password: values.password.value,
      })
    );
    reset();
  };

  return (
    <form onSubmit={handleRegister}>
      <fieldset style={fieldsetStyles}>
        <legend>
          <Typography variant="h5">Crear una cuenta</Typography>
        </legend>
        <Grid container spacing={2} pb={2} pt={2}>
          <Register.RegisterName values={values} onChange={onChange} />
          <Register.RegisterEmail values={values} onChange={onChange} />
          <Register.RegisterPassword values={values} onChange={onChange} />
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={formError}
            >
              Register
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "end", gap: 1 }}
          >
            <Typography variant="subtitle2">Ya tienes una cuenta? </Typography>
            <Link to="/auth/login" component={RouterLink}>
              Ingresar
            </Link>
          </Grid>
        </Grid>{" "}
      </fieldset>
    </form>
  );
};
