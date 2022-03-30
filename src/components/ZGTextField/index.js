import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";

export const ZGTextField = (props) => {
  const { variant } = props;

  return (
    <FormControl variant={variant} fullWidth sx={{ my: 1 }}>
      <TextField {...props} />
    </FormControl>
  );
};
