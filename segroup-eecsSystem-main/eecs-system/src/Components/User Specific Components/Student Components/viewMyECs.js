import React, { useState } from "react";
import "../../../reset.css";
import "./viewMyECs.css";

import ecRegistry from "../../../Managers/ECRegistry";
import currentUserManager from "../../../Managers/CurrentUserManager";

function ViewMyECs() {
  function getMyEcs() {
    const allEcs = ecRegistry.getAllECs();
    let myEcs = [];
    for (let i = 0; i < allEcs.length; i++) {
      if (allEcs[i].user.id === currentUserManager.getCurrent().id) {
        myEcs.push(allEcs[i]);
      } else {
        console.log(allEcs[i].userID);
      }
    }
    return myEcs;
  }

  function updateContent(ec) {
    console.log("ec user:", ec.user);
    if (ec.selfCertified === false) {
      setTitle(ec.user.name + " (" + ec.user.id + ") : " + ec.module);
    } else {
      setTitle(
        ec.user.name +
          " (" +
          ec.user.id +
          ") : " +
          ec.module +
          " - SELF CERTIFIED"
      );
    }
    setInfo(ec.title + " - " + ec.date);
    setDetails(ec.details);
    setSelected(ec);
  }

  const [title, setTitle] = useState("Select an EC");
  const [info, setInfo] = useState("");
  const [details, setDetails] = useState();
  const [selected, setSelected] = useState("");
  const myEcs = getMyEcs();

  return (
    <div>
      <div className="padding-grid-view-ec">
        <div className="grid-container-view-ec">
          <div className="grid-row-span-2">
            <div className="box-view-ec">
              <div className="scrollable-view-ec">
                <a>List of ECs:</a>
                <br></br>
                {myEcs.map((ec) => (
                  <button
                    className="ec-title-button-side-1"
                    onClick={() => updateContent(ec)}
                  >
                    {ec.title} - {ec.module}
                  </button>
                ))}{" "}
              </div>
            </div>
          </div>
          <div className="ec-title grid-col-span-2 box-view-ec">{title}</div>
          <div className="grid-col-span-2 ec-content box-view-ec">
            <div>
            {selected !== "" && (<h3>Title of EC:</h3>)}
              <div className="ec-information"> {info}</div>
              <br></br>
              {selected !== "" && (<h3>Details:</h3>)}
              <div className="ec-details">{details}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMyECs;
