import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";
// import { getTimesheetEntryDetails } from "../hooks/FetchData";
import AlertMessage from "../components/AlertMessage";
import { hslToRgb } from "@mui/material";

function CreateTimesheetInvoice(props) {
  let alertMessage = useRef();
  let [message, setMessage] = useState("");
  // let { companyId, sowId, from, to } = props;
  // let trimmedFilteredHours = Object.values(
  //   props.filteredHours.reduce((c, e) => {
  //     if (!c[e.projectName]) c[e.projectName] = e;
  //     return c;
  //   }, {})
  // );

  // useEffect(() => {
  // "use effect to check if filters are filled out";
  // props.checkFilters();
  // }, []);

  // // Should I run function with useMemo hook? or useCallback hook?
  // // const fetchTSData = (companyId, sowId, from, to) => {
  // const fetchTSData = useCallback((from, to, companyId) => {
  //   console.log("trigger fetch to get data", from, to);

  //   // resolve the promise in order to get the hours billed array. When promise is resolved, filter response array with filter values above and return new array - array of objects, each object is a user with properties: name, totalBilledHours, details: array containing all sub task entries for a project
  //   Promise.allSettled([
  //     getTimesheetEntryDetails(from, to, companyId),
  //     // getTimesheetEntryDetails(from, to, companyId, sowId),
  //   ]).then((values) => {
  //     console.log("promise to get TS data resolved:", values);

  //     // Assign all Timesheet data per filters - from, to and companyId - to state array
  //     // props.setDateRangeData(values[0].value);

  //     // trigger function to filter out project data sharing the selected project sow id
  //     // props.filterByProject(props.projectName, props.sowId, values[0].value);
  //   });
  // }, []);

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
          <h4 className="invoice-company-name">{props.companyName}</h4>
          <section className="">
            <p>{props.from}</p>
            <span>-</span>
            <p>{props.to}</p>
          </section>
        </section>
      </header>
      {/* The section below is the container for the various company projects and their corresponding billed hours */}
      <section className="invoice-company-projects-container">
        {/* seperate each section below by project */}

        {
          // console.log(
          //   "state array for data display on UI")
          props.filteredHours.map((rec, i) => {
            console.log(rec);
            return (
              <section key={i} className="invoice-company-project">
                <h5>
                  {rec.projectName} ({rec.projectSowId})
                </h5>
                <section className="invoice-details-by-resource">
                  {rec.data.map((userHrs, j) => {
                    {
                      /* This is the accordian that will show more details when clicked and expanded */
                    }
                    return (
                      <details key={j}>
                        <summary>
                          <h6>{userHrs.name}</h6>
                          {/* set to span several columns to match UI design*/}
                          <ol className="invoice--user-record-totals-row">
                            <li className="invoice--user-record-totals-item invoice--user-record-set-all-roles-input">
                              <input
                                type="text"
                                onChange={(e) => console.log(e.target)}
                              />
                            </li>
                            <li
                              className="invoice--user-record-totals-item
"
                            >
                              <p className="invoice--user-total-hrs-billed">
                                0
                              </p>
                            </li>
                            <li
                              className="invoice--user-record-totals-item
invoice--user-record-set-all-rates"
                            >
                              <span>$</span>
                              <input
                                type="number"
                                onChange={(e) => console.log(e.target)}
                              />
                            </li>
                            <li
                              className="invoice--user-record-totals-item
"
                            >
                              <p className="invoice--user-total-billed-amount">
                                $0
                              </p>
                            </li>
                          </ol>
                        </summary>
                        <div className="invoice--user-record-details-container">
                          <header>
                            <ol>
                              <li>Name</li>
                              <li>Work Area</li>
                              <li>Task</li>
                              <li>Role</li>
                              <li>Hours</li>
                              <li>
                                Rate <span>(/hr)</span>
                              </li>
                              <li>Amount</li>
                            </ol>
                          </header>
                          {/* List of resource's name and billed hours per task area for specific project */}
                          {/* List of billed hours per Task */}

                          <ol className="invoice--user-record-details-container">
                            {userHrs.data.map((hrs, k) => {
                              return (
                                <li key={k}>
                                  <ol className="invoice--user-record-details">
                                    <li>{hrs.FullName}</li>
                                    <li>{hrs.SubAssignment}</li>
                                    <li>{hrs.SubAssignmentSegment1}</li>
                                    <li>
                                      <input
                                        id="invoice--user-role-input"
                                        type="text"
                                        onChange={(e) => console.log(e.target)}
                                      />
                                    </li>
                                    <li id="invoice--user-record-hrs">
                                      {hrs.TotalHours}
                                    </li>
                                    <li>
                                      <span>$</span>
                                      <input
                                        id="invoice--user-rate-input"
                                        type="number"
                                        onChange={(e) => console.log(e.target)}
                                      />
                                    </li>
                                    <li>$0</li>
                                    <li>
                                      <FontAwesomeIcon icon={faCircleXmark} />
                                    </li>
                                  </ol>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      </details>
                    );
                  })}
                </section>
              </section>
            );
          })
        }
      </section>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </>
  );
}

export default CreateTimesheetInvoice;
