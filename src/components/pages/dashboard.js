import React, { useState, useContext, memo } from "react";
import clsx from "clsx";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
  CssBaseline,
  Toolbar,
  List,
  Box,
  InputBase,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { ReactComponent as AstechLogo } from "../../assets/img/logowhite.svg";
import { ReactComponent as ManagerIcon } from "../../assets/img/icons_menu/manager_white.svg";
import { ReactComponent as HistoryIcon } from "../../assets/img/icons_menu/icon_orders_white.svg";
import CustomizedAccordions from "../menu/according-panel";
import { NavLink, Route, Switch } from "react-router-dom";

// impot icons
import { ReactComponent as HomeIcon } from "../../assets/img/icons_menu/home_white.svg";
import { ReactComponent as NotiIcon } from "../../assets/img/icons_menu/notifications_white.svg";
import { ReactComponent as SettingIcon } from "../../assets/img/icons_menu/icon_settings.svg";
import { ReactComponent as ChatUnreadIcon } from "../../assets/img/icons_menu/chat_white.svg";

// import context
import authContext from "../../context/auth/authContext";

//import components
import { Devices } from "./content/devices";
import Users from "./content/users/users";
import UserProfile from "./content/profile/user-profile";
import withRouteService from "../../routes/routeService";

const newTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
      },
      label: {
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
  },
});

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#11537f",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: 50,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#266CB2",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  search: {
    position: "relative",
    borderRadius: "15px",
    backgroundColor: "white",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "35%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: 300,
  },
}));

function PersistentDrawerLeft({ match }) {
  const classes = useStyles();  
  const [open, setOpen] = useState(false);  
  const { user } = useContext(authContext);

  const handleDrawerOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={newTheme}>
      {user === null ? (
        <div>Hola</div>
      ) : (
        <div className={"dashboard"}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton)}
              >
                <MenuIcon />
              </IconButton>
              <AstechLogo width={100} height={60} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search by VIN, RO #, Date and Device"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
              <Box display="flex" alignItems="center">
                <HomeIcon height={25} width={25} style={{ margin: "0" }} />
                <NotiIcon height={25} width={25} style={{ margin: "0 10px" }} />
                <SettingIcon
                  height={25}
                  width={25}
                  style={{ marging: "0 10px" }}
                />
                <div style={{ fontSize: 14, padding: "0 10px" }}>
                  {user != null
                    ? `${user.first_name} ${user.last_name}`
                    : "doe"}
                </div>

                {user != null ? (
                  <NavLink
                    style={{
                      marginRight: 5,
                      borderRight: "2px solid white",
                      paddingRight: 10,
                    }}
                    to={`${match.url}/user-profile`}
                  >
                    <Avatar src={`${user.picture}`} />
                  </NavLink>
                ) : null}
                <ChatUnreadIcon height={25} width={25} />
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            className={`${classes.drawer} drawer`}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <List className="simple-list-menu">
              {(user.isAdmin ||
                user.roles.some((role) => role.name === "In-Shop")) && (
                <ListItem
                  button
                  className="list-item"
                  component={NavLink}
                  to={`${match.url}/user-management`}
                >
                  <ListItemIcon className="container-icon">
                    <ManagerIcon className="size-icon" />
                  </ListItemIcon>
                  <ListItemText>User Management</ListItemText>
                </ListItem>
              )}
              <ListItem button className="list-item">
                <ListItemIcon className="container-icon">
                  <HistoryIcon className="size-icon" />
                </ListItemIcon>
                <ListItemText>History</ListItemText>
              </ListItem>
            </List>
            <CustomizedAccordions organizations={user.organizations} />
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route exact path={`${match.path}`} component={Devices} />
              <Route
                exact
                path={`${match.path}/user-management`}
                component={Users}
              />
              <Route
                exact
                path={`${match.path}/user-profile`}
                component={UserProfile}
              />
            </Switch>
          </main>
        </div>
      )}
    </ThemeProvider>
  );
}

export default withRouteService(memo(PersistentDrawerLeft))
