import React from "react";
import "../assets/styles/EmployeesDetail.css";

function CompanyAdminInfoCard(props) {
  return (
    <section className="EmployeeInfoCard--section-container">
      <h3 className="EmployeeInfoCard--employee-name">{props.companyName}</h3>
      {console.log(props.companyId, props.companyAdminsArr)}

      <ol className="CompanyAdminInfoCard--employee-detail-section-container">
        {props.companyAdminsArr.map((admin) => {
          if (props.companyId === admin.CompanyId) {
            return (
              <li className="CompanyAdminInfoCard--employee-detail-section">
                <div className="CompanyAdminInfoCard--employee-detail-header">
                  <section className="EmployeeInfoCard--employee-name-id-username-section">
                    <div className="CompanyAdminInfoCard--employee-name">
                      {admin.FirstName + " " + admin.LastName}
                    </div>
                    <div className="EmployeeInfoCard--employee-username">
                      <label>Username:</label>
                      <span>{admin.KashOperationsUsn}</span>
                    </div>
                    <div className="EmployeeInfoCard--employee-id">
                      <label>EMP_ID:</label>
                      <span>{admin.EmpId}</span>
                    </div>
                  </section>

                  <section className="EmployeeInfoCard--employee-type">
                    {/*show contractor type and name if employee type is 1099-C  */}
                    {admin.EmployeeType === "W-2" ||
                    admin.EmployeeType === "" ||
                    admin.EmployeeType === "-" ? (
                      <div>
                        <div>
                          <label>Contract Type:</label>
                          <span>{admin.EmployeeType}</span>
                        </div>
                        <div className="EmployeeInfoCard--employee-level">
                          <label>User level:</label>
                          <span>{admin.AdminLevel}</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <label>Contract Type:</label>
                          <span className="EmployeeInfoCard--contractor">
                            {admin.EmployeeType}
                          </span>
                        </div>
                        <div>
                          <label>Contract Name:</label>
                          <span className="EmployeeInfoCard--contractor-name">
                            {admin.EmployeeContractorName}
                          </span>
                        </div>
                        <div className="EmployeeInfoCard--employee-level">
                          <label>User level:</label>
                          <span>{admin.AdminLevel}</span>
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
                        {admin.EmailAddress}
                      </span>
                    </li>
                    <li>
                      <label>Phone:</label>
                      <span>{admin.PhoneNumber}</span>
                    </li>
                    <li>
                      <label>Location:</label>
                      <span>
                        {admin.EmpLocationCity === "" ||
                        admin.EmpLocationState === "" ||
                        admin.EmpLocationCountry === "" ? (
                          <></>
                        ) : (
                          admin.EmpLocationCity +
                          ", " +
                          admin.EmpLocationState +
                          " - " +
                          admin.EmpLocationCountry
                        )}
                      </span>
                    </li>
                  </ol>
                </section>
              </li>
            );
          }
        })}
      </ol>
    </section>
  );
}

export default CompanyAdminInfoCard;
