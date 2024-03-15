import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import EditEmployeeInfo from "../components/EditEmployeeInfo";
import "../assets/styles/Styles.css";
import "../assets/styles/ManageEmployee.css";

function ManageEmployee(props) {
  let [tabActive, setTabActive] = useState("addTab");
  let employeeInfoCardTabActive =
    "EmployeesDetail--tab EmployeesDetail--tab-active";
  let employeeInfoCardTabNotActive =
    "EmployeesDetail--tab EmployeesDetail--tab-not-active";
  let loggedInUserLocal = props.loggedInUser;
  let isAdminLocal = props.admin;

  return (
    <main className="ManageEmployees--main-container max-width--main-container">
      <div className="kash_operations--upper-section-holder ManageEmployees--heading">
        <h1 className="add-employee__page-title form-page-title--lg-1">
          Manage Employees
        </h1>
        <div className="edit_page__return-link-holder">
          <Link to="/clients-hub" className="return-link">
            <svg
              width="80"
              height="134"
              viewBox="0 0 80 134"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M76.7864 3.36106C72.8812 -0.544183 66.5495 -0.544181 62.6443 3.36106L1.12622 64.8787C-0.0453612 66.0503 -0.0453675 67.9497 1.12621 69.1213L62.6445 130.64C66.5497 134.545 72.8814 134.545 76.7866 130.64C80.6919 126.734 80.6919 120.403 76.7866 116.497L29.4107 69.1216C28.2391 67.95 28.2391 66.0505 29.4107 64.8789L76.7864 17.5032C80.6917 13.598 80.6917 7.2663 76.7864 3.36106Z"
                fill="#255463"
              />
            </svg>
            <p className="return-link-text">Return to Employees</p>
          </Link>
        </div>
      </div>

      <ul className="EmployeesDetail--tabs-container">
        <li
          className={
            tabActive === "addTab"
              ? employeeInfoCardTabActive + " ManageEmployees--add-tab"
              : employeeInfoCardTabNotActive + " ManageEmployees--add-tab"
          }
          onClick={() => setTabActive("addTab")}
        >
          <span>Add Employee</span>
        </li>
        <li
          className={
            tabActive === "editTab"
              ? employeeInfoCardTabActive + " ManageEmployees--edit-tab"
              : employeeInfoCardTabNotActive + " ManageEmployees--edit-tab"
          }
          onClick={() => setTabActive("editTab")}
        >
          <span>Edit Employee</span>
        </li>
      </ul>

      {tabActive === "addTab" ? (
        <AddEmployee loggedInUser={loggedInUserLocal} admin={isAdminLocal} />
      ) : (
        <EditEmployeeInfo />
      )}
    </main>
  );
}

export default ManageEmployee;
