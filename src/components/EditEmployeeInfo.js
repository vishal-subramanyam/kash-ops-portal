import React, { useState, useEffect, useRef } from "react";
import { domain } from "../assets/api/apiEndpoints";
import AlertMessage from "./AlertMessage";
import SuccessMessage from "./SuccessMessage";
import "../assets/styles/Styles.css";
import "../assets/styles/EditEmployeeInfo.css";

function EditEmployeeInfo(props) {
  let isAdminLocal = window.localStorage.getItem("adminLevel");
  let loggedInUserInfo = window.localStorage.getItem("loggedInUserInfo");
  let selectedEmployeeFromDropdown;
  let initialAdminOption = [{ AdminLevel: "" }];
  let adminLevelDesignation = useRef();
  let firstNameInput = useRef();
  let lastNameInput = useRef();
  let usernameDisplay = useRef();
  let emailAddressInput = useRef();
  let employeePhoneNumber = useRef();
  let employeeLocationCity = useRef();
  let employeeLocationState = useRef();
  let employeeLocationCountry = useRef();
  let employeeRoleType = useRef();
  let employeeContractorName = useRef();
  let [isContractor, setIsContractor] = useState(false);
  let editUserForm = useRef();
  let alertMessage = useRef();
  let successMessage = useRef();
  let editUserPopup = useRef();
  let [isEmployeeAdmin, setEmployeeAsAdmin] = useState(false);
  let [allEmployeesArr, setAllEmployeesArr] = useState([]);
  let [allUsersArr, setAllUsers] = useState([]);
  let [selectedCurrentUser, setSelectedCurrentUser] = useState({});
  let [message, setMessage] = useState("");

  useEffect(() => {
    getAllUsers();
  }, [selectedCurrentUser]);

  // hide popup for editting user details
  const hideLightbox = () => {
    editUserPopup.current.style.display = "none";
    usernameDisplay.current.innerHTML = "";
    editUserForm.current.reset();
  };

  const getAllUsers = () => {
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
        setAllUsers(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(
            `Unable to load users from database. Error: ${err}`
          )
        );
        alertMessage.current.showModal();
      });
  };

  // Force selection of Admin choice and remove selection attribute
  const setAdminOption = (selectedUser) => {
    for (let i = 0; i < adminLevelDesignation.current.childNodes.length; i++) {
      let adminSelectionChoice =
        adminLevelDesignation.current.childNodes[i].getAttribute("value");
      if (adminSelectionChoice === selectedUser[0].AdminLevel) {
        adminLevelDesignation.current.childNodes[i].setAttribute(
          "selected",
          true
        );
      } else if (adminSelectionChoice !== selectedUser[0].AdminLevel) {
        adminLevelDesignation.current.childNodes[i].removeAttribute("selected");
      }
    }
  };

  const setEmployeeRoleOption = (selectedUser) => {
    for (let i = 0; i < employeeRoleType.current.childNodes.length; i++) {
      let empRoleSelectionChoice =
        employeeRoleType.current.childNodes[i].getAttribute("value");
      if (empRoleSelectionChoice === selectedUser[0].EmployeeType) {
        employeeRoleType.current.childNodes[i].setAttribute("selected", true);
      } else if (empRoleSelectionChoice !== selectedUser[0].EmployeeType) {
        employeeRoleType.current.childNodes[i].removeAttribute("selected");
      }
    }
  };

  const onNameChange = async (e, i) => {
    let selectedEmployeeId =
      e.target.children[e.target.selectedIndex].getAttribute("data-employeeid");
    // set state array for selected employee if the employee Ids match
    selectedEmployeeFromDropdown = allUsersArr.filter((user, i) => {
      return selectedEmployeeId === user.EmpId;
    });

    if (selectedEmployeeFromDropdown.EmployeeType === "1099-C") {
      setIsContractor(true);
      console.log("trying to update state to true for isContractor");
    }

    console.log(selectedEmployeeFromDropdown);
    setUserDetailInputs(selectedEmployeeFromDropdown);

    // Selecting the admin level from dropdown
    if (selectedEmployeeFromDropdown.AdminLevel === "Super Admin") {
      setAdminOption(selectedEmployeeFromDropdown);
      setEmployeeRoleOption(selectedEmployeeFromDropdown);
    } else {
      adminLevelDesignation.current.value =
        selectedEmployeeFromDropdown[0].AdminLevel;
      employeeRoleType.current.value =
        selectedEmployeeFromDropdown[0].EmployeeType;
    }
    setSelectedCurrentUser(...selectedEmployeeFromDropdown);
  };

  const setUserDetailInputs = (user) => {
    firstNameInput.current.value = user[0].FirstName;
    lastNameInput.current.value = user[0].LastName;
    usernameDisplay.current.innerHTML = user[0].KashOperationsUsn;
    emailAddressInput.current.value = user[0].EmailAddress;
    employeePhoneNumber.current.value = user[0].PhoneNumber;
    employeeLocationCity.current.value = user[0].EmpLocationCity;
    employeeLocationState.current.value = user[0].EmpLocationState;
    employeeLocationCountry.current.value = user[0].EmpLocationCountry;
    // employeeRoleType.current.value = user[0].EmployeeType;
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransactionForUpdate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                EmpLocationCountry: employeeLocationCountry.current.value,
                FirstName: firstNameInput.current.value,
                EmpLocationCity: employeeLocationCity.current.value,
                EmailAddress: emailAddressInput.current.value,
                EmpLocationState: employeeLocationState.current.value,
                PhoneNumber: employeePhoneNumber.current.value,
                LastName: lastNameInput.current.value,
                EmpId: selectedCurrentUser.EmpId,
                AdminLevel: adminLevelDesignation.current.value,
                EmployeeType: employeeRoleType.current.value,
              },
            ],
            _keyword_: "KASH_OPERATIONS_USER_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      setSelectedCurrentUser((prevState) => ({
        ...prevState,
        EmpLocationCountry: employeeLocationCountry.current.value,
        FirstName: firstNameInput.current.value,
        EmpLocationCity: employeeLocationCity.current.value,
        EmailAddress: emailAddressInput.current.value,
        EmpLocationState: employeeLocationState.current.value,
        PhoneNumber: employeePhoneNumber.current.value,
        LastName: lastNameInput.current.value,
        EmpId: selectedCurrentUser.EmpId,
        AdminLevel: adminLevelDesignation.current.value,
        EmployeeType: employeeRoleType.current.value,
      }));
      setMessage(alertMessageDisplay("User Updated."));
      successMessage.current.showModal();
    } catch (error) {
      setMessage(alertMessageDisplay(`Unable to update user. Error: ${error}`));
      alertMessage.current.showModal();
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    // check if selected employee is admin, delete from admin and employee tables
    // make a fetch call to the delete user endpoint
    try {
      const response = await fetch(
        `${domain}/GenericTransactionService/processTransactionForDelete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                EmpId: selectedCurrentUser.EmpId,
              },
            ],
            _keyword_: "KASH_OPERATIONS_USER_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      setMessage(alertMessageDisplay("User Deleted"));
      successMessage.current.showModal();
    } catch (error) {
      setMessage(alertMessageDisplay(`Unable to delete user. Error: ${error}`));
      alertMessage.current.showModal();
    }
    console.log(editUserForm.current);
    editUserForm.current.reset();
    setAdminOption(initialAdminOption);
    setSelectedCurrentUser({});
  };

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
    successMessage.current.close();
    usernameDisplay.current.innerHTML = "";
    editUserForm.current.reset();
  };

  return (
    <div className="EditEmployeeInfo--wrapper" ref={editUserPopup}>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
      <SuccessMessage
        ref={successMessage}
        close={closeAlert}
        message={message}
      />
      <div className="EditEmployeeInfo--content-container">
        <form ref={editUserForm} className="edit-user-form-container">
          <label
            className="manage_roles--employee_label edit-user-dropdown"
            htmlFor="EMP_ID"
          >
            Employee
            <select name="EMP_ID" id="EMP_ID" onChange={onNameChange}>
              <option value="Select an Employee">-Select an Employee-</option>
              {allUsersArr.map((employee, i) => {
                return (
                  <option
                    data-employeeid={employee.EmpId}
                    value={`${employee.FirstName} ${employee.LastName}`}
                    key={i}
                  >
                    {`${employee.FirstName} ${employee.LastName}`}
                  </option>
                );
              })}
            </select>
          </label>

          <div className="employee-info-form">
            <div className="left_group_inputs">
              <label
                className="manage_roles--employee_label esit-user-username"
                htmlFor="manage_employees--first-name"
              >
                Username
              </label>
              <p
                id="username-display"
                name="manage_employees--username"
                className="username-display"
                ref={usernameDisplay}
              ></p>
              <label htmlFor="admin-level-designation">Admin Level</label>
              {isAdminLocal === '"Super Admin"' ? (
                <select
                  name="admin-level-designation"
                  id="admin-designation"
                  className="admin-designation"
                  ref={adminLevelDesignation}
                >
                  <option value=""></option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Basic User">Basic User</option>
                </select>
              ) : (
                <input
                  name="admin-level-designation"
                  id="admin-designation"
                  className="admin-designation"
                  readOnly
                  ref={adminLevelDesignation}
                />
              )}

              <label htmlFor="employee-role-designation">Employee Role</label>
              {isAdminLocal === '"Super Admin"' ? (
                <select
                  name="employee-role-designation"
                  id="employee-role-designation"
                  className="employee-role-designation"
                  ref={employeeRoleType}
                >
                  <option value=""></option>
                  <option value="W-2">W-2</option>
                  <option value="1099-C">1099-C</option>
                </select>
              ) : (
                <input
                  name="employee-role-designation"
                  id="employee-role-designation"
                  className="employee-role-designation"
                  readOnly
                  ref={employeeRoleType}
                />
              )}

              {/* If logged-in user is a 1099-C type employee, show contractor name input. Dont show if user employee role is W-2 */}
              {console.log("IS selected user contractor:", isContractor)}
              {isContractor === true ? (
                <div>
                  <label htmlFor="employee-role-designation">
                    Employee Contractor Name
                  </label>
                  {isAdminLocal === '"Super Admin"' ? (
                    <input
                      name="employee-contractor-name"
                      id="employee-contractor-name"
                      className="employee-contractor-name"
                      ref={employeeContractorName}
                    />
                  ) : (
                    <input
                      name="employee-contractor-name"
                      id="employee-contractor-name"
                      className="employee-contractor-name"
                      readOnly
                      ref={employeeContractorName}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}

              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--first-name"
              >
                First name
                <input
                  id="firstnamebox"
                  name="manage_employees--first-name"
                  className="form-control"
                  // defaultValue={selectedCurrentUser.FirstName}
                  ref={firstNameInput}
                ></input>
              </label>

              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--last_name"
              >
                Last name
                <input
                  id="lastnamebox"
                  name="manage_employees--last_name"
                  className="form-control"
                  // defaultValue={selectedCurrentUser.LastName}
                  ref={lastNameInput}
                ></input>
              </label>

              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--email"
              >
                Email Address
                <input
                  id="emailbox"
                  name="manage_employees--email"
                  className="form-control"
                  // defaultValue={selectedCurrentUser.EmailAddress}
                  ref={emailAddressInput}
                ></input>
              </label>

              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--phone"
              >
                Phone Number
                <input
                  id="phonebox"
                  name="manage_employees--phone"
                  className="form-control"
                  // defaultValue={selectedCurrentUser.PhoneNumber}
                  ref={employeePhoneNumber}
                ></input>
              </label>
            </div>

            <div className=" left_group_inputs">
              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--city"
              >
                Location City
                <input
                  id="citybox"
                  name="manage_employees--city"
                  className="form-control"
                  // defaultValue={selectedCurrentUser.EmpLocationCity}
                  ref={employeeLocationCity}
                ></input>
              </label>

              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--state"
              >
                State/Province/Territory
                <input
                  id="statebox"
                  name="manage_employees--state"
                  className="form-control"
                  // defaultValue={selectedCurrentUser.EmpLocationState}
                  ref={employeeLocationState}
                ></input>
              </label>

              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--email"
              >
                Country
                <input
                  id="countrybox"
                  name="manage_employees--email"
                  className="form-control"
                  // defaultValue={selectedCurrentUser.EmpLocationCountry}
                  ref={employeeLocationCountry}
                ></input>
              </label>

              <div className="buttonContainer">
                <button
                  className="btn btn-primary update-user-btn"
                  onClick={updateUser}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger delete-user-btn"
                  onClick={deleteUser}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeeInfo;
