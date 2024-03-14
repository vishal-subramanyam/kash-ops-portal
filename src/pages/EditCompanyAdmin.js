import React, { useEffect, useState, useRef } from "react";
import AlertMessage from "../components/AlertMessage";
import SuccessMessage from "../components/SuccessMessage";
import "../assets/styles/Styles.css";
import { Link } from "react-router-dom";
import { domain } from "../assets/api/apiEndpoints";
import CompanyAdminInfoCard from "../components/CompanyAdminInfoCard";

function EditCompanyAdmin(props) {
  let [tabActive, setTabActive] = useState("editTab");
  let companyRemoveAdminForm = useRef();
  let companyAddAdminForm = useRef();
  let alertMessage = useRef();
  let successMessage = useRef();
  let companyAdmins = props.companyAdmins.read();
  let [message, setMessage] = useState("");
  let [allAdmins, setAllAdmins] = useState([]);
  let [allCompanies, setAllCompanies] = useState([]);
  let [allCompanyAdmins, setAllCompanyAdmins] = useState([]);
  let [allAdminsPerCompany, setAllAdminsPerCompany] = useState([]);
  let [companyNameToAddAdmin, setCompanyNameToAddAdmin] = useState();
  let [companyNameToRemove, setCompanyNameToRemove] = useState();
  let [companyIdToAddAdmin, setCompanyIdToAddAdmin] = useState();
  let [adminUserIdToAddToCompany, setAdminUserIdToAddToCompany] = useState();
  let [adminUsernameToAddToCompany, setAdminUsernameToAddToCompany] =
    useState();
  let [adminFullNameToAddToCompany, setAdminFullNameToAddToCompany] =
    useState();
  let [adminFullNameToRemove, setAdminFullNameToRemove] = useState();
  let [companyIdToRemoveAdmin, setCompanyIdToRemoveAdmin] = useState();
  let [adminEmpIdToRemoveFromCompany, setAdminEmpIdToRemoveFromCompany] =
    useState();
  let employeeInfoCardTabActive =
    "EmployeesDetail--tab EmployeesDetail--tab-active";
  let employeeInfoCardTabNotActive =
    "EmployeesDetail--tab EmployeesDetail--tab-not-active";
  //   filter allCompanyAdmins array to remove duplicate company names
  let distinctCompanies = Object.values(
    companyAdmins.reduce((c, e) => {
      if (!c[e.CompanyName]) {
        c[e.CompanyName] = e;
      }
      return c;
    }, {})
  );
  console.log(distinctCompanies);

  useEffect(() => {
    getAllCompanies();
    getAllAdmins();
    getAllCompanyAdmins();
  }, []);

  const getAllCompanies = () => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_COMPANY_TABLE" }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAllCompanies(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to load companies from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };
  const getAllAdmins = () => {
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_USER_TABLE" }),
    })
      .then((res) => res.json())
      .then((res) => {
        let admins = res.data.filter((user) => {
          return user.AdminLevel !== "Basic User";
        });
        setAllAdmins(admins);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to load admin users from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  const getAllCompanyAdmins = async () => {
    try {
      let res = await fetch(
        `${domain}GenericResultBuilderService/buildResults`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _keyword_: "KASH_OPERATIONS_COMPANY_ADMIN_ROLE_TABLE",
          }),
        }
      );
      let data = await res.json();

      if (props.loggedInUser.AdminLevel === "Super Admin") {
        console.log("logged in user is Super Admin");
        setAllCompanyAdmins(data.data);
      } else {
        let adminCompanies = data.data.filter((company) => {
          return company.EmpId === props.loggedInUser.EmpId;
        });
        setAllCompanyAdmins(adminCompanies);
      }
    } catch (error) {
      setMessage(
        alertMessageDisplay(
          `Unable to load company admins from database. Error: ${error}`
        )
      );
      alertMessage.current.showModal();
    }
  };

  const selectCompanyToAddAdmin = (e) => {
    let companyId =
      e.target[e.target.selectedIndex].getAttribute("data-companyid");
    let companyName = e.target[e.target.selectedIndex].getAttribute("value");
    console.log(companyName);
    setCompanyIdToAddAdmin(companyId);
    setCompanyNameToAddAdmin(companyName);
  };

  const selectAdminUserToAdd = (e) => {
    let userFullName = e.target[e.target.selectedIndex].getAttribute("value");
    let userId = e.target[e.target.selectedIndex].getAttribute("data-userid");
    let username =
      e.target[e.target.selectedIndex].getAttribute("data-username");
    console.log(userFullName);
    setAdminUserIdToAddToCompany(userId);
    setAdminUsernameToAddToCompany(username);
    setAdminFullNameToAddToCompany(userFullName);
  };

  const addAdminToCompany = async (e) => {
    e.preventDefault();
    if (!adminUserIdToAddToCompany || !companyIdToAddAdmin) {
      setMessage(
        alertMessageDisplay("Please select both a company and admin.")
      );
      alertMessage.current.showModal();
      return;
    }

    // iterate the all company admins state array, concatinate value of companyId with value of EmpId and compare to the entry in allCompanyAdmins state array at index i
    for (let i = 0; i < allCompanyAdmins.length; i++) {
      let selectedUserAndCompany =
        companyIdToAddAdmin + adminUserIdToAddToCompany;
      console.log(selectedUserAndCompany);
      let existingUserAndCompanyRecord =
        allCompanyAdmins[i].CompanyId + allCompanyAdmins[i].EmpId;
      console.log(existingUserAndCompanyRecord);

      if (selectedUserAndCompany === existingUserAndCompanyRecord) {
        setMessage(
          alertMessageDisplay(
            `${adminFullNameToAddToCompany} is already an admin for ${companyNameToAddAdmin}`
          )
        );
        alertMessage.current.showModal();
        return;
      }
    }

    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                EmpId: adminUserIdToAddToCompany,
                KashOperationsUsn: adminUsernameToAddToCompany,
                CompanyId: companyIdToAddAdmin,
              },
            ],
            _keyword_: "KASH_OPERATIONS_COMPANY_ADMIN_ROLE_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      let addMsg =
        adminFullNameToAddToCompany +
        " was successfully added as an admin to " +
        companyNameToAddAdmin +
        "!";
      setMessage(successMessageDisplay(`${addMsg}`));
      successMessage.current.showModal();
    } catch (error) {
      setMessage(
        alertMessageDisplay(`Unable to add admin to company. Error: ${error}`)
      );
      alertMessage.current.showModal();
    }
    getAllCompanyAdmins();
    companyAddAdminForm.current.reset();
    companyRemoveAdminForm.current.reset();
    setAllAdminsPerCompany([]);
    setCompanyIdToAddAdmin("");
    setCompanyNameToAddAdmin("");
    setAdminUserIdToAddToCompany("");
    setAdminUsernameToAddToCompany("");
    setAdminFullNameToAddToCompany("");
  };

  const selectCompanyPopulateAdminsToRemove = (e) => {
    console.log(
      "Company selected to populate the admin drop down with admins for that company"
    );
    let companyId =
      e.target[e.target.selectedIndex].getAttribute("data-companyid");
    let companyName = e.target[e.target.selectedIndex].getAttribute("value");
    setCompanyNameToRemove(companyName);
    setCompanyIdToRemoveAdmin(companyId);
    let adminsPerComapny = allCompanyAdmins.filter((admin) => {
      return admin.CompanyId === companyId;
    });
    console.log(adminsPerComapny);
    console.log(allAdmins);
    let adminFullnames = [];

    // get the names of the admins per company since the company admin role table only includes the emp ids
    for (let i = 0; i < allAdmins.length; i++) {
      for (let j = 0; j < adminsPerComapny.length; j++) {
        if (allAdmins[i].EmpId === adminsPerComapny[j].EmpId) {
          adminFullnames.push(allAdmins[i]);
        }
      }
    }
    console.log(adminFullnames.sort());
    setAllAdminsPerCompany(adminFullnames);
  };

  const selectAdminToRemove = (e) => {
    console.log("selected admin to remove from company");
    let userId = e.target[e.target.selectedIndex].getAttribute("data-userid");
    let userFullName = e.target[e.target.selectedIndex].getAttribute("value");
    setAdminFullNameToRemove(userFullName);
    setAdminEmpIdToRemoveFromCompany(userId);
  };

  const removeAdminFromCompany = async (e) => {
    e.preventDefault();
    console.log("remove selected admin from selected company");
    if (!companyIdToRemoveAdmin || !adminEmpIdToRemoveFromCompany) {
      setMessage(
        alertMessageDisplay(
          "Please select both a company and admin for removal."
        )
      );
      alertMessage.current.showModal();
      return;
    }
    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransactionForDelete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                EmpId: adminEmpIdToRemoveFromCompany,
                CompanyId: companyIdToRemoveAdmin,
              },
            ],
            _keyword_: "KASH_OPERATIONS_COMPANY_ADMIN_ROLE_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );

      let msg =
        adminFullNameToRemove +
        " was successfully removed as an Admin from " +
        companyNameToRemove +
        "!";

      setMessage(successMessageDisplay(`${msg}`));
      successMessage.current.showModal();
    } catch (error) {
      setMessage(
        alertMessageDisplay(
          `Unable to remove admin from company. Error: ${error}`
        )
      );
      alertMessage.current.showModal();
    }
    companyRemoveAdminForm.current.reset();
    setAllAdminsPerCompany([]);
    setCompanyNameToRemove("");
    setCompanyIdToRemoveAdmin("");
    setAdminFullNameToRemove("");
    setAdminEmpIdToRemoveFromCompany("");
    getAllCompanyAdmins();
  };

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const successMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
    successMessage.current.close();
  };

  return (
    <div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
      <SuccessMessage
        ref={successMessage}
        close={closeAlert}
        message={message}
      />
      <dialog className="database-submit-dialog" id="database-submit-dialog">
        <form method="dialog">
          <div id="database-submit-dialog--text-content-holder">
            <button
              className="dialog-modal-confirm-button"
              id="dialog-modal-confirm-button"
              value="confirm"
            >
              OK
            </button>
          </div>
        </form>
      </dialog>

      <main className="EditCompanyAdmins--main-container edit-comp-contact-page__main-section max-width--main-container">
        <div className="kash_operations--upper-section-holder">
          <h1 className="edit-comp-contact-title form-page-title--lg-1">
            Manage Company Admins
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
            onClick={() => setTabActive("editTab")}
          >
            <span>Edit</span>
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

        {tabActive === "editTab" ? (
          <div className="edit-comp-contact-page--content-holder">
            <form
              id="attach_contact_to_project--form"
              className="edit_contact_page--mini-form attach_contact_to_project--form"
              ref={companyAddAdminForm}
            >
              <h2 className="attach_contact_to_project--title">
                Attach Admin to Company
              </h2>
              <div className="attach_contact_to_project--content-holder">
                <div className="company-information-holder">
                  <label
                    htmlFor="attach_contact_to_project--company_name--selection"
                    className="attach_contact_to_project--company_name--label"
                  >
                    Company
                    <select
                      name="attach_contact_to_project--company_name--selection"
                      id="attach_contact_to_project--company_name--selection"
                      className="attach_contact_to_project--company_name--selection"
                      onChange={selectCompanyToAddAdmin}
                    >
                      {console.log("All companies: ", allCompanies)}
                      {console.log("All company admins: ", allCompanyAdmins)}
                      {console.log(
                        allCompanies.filter((company) => {
                          allCompanyAdmins.map((admin) => {
                            return company.CompanyId === admin.CompanyId;
                          });
                        })
                      )}
                      <option value="">- Select a Company -</option>
                      {allCompanies.map((company, i) => {
                        return (
                          <option
                            key={i}
                            value={company.CompanyName}
                            data-companyid={company.CompanyId}
                          >
                            {company.CompanyName}
                          </option>
                        );
                      })}
                    </select>
                  </label>

                  <label
                    htmlFor="attach_contact_to_project--contact_name--selection"
                    className="attach_contact_to_project--contact_name--label"
                  >
                    Admin Name
                    <select
                      name="attach_contact_to_project--contact_name--selection"
                      id="attach_contact_to_project--contact_name--selection"
                      className="attach-contact-to-project--form-input attach_contact_to_project--contact_name--selection"
                      onChange={selectAdminUserToAdd}
                    >
                      <option
                        id="attach_contact_to_project--contact-name-empty-display-option"
                        value=""
                      >
                        - Please Select an Admin -
                      </option>
                      {allAdmins.map((admin, i) => {
                        return (
                          <option
                            id="attach_contact_to_project--contact-name-empty-display-option"
                            key={i}
                            value={admin.FirstName + " " + admin.LastName}
                            data-userid={admin.EmpId}
                            data-username={admin.KashOperationsUsn}
                          >
                            {admin.FirstName + " " + admin.LastName}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              </div>
              <button
                id="attach-contact-to-project--button"
                onClick={addAdminToCompany}
              >
                Add to Company
              </button>
            </form>

            <form
              id="remove_contact_from_project--form"
              className="edit_contact_page--mini-form remove_contact_from_project--form"
              ref={companyRemoveAdminForm}
            >
              <h2 className="remove_contact_from_project--title">
                Remove Admin from Company
              </h2>
              <div className="remove_contact_from_project--content-holder">
                <label
                  htmlFor="remove_contact_from_project--project_description--selection"
                  className="remove_contact_from_project--project_description--label"
                >
                  Company
                  <select
                    name="remove_contact_from_project--project_description--selection"
                    id="remove_contact_from_project--project_description--selection"
                    className="remove_contact_from_project--project_description--selection"
                    onChange={selectCompanyPopulateAdminsToRemove}
                  >
                    <option value="">- Select a Company -</option>
                    {allCompanies.map((company, i) => {
                      return (
                        <option
                          key={i}
                          value={company.CompanyName}
                          data-companyid={company.CompanyId}
                        >
                          {company.CompanyName}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <label
                  htmlFor="remove_contact_from_project--contact_name--selection"
                  className="remove_contact_from_project--contact_name--label"
                >
                  Admin Name
                  <select
                    name="remove_contact_from_project--contact_name--selection"
                    id="remove_contact_from_project--contact_name--selection"
                    className="remove-contact-from-project--form-input remove_contact_from_project--contact_name--selection"
                    onChange={selectAdminToRemove}
                  >
                    <option
                      id="remove_contact_from_project--contact-name-empty-display-option"
                      value=""
                    >
                      - Please Select a Company First -
                    </option>

                    {allAdminsPerCompany.map((admin, i) => {
                      return (
                        <option
                          id="remove_contact_from_project--contact-name-empty-display-option"
                          key={i}
                          value={admin.FirstName + " " + admin.LastName}
                          data-userid={admin.EmpId}
                        >
                          {admin.FirstName + " " + admin.LastName}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <button
                id="remove-contact-from-project--button"
                onClick={removeAdminFromCompany}
              >
                Remove From Company
              </button>
            </form>
          </div>
        ) : (
          <div className="CompaniesDetail--company-admin-detail-container">
            {distinctCompanies.map((company) => {
              return (
                <CompanyAdminInfoCard
                  companyName={company.CompanyName}
                  companyId={company.CompanyId}
                  companyAdminsArr={companyAdmins}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default EditCompanyAdmin;
