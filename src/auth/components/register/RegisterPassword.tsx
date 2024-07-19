import { Grid, TextField } from "@mui/material";
import { FormComponentProps } from "./registerTypes";

export const RegisterPassword: React.FC<FormComponentProps> = ({
  values,
  onChange,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        placeholder="Password"
        variant="outlined"
        name="password"
        label="Password"
        type="password"
        fullWidth
        onChange={onChange}
        value={values.password.value}
        helperText={values.password.error ? values.password.error : " "}
        color={values.password.error ? "error" : "primary"}
        error={values.password.error ? true : false}
      />
    </Grid>
  );
};
