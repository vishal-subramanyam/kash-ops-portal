import React, { useEffect, useRef, useState } from "react";
import AlertMessage from "./AlertMessage";
import { useNavigate } from "react-router-dom";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Styles.css";

function SignUpForm(props) {
  const navigate = useNavigate();
  let usernameInput = useRef();
  let email = useRef();
  let firstName = useRef();
  let lastName = useRef();
  let createUserForm = useRef();
  let alertMessage = useRef();
  let [message, setMessage] = useState("");
  let [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

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
        console.log(res);
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

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
    addEmployeeForm.current.reset();
  };

  const createRandomEmpId = () => {
    let newEmpId = Math.floor(10000000 + Math.random() * 90000000);
    console.log(newEmpId);
    return newEmpId;
  };

  const userSignUp = async (e) => {
    e.preventDefault();
    console.log("Sign Up Form Triggered");
    let randomEmpId = createRandomEmpId();
    let existingUsn = allUsers.filter((usn) => {
      if (usn.KashOperationsUsn === usernameInput.current.value) {
        return usn;
      }
    });
    if (existingUsn.length !== 0) {
      createUserForm.current.reset();
      setMessage(alertMessageDisplay("That username already exists."));
      alertMessage.current.showModal();
      return;
    }

    fetch(`${domain}GenericTransactionService/processTransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            EmpId: randomEmpId,
            FirstName: firstName.current.value,
            LastName: lastName.current.value,
            EmailAddress: email.current.value,
            PhoneNumber: "",
            EmpLocationCity: "",
            EmpLocationState: "",
            EmpLocationCountry: "",
            AdminLevel: "Basic User",
            KashOperationsUsn: usernameInput.current.value,
            EmployeeAddress: "",
            EmployeeZipCode: "",
            EmployeeType: "",
            EmployeeContractorName: "",
          },
        ],
        _keyword_: "KASH_OPERATIONS_USER_TABLE",
        secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(alertMessageDisplay("New user created. Check your email."));
        alertMessage.current.showModal();
        // automatically send new user an email with link to change password

        props.showSignUp(false);
        // navigate("/login");
        createUserForm.current.reset();
      })
      .catch((error) => {
        setMessage(alertMessageDisplay(`Unable to sign up. Error: ${error}`));
        alertMessage.current.showModal();
      });
  };
  return (
    <form method="post" className="login-form" ref={createUserForm}>
      <h1 className="kash_operations_home--title login-heading">Sign Up</h1>

      <div className="login-field">
        <label
          className="login-form--input_label"
          htmlFor="signup--username-input"
        >
          <p className="login-form--username-label">Username</p>
          <input
            type="text"
            className="login-input"
            id="login--username-input"
            name="signup--username-input"
            required
            ref={usernameInput}
          />
        </label>
      </div>
      <div className="login-field">
        <label
          className="login-form--input_label"
          htmlFor="signup--email-input"
        >
          <p className="login-form--password-label">Email</p>
          <input
            type="email"
            className="login-input"
            id="login--password-input"
            name="signup--email-input"
            required
            ref={email}
          />
        </label>
      </div>
      <div className="login-field">
        <label
          className="login-form--input_label"
          htmlFor="signup--first-name-input"
        >
          <p className="login-form--password-label">First Name</p>
          <input
            type="text"
            className="login-input"
            id="login--first-name-input"
            name="signup--first-name-input"
            required
            ref={firstName}
          />
        </label>
      </div>
      <div className="login-field">
        <label
          className="login-form--input_label"
          htmlFor="signup--last-name-input"
        >
          <p className="login-form--password-label">Last Name</p>
          <input
            type="text"
            className="login-input"
            id="login--last-name-input"
            name="signup--last-name-input"
            required
            ref={lastName}
          />
        </label>
      </div>
      <button
        type="submit"
        value="Submit"
        className="button signin-button"
        onClick={userSignUp}
      >
        <div className="signin-text">Create User</div>
      </button>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
    </form>
  );
}

export default SignUpForm;
