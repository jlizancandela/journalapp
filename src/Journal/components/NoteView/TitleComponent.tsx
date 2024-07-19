import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

type titleProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  values: { value: string; error: string };
};

export const TitleComponent: React.FC<titleProps> = ({
  onChange,
  values: { value, error },
}) => {
  return (
    <TextField
      variant="filled"
      placeholder="Title"
      name="title"
      label="Title"
      fullWidth
      onChange={onChange}
      value={value}
      helperText={error ? error : " "}
      color={error ? "error" : "primary"}
      error={error ? true : false}
    />
  );
};
