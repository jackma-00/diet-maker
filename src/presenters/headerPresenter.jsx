import * as React from "react";
import { signOutUser } from "../persistence/firebasePersistence";
import Logo from "../../dist/favicon.ico";
import { HeaderView } from "../views/headerView";
import { useState } from "react";

const pages = ["overview", "daily", "meals", "search", "stats", "groceries"];
const settings = ["Logout"];

function HeaderPresenter({ user, groceryListSize }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Logout") {
      signOutUser();
    }
    setAnchorElUser(null);
  };

  return (
    <HeaderView
      pages={pages}
      settings={settings}
      user={user}
      groceryListSize={groceryListSize}
      anchorElNav={anchorElNav}
      anchorElUser={anchorElUser}
      handleOpenNavMenu={handleOpenNavMenu}
      handleOpenUserMenu={handleOpenUserMenu}
      handleCloseNavMenu={handleCloseNavMenu}
      handleCloseUserMenu={handleCloseUserMenu}
      Logo={Logo}
    />
  );
}

export { HeaderPresenter };
