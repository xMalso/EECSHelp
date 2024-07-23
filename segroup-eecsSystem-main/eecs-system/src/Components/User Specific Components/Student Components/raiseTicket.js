import React, { useState } from "react";
import "../../../reset.css";
import "./raiseTicket.css";

import ticketRegistry from "../../../Managers/TicketRegistry";
import currentUserManager from "../../../Managers/CurrentUserManager";

class Ticket {
  constructor(user, date, title, type, details) {
    this.user = user;
    this.date = date;
    this.title = title;
    this.type = type;
    this.details = details;
  }
}

function RaiseTicket() {
  const pressSubmit = async (event) => {
    event.preventDefault();

    if (title !== "" && details !== "" && type !== "") {
      try {
        await ticketRegistry.addTicket(
          new Ticket(
            currentUserManager.getCurrent(),
            new Date(),
            title,
            type,
            details
          )
        );

        // Reset form inputs
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        setTitle("");
        setDetails("");
        setType("");
        // show alert on submission
        alert("Ticket submitted successfully!");
      } catch (error) {
        console.error("Error submitting ticket:", error);
        alert("Failed to submit ticket. Please try again.");
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  // const [name, setName] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="padding-grid-create-ticket">
      <div className="scrollable-grid">
        <div className="grid-create-ticket">
          <div>
            <div className="heading-create-ticket">
              <br></br>Raise a New Ticket
            </div>
          </div>
          <div>
            <form class="form-create-ticket">
              <label>
                <div className="ticket-form-title">Title:</div>
                <div className="brief-description-ec">
                  Enter a brief title that summarizes the issue you're
                  experiencing.
                </div>
                <input
                  className="ticket-input"
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <div className="ticket-form-title">Type:</div>
              <div className="ticket-input">
                Briefly describe the nature of your concern or issue in the
                provided text field. For example: "Technical issue".
              </div>
              <label>
                <input
                  className="ticket-input"
                  type="text"
                  name="type"
                  placeholder="Type"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </label>
              <div className="ticket-form-title">Details:</div>
              <div className="brief-description-ticket">
                Describe the problem you're encountering. The more information
                you provide, the better we can understand and address your issue
                effectively.
              </div>
              <label>
                <textarea
                  className="ticket-input-description"
                  type="text"
                  name="details"
                  placeholder="Details"
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </label>
              <br />
              <input
                className="ticket-submit"
                type="submit"
                value="Submit"
                onClick={pressSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaiseTicket;
