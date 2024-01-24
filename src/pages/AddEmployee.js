import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage.js";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/api/apiEndpoints.js";
import "../assets/styles/HomePage.css";

function AddEmployee() {
  //   // input value variables
  let [message, setMessage] = useState("");
  let adminLevelDesignation = useRef();
  let addEmployeeForm = useRef();
  let firstNameInput = useRef();
  let lastNameInput = useRef();
  let userIDInput = useRef();
  let usernameInput = useRef();
  let employeeEmail = useRef();
  let employeePhoneNumber = useRef();
  let employeeCity = useRef();
  let employeeState = useRef();
  let employeeCountry = useRef();
  let employeeAdress = useRef();
  let employeeZip = useRef();
  let employeeRoleType = useRef();
  let contractorName = useRef();
  let modalEmployeeFirstName = useRef();
  let modalEmployeeLastName = useRef();
  let modalEmployeeId = useRef();
  let submitEmployeeToDBDialog = useRef();
  let alertMessage = useRef();
  let [adminCheckbox, setAdminCheckbox] = useState(false);
  let [allUsersArr, setAllUsersArr] = useState([]);

  let requiredInputs = [
    firstNameInput,
    lastNameInput,
    userIDInput,
    usernameInput,
  ];

  useEffect(() => {
    getAllUsers();
  }, []);

  const addUser = async () => {
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
                EmpId: userIDInput.current.value,
                FirstName: firstNameInput.current.value,
                LastName: lastNameInput.current.value,
                EmailAddress: employeeEmail.current.value,
                PhoneNumber: employeePhoneNumber.current.value,
                EmpLocationCity: employeeCity.current.value,
                EmpLocationState: employeeState.current.value,
                EmpLocationCountry: employeeCountry.current.value,
                AdminLevel: adminLevelDesignation.current.value,
                KashOperationsUsn: usernameInput.current.value,
                EmployeeAddress: employeeAdress.current.value,
                EmployeeZipCode: employeeZip.current.value,
                EmployeeType: employeeRoleType.current.value,
                EmployeeContractorName: contractorName.current.value,
              },
            ],
            _keyword_: "KASH_OPERATIONS_USER_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("Added to User table", data);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
      alert("Unable to add user.");
    }
  };

  // SHOW MODAL FOR NEWLY ADDED EMPLOYEE INFO
  const onModalOpen = () => {
    console.log("modal first name", modalEmployeeFirstName.current.value);
    console.log("first name ref", firstNameInput.current.value);
    modalEmployeeFirstName.current.innerHTML = firstNameInput.current.value;
    modalEmployeeLastName.current.innerHTML = lastNameInput.current.value;
    modalEmployeeId.current.innerHTML = userIDInput.current.value;

    console.log("show modal function");
    if (typeof submitEmployeeToDBDialog.current.showModal === "function") {
      submitEmployeeToDBDialog.current.showModal();
    } else {
      alert("Sorry, the <dialog> API is not supported by this browser.");
    }
  };

  const getAllUsers = async () => {
    console.log("check if Emp Username already exists");
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "KASH_OPERATIONS_USER_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response from the users fetch", res);
        console.log(usernameInput.current.value);
        console.log(userIDInput.current.value);
        setAllUsersArr(res.data);
      })
      .catch((err) => alert(err));
  };

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
    addEmployeeForm.current.reset();
  };

  const validateRequiredInputs = async (e) => {
    e.preventDefault();
    console.log(allUsersArr);
    let userNameExistsArr = allUsersArr.filter(
      (userName) => userName.KashOperationsUsn === usernameInput.current.value
    );
    let userIdExistsArr = allUsersArr.filter(
      (userId) => userId.EmpId === userIDInput.current.value
    );
    console.log(userNameExistsArr);
    console.log(userIdExistsArr);
    console.log(usernameInput.current.value);
    // if employee id exists, the response will be a array containing the employee object
    if (userIdExistsArr.length !== 0) {
      setMessage(
        alertMessageDisplay(
          "User ID already exists. Choose a different ID number."
        )
      );
      alertMessage.current.showModal();
      return;
    } else if (userNameExistsArr.length !== 0) {
      setMessage(
        alertMessageDisplay(
          "Username already exists. Choose a different username."
        )
      );
      alertMessage.current.showModal();
      return;
    } else {
      // addUser();
      onModalOpen();
      addEmployeeForm.current.reset();
    }
  };

  return (
    <div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />;
      <dialog
        className="database-submit-dialog"
        id="database-submit-dialog"
        ref={submitEmployeeToDBDialog}
      >
        <form method="dialog">
          <p>Employee Added: </p>
          <div>
            <span
              id="employee-page-dialog--first_name-span"
              className="employee-page-dialog--first_name-span"
            >
              Name:
            </span>{" "}
            <span
              id="employee-page-dialog--first_name-span"
              className="employee-page-dialog--first_name-span"
              ref={modalEmployeeFirstName}
            ></span>{" "}
            <span
              className="employee-page-dialog--last_name-span"
              id="employee-page-dialog--last_name-span"
              ref={modalEmployeeLastName}
            ></span>
          </div>
          <div>
            <span
              id="employee-page-dialog--id-span"
              className="employee-page-dialog--id-span"
            >
              Emp Id:
            </span>{" "}
            <span
              id="employee-page-dialog--id-span"
              className="employee-page-dialog--id-span"
              ref={modalEmployeeId}
            ></span>
          </div>

          <div>
            <button
              className="dialog-modal-confirm-button"
              id="dialog-modal-confirm-button"
              value="confirm"
              sttyle={{ marginTop: "15px" }}
            >
              OK
            </button>
          </div>
        </form>
      </dialog>
      <main className="add-employee-page__main-section max-width--main-container">
        <h1 className="add-employee__page-title form-page-title--lg-1">
          Add an Employee
        </h1>
        <div className="edit_page__return-link-holder">
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
        <form
          onSubmit={validateRequiredInputs}
          id="add-employee-form"
          className="add-employee-form"
          ref={addEmployeeForm}
        >
          <div className="add-employee-form--top-section">
            <div className="add-employee-img-holder">
              <img
                src="https://raw.githubusercontent.com/Alex-Gardner/KASH_Tech_Operations_Portal/main/kashtech-project-reporting-portal/assets/raster-assets/amy-hirschi-JaoVGh5aJ3E-unsplash.webp"
                alt="Two women collaborating over laptop"
                className="add-employee-img"
              />
            </div>
            <div className="add-employee-form--id-content">
              <label
                htmlFor="employee-form--firstname-input"
                className="employee-form--firstname-label"
              >
                First Name
                <input
                  required="required"
                  type="text"
                  className="add-employee-form-input employee-form--firstname-input"
                  id="employee-form--firstname-input"
                  name="employee-form--firstname-input"
                  ref={firstNameInput}
                />
              </label>

              <label
                htmlFor="employee-form--lastname-input"
                className="employee-form--lastname-label"
              >
                Last Name
                <input
                  required
                  type="text"
                  className="add-employee-form-input employee-form--lastname-input"
                  id="employee-form--lastname-input"
                  name="employee-form--lastname-input"
                  ref={lastNameInput}
                />
              </label>

              <label
                htmlFor="employee-form--id-input"
                className="employee-form--id-label"
              >
                Employee ID
                <input
                  required
                  type="text"
                  className="add-employee-form-input employee-form--id-input"
                  id="employee-form--id-input"
                  name="employee-form--id-input"
                  ref={userIDInput}
                />
              </label>

              <label
                htmlFor="employee-form--wf-name-select"
                className="employee-form--wf-name-label"
              >
                Username
                <input
                  required
                  className="employee-form--wf-name-select"
                  id="employee-form--wf-name-select"
                  name="employee-form--wf-name-select"
                  ref={usernameInput}
                />
              </label>
              <div className="admin-designation-container checkBoxLabel">
                <span className="employee--form--id-label">Add as admin?</span>
                <select
                  name="admin-level-designation"
                  id="admin-designation"
                  className="admin-designation"
                  ref={adminLevelDesignation}
                  required
                >
                  <option value=""></option>
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="BasicUser">Basic User</option>
                </select>
              </div>
            </div>
          </div>

          <div className="employee-form--personal-content-holder">
            <label
              htmlFor="employee-form--email-input"
              className="employee-form--email-label"
            >
              Email Address
              <input
                type="text"
                className="add-employee-form-input employee-form--email-input"
                id="employee-form--email-input"
                name="employee-form--email-input"
                ref={employeeEmail}
              />
            </label>

            <label
              htmlFor="employee-form--phone-input"
              className="employee-form--phone-label"
            >
              Phone Number
              <input
                type="tel"
                className="add-employee-form-input employee-form--phone-input"
                id="employee-form--phone-input"
                name="employee-form--phone-input"
                ref={employeePhoneNumber}
              />
            </label>
          </div>
          <div className="employee-form--location-content-holder">
            <label
              htmlFor="employee-form--city-input"
              className="employee-form--city-label"
            >
              Address
              <input
                type="text"
                className="add-employee-form-input employee-form--city-input"
                id="employee-form--address-input"
                name="employee-form--address-input"
                ref={employeeAdress}
              />
            </label>

            <label
              htmlFor="employee-form--city-input"
              className="employee-form--city-label"
            >
              City
              <input
                type="text"
                className="add-employee-form-input employee-form--city-input"
                id="employee-form--city-input"
                name="employee-form--city-input"
                ref={employeeCity}
              />
            </label>

            <label
              htmlFor="employee-form--state-input"
              className="employee-form--state-label"
            >
              State
              <input
                type="text"
                className="add-employee-form-input employee-form--state-input"
                id="employee-form--state-input"
                name="employee-form--state-input"
                ref={employeeState}
              />
            </label>

            <label
              htmlFor="employee-form--country-input"
              className="employee-form--country-label"
            >
              Country
              <input
                type="text"
                className="add-employee-form-input employee-form--country-input"
                id="employee-form--country-input"
                name="employee-form--country-input"
                ref={employeeCountry}
              />
            </label>

            <label
              htmlFor="employee-form--country-input"
              className="employee-form--country-label"
            >
              Zipcode
              <input
                type="text"
                className="add-employee-form-input employee-form--country-input"
                id="employee-form--zipcode-input"
                name="employee-form--zipcode-input"
                ref={employeeZip}
              />
            </label>
            <label
              htmlFor="employee-form--country-input"
              className="employee-form--country-label"
            >
              Employee Role
              <input
                type="text"
                className="add-employee-form-input employee-form--country-input"
                id="employee-form--role-input"
                name="employee-form--role-input"
                ref={employeeRoleType}
              />
            </label>

            <label
              htmlFor="employee-form--country-input"
              className="employee-form--country-label"
            >
              Employee Contractor Name
              <input
                type="text"
                className="add-employee-form-input employee-form--country-input"
                id="employee-form--contractor-name-input"
                name="employee-form--contractor-name-input"
                ref={contractorName}
              />
            </label>
          </div>

          <button
            // onClick="validateRequiredInputs()"
            type="submit"
            id="employee-form--add-employee-button"
            className="employee-form--add-employee-button"
          >
            Add Employee
          </button>
        </form>

        {/* <ol
          id="employee-list-summary_iframe"
          className="employee-list-summary_iframe"
        >
          {allEmployeesArr.map((employee, i) => {
            return <li key={i}>{employee.FirstName}</li>;
          })}
        </ol> */}
      </main>
    </div>
  );
}

export default AddEmployee;
