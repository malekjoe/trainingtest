import {
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import  { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import MuiAppBar from "@mui/material/AppBar";
import Icon from '@mdi/react';
import { mdiMenuClose  } from '@mdi/js';
import Button from "@mui/material/Button";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// eslint-disable-next-line react/prop-types
const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme();
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openProfile = Boolean(anchorElProfile);
  const openNotifications = Boolean(anchorElNotifications);
  const openSettings = Boolean(anchorElSettings);

  const handleProfileClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleSettingsClick = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(null);
    setAnchorElNotifications(null);
    setAnchorElSettings(null);
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange);
    };
  }, []);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <Icon path={mdiMenuClose} size={1} />
        </IconButton>

        <Box flexGrow={1} />
        <Tooltip title={isFullScreen ? "Exit full screen mode" : "Enter full screen mode"}>
          <IconButton color="inherit" onClick={handleFullScreen}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>

        <Stack direction={"row"}>
          {theme.palette.mode === "light" ? (
            <Tooltip title="Switch to Dark Mode">
              <IconButton
                onClick={() => {
                  localStorage.setItem("currentMode", "dark");
                  setMode("dark");
                }}
                color="inherit"
              >
                <LightModeOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Switch to Light Mode">
              <IconButton
                onClick={() => {
                  localStorage.setItem("currentMode", "light");
                  setMode("light");
                }}
                color="inherit"
              >
                <DarkModeOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Check notifications">
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <NotificationsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElNotifications}
            open={openNotifications}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'notifications-button',
            }}
          >
            <MenuItem onClick={handleClose}>Invoices</MenuItem>
            <MenuItem onClick={handleClose}>Latest notifications</MenuItem>
            <MenuItem onClick={handleClose}>View all notifications</MenuItem>
          </Menu>

          <Tooltip title="Edit settings">
            <IconButton color="inherit" onClick={handleSettingsClick}>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElSettings}
            open={openSettings}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'settings-button',
            }}
          >
            <MenuItem onClick={handleClose}>Language</MenuItem>
            <MenuItem onClick={handleClose}>Preferences</MenuItem>
            <MenuItem onClick={handleClose}>Manage settings</MenuItem>
          </Menu>

          <Button
            id="basic-button"
            aria-controls={openProfile ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfile ? "true" : undefined}
            onClick={handleProfileClick}
            sx={{ color: "inherit", width: "inherit" }}
          >
            <IconButton color="inherit">
              <Tooltip title="Your profile">
                <Person2OutlinedIcon />
              </Tooltip>
            </IconButton>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
