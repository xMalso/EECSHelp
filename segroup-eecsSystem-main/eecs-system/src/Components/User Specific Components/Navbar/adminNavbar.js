import React from "react";
import "../../../reset.css";
import "./nav.css";
import { Link, Outlet } from "react-router-dom";

function AdminNavbar() {
  return (
    <div>
      <div id="left">
        <nav>
          <ul>
            <li>
              <Link to="manage-ECs">
                <button>Manage ECs</button>{" "}
              </Link>
            </li>
            <li>
              <Link to="manage-tickets">
                <button>Manage Tickets</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div id="center">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminNavbar;
