import  { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Avatar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiMenuOpen } from "@mdi/js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { grey } from "@mui/material/colors";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// eslint-disable-next-line react/prop-types
const SideBar = ({ open, handleDrawerClose }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // State for managing sub-menu visibility
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item

  const handleHoverEnter = (event, item) => {
    setAnchorEl(event.currentTarget);
    setHoveredItem(item); // Set hovered item
  };

  const handleHoverLeave = () => {
    setAnchorEl(null);
    setHoveredItem(null); // Clear hovered item
  };

  const subMenuOpen = Boolean(anchorEl);

  // Define sub-menu items for each main item
  const subMenuItems = {
    Dashboard: [
      { text: "Local Dashboard", path: "/local-dashboard" },
      { text: "International Dashboard", path: "/international-dashboard" },
    ],
    "Manage Team": [
      { text: "Team Overview", path: "/team-overview" },
      { text: "Team Projects", path: "/team-projects" },
    ],
    "Contacts Information": [
      { text: "Contact List", path: "/contact-list" },
      { text: "New Contact", path: "/new-contact" },
    ],
    "Invoices Balances": [
      { text: "All Invoices", path: "/all-invoices" },
      { text: "Unpaid Invoices", path: "/unpaid-invoices" },
    ],
    "Profile Form": [
      { text: "Edit Profile", path: "/edit-profile" },
      { text: "Change Password", path: "/change-password" },
    ],
    "Calendar": [
      { text: "View Calendar", path: "/view-calendar" },
      { text: "Add Event", path: "/add-event" },
    ],
    "FAQ Page": [
      { text: "General FAQs", path: "/general-faqs" },
      { text: "Support FAQs", path: "/support-faqs" },
    ],
  };

  // Data for the main list items
  const Array1 = [
    { text: "Dashboard", icon: <HomeOutlinedIcon /> },
    { text: "Manage Team", icon: <PeopleOutlinedIcon /> },
    { text: "Contacts Information", icon: <ContactsOutlinedIcon /> },
    { text: "Invoices Balances", icon: <ReceiptOutlinedIcon /> },
  ];

  const Array2 = [
    { text: "Profile Form", icon: <PersonOutlinedIcon /> },
    { text: "Calendar", icon: <CalendarTodayOutlinedIcon /> },
    { text: "FAQ Page", icon: <HelpOutlineOutlinedIcon /> },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <Icon path={mdiMenuOpen} size={1} />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Avatar
        sx={{
          mx: "auto",
          width: open ? 88 : 44,
          height: open ? 88 : 44,
          my: 1,
          border: "2px solid grey",
          transition: "0.25s",
        }}
        alt="Remy Sharp"
        src="src\\Assets\\MyPhoto.jpg"
      />
      <Typography align="center" sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}>
        Malek Jokhadar
      </Typography>
      <Typography align="center" sx={{ fontSize: open ? 15 : 0, transition: "0.25s", color: theme.palette.info.main }}>
        Admin
      </Typography>

      <Divider />

      <List>
        {Array1.map((item) => (
          <ListItem
            key={item.path}
            disablePadding
            sx={{ display: "block" }}
            onMouseEnter={(e) => handleHoverEnter(e, item.text)}
            onMouseLeave={handleHoverLeave}
          >
            <Tooltip title={open ? null : item.text} placement="left">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
                    location.pathname === item.path
                      ? theme.palette.mode === "dark"
                        ? grey[800]
                        : grey[300]
                      : null,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>

            {/* Sub-menu for hovered items */}
            {hoveredItem === item.text && subMenuOpen && subMenuItems[item.text] && (
              <Menu
                anchorEl={anchorEl}
                open={subMenuOpen}
                onClose={handleHoverLeave}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                MenuListProps={{
                  onMouseLeave: handleHoverLeave, // Close when mouse leaves sub-menu
                }}
              >
                {subMenuItems[item.text].map((subItem) => (
                  <MenuItem
                    key={subItem.text}
                    onClick={() => {
                      navigate(subItem.path);
                      handleHoverLeave();
                    }}
                  >
                    {subItem.text}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {Array2.map((item) => (
          <ListItem
            key={item.path}
            disablePadding
            sx={{ display: "block" }}
            onMouseEnter={(e) => handleHoverEnter(e, item.text)}
            onMouseLeave={handleHoverLeave}
          >
            <Tooltip title={open ? null : item.text} placement="left">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
                    location.pathname === item.path
                      ? theme.palette.mode === "dark"
                        ? grey[800]
                        : grey[300]
                      : null,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>

            {/* Sub-menu for hovered items */}
            {hoveredItem === item.text && subMenuOpen && subMenuItems[item.text] && (
              <Menu
                anchorEl={anchorEl}
                open={subMenuOpen}
                onClose={handleHoverLeave}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                MenuListProps={{
                  onMouseLeave: handleHoverLeave,
                }}
              >
                {subMenuItems[item.text].map((subItem) => (
                  <MenuItem
                    key={subItem.text}
                    onClick={() => {
                      navigate(subItem.path);
                      handleHoverLeave();
                    }}
                  >
                    {subItem.text}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </ListItem>
        ))}
      </List>

      <Divider />
    </Drawer>
  );
};

export default SideBar;
