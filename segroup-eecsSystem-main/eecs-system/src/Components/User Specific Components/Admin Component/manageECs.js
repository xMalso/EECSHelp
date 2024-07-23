import React, { useState } from "react";
import "./admin.css";

import ecRegistry from "../../../Managers/ECRegistry";
import myOutcome from "../../../Managers/ecOutcomeRegistry";

function ManageECs() {
  function updateContent(ec, index) {
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
    setCurrentEc(index);

    //console.log(ecRegistry.getEcIndex(currentEc))
  }

  function getAllEC() {
    let ecs = [];
    for (let i = 0; i < ecRegistry.getLength(); i++) {
      ecs.push(ecRegistry.getEC(i));
    }
    return ecs;
  }

  function ApproveButton() {
    if (currentEc !== "") {
      myOutcome.addEC(ecRegistry.getEC(currentEc), "Accepted");
      ecRegistry.deleteEc(currentEc);
      setCurrentEc("");
      setInfo("");
      setDetails("");
      setTitle("Select an EC");
    }
  }

  function RejectButton() {
    if (currentEc !== "") {
      myOutcome.addEC(ecRegistry.getEC(currentEc), "Rejected");
      ecRegistry.deleteEc(currentEc);
      setCurrentEc("");
      setInfo("");
      setDetails("");
      setTitle("Select an EC");
    }
  }

  const [title, setTitle] = useState("Select an EC");
  const [info, setInfo] = useState("");
  const [details, setDetails] = useState("");
  const [currentEc, setCurrentEc] = useState("");
  const ecs = getAllEC();

  return (
    <div>
      <div className="padding-grid-admin">
        <div className="grid-container-admin">
          <div className="grid-row-span-2">
            <div className="box-admin">
              <div className="scrollable-view-admin">
                <a>List of ECs:</a>
                <br></br>
                {ecs.map((ec, index) => (
                  <div key={index}>
                    <button
                      className="ec-title-button-side-1"
                      onClick={() => updateContent(ec, index)}
                    >
                      {ec.user.name} - {ec.title}
                    </button>
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>

          <div className="ec-title grid-col-span-2 box-admin">{title}</div>
          <div className="ec-content grid-col-span-2 box-admin">
            <div>
            {currentEc !== "" && (<h3>EC Information:</h3>)}
              <div className="ec-information"> {info}</div>
              <br></br>
              {currentEc !== "" && (<h3>Details:</h3>)}
              <div className="ec-details">{details}</div>
            </div>

            <div className="admin-button-container">
              {currentEc !== "" && ecRegistry.getEC(currentEc) && (
                <button className="admin-ec-button" onClick={ApproveButton}>
                  Accept EC
                </button>
              )}
              {currentEc !== "" &&
                ecRegistry.getEC(currentEc) &&
                ecRegistry.getEC(currentEc).selfCertified === false && (
                  <button className="admin-ec-button" onClick={RejectButton}>
                    Reject EC
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageECs;
