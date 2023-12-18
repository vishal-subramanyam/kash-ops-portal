import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/api/apiEndpoints.js";
import "../assets/styles/HomePage.css";

function AddEmployee() {
  //   // input value variables
  let [firstNameInput, setFirstNameInput] = useState("");
  let [lastNameInput, setLastNameInput] = useState("");
  let [employeeIDInput, setEmployeeIDInput] = useState("");
  let [employeeUsername, setEmployeeUsername] = useState("");
  let [employeeEmail, setEmployeeEmail] = useState("");
  let [employeePhoneNumber, setEmployeePhoneNumber] = useState("");
  let [employeeCity, setEmployeeCity] = useState("");
  let [emplyeeState, setEmployeeState] = useState("");
  let [employeeCountry, setEmployeeCountry] = useState("");
  let [employeeAdress, setEmployeeAdress] = useState("");
  let [employeeZip, setEmployeeZip] = useState("");
  let [employeeRoleType, setEmployeeRoleType] = useState("");
  let [contractorName, setContractorName] = useState("");
  let [adminCheckbox, setAdminCheckbox] = useState(false);
  let [adminLevelDesignation, setAdminLevelDesignation] = useState("");
  let [employeeIds, setEmployeeIds] = useState([]);
  let [allEmployeesArr, setAllEmployeesArr] = useState([]);
  let [allEmployeeUsernames, setAllEmployeeUsernames] = useState([]);

  let requiredInputs = [
    firstNameInput,
    lastNameInput,
    employeeIDInput,
    employeeUsername,
  ];

  let submitEmployeeToDBDialog = document.querySelector(
    "#database-submit-dialog"
  );
  let submitEmployeeBtn = document.querySelector(
    "#employee-form--add-employee-button"
  );

  //   write useEffect function to fetch the usernames from correct data api endpoint and set to state
  // then populate the username dropdown selection
  useEffect(() => {
    fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_EMPLOYEE_TABLE" }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllEmployeesArr(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const addEmployeeNotAdmin = async () => {
    try {
      const response = await fetch(
        "http://localhost:4040/GenericTransactionService/processTransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                EmpId: employeeIDInput,
                FirstName: firstNameInput,
                LastName: lastNameInput,
                EmailAddress: employeeEmail,
                PhoneNumber: employeePhoneNumber,
                EmpLocationCity: employeeCity,
                EmpLocationState: emplyeeState,
                EmpLocationCountry: employeeCountry,
                KashOperationsEmpId: employeeIDInput,
                WfInternalUsn: employeeUsername,
                EmployeeAddress: employeeAdress,
                EmployeeZipCode: employeeZip,
                EmployeeType: employeeRoleType,
                EmployeeContractorName: contractorName,
              },
            ],
            _keyword_: "KASH_OPERATIONS_EMPLOYEE_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("Added to Employee table" + data);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  };

  const addToAdminTable = async () => {
    try {
      const response = await fetch(
        "http://localhost:4040/GenericTransactionService/processTransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            data: [
              {
                EmpId: employeeIDInput,
                WfInternalUsn: employeeUsername,
                AdminLevel: adminLevelDesignation,
              },
            ],
            _keyword_: "KASH_OPERATIONS_ADMIN_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("Added to Admin table" + data);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  };

  //   Create a fetch POST to add employee input fields to KASH_OPERATIONS_EMPLOYEE_TABLE
  const addEmployeeToDatabaseIfAdmin = () => {
    addEmployeeNotAdmin();
    addToAdminTable();
  };

  // SHOW MODAL FOR NEWLY ADDED EMPLOYEE INFO
  const onModalOpen = () => {
    let employeeFirstNameSpan = document.querySelector(
      "#employee-page-dialog--first_name-span"
    );
    let employeeLastNameSpan = document.querySelector(
      "#employee-page-dialog--last_name-span"
    );
    let employeeIDSpan = document.querySelector(
      "#employee-page-dialog--id-span"
    );

    employeeFirstNameSpan.innerHTML = firstNameInput;
    employeeLastNameSpan.innerHTML = lastNameInput;
    employeeIDSpan.innerHTML = employeeIDInput;

    console.log("show modal function");
    if (typeof submitEmployeeToDBDialog.showModal === "function") {
      submitEmployeeToDBDialog.showModal();
    } else {
      alert("Sorry, the <dialog> API is not supported by this browser.");
    }
  };

  const checkIfEmpIdAlreadyExistsInDB = () => {
    console.log("check if Emp ID already exists");

    fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "EMPLOYEE_BY_ID",
        EmpId: employeeIDInput,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEmployeeIds(res.data);
      })
      .catch((err) => alert(err));
  };

  const validateRequiredInputs = (e) => {
    e.preventDefault();
    console.log("add employee form submitted" + e);
    console.log(firstNameInput);
    checkIfEmpIdAlreadyExistsInDB();
    if (employeeIds.length !== 0) {
      alert("Duplicate employee IDs. Choose a different ID number.");
    } else {
      if (adminCheckbox === true) {
        // perform two fetch POST calls - one to the employee table and another to admin table
        console.log("admin checkbox checked");
        setAdminLevelDesignation("Admin");
        console.log(adminLevelDesignation);
        addEmployeeToDatabaseIfAdmin();
      } else {
        console.log("only employee not admin created");
        // run the function that will run a fetch POST to add employee to database
        // addEmployeeNotAdmin();
      }
      onModalOpen();
    }

    // for (let input of requiredInputs) {
    //   if (input.checkValidity() === false) {
    //     //validInputs = false
    //     console.log("inputs not validated" + input);
    //     alert(`Please check the validity of ${input.labels[0].innerText}`);
    //     return;
    //     //throw new Error(`Please check the validity of ${input.labels[0].innerText}`)
    //   }
    // }
  };

  // run function for employee usernames
  return (
    <div>
      <dialog className="database-submit-dialog" id="database-submit-dialog">
        <form method="dialog">
          <p>
            Employee Added: <br />
            <span
              id="employee-page-dialog--first_name-span"
              className="employee-page-dialog--first_name-span"
            >
              {firstNameInput}
            </span>
            <span
              className="employee-page-dialog--last_name-span"
              id="employee-page-dialog--last_name-span"
            >
              {lastNameInput}
            </span>
            <br />
            <span
              id="employee-page-dialog--id-span"
              className="employee-page-dialog--id-span"
            >
              {employeeIDInput}
            </span>
          </p>
          <div>
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
                  onChange={(e) => setFirstNameInput(e.target.value)}
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
                  onChange={(e) => setLastNameInput(e.target.value)}
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
                  onChange={(e) => setEmployeeIDInput(e.target.value)}
                />
              </label>

              <label
                htmlFor="employee-form--wf-name-select"
                className="employee-form--wf-name-label"
              >
                WebFOCUS Username
                <input
                  required
                  className="employee-form--wf-name-select"
                  id="employee-form--wf-name-select"
                  name="employee-form--wf-name-select"
                  onChange={(e) => setEmployeeUsername(e.target.value)}
                />
                <div className="checkBoxLabel">
                  <span className="employee--form--id-label">
                    Add as admin?
                  </span>
                  <input
                    id="adminCheck"
                    defaultChecked={adminCheckbox}
                    type="checkbox"
                    onChange={() => setAdminCheckbox((state) => !state)}
                  />
                </div>
              </label>
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
                onChange={(e) => setEmployeeEmail(e.target.value)}
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
                onChange={(e) => setEmployeePhoneNumber(e.target.value)}
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
                id="employee-form--city-input"
                name="employee-form--city-input"
                onChange={(e) => setEmployeeAdress(e.target.value)}
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
                onChange={(e) => setEmployeeCity(e.target.value)}
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
                onChange={(e) => setEmployeeState(e.target.value)}
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
                onChange={(e) => setEmployeeCountry(e.target.value)}
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
                id="employee-form--country-input"
                name="employee-form--country-input"
                onChange={(e) => setEmployeeZip(e.target.value)}
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
                id="employee-form--country-input"
                name="employee-form--country-input"
                onChange={(e) => setEmployeeRoleType(e.target.value)}
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
                id="employee-form--country-input"
                name="employee-form--country-input"
                onChange={(e) => setContractorName(e.target.value)}
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

        {/* <iframe
          src="http://52.167.226.44:8080/ibi_apps/WFServlet?IBIC_server=EDASERVE&IBIMR_drill=IBFS,RUNFEX,IBIF_ex,true&IBIF_ex=IBFS:/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/external_html_and_assets/html/dropdown-fex-files/get_active_wf_users.fex"
          id="employee-list-summary_iframe"
          className="employee-list-summary_iframe"
        ></iframe> */}
      </main>
    </div>
  );
}

export default AddEmployee;
