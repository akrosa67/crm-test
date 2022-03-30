import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  capitalize,
  Collapse,
  ListItemButton,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet, useNavigate } from "react-router";
import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
import navStyle from "./style";
import { makeStyles } from "@mui/styles";
import { ZGButton } from "..";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../store/auth/ActionCreators";
import routes from "../../constants/routes";
import { useEffect } from "react";
import { doGetMenuHeader } from "../../store/menus/ActionCreator";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { doGetRoles } from "../../store/role/ActionCreator";
import { useState } from "react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const { login } = routes;
export const ZGNavBar = ({ navMenus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, menu } = useSelector((store) => store);
  const dispatch = useDispatch();
  const theme = useTheme();
  const useStyles = makeStyles(navStyle);
  const classes = useStyles();

  const { userInfo } = auth;
  const { menus } = menu;
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [nMenu, setNMenu] = useState([]);
  const actions = {
    getMenu: () => dispatch(doGetMenuHeader()),
    logOut: (userinfo) => dispatch(doLogout(userinfo)),
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    actions.getMenu();
    dispatch(doGetRoles());
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const signoutHandler = () => {
    actions.logOut(userInfo);
  };
  const newMenu = () => {
    // setNMenu(navMenus.filter((o, i) => index !== i));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: "#343A40", boxShadow: "none" }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar sx={{ mr: 2 }}>
              <img height={60} src="./logo.png" alt="logo" />
            </Avatar>
            <Typography variant="h6" noWrap component="div">
              Zero Gravity
            </Typography>
          </Box>
          {userInfo ? (
            <ZGButton
              onClick={signoutHandler}
              variant="text"
              sx={{ color: "#fff" }}
            >
              Sign Out
            </ZGButton>
          ) : (
            <ZGButton
              onClick={() => navigate("/login")}
              variant="text"
              sx={{ color: "#fff" }}
            >
              Sign In
            </ZGButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {navMenus.map((e) => {
          const handleClick = (route, routeName, selectedMenu) => {
            setSelectedMenu(selectedMenu.toLowerCase());
            e.subMenu.length === 0
              ? navigate(route, { state: { name: routeName } })
              : setOpenSubMenu(!openSubMenu);
          };
          let name = e.menuName.charAt(0).toUpperCase() + e.menuName.slice(1);

          return (
            <Box
              component="div"
              key={e.title}
              className={location.pathname === e.route && classes.activeMenu}
            >
              <List sx={{ py: 0.7 }}>
                <Box>
                  <ListItem
                    button
                    onClick={() => handleClick(e.route, e.title, name)}
                  >
                    <ListItemIcon
                      style={{
                        color: location.pathname === e.route && "#fff",
                      }}
                    >
                      {e.icon}
                    </ListItemIcon>
                    <ListItemText primary={name} />

                    {e.subMenu.length !== 0 ? (
                      openSubMenu && e.menuName === selectedMenu ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItem>
                </Box>
              </List>

              {e.subMenu.map((r) => {
                const handleClickSubMenu = (name) => {
                  navigate(name, { state: { name: name } });
                };
                let subName =
                  r.menuName.charAt(0).toUpperCase() + r.menuName.slice(1);
                return (
                  <Collapse
                    in={e.menuName === selectedMenu && openSubMenu}
                    timeout="auto"
                    unmountOnExit
                    key={r.menuName}
                  >
                    <List component="div" disablePadding>
                      <Box
                        sx={{ ml: 5 }}
                        className={
                          location.pathname.split("/")[1] === r.menuName &&
                          classes.activeSubMenu
                        }
                      >
                        <ListItem
                          button
                          onClick={() => handleClickSubMenu(r.menuName)}
                        >
                          <ListItemText primary={subName} />
                        </ListItem>
                      </Box>
                    </List>
                  </Collapse>
                );
              })}
            </Box>
          );
        })}

        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};
