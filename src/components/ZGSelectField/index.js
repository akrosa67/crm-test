import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const ZGSelectField = (props) => {
  const { values, label, variant } = props;

  return (
    <>
      <FormControl variant={variant} fullWidth sx={{ my: 1 }}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
        <Select
          labelId={`select-${label}-label`}
          id={`select-${label}-label`}
          label={label}
          {...props}
        >
          {values.map((e) => (
            <MenuItem key={e._id} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
