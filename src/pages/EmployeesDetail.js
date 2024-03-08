import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/EmployeesDetail.css";
import EmployeeInfoCard from "../components/EmployeeInfoCard";
import UsersReport from "../components/UsersReport";
import CompanyAdminInfoCard from "../components/CompanyAdminInfoCard";

function EmployeesDetail(props) {
  let [tabActive, setTabActive] = useState("cardTab");
  let employeeInfoCardTabActive =
    "EmployeesDetail--tab EmployeesDetail--tab-active";
  let employeeInfoCardTabNotActive =
    "EmployeesDetail--tab EmployeesDetail--tab-not-active";
  let allUsers = props.users.read();
  let allCompanyAdmins = props.companyAdmins.read();
  console.log(allCompanyAdmins);
  return (
    <main className="EmployeesDetail--container">
      <div className="kash_operations--upper-section-holder EmployeesDetail--upper-section-holder">
        <h1 className="add-employee__page-title form-page-title--lg-1 EmployeesDetail--page-title">
          Employees Detail
        </h1>
        <div className="edit_page__return-link-holder EmployeesDetail--return-link-holder">
          <Link to="/employee-hub">
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
            tabActive === "cardTab"
              ? employeeInfoCardTabActive + " EmployeesDetail--card-tab"
              : employeeInfoCardTabNotActive + " EmployeesDetail--card-tab"
          }
          onClick={() => setTabActive("cardTab")}
        >
          <span>Card</span>
        </li>
        <li
          className={
            tabActive === "tableTab"
              ? employeeInfoCardTabActive + " EmployeesDetail--table-tab"
              : employeeInfoCardTabNotActive + " EmployeesDetail--table-tab"
          }
          onClick={() => setTabActive("tableTab")}
        >
          <span>Table</span>
        </li>
        <li
          className={
            tabActive === "companyTab"
              ? employeeInfoCardTabActive +
                " EmployeesDetail--company-admin-tab"
              : employeeInfoCardTabNotActive +
                " EmployeesDetail--company-admin-tab"
          }
          onClick={() => setTabActive("companyTab")}
        >
          <span>Company Admins</span>
        </li>
      </ul>

      {/* If logged in user is a Super Admin show the three tabs otherwise just show the two tabs - employee info card and table tabs */}

      {props.loggedInUser.AdminLevel === "Super Admin" ? (
        tabActive === "cardTab" ? (
          <div className="EmployeesDetail--info-card-container">
            {allUsers.map((user) => {
              return (
                <EmployeeInfoCard
                  firstName={user.FirstName}
                  lastName={user.LastName}
                  username={user.KashOperationsUsn}
                  empId={user.EmpId}
                  adminLevel={user.AdminLevel}
                  employeeType={user.EmployeeType}
                  email={user.EmailAddress}
                  phone={user.PhoneNumber}
                  city={user.EmpLocationCity}
                  state={user.EmpLocationState}
                  country={user.EmpLocationCountry}
                  contractorName={user.EmployeeContractorName}
                />
              );
            })}
          </div>
        ) : tabActive === "tableTab" ? (
          <div className="EmployeesDetail--table-detail-container">
            <UsersReport users={allUsers} />
          </div>
        ) : (
          <div className="EmployeesDetail--company-admin-detail-container">
            <CompanyAdminInfoCard />
          </div>
        )
      ) : tabActive === "cardTab" ? (
        <div className="EmployeesDetail--info-card-container">
          {allUsers.map((user) => {
            return (
              <EmployeeInfoCard
                firstName={user.FirstName}
                lastName={user.LastName}
                username={user.KashOperationsUsn}
                empId={user.EmpId}
                adminLevel={user.AdminLevel}
                employeeType={user.EmployeeType}
                email={user.EmailAddress}
                phone={user.PhoneNumber}
                city={user.EmpLocationCity}
                state={user.EmpLocationState}
                country={user.EmpLocationCountry}
                contractorName={user.EmployeeContractorName}
              />
            );
          })}
        </div>
      ) : (
        <div className="EmployeesDetail--table-detail-container">
          <UsersReport users={allUsers} />
        </div>
      )}
    </main>
  );
}

export default EmployeesDetail;
