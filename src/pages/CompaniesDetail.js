import React, { useState, useEffect, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/CompaniesDetail.css";
import CompanyInfoCard from "../components/CompanyInfoCard";
import CompaniesReport from "../components/CompaniesReport";
import {
  getCompanies,
  fetchCompanyAdmins,
  getCompanyProjects,
  getCompanyContacts,
  getProjectsBilledAndProjectedHoursByCompany,
} from "../hooks/FetchData";

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

function CompaniesDetail(props) {
  let [tabActive, setTabActive] = useState("cardTab");
  let companies = getCompanies;
  let projects = getCompanyProjects;
  let admins = fetchCompanyAdmins;
  let contacts = getCompanyContacts;
  let projectsHoursBilledProjected =
    getProjectsBilledAndProjectedHoursByCompany;
  let initialState = {
    companies: [],
    projects: [],
    admins: [],
    contacts: [],
    projectsHoursBilledProjected: [],
  };
  let [data, dispatchData] = useReducer(dataReducer, initialState);
  let loggedInUserInfo = props.loggedInUser;
  let employeeInfoCardTabActive =
    "EmployeesDetail--tab EmployeesDetail--tab-active";
  let employeeInfoCardTabNotActive =
    "EmployeesDetail--tab EmployeesDetail--tab-not-active";

  const resolvePromisesAndDispatch = useCallback(() => {
    Promise.allSettled([
      companies(),
      projects(),
      admins(),
      contacts(),
      projectsHoursBilledProjected(),
    ]).then((values) => {
      console.log("Fetch Data: ", values);
      dispatchData({
        type: "initialize",
        payload: {
          companies: values[0].value,
          projects: values[1].value,
          admins: values[2].value,
          contacts: values[3].value,
          projectsHoursBilledProjected: values[4].value,
        },
      });
    });
  }, []);

  useEffect(() => {
    resolvePromisesAndDispatch();
  }, []);

  return (
    <main className="CompaniesDetail--content-container">
      <div className="kash_operations--upper-section-holder EmployeesDetail--upper-section-holder CompaniesDetail--upper-section-holder">
        <h1 className="add-employee__page-title form-page-title--lg-1 EmployeesDetail--page-title">
          Companies Detailed
        </h1>
        <div className="edit_page__return-link-holder CompaniesDetail--return-link-holder">
          <Link to="/client-hub">
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
            <p className="return-link-text">Return to Client Hub</p>
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
        <div className="CompaniesDetail--info-card-container">
          {loggedInUserInfo.AdminLevel === "Super Admin"
            ? data.companies.map((company) => {
                return (
                  <CompanyInfoCard
                    name={company.CompanyName}
                    id={company.CompanyId}
                    projects={data.projects.companyProjects.filter(
                      (project) => company.CompanyId === project.CompanyId
                    )}
                    admins={data.admins.compAdminsOverall.filter(
                      (admin) => company.CompanyId === admin.CompanyId
                    )}
                    contacts={data.contacts.filter(
                      (contact) => company.CompanyId === contact.CompanyId
                    )}
                    hoursPerProject={data.projectsHoursBilledProjected.allProjects.filter(
                      (project) => company.CompanyId === project.CompanyId
                    )}
                  />
                );
              })
            : data.admins.compAdminsOverall
                .filter((admin) => {
                  return admin.EmpId === loggedInUserInfo.EmpId;
                })
                .map((company) => {
                  return (
                    <CompanyInfoCard
                      name={company.CompanyName}
                      id={company.CompanyId}
                      projects={data.projects.companyProjects.filter(
                        (project) => company.CompanyId === project.CompanyId
                      )}
                      admins={data.admins.compAdminsOverall.filter(
                        (admin) => company.CompanyId === admin.CompanyId
                      )}
                      contacts={data.contacts.filter(
                        (contact) => company.CompanyId === contact.CompanyId
                      )}
                      hoursPerProject={data.projectsHoursBilledProjected.allProjects.filter(
                        (project) => company.CompanyId === project.CompanyId
                      )}
                    />
                  );
                })}
        </div>
      ) : (
        <div className="CompaniesDetail--table-detail-container">
          {loggedInUserInfo.AdminLevel === "Super Admin" ? (
            <CompaniesReport
              entries={data.companies}
              projects={data.projectsHoursBilledProjected.allProjects}
            />
          ) : (
            <CompaniesReport
              entries={data.admins.compAdminsOverall.filter((admin) => {
                return admin.EmpId === loggedInUserInfo.EmpId;
              })}
              projects={data.projectsHoursBilledProjected.allProjects}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default CompaniesDetail;
