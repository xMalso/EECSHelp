import React, { useState } from "react";
import myServiceRegistry, { Service } from "../../../Managers/serviceRegistry";
import "./updateServices.css";

function UpdateServices() {
  function updateContent(index) {
    const service = myServiceRegistry.getService(index);
    setCurrentServiceIndex(index);
    setName(service.name);
    setDetails(service.details);
    setStatus(service.status);
  }

  function deleteService() {
    const originalIndex = currentServiceIndex;
    if (currentServiceIndex === 0 && myServiceRegistry.data.length > 1) {
      updateContent(1);
    } else if (myServiceRegistry.data.length === 1) {
      alert("Can't Delete final Service");
    } else {
      updateContent(originalIndex - 1);
    }
    myServiceRegistry.deleteService(originalIndex);
  }

  function submitService() {
    myServiceRegistry.setService(
      currentServiceIndex,
      new Service(name, details, status)
    );
    updateContent(currentServiceIndex);
  }

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const firstService = myServiceRegistry.getService(0);
  const [name, setName] = useState(firstService.name);
  const [details, setDetails] = useState(firstService.details);
  const [status, setStatus] = useState(firstService.service);

  const services = myServiceRegistry.getAllServices();
  console.log(services);
  return (
    <div>
      <div className="padding-grid-update-service">
        <div className="grid-container-update-service">
          <div className="grid-row-span-2">
            <div className="box-update-service">
              <div className="scrollable-update-service">
                <div className="" id="ecList">
                  <p>Services:</p>
                  {services.map((service, index) => (
                    <div key={index}>
                      <button
                        className="service-title-button-side-1"
                        onClick={() => updateContent(index)}
                      >
                        {service.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="service-title grid-col-span-2 box-update-service">
            {name}
          </div>
          <div className="service-content grid-col-span-2 box-update-service">
            <div>
              <p>Service name:</p>
              <div className="service-name">
                <input
                  className="width-100"
                  type="text"
                  defaultValue={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <p>Service details:</p>
              <div className="service-details">
                <input
                  className="width-100"
                  type="text"
                  defaultValue={details}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></input>
              </div>
            </div>
            <div>Service status:</div>
            <div className="radio-input">
              <label>
                Full
                <input
                  type="radio"
                  checked={status === "full"}
                  defaultChecked={status === "full"}
                  onChange={() => setStatus("full")}
                  className="service-radio-input"
                ></input>
              </label>
            </div>
            <div className="radio-input">
              <label>
                Partial
                <input
                  type="radio"
                  checked={status === "partial"}
                  defaultChecked={status === "partial"}
                  onChange={() => setStatus("partial")}
                  className="service-radio-input"
                ></input>
              </label>
            </div>
            <div className="radio-input">
              <label>
                None
                <input
                  type="radio"
                  checked={status === "none"}
                  defaultChecked={status === "none"}
                  onChange={() => setStatus("none")}
                  className="service-radio-input"
                ></input>
              </label>
            </div>

            <div>
              <button className="update-service-button" onClick={submitService}>
                Submit changes
              </button>

              <button
                className="update-service-button"
                conClick={deleteService}
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateServices;
