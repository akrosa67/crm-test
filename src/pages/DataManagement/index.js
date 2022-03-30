import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const DataManagementPage = () => {
 const master =  useSelector((store)=>store.master)
 console.log("master",master);
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        DataManagement Page Cards and Table
      </Typography>
    </div>
  );
};
