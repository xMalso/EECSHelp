import React, { useState } from "react";
import "../../../reset.css";
import "./viewMyTickets.css";
import ticketRegistry from "../../../Managers/TicketRegistry";
import currentUserManager from "../../../Managers/CurrentUserManager";

function ViewMyTickets() {
  function GetMyTickets() {
    const allTickets = ticketRegistry.getAllTickets();
    let myTickets = [];
    for (let i = 0; i < allTickets.length; i++) {
      if (allTickets[i].user.id === currentUserManager.getCurrent().id) {
        myTickets.push(allTickets[i]);
      } else {
        console.log(allTickets[i].userID);
      }
    }
    return myTickets;
  }

  const [title, setTitle] = useState("Select a Ticket");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [selected, setSelected] = useState("");
  const myTickets = GetMyTickets();

  function UpdateContent(ticket) {
    setType(ticket.type);
    setTitle(ticket.title);
    setDetails(ticket.details);
    setSelected(ticket);
  }

  return (
    <div>
      <div className="padding-grid-view-ticket">
        <div className="grid-container-view-ticket">
          <div className="grid-row-span-2">
            <div className="box-view-ticket">
              <div className="scrollable-view-ticket">
                <a>List of Tickets:</a>
                <br></br>
                {myTickets.map((ticket) => (
                  <button
                    className="ticket-title-button-side-1"
                    onClick={() => UpdateContent(ticket)}
                  >
                    {ticket.title} - {ticket.type}
                  </button>
                ))}{" "}
              </div>
            </div>
          </div>
          <div className="ticket-title grid-col-span-2 box-view-ticket">
            {title}
          </div>
          <div className="ticket-content grid-col-span-2 box-view-ticket">
            <div>
            {selected !== "" && (<h3>Type of Ticket:</h3>)}
              <div className="ticket-type">{type}</div>
              <br></br>
              {selected !== "" && (<h3>Details:</h3>)}
              <div className="ticket-details">{details}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMyTickets;
