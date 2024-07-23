import { Link } from "react-router-dom";
import React from "react";
import "../../../reset.css";
import "./nav.css";

import currentUserManager from "../../../Managers/CurrentUserManager"

function TopNavbar() {
  return (
    <header id="header">
      <div id="topnav">
        <a className="move-left">EECSHelp</a>
        <Link
          to={`/${currentUserManager.getCurrent().userType}/home`}
          className="topNavItem"
        >
          <a>Home </a>
        </Link>
        <Link to="service-status" className="topNavItem">
          <a>Services </a>
        </Link>
        <Link to="faq-page" className="topNavItem">
          FAQs
        </Link>
        <Link to="/" className="topNavItem">
          Log Out
        </Link>
      </div>
    </header>
  );
}

export default TopNavbar;
