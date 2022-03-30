import { Box } from "@mui/material";
import { ZGButton } from "..";

export const ZGTableAction = (props) => {
  const { deleteRowHandler, addRowHandler, selectedRow, editRowHandler } =
    props;
    
  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
      }}
    >
      <ZGButton
        disabled={!selectedRow._id}
        variant="contained"
        color="secondary"
        onClick={deleteRowHandler}
      >
        Delete Row
      </ZGButton>
      <ZGButton
        disabled={!selectedRow._id}
        variant="contained"
        color="secondary"
        onClick={editRowHandler}
      >
        Edit Row
      </ZGButton>
      <ZGButton variant="contained" color="secondary" onClick={addRowHandler}>
        Add Row
      </ZGButton>
    </Box>
  );
};
