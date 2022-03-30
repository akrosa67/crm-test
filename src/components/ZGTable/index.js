import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ZGTableAction } from "..";

export const ZGTable = (props) => {
  const { rows, columns, tableTitle, ...rest } = props;
  return (
    <div
      style={{ height: 400, width: "100%" }}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        p: 3,
      }}
    >
      <React.Fragment>
        <DataGrid
          rows={rows}
          columns={columns}
          disableExtendRowFullWidth={false}
          {...rest}
          components={{
            Footer: ZGTableAction,
          }}
        />
      </React.Fragment>
    </div>
  );
};
