import React from "react";
import "../../../reset.css";
import "./nav.css";
import { Link, Outlet } from "react-router-dom";

// ive called this student navbar because im not sure if admins and technicians will have the same
// links when they click the nav bar options.

function StudentNavbar() {
  return (
    <div>
      <div id="left">
        <nav>
          <ul>
            <li>
              <Link to="create-EC">
                <button>Create EC</button>{" "}
              </Link>
            </li>
            <li>
              <Link to="view-my-ECs">
                <button>View Pending ECs</button>
              </Link>
            </li>
            <li>
              <Link to="view-ec-outcome">
                <button>View Resolved ECs</button>
              </Link>
            </li>
            <li>
              <Link to="raise-ticket">
                <button>Raise a ticket</button>{" "}
              </Link>
            </li>
            <li>
              <Link to="view-my-tickets">
                <button>View Pending Tickets</button>
              </Link>
            </li>
            <li>
              <Link to="view-closed-tickets">
                <button>View Resolved Tickets</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default StudentNavbar;
