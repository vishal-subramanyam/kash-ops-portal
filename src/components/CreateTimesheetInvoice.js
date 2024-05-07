import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";
import UsersDetailsByProject from "./UsersDetailsByProject";

function CreateTimesheetInvoice(props) {
  let userRecordAmountTotal = useRef();
  let [userRecordRole, setUserRecordRole] = useState("");
  let [userRecordTotalAmount, setUserRecordTotalAmount] = useState(0);
  let [userRecordTotalHrs, setUserRecordTotalHrs] = useState(0);

  // Apply delay/ debouncer? to wait a couple seconds before triggering dispatch to update filterHours Array in state
  const updateUserAllRecords = (i, j, role, rate) => {
    let stateHrsCopy = [...props.filteredHours];
    let updatedRecordValue = stateHrsCopy[i].data[j];
    console.log("update all user record", i, j, role, rate);
    console.log(updatedRecordValue);

    // iterate all billed hours array to a project by an individual user to update their role property with input value
    updatedRecordValue.data.map((record) => {
      console.log(record["Rate"]);
      record["Role"] = role;
      record["Rate"] = parseFloat(rate);

      if (record["Rate"]) {
        record["Amount"] = rate * record["TotalHours"];
      }
    });

    // update filteredHours array in state with prop value update
    props.updateFilteredHrsArr(stateHrsCopy);
  };

  // Apply delay/ debouncer? to wait a couple seconds before triggering dispatch to update filterHours Array in state
  const updateUserSingleRecord = (i, j, k, propName, e) => {
    console.log("update user single record", i, j, propName, e.target.value);
    let stateHrsCopy = [...props.filteredHours];
    let updatedRecordValue = stateHrsCopy[i].data[j].data[k];
    updatedRecordValue[propName] = e.target.value;
    // single user record object
    console.log(updatedRecordValue);
    // updated hours array to send to dispatch to update filteredHours array
    console.log(stateHrsCopy);

    // Calculate Amount field - individual user record Rate * Hrs
    if (propName === "Rate") {
      updatedRecordValue["Amount"] =
        e.target.value * updatedRecordValue["TotalHours"];
    }

    // update filteredHours array in state with prop value update
    props.updateFilteredHrsArr(stateHrsCopy);
  };

  // Convert the from and to date to read mm/dd/yyy instead of how it comes from the DB: yyyy-mm-dd
  const convertDateFormat = (date) => {
    const newDate = date.replaceAll("-", "/").split("/");
    console.log(newDate);

    const temp = newDate[1];
    newDate[1] = newDate[2];
    newDate[2] = temp;

    const newDateFormat = newDate.reverse().join("/");
    return newDateFormat;
  };

  // update individual user's total billed hours value at accordian level
  const displayUserTotalBilledHrs = (i, j) => {
    let stateHrsCopy = [...props.filteredHours];
    let updatedRecordValue = stateHrsCopy[i].data[j];

    let totalBilledHours = updatedRecordValue.data.reduce((acc, currRecord) => {
      return acc + parseFloat(currRecord.TotalHours);
    }, 0);

    // return total billed hours to display at top level of user record accordian
    return totalBilledHours;
  };

  // display the total amount - rate * hours - at top level of accordian for individual user records
  const displayUserRecordTotalAmount = (total) => {
    console.log(total);
    return total;
  };

  // update overall rate values for individual user records
  const displayUserOverallRate = (i, j, e) => {
    let stateHrsCopy = [...props.filteredHours];
    let updatedRecordValue = stateHrsCopy[i].data[j];
    console.log(updatedRecordValue);
    updatedRecordValue.data.map((record, k) => {
      console.log(record);
      // updateUserSingleRecord(i, j, k, "Rate", e);
      return (record["Rate"] = parseFloat(e.target.value));
    });

    console.log(updatedRecordValue);
    console.log(stateHrsCopy);
    // call updateUserSingleRecord function to run update to single record Amount
    // updateUserSingleRecord;

    // update filteredHours array in state with prop value update
    props.updateFilteredHrsArr(stateHrsCopy);
  };

  return (
    <>
      <header>
        <h2 className="invoice--title">Invoice Details</h2>
        <section className="invoice--company-details">
          <h5 className="invoice--company-name">{props.companyName}</h5>
          <section className="invoice--date-range">
            <p>{convertDateFormat(props.from)}</p>
            <span>-</span>
            <p>{convertDateFormat(props.to)}</p>
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
            console.log(
              "Individual Project in filteredHours state array:",
              rec
            );
            return (
              <section key={i} className="invoice-company-project">
                <h6 className="invoice--project-description">
                  {rec.projectName}
                  <span>({rec.projectSowId})</span>
                </h6>

                <section className="invoice-details-by-resource">
                  {rec.data.map((userHrs, j) => {
                    /* This is the accordian that will show more details when clicked and expanded */
                    return (
                      <UsersDetailsByProject
                        key={j}
                        i={i}
                        j={j}
                        userHrs={userHrs}
                        updateUserAllRecords={updateUserAllRecords}
                        updateUserSingleRecord={updateUserSingleRecord}
                        displayUserTotalBilledHrs={displayUserTotalBilledHrs}
                      />
                    );
                  })}
                </section>

                <section className="invoice--project-sub-total">
                  <ol>
                    <li>PROJECT SUBTOTAL</li>
                    <li>
                      {rec.projectName}
                      <span>({rec.projectSowId})</span>
                    </li>
                    <li>$0</li>
                  </ol>
                </section>
              </section>
            );
          })
        }

        <section className="invoice--projects-total-amount">
          <ol>
            <li>
              <h6>Invoice Total:</h6>
            </li>
            <li>
              <p>$0</p>
            </li>
          </ol>
        </section>

        <section className="invoice--btn-container">
          <button
            className="invoice--create-btn"
            onClick={() => console.log(props.hrsToServer)}
          >
            Create Invoice
          </button>
          <button
            className="invoice--cancel-btn"
            onClick={() => props.cancel()}
          >
            Cancel
          </button>
        </section>
      </section>
      {/* <AlertMessage ref={alertMessage} close={closeAlert} message={message} /> */}
    </>
  );
}

export default CreateTimesheetInvoice;
