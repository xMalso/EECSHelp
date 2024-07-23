import React, { useState } from "react";

import currentUserManager from "../../../Managers/CurrentUserManager";
import myOutcome from "../../../Managers/ecOutcomeRegistry";

import "./viewMyTickets.css";

function EcOutcome() {
  function GetMyEC() {
    const allOutcomes = myOutcome.getAll();
    let myEC = [];
    for (let i = 0; i < allOutcomes.length; i++) {
      const item = allOutcomes[i];
      if (
        item.ec &&
        item.ec.user &&
        item.ec.user.id === currentUserManager.getCurrent().id
      ) {
        myEC.push(allOutcomes[i]);
      } else if (!item.ec || !item.ec.user) {
        console.log(`EC at index ${i} does not have a user property`);
      } else {
        console.log(`EC user ID: ${item.ec.user.id}`);
      }
    }
    return myEC;
  }
  

  const [title, setTitle] = useState("Select an EC");
  const [type, setInfo] = useState("");
  const [details, setDetails] = useState("");
  const [outcome, setOutcome] = useState("");
  const [selected, setSelected] = useState("");
  const allEC = GetMyEC();

  function updateContent(item) {
  
    if (item.ec.selfCertified === false) {
      setTitle(item.ec.user.name + " (" + item.ec.user.id + ") : " + item.ec.module);
    } else {
      setTitle(
        item.ec.user.name +
          " (" +
          item.ec.user.id +
          ") : " +
          item.ec.module +
          " - SELF CERTIFIED"
      );
    }
    setSelected(item);
    setInfo(item.ec.title + " - " + item.ec.date);
    setDetails(item.ec.details);
    setOutcome(item.outcome)
  }

  return (
    <div>
      <div className="padding-grid-view-ticket">
        <div className="grid-container-view-ticket">
          <div className="grid-row-span-2">
            <div className="box-view-ticket">
              <a>EC Outcomes:</a>
              <br></br>
              {allEC.map((item) => (
                <button
                  className="ticket-title-button-side-1"
                  onClick={() => updateContent(item)}
                >
                  {item.ec.title} - {item.outcome}
                </button>
              ))}{" "}
            </div>
          </div>

          <div className="ticket-title grid-col-span-2 box-view-ticket">
            {title}
          </div>
          <div className="ticket-content grid-col-span-2 box-view-ticket">
            <div>
            {selected !== "" && (<h3>Title of EC:</h3>)}
              <div className="ticket-type">{type}</div>
              <br></br>
              {selected !== "" && (<h3>Details:</h3>)}
              <div className="ticket-details">{details}</div>
              {selected !== "" && (<h3>EC Outcome:</h3>)}
              <div className="ticket-details">{outcome}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcOutcome;
