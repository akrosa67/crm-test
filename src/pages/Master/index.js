import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import {
  ZGDepartment,
  ZGTabPanel,
  ZGBranch,
  ZGCompany,
  ZGDesignation,
} from "../../components";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MasterPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Branch",
      component: <ZGBranch />,
    },
    {
      label: "Company",
      component: <ZGCompany />,
    },
    {
      label: "Department",
      component: <ZGDepartment />,
    },
    {
      label: "Designation",
      component: <ZGDesignation />,
    },
  ];
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Master Table
      </Typography>
      <Card sx={{ px: 2, py: 3, my: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>
          {tabs.map((tab, index) => (
            <ZGTabPanel key={index} value={value} index={index}>
              {tab.component}
            </ZGTabPanel>
          ))}
        </Box>
      </Card>
    </div>
  );
};
