import React, { useEffect, useState } from "react";
import { ZGCustomSnackbar, ZGNavBar } from "../../components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import routes from "../../constants/routes";
import { useSelector } from "react-redux";

export const Home = () => {
  const { menu } = useSelector((store) => store);
  const [menuHeaderList, setMenuHeaderList] = useState([]);
  const [navMenus, setNavMenus] = useState([]);
  const {
    home,
    master,
    dataManagement,
    postProduction,
    leads,
    events,
    quotations,
    settings,
    report,
  } = routes;

  const { menus } = menu;

  const menuList = [
    {
      title: "dashboard",
      icon: <DashboardIcon />,
      route: `${home}`,
    },
    {
      title: "master",
      icon: <ClearAllIcon />,
      route: `${home + master}`,
    },
    {
      title: "data management",
      icon: <DataSaverOffIcon />,
      route: `${home + dataManagement}`,
    },
    {
      title: "post production",
      icon: <PrecisionManufacturingIcon />,
      route: `${home + postProduction}`,
    },
    {
      title: "leads",
      icon: <PeopleIcon />,
      route: `${home + leads}`,
    },
    {
      title: "events",
      icon: <EventAvailableIcon />,
      route: `${home + events}`,
    },
    {
      title: "quotations",
      icon: <DescriptionIcon />,
      route: `${home + quotations}`,
    },
    {
      title: "settings",
      icon: <SettingsIcon />,
      route: `${home + settings}`,
    },
    {
      title: "report",
      icon: <AssessmentIcon />,
      route: `${home + report}`,
    },
  ];

  useEffect(() => {
    if (menus) {
      if (menus.success) {
        setMenuHeaderList(menus.data);
      }
    }
    if (menuHeaderList) {
      let men = menuHeaderList.find((e) => e._id === "menuHeader");

      if (men) {
        setNavMenus(
          men.menu.map((e) => {
            let { menu } = menuHeaderList.find(
              (e) => e._id === "menuSubHeader"
            );
            let itemsub = menu.filter(
              (r) => r.menukey.split("/")[1] === e.menuName
            );
            let item = menuList.find((r) => r.title === e.menuName);
            if (item.title === e.menuName) {
              var menuist = {
                ...item,
                ...e,
                subMenu: itemsub,
              };

              return menuist;
            }
          })
        );
      }
    }
  }, [menus, menuHeaderList]);
  return (
    <div>
      <ZGCustomSnackbar timeout={3000} />
      <ZGNavBar navMenus={navMenus} />
    </div>
  );
};
