import { Grid, TextField } from "@mui/material";
import { FormComponentProps } from "./registerTypes";

export const RegisterName: React.FC<FormComponentProps> = ({
  values,
  onChange,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        placeholder="Name"
        variant="outlined"
        name="name"
        label="Name"
        fullWidth
        onChange={onChange}
        value={values.name.value}
        helperText={values.name.error ? values.name.error : " "}
        color={values.name.error ? "error" : "primary"}
        error={values.name.error ? true : false}
      />
    </Grid>
  );
};
