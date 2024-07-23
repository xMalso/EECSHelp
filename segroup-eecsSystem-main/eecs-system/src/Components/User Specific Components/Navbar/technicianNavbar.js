import React from "react";
import "../../../reset.css";
import "./nav.css";
import { Link, Outlet } from "react-router-dom";

// ive called this student navbar because im not sure if admins and technicians will have the same
// links when they click the nav bar options.

function TechnicianNavbar() {
  return (
    <div>
      <div id="left">
        <nav>
          <ul>
            <li>
              <Link to="update-faq">
                <button>Update FAQs</button>{" "}
              </Link>
            </li>
            <li>
              <Link to="update-services">
                <button>Update Services</button>
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

export default TechnicianNavbar;
