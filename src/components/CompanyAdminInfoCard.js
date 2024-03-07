import React from "react";
import "../assets/styles/EmployeesDetail.css";

function CompanyAdminInfoCard(props) {
  return (
    <section className="EmployeeInfoCard--section-container">
      <div className="EmployeeInfoCard--employee-detail-section">
        <section className="EmployeeInfoCard--employee-name-id-username-section">
          <h3 className="EmployeeInfoCard--employee-name">
            {props.firstName + " " + props.lastName}
          </h3>
          <div className="EmployeeInfoCard--employee-username">
            <label>Username:</label>
            <span>{props.username}</span>
          </div>
          <div className="EmployeeInfoCard--employee-id">
            <label>EMP_ID:</label>
            <span>{props.empId}</span>
          </div>
        </section>
        <section className="EmployeeInfoCard--employee-type">
          {props.employeeType === "W-2" ||
          props.employeeType === "" ||
          props.employeeType === "-" ? (
            <div>
              <div>
                <label>Contract Type:</label>
                <span>{props.employeeType}</span>
              </div>
              <div className="EmployeeInfoCard--employee-level">
                <label>User level:</label>
                <span>{props.adminLevel}</span>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <label>Contract Type:</label>
                <span className="EmployeeInfoCard--contractor">
                  {props.employeeType}
                </span>
              </div>
              <div>
                <label>Contract Name:</label>
                <span className="EmployeeInfoCard--contractor-name">
                  {props.contractorName}
                </span>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="EmployeeInfoCard--employee-contact-info-section">
        <ol>
          <li>
            <label>Email:</label>
            <span className="EmployeeInfoCard--employee-email">
              {props.email}
            </span>
          </li>
          <li>
            <label>Phone:</label>
            <span>{props.phone}</span>
          </li>
          <li>
            <label>Location:</label>
            <span>
              {props.city === "" ||
              props.state === "" ||
              props.country === "" ? (
                <></>
              ) : (
                props.city + ", " + props.state + " - " + props.country
              )}
            </span>
          </li>
        </ol>
      </section>
    </section>
  );
}

export default CompanyAdminInfoCard;
