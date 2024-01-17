import React, { useState, useEffect, useRef } from "react";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Styles.css";
import "../assets/styles/EditEmployeeInfo.css";

function EditEmployeeInfo() {
  let selectedEmployeeFromDropdown;
  let initialAdminOption = [{ AdminLevel: "" }];
  let adminLevelDesignation = useRef();
  let firstNameInput = useRef();
  let lastNameInput = useRef();
  let emailAddressInput = useRef();
  let employeePhoneNumber = useRef();
  let employeeLocationCity = useRef();
  let employeeLocationState = useRef();
  let employeeLocationCountry = useRef();
  let editUserForm = useRef();
  let adminOptionChoice = useRef();
  let [isEmployeeAdmin, setEmployeeAsAdmin] = useState(false);
  let [allEmployeesArr, setAllEmployeesArr] = useState([]);
  let [allUsersArr, setAllUsers] = useState([]);
  let [selectedCurrentUser, setSelectedCurrentUser] = useState({});

  const hideLightbox = () => {
    document.getElementsByClassName("lightboxbackdrop")[0].style.display =
      "none";
  };

  // useEffect to fetch data from KASH_OPERATIONS_EMPLOYEE_TABLE for the employee select dropdown that triggers onNameChange function
  // fetch from Employee table and check if employee is Admin level
  // if Admin level user, check the admin checkbox

  useEffect(() => {
    getAllUsers();
  }, [selectedCurrentUser]);

  const getAllUsers = () => {
    console.log("Use effect to query user table");
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
        console.log(res);
        setAllUsers(res.data);
      })
      .catch((err) => alert(err));
  };

  const setAdminOption = (selectedUser) => {
    console.log(selectedUser);
    for (let i = 0; i < adminLevelDesignation.current.childNodes.length; i++) {
      let adminSelectionChoice =
        adminLevelDesignation.current.childNodes[i].getAttribute("value");
      if (adminSelectionChoice === selectedUser[0].AdminLevel) {
        console.log("seleted admin", adminSelectionChoice);
        adminLevelDesignation.current.childNodes[i].setAttribute(
          "selected",
          true
        );
      } else if (adminSelectionChoice !== selectedUser[0].AdminLevel) {
        adminLevelDesignation.current.childNodes[i].removeAttribute("selected");
      }
    }
  };
  const onNameChange = async (e, i) => {
    // fetch employee name from database
    // populate the input fields with relevant data from api call

    console.log(
      "selected employee from dropdown " +
        e.target.children[e.target.selectedIndex].getAttribute(
          "data-employeeId"
        )
    );
    let selectedEmployeeId =
      e.target.children[e.target.selectedIndex].getAttribute("data-employeeid");
    // set state array for selected employee if the employee Ids match
    selectedEmployeeFromDropdown = allUsersArr.filter((user, i) => {
      return selectedEmployeeId === user.EmpId;
    });
    setUserDetailInputs(selectedEmployeeFromDropdown);
    setAdminOption(selectedEmployeeFromDropdown);
    setSelectedCurrentUser(...selectedEmployeeFromDropdown);
  };

  const setUserDetailInputs = (user) => {
    console.log(user);
    firstNameInput.current.value = user[0].FirstName;
    lastNameInput.current.value = user[0].LastName;
    emailAddressInput.current.value = user[0].EmailAddress;
    employeePhoneNumber.current.value = user[0].PhoneNumber;
    employeeLocationCity.current.value = user[0].EmpLocationCity;
    employeeLocationState.current.value = user[0].EmpLocationState;
    employeeLocationCountry.current.value = user[0].EmpLocationCountry;
  };

  const updateUser = async (e) => {
    e.preventDefault();
    console.log(selectedCurrentUser);

    // make a fetch post call to update employee info given field values
    try {
      const response = await fetch(
        `${domain}GenericTransactionService/processTransactionForUpdate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
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
              },
            ],
            _keyword_: "KASH_OPERATIONS_USER_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("Updated User");
      console.log(data);
      alert("User Updated");
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      alert("Unable to update user.");
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
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("Deleted user", data);
      // setselectedCurrentUser({});
      // console.log(selectedCurrentUser);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
      alert("Unable to delete user.");
    }
    console.log(editUserForm.current);
    editUserForm.current.reset();
    setAdminOption(initialAdminOption);
    setSelectedCurrentUser({});
    alert("User Deleted");
  };

  return (
    <div className="lightboxbackdrop">
      <div className="lightbox" style={{ overflow: "scroll" }}>
        <span onClick={hideLightbox} className="x-button">
          X
        </span>
        <div className="edit-employee_information--body">
          <div
            id="employee_edit_container"
            className="edit_table_container col-12"
          >
            <div className="roles_and_responsibilities--mini-form manage_roles_and_tasks--form">
              <h2>Edit Employee Information</h2>
              <form ref={editUserForm}>
                <label
                  className="manage_roles--employee_label"
                  htmlFor="EMP_ID"
                >
                  Employee
                  <select name="EMP_ID" id="EMP_ID" onChange={onNameChange}>
                    <option value="Select an Employee">
                      -Select an Employee-
                    </option>
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
                {/* <form ref={addEmployeeForm}> */}
                <div className="employee-info-form">
                  <div className="left_group_inputs">
                    <br />
                    <label htmlFor="admin-level-designation">Admin Level</label>
                    <select
                      name="admin-level-designation"
                      id="admin-designation"
                      className="admin-designation"
                      ref={adminLevelDesignation}
                    >
                      <option value=""></option>
                      <option value="SuperAdmin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="BasicUser">Basic User</option>
                    </select>
                    <br />
                    {/* <label htmlFor="userName">
                Username
                <input
                  // style={{ display: "none" }}
                  id="userName"
                  className="form-control"
                  value={selectedCurrentUser.KashOperationsUsn}
                  readOnly
                />
              </label> */}

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
                      <button className="btn btn-primary" onClick={updateUser}>
                        Update
                      </button>
                      <button className="btn btn-danger" onClick={deleteUser}>
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeInfo;
