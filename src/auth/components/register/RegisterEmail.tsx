import { Grid, TextField } from "@mui/material";
import { FormComponentProps } from "./registerTypes";

export const RegisterEmail: React.FC<FormComponentProps> = ({
  values,
  onChange,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        placeholder="Email"
        variant="outlined"
        name="email"
        label="Email"
        fullWidth
        onChange={onChange}
        value={values.email.value}
        helperText={values.email.error ? values.email.error : " "}
        color={values.email.error ? "error" : "primary"}
        error={values.email.error ? true : false}
      />
    </Grid>
  );
};
