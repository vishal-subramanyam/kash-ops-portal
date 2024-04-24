import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";
import { getTimesheetEntryDetails } from "../hooks/FetchData";
import AlertMessage from "../components/AlertMessage";

function CreateTimesheetInvoice(props) {
  let alertMessage = useRef();
  let [message, setMessage] = useState("");
  let { companyId, sowId, from, to } = props;

  useEffect(() => {
    console.log(
      `use effect to fetch Timsheet data per filter - from: ${from}, to: ${to}, company id: ${companyId}`
    );
    fetchTSData(from, to, companyId);
  }, [from, to, companyId]);

  // Should I run function with useMemo hook? or useCallback hook?
  // const fetchTSData = (companyId, sowId, from, to) => {
  const fetchTSData = useCallback((from, to, companyId) => {
    console.log("trigger fetch to get data", from, to);

    // resolve the promise in order to get the hours billed array. When promise is resolved, filter response array with filter values above and return new array - array of objects, each object is a user with properties: name, totalBilledHours, details: array containing all sub task entries for a project
    Promise.allSettled([
      getTimesheetEntryDetails(from, to, companyId),
      // getTimesheetEntryDetails(from, to, companyId, sowId),
    ]).then((values) => {
      console.log("promise to get TS data resolved:", values);

      // Assign all Timesheet data per filters - from, to and companyId - to state array
      // props.setDateRangeData(values[0].value);

      // trigger function to filter out project data sharing the selected project sow id
      props.filterByProject(props.projectName, props.sowId, values[0].value);
    });
  }, []);

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
  };
  return (
    <>
      <header>
        <h1 className="invoice-details-title">Invoice Details</h1>
        <section>
          <h5 className="invoice-company-name">United Educators</h5>
          <section className="">
            <p>03/01/2024</p>
            <span>-</span>
            <p>03/31/2024</p>
          </section>
        </section>
      </header>
      {/* The section below is the container for the various company projects and their corresponding billed hours */}
      <section className="invoice-company-projects-container">
        {/* seperate each section below by project */}

        <section className="invoice-company-project">
          <h4>Operational Services (UNE2022050301)</h4>

          <section className="invoice-details-by-resource">
            <details>
              <summary>
                <h6>Randy Lane</h6>
                {/* set to span several columns to match UI design*/}
                <input type="text" onChange={(e) => console.log(e.target)} />
                <p>30</p>
                <div>
                  <span>$</span>
                  <input
                    type="number"
                    onChange={(e) => console.log(e.target)}
                  />
                </div>
                <p>$6,200</p>
              </summary>
              <div className="details-container"></div>
              <header>
                <ol>
                  <li>Name</li>
                  <li>Work Area</li>
                  <li>Task</li>
                  <li>Role</li>
                  <li>
                    Rate <span>(/hr)</span>
                  </li>
                  <li>Amount</li>
                </ol>
              </header>
              {/* List of resource's name and billed hours per task area for specific project */}
              {/* List of billed hours per Task */}
              {console.log(
                "state array for data display on UI",
                props.filteredHours
              )}
              <ol>
                <li>
                  <ol>
                    <li>Randy Lane</li>
                    <li>Operations</li>
                    <li>
                      Ticket Tracking, monitoring and updates, Project
                      Management Work
                    </li>
                    <li>
                      <input
                        type="text"
                        onChange={(e) => console.log(e.target)}
                      />
                    </li>
                    <li>10</li>
                    <li>
                      <span>$</span>
                      <input
                        type="number"
                        onChange={(e) => console.log(e.target)}
                      />
                    </li>
                    <li>$5,000</li>
                    <li>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </li>
                  </ol>
                </li>
              </ol>
            </details>
            {/* This is the accordian that will show more details when clicked and expanded */}
          </section>
        </section>
      </section>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </>
  );
}

export default CreateTimesheetInvoice;
