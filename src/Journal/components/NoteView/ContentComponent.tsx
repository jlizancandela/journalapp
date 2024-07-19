import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

type contentProps = {
  values: {
    value: string;
    error: string;
  };
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const ContentComponent: React.FC<contentProps> = ({
  onChange,
  values: { value, error },
}) => {
  return (
    <TextField
      variant="filled"
      placeholder="Que tal tu dia?"
      name="content"
      label="Content"
      fullWidth
      multiline
      rows={5}
      onChange={onChange}
      value={value}
      helperText={error ? error : " "}
      color={error ? "error" : "primary"}
      error={error ? true : false}
    />
  );
};
