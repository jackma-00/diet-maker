import { observer } from "mobx-react-lite";
import {
  Box,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EqualizerSharpIcon from "@mui/icons-material/EqualizerSharp";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TodayIcon from "@mui/icons-material/Today";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { signOutUser } from "../persistence/firebasePersistence";

const Sidebar = observer(function SidebarRender() {
  const sidebarItems = [
    { text: "Overview", icon: HomeOutlinedIcon, path: "/overview" },
    { text: "Daily", icon: TodayIcon, path: "/daily" },
    { text: "Meals", icon: RestaurantMenuIcon, path: "/meal" },
    { text: "Search", icon: SearchIcon, path: "/search" },
    { text: "Stats", icon: EqualizerSharpIcon, path: "/stats" },
  ];
  const location = useLocation();
  let currentPath = location.pathname;
  if (currentPath.includes("/daily")) {
    //edge cases for daily view because we send the id as a parameter
    currentPath = "/daily";
  } else if (currentPath.includes("/meal")) {
    //edge cases for meal view because we send the id as a parameter
    currentPath = "/meal";
  } else if (currentPath.includes("/search")) {
    //edge cases
    currentPath = "/search";
  } else if (currentPath.includes("/stats")) {
    currentPath = "/stats";
  } else if (currentPath.includes("/")) {
    //edge cases
    currentPath = "/overview";
  }
  const currentItem = sidebarItems.find((item) => item.path === currentPath);
  const [currentPage, setCurrentPage] = useState(
    currentItem ? currentItem.text : ""
  );

  useEffect(() => {
    setCurrentPage(currentItem ? currentItem.text : "");
  }, [currentPath]);

  return (
    <Box className="styledSidebarBox">
      <Typography variant="h6" gutterBottom>
        Navigation
      </Typography>
      <List>
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={() => setCurrentPage(item.text)}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton
              className={
                currentPage === item.text
                  ? "listItemButton selected"
                  : "listItemButton"
              }
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
        <ListItemButton onClick={signOutUser}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItemButton>
      </List>
    </Box>
  );
});

export { Sidebar };
