import { Google } from "@mui/icons-material";
import { Link, Button, Grid, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getGoogleThunk, loginUserThunk, useAppDispatch } from "../../store";
import { useInput } from "../hooks";

export const LoginPage = () => {
  const fieldsetStyles = {
    border: "none",
  };

  const dispach = useAppDispatch();

  const { values, onChange, reset } = useInput({
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  const handleLogin = () => {
    dispach(
      loginUserThunk({
        email: values.email.value,
        password: values.password.value,
      })
    );
    reset();
  };

  const handleGoogle = () => {
    dispach(getGoogleThunk());
  };

  return (
    <form>
      <fieldset style={fieldsetStyles}>
        <legend>
          <Typography variant="h5">Login</Typography>
        </legend>
        <Grid container spacing={2} pb={2} pt={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              placeholder="Email"
              variant="outlined"
              name="email"
              label="Email"
              fullWidth
              onChange={onChange}
              value={values.email.value}
              helperText={values.email.error ? values.email.error : ""}
              color={values.email.error ? "error" : "primary"}
              error={values.email.error ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              placeholder="Password"
              variant="outlined"
              name="password"
              label="Password"
              fullWidth
              onChange={onChange}
              value={values.password.value}
              helperText={values.password.error ? values.password.error : ""}
              color={values.password.error ? "error" : "primary"}
              error={values.password.error ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleLogin}
              variant="contained"
              fullWidth
              aria-label="loginButton"
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ gap: 1 }}
              onClick={handleGoogle}
              aria-label="google"
            >
              <Google />
              Google
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            <Link to="/auth/register" component={RouterLink}>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>{" "}
      </fieldset>
    </form>
  );
};
