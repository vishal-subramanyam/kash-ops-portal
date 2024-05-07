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
                props.updateUserAllRecords(
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
                        props.updateUserSingleRecord(
                          props.i,
                          props.j,
                          k,
                          "Role",
                          e
                        )
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
                        props.updateUserSingleRecord(
                          props.i,
                          props.j,
                          k,
                          "Rate",
                          e
                        )
                      }
                    />
                  </li>
                  <li>$ {hrs.Amount.toFixed(2)}</li>
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
}

export default UsersDetailsByProject;
