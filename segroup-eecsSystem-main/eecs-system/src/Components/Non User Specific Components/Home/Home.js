import React from "react";
import "./home.css";

import currentUserManager from "../../../Managers/CurrentUserManager";
import myServiceRegistry from "../../../Managers/serviceRegistry";
import ecRegistry from "../../../Managers/ECRegistry";
import ticketRegistry from "../../../Managers/TicketRegistry";

function DisplayHomePageInformation() {
  const currentUserType = currentUserManager.getCurrent().userType;
  const data = myServiceRegistry.getAllServices();
  const numberOfECs = ecRegistry.getLength(); // calculate the number of ECs
  const numberOfTickets = ticketRegistry.getLength(); //calculate number of tickets

  if (currentUserType === "student") {
    return (
      <div>
        <div className="padding-grid-home">
          <div className="grid-container-home home-box ">
            <div>
              <div className="homep">
                <h2 className="home-heading">EC</h2>
                <p>
                  {/* If your concern directly impacts your ability to meet academic
                  deadlines  */}
                  <br></br>
                  <li>Personal or Medical Emergencies</li>
                  <li>Family Crises</li>
                  <li>Other Significant Life Events</li>
                  <br></br>
                  If you're facing any of these circumstances, you can submit an
                  EC request. Provide relevant documentation and details to
                  support your request. EC requests are reviewed by academic
                  administration, who assess easch case and may grant
                  accommodations accordingly.
                </p>
              </div>
            </div>
            <div>
              <div className="homep">
                <h2 className="home-heading">Ticket</h2>
                <p>
                  <br></br>
                  <li>Course Material Access Issues</li>
                  <li>Assignment Submission Problems</li>
                  <li>Technical Service or Facility Issues</li>
                  <br></br>
                  If you're facing any of these circumstances, you can submit a
                  Ticket. Provide detailed information about the issue
                  encountered. Support staff will review your ticket and work to
                  resolve the problem promptly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (currentUserType === "admin") {
    return (
      <div>
        <div className="padding-grid-home">
          <div className="grid-container-home-technician home-box">
            <div className="scrollable-grid">
              <div className="homep">
                <h2 className="home-heading">Manage ECs and Tickets</h2>
                <p className="home-heading-three">Current Number of ECs:</p>
                <div className="current-number">{numberOfECs}</div>
                <p className="home-heading-three">Current Number of Tickets:</p>
                <div className="current-number">{numberOfTickets}</div>

                <div className="admin-home-text">
                  <p className="home-heading-three">
                    Manage Extenuating Circumstances (ECs)
                  </p>
                  Admins oversee the process for handling personal or medical
                  emergencies, family crises, and other significant life events.
                  Students can submit EC requests here, providing necessary
                  documentation for review by our academic administration team.
                  Accommodations may be granted based on individual
                  circumstances.
                </div>
                <div className="admin-home-text">
                  <p className="home-heading-three">Manage Tickets</p>
                  Admins handle issues related to course material access,
                  assignment submissions, and technical problems. Students can
                  submit detailed tickets for prompt review and resolution.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (currentUserType === "technician") {
    return (
      <div>
        <div className="padding-grid-home">
          <div className="grid-container-home-technician home-box">
            <div>
              <div className="homep">
                <h2 className="home-heading">Update FAQs and Services</h2>
                <p>
                  <br></br>
                  <p className="home-heading-three">Current Services:</p>{" "}
                  <br></br>
                  <div id="">
                    {data.map((service, index) => (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          // even index

                          <div class="entry-container">
                            <li class="entry1">{service.name}</li>
                          </div>
                        ) : (
                          // odd index

                          <div class="entry-container">
                            <li class="entry1">{service.name}</li>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <br></br>
                  <u>Add</u> new FAQs to address common questions. <u>Update</u>{" "}
                  existing FAQs to ensure accuracy and relevance. <u>Remove</u>{" "}
                  outdated or irrelevant FAQs to maintain a concise repository.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <a>no match</a>;
  }
}

function Home() {
  return (
    <div>
      <h2 className="welcome-heading">{`Hello, ${
        currentUserManager.getCurrent().name
      }! 👋`}</h2>
      {DisplayHomePageInformation()}
    </div>
  );
}

export default Home;
