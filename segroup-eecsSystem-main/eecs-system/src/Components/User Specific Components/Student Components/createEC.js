import React, { useState } from "react";
import "../../../reset.css";
import "./createEC.css";

//import EC from "../../../Managers/ECRegistry"

import ecRegistry from "../../../Managers/ECRegistry";
import currentUserManager from "../../../Managers/CurrentUserManager";

class EC {
  constructor(user, module, title, date, details, selfCertified) {
    this.user = user;
    this.module = module;
    this.date = date;
    this.title = title;
    this.details = details;
    this.selfCertified = selfCertified;
  }
}

function CreateEC() {
  const getMaxCount = () => {
    const maxCount = localStorage.getItem(
      `maxCount-${currentUserManager.getCurrent().id}`
    );
    return maxCount ? parseInt(maxCount) : 3;
  };

  const setMaxCount = (count) => {
    localStorage.setItem(
      `maxCount-${currentUserManager.getCurrent().id}`,
      JSON.stringify(count)
    );
  };

  const pressSubmit = async (event) => {
    event.preventDefault();

    if (title !== "" && module !== "" && (details !== "" || selfCertified)) {
      const currentUser = currentUserManager.getCurrent();
      const maxCount = getMaxCount();

      if (selfCertified && maxCount > 0) {
        currentUser.certifiedCount--;
        setMaxCount(maxCount - 1);
        currentUserManager.setUser(currentUser);
      }

      try {
        await ecRegistry.addEC(
          new EC(
            currentUserManager.getCurrent(),
            otherModule !== "" ? otherModule : module,
            title,
            new Date(),
            details,
            selfCertified
          )
        );

        // Reset form inputs
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        setModule("");
        setTitle("");
        setDetails("");
        setSelfCertified(false);

        // show alert on submission
        alert("EC submitted successfully!");
      } catch (error) {
        console.error("Error submitting EC:", error);
        alert("Failed to submit EC. Please try again.");
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const [module, setModule] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [selfCertified, setSelfCertified] = useState(false);
  const [otherModule, setOtherModule] = useState("");
  const modules = [
    "Algorithms and Data Structures",
    "Databse Systems",
    "Graphical User Interfaces",
    "Internet Protocol and Applications",
    "Operating Systems",
    "Probability and Matricies",
    "Software Engineering",
    "Software Engineering Project",
    "Other",
  ];

  return (
    <div className="padding-grid-create-ec">
      <div className="scrollable-grid">
        <div className="grid-create-ec">
          <div>
            <div className="heading-create-ec">
              <br></br>Log a New Claim
            </div>
          </div>
          <div>
            <form className="form-create-ec">
              <label>
                <div className="ec-form-title">Module:</div>
                <div className="brief-description-ec">
                  Please select the relevant module for which you are requesting
                  an extension. If your module is not listed, choose 'Other' and
                  specify the module in the provided text field.
                </div>
                <select
                  className="select-module-ec"
                  value={module}
                  onChange={(e) => {
                    setModule(e.target.value);
                    setOtherModule("");
                  }}
                  required
                >
                  <option value="">Select a module</option>
                  {modules.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
              </label>
              {module === "Other" && (
                <label>
                  <input
                    className="ec-input"
                    type="text"
                    name="otherModule"
                    placeholder="Enter other module"
                    value={otherModule}
                    onChange={(e) => {
                      setOtherModule(e.target.value);
                    }}
                  />
                </label>
              )}
              <label>
                <div className="ec-form-title">Title:</div>
                <div className="brief-description-ec">
                  Enter a brief title that summarizes the reason for your
                  extension request. For example, "Extension Request for
                  Assignment XYZ."
                </div>

                <input
                  class="ec-input"
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <br />
              <div className="ec-form-title">Description:</div>
              <div className="brief-description-ec">
                Provide a detailed explanation for your extension request,
                including any relevant challenges or circumstances affecting
                your deadline. More information helps us better understand your
                situation.
              </div>
              <label>
                <textarea
                  className="ec-input-description"
                  type="text"
                  name="details"
                  placeholder="Description"
                  {...(selfCertified ? null : { required: true })}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </label>
              <br />
              <label>
                <div className="ec-form-title">Self Certified?</div>

                <div className="brief-description-ec">
                  Note: You have up to three self-certified extensions available
                  <br />
                  Currently you have {getMaxCount()} self-certified ecs left
                </div>
                {getMaxCount() > 0 && (
                  <input
                    className="self-certified"
                    type="checkbox"
                    name="selfCertified"
                    value={selfCertified}
                    checked={selfCertified}
                    onChange={(e) => setSelfCertified(!selfCertified)}
                  />
                )}
              </label>
              <input
                type="submit"
                className="ec-submit"
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

export default CreateEC;
