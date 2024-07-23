import React, { useState } from "react";

import currentUserManager from "../../../Managers/CurrentUserManager";
import closedRegistry from "../../../Managers/closedTicketsRegistry";

import "./viewMyTickets.css";

function ClosedTickets() {
  function GetMyTickets() {
    const allTickets = closedRegistry.getAllTickets();
    let myTickets = [];
    for (let i = 0; i < allTickets.length; i++) {
      const { ticket } = allTickets[i];
      if (
        ticket &&
        ticket.user &&
        ticket.user.id === currentUserManager.getCurrent().id
      ) {
        myTickets.push(allTickets[i]);
      } else if (!ticket || !ticket.user) {
        console.log(`Ticket at index ${i} does not have a user property`);
      } else {
        console.log(`Ticket user ID: ${ticket.user.id}`);
      }
    }
    return myTickets;
  }

  const [title, setTitle] = useState("Select a Ticket");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [feedback, setFeedback] = useState("");
  const myTickets = GetMyTickets();
  const [selected, setSelected] = useState("")

  function UpdateContent(item) {
    setType(item.ticket.type);
    setTitle(item.ticket.title);
    setDetails(item.ticket.details);
    setFeedback(item.feedback);
    setSelected(" ")
  }

  return (
    <div>
      <div className="padding-grid-view-ticket">
        <div className="grid-container-view-ticket">
          <div className="grid-row-span-2">
            <div className="box-view-ticket">
              <a>Closed Ticket:</a>
              <br></br>
              {myTickets.map((item) => (
                <button
                  className="ticket-title-button-side-1"
                  onClick={() => UpdateContent(item)}
                >
                  {item.ticket.title} - {item.ticket.type}
                </button>
              ))}{" "}
            </div>
          </div>

          <div className="ticket-title grid-col-span-2 box-view-ticket">
            {title}
          </div>
          <div className="ticket-content grid-col-span-2 box-view-ticket">
            <div>
            {selected !== "" && (<h3>Type of ticket:</h3>)}
              <div className="ticket-type">{type}</div>
              <br></br>
              {selected !== "" && (<h3>Details:</h3>)}
              <div className="ticket-details">{details}</div>
              {selected !== "" && (<h3>Feedback from Admin:</h3>)}
              
              <div className="ticket-details">{feedback}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClosedTickets;
