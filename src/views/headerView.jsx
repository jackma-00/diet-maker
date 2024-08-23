import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function HeaderView({
  pages,
  settings,
  user,
  groceryListSize,
  anchorElNav,
  anchorElUser,
  handleOpenNavMenu,
  handleOpenUserMenu,
  handleCloseNavMenu,
  handleCloseUserMenu,
  Logo,
}) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            className="logo"
            src={Logo}
            alt="Logo"
            style={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: "4em",
            }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/overview"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            style={{ marginLeft: "10px" }}
          >
            Diet Maker
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    to={`/${page}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/overview"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Diet Maker
          </Typography>

          <Box sx={{ flexGrow: 0 }} style={{ position: "absolute", right: 0 }}>
            <IconButton size="small" title="Show Grocery List" color="inherit">
              <Badge badgeContent={groceryListSize} color="error">
                <Link
                  to={"/groceries"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>Grocery List</p>
                  <ShoppingCartIcon
                    fontSize="large"
                    style={{
                      alignSelf: "center",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  />
                </Link>
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="displayName" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{user.displayName}</Typography>
              </MenuItem>
              <MenuItem key="email" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{user.email}</Typography>
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export { HeaderView };
