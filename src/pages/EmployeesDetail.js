import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/EmployeesDetail.css";
import EmployeeInfoCard from "../components/EmployeeInfoCard";
import UsersReport from "../components/UsersReport";
import CompanyAdminInfoCard from "../components/CompanyAdminInfoCard";
import { fetchUsers, fetchCompanyAdmins } from "../hooks/FetchData";

// ====================================================================================
// REDUCER FUNCTION
// ====================================================================================

function dataReducer(state, action) {
  switch (action.type) {
    case "initialize": {
      return action.payload;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function EmployeesDetail(props) {
  let [tabActive, setTabActive] = useState("cardTab");

  let initialState = {
    allUsers: [],
    allCompanyAdmins: [],
    distinctCompanies: [],
  };
  let [data, dispatchData] = useReducer(dataReducer, initialState);
  let getUsers = fetchUsers;
  let getCompanyAdmins = fetchCompanyAdmins;
  let employeeInfoCardTabActive =
    "EmployeesDetail--tab EmployeesDetail--tab-active";
  let employeeInfoCardTabNotActive =
    "EmployeesDetail--tab EmployeesDetail--tab-not-active";

  console.log(data.distinctCompanies);
  const resolvePromisesAndDispatch = useCallback(() => {
    Promise.allSettled([getUsers(), getCompanyAdmins()]).then((values) => {
      console.log("Fetch Data: ", values);
      dispatchData({
        type: "initialize",
        payload: {
          allUsers: values[0].value,
          allCompanyAdmins: values[1].value.compAdminsOverall,
          //   filter allCompanyAdmins array to remove duplicate company names
          distinctCompanies: Object.values(
            values[1].value.compAdminsOverall.reduce((c, e) => {
              if (!c[e.CompanyName]) {
                c[e.CompanyName] = e;
              }
              return c;
            }, {})
          ),
        },
      });
    });
  }, []);

  useEffect(() => {
    resolvePromisesAndDispatch();
  }, []);

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
      </ul>

      {tabActive === "cardTab" ? (
        <div className="EmployeesDetail--info-card-container">
          {data.allUsers.map((user) => {
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
          <UsersReport users={data.allUsers} />
        </div>
      )}
    </main>
  );
}

export default EmployeesDetail;
