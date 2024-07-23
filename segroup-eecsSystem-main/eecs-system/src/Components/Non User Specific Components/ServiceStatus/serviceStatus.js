import React from "react";
import "./serviceStatus.css";
import checkImage from "./imgaes/check.png";
import warning from "./imgaes/warning.png";
import none from "./imgaes/remove.png";

import myServiceRegistry from "../../../Managers/serviceRegistry";

function ServiceStatus() {
  const data = myServiceRegistry.getAllServices();

  return (
    <div id="service-status-container">
      <div id="service_header">
        <h2 id="service_h1">Service Status</h2>
      </div>
      <br></br>
      <div id="modified">Last modified: 14th March, 2024 at 11:35am</div>

      <div id="services">
        <table id="main_table">
          {data.map((service, index) => (
            <div key={index}>
              {index % 2 === 0 ? (
                // even index
                <tr className="gray">
                  <td>
                    <table class="entry-container">
                      <tr class="entry1">{service.name}</tr>
                      <tr class="entry2">{service.details} </tr>
                    </table>
                  </td>
                  <td>
                    {/* final img */}
                    {service.status === "full" ? (
                      <img
                        src={checkImage}
                        alt="check"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : service.status === "partial" ? (
                      <img
                        src={warning}
                        alt="check"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      <img
                        src={none}
                        alt="check"
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                  </td>
                </tr>
              ) : (
                // odd index
                <tr>
                  <td>
                    <table class="entry-container">
                      <tr class="entry1">{service.name}</tr>
                      <tr class="entry2">{service.details} </tr>
                    </table>
                  </td>
                  <td>
                    {/* final img */}
                    {service.status === "full" ? (
                      <img
                        src={checkImage}
                        alt="check"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : service.status === "partial" ? (
                      <img
                        src={warning}
                        alt="check"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      <img
                        src={none}
                        alt="check"
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                  </td>
                </tr>
              )}
            </div>
          ))}
        </table>

        {/* end of table */}

        <div id="footer">
          <div id="good">
            <img
              src={checkImage}
              alt="check"
              style={{ width: "20px", height: "20px" }}
            />{" "}
            Good Service
          </div>
          <div id="partial">
            <img
              src={warning}
              alt="check"
              style={{ width: "20px", height: "20px" }}
            />{" "}
            Partial Service
          </div>
          <div id="none">
            <img
              src={none}
              alt="check"
              style={{ width: "20px", height: "20px" }}
            />{" "}
            No Service
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceStatus;
