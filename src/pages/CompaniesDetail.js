import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/CompaniesDetail.css";
import CompanyInfoCard from "../components/CompanyInfoCard";
import CompaniesReport from "../components/CompaniesReport";

function CompaniesDetail(props) {
  let [tabActive, setTabActive] = useState("cardTab");
  let companies = props.companies.read();
  let projects = props.companyProjects.read();
  let admins = props.companyAdmins.read();
  let contacts = props.companyContacts.read();
  let projectsHoursBilledProjected = props.projectsHoursBilledProjected.read();
  let loggedInUserInfo = props.loggedInUser;
  let employeeInfoCardTabActive =
    "EmployeesDetail--tab EmployeesDetail--tab-active";
  let employeeInfoCardTabNotActive =
    "EmployeesDetail--tab EmployeesDetail--tab-not-active";

  console.log("company projects", projectsHoursBilledProjected);
  console.log(
    "company admins",
    admins.companyAdmins.filter((admin) => {
      return admin.EmpId === loggedInUserInfo.EmpId;
    })
  );
  console.log("Projects with hours:", projectsHoursBilledProjected);
  return (
    <main className="CompaniesDetail--content-container">
      <div className="kash_operations--upper-section-holder EmployeesDetail--upper-section-holder CompaniesDetail--upper-section-holder">
        <h1 className="add-employee__page-title form-page-title--lg-1 EmployeesDetail--page-title">
          Companies Detailed
        </h1>
        <div className="edit_page__return-link-holder CompaniesDetail--return-link-holder">
          <Link to="/clients-hub">
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
            <p className="return-link-text">Return to Clients</p>
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
            ? companies.map((company) => {
                return (
                  <CompanyInfoCard
                    name={company.CompanyName}
                    id={company.CompanyId}
                    projects={projects.companyProjects.filter(
                      (project) => company.CompanyId === project.CompanyId
                    )}
                    admins={admins.compAdminsOverall.filter(
                      (admin) => company.CompanyId === admin.CompanyId
                    )}
                    contacts={contacts.filter(
                      (contact) => company.CompanyId === contact.CompanyId
                    )}
                    hoursPerProject={projectsHoursBilledProjected.filter(
                      (project) => company.CompanyId === project.CompanyId
                    )}
                  />
                );
              })
            : admins
                .filter((admin) => {
                  return admin.EmpId === loggedInUserInfo.EmpId;
                })
                .map((company) => {
                  return (
                    <CompanyInfoCard
                      name={company.CompanyName}
                      id={company.CompanyId}
                      projects={projects.companyProjects.filter(
                        (project) => company.CompanyId === project.CompanyId
                      )}
                      admins={admins.filter(
                        (admin) => company.CompanyId === admin.CompanyId
                      )}
                      contacts={contacts.filter(
                        (contact) => company.CompanyId === contact.CompanyId
                      )}
                      hoursPerProject={projectsHoursBilledProjected.filter(
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
              entries={companies}
              projects={projectsHoursBilledProjected}
            />
          ) : (
            <CompaniesReport
              entries={admins.filter((admin) => {
                return admin.EmpId === loggedInUserInfo.EmpId;
              })}
              projects={projectsHoursBilledProjected}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default CompaniesDetail;
