import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";

function UsersDetailsByProject(props) {
  let [userRecordRole, setUserRecordRole] = useState("");
  let [userRecordTotalAmount, setUserRecordTotalAmount] = useState(0);
  let [userRecordTotalHrs, setUserRecordTotalHrs] = useState(
    props.displayUserTotalBilledHrs(props.i, props.j)
  );
  let [userRecordRate, setUserRecordRate] = useState(0);

  const updateUserRecordAmount = (e) => {
    // console.log("update user rate to set total amount", e.target.value);
    // console.log(userRecordTotalHrs);

    // console.log(userRecordTotalHrs * e.target.value);
    setUserRecordRate(e.target.value);
    let totalAmount = userRecordTotalHrs * e.target.value;
    setUserRecordTotalAmount(totalAmount);
  };

  const updateUserRole = (e) => {
    console.log(e.target.value);
    setUserRecordRole(e.target.value);
  };

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
    props.setHrsToServer(stateHrsCopy);

    // run function to iterate user billed data in a project to account for rate update in order to render update in total amount in accordian
    let updatedTotalAmount = updatedRecordValue.data.reduce((acc, curr) => {
      return acc + curr.Amount;
    }, 0);
    setUserRecordTotalAmount(updatedTotalAmount);

    // send arrray to calculate total amount for individual project
    props.individualProjectSubTotal(stateHrsCopy, props.i);
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

    // run function to iterate user billed data in a project to account for rate update in order to render update in total amount in accordian
    let updatedTotalAmount = stateHrsCopy[i].data[j].data.reduce(
      (acc, curr) => {
        return acc + curr.Amount;
      },
      0
    );
    setUserRecordTotalAmount(updatedTotalAmount);

    props.setHrsToServer(stateHrsCopy);

    // send arrray to calculate total amount for individual project
    props.individualProjectSubTotal(stateHrsCopy, props.i);
    // update filteredHours array in state with prop value update
    props.updateFilteredHrsArr(stateHrsCopy);
  };

  // Apply delay/ debouncer? to wait a couple seconds before triggering dispatch to update filterHours Array in state
  const deleteUserSingleRecord = (i, j, k, e) => {
    console.log("delete user single record", i, j, k, e.target);
    let stateHrsCopy = [...props.filteredHours];
    console.log(stateHrsCopy);

    let currentRecord = stateHrsCopy[i].data[j].data[k];
    let updatedHrs = stateHrsCopy[i].data[j].data.filter((rec, i) => {
      return rec.TotalHours !== currentRecord.TotalHours;
    });
    console.log(stateHrsCopy);
    console.log(stateHrsCopy[i].data[j].data[k]);
    stateHrsCopy[i].data[j].data = updatedHrs;
    // single user record object
    console.log(updatedHrs);
    // updated hours array to send to dispatch to update filteredHours array
    console.log(stateHrsCopy);

    // Calculate Amount field - individual user record Rate * Hrs
    // if (propName === "Rate") {
    //   updatedRecordValue["Amount"] =
    //     e.target.value * updatedRecordValue["TotalHours"];
    // }

    // run function to iterate user billed data in a project to account for record deletion in order to render update in total amount in accordian
    let updatedTotalAmount = stateHrsCopy[i].data[j].data.reduce(
      (acc, curr) => {
        return acc + curr.Amount;
      },
      0
    );
    console.log(updatedTotalAmount);
    setUserRecordTotalAmount(updatedTotalAmount);

    props.setHrsToServer(stateHrsCopy);

    // send arrray to calculate total amount for individual project
    props.individualProjectSubTotal(stateHrsCopy, props.i);
    // update filteredHours array in state with prop value update
    props.updateFilteredHrsArr(stateHrsCopy);
  };

  return (
    <details>
      <summary>
        <h6>{props.userHrs.name}</h6>
        {/* set to span several columns to match UI design*/}
        <ol className="invoice--user-record-totals-row">
          <li className="invoice--user-record-totals-item invoice--user-record-set-all-roles-input">
            <input type="text" onChange={(e) => updateUserRole(e)} />
          </li>
          <li
            className="invoice--user-record-totals-item
"
          >
            <p className="invoice--user-total-hrs-billed">
              {props.displayUserTotalBilledHrs(props.i, props.j)}
            </p>
          </li>
          <li
            className="invoice--user-record-totals-item
invoice--user-record-set-all-rates"
          >
            <span>$</span>
            <input
              type="number"
              min={0}
              onChange={(e) =>
                // displayUserOverallRate(i, j, e)
                updateUserRecordAmount(e)
              }
            />
          </li>
          <li
            className="invoice--user-record-totals-item
"
          >
            <p className="invoice--user-total-billed-amount">
              $ {userRecordTotalAmount}
            </p>
          </li>
          <li>
            <button
              className="invoice--spread-values-btn"
              onClick={() =>
                updateUserAllRecords(
                  props.i,
                  props.j,
                  userRecordRole,
                  userRecordRate
                )
              }
            >
              Spread Values
            </button>
          </li>
        </ol>
      </summary>
      <div className="invoice--user-records-container">
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
          {props.userHrs.data.map((hrs, k) => {
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
                      onChange={(e) =>
                        updateUserSingleRecord(props.i, props.j, k, "Role", e)
                      }
                      defaultValue={hrs.Role}
                    />
                  </li>
                  <li id="invoice--user-record-hrs">{hrs.TotalHours}</li>
                  <li>
                    <span>$</span>
                    <input
                      id="invoice--user-rate-input"
                      type="number"
                      min={0}
                      value={hrs.Rate}
                      onChange={(e) =>
                        updateUserSingleRecord(props.i, props.j, k, "Rate", e)
                      }
                    />
                  </li>
                  <li>$ {hrs.Amount.toFixed(2)}</li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={(e) =>
                        deleteUserSingleRecord(props.i, props.j, k, e)
                      }
                    />
                  </li>
                </ol>
              </li>
            );
          })}
        </ol>
      </div>
    </details>
  );
}

export default UsersDetailsByProject;
