import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { domain } from "../assets/api/apiEndpoints";
import "../assets/styles/Styles.css";

function SignUpForm(props) {
  const navigate = useNavigate();
  let usernameInput = useRef();
  let email = useRef();
  let createUserForm = useRef();
  let [randomEmpId, setRandomEmpId] = useState();

  useEffect(() => {
    let newEmpId = Math.floor(10000000 + Math.random() * 90000000);
    console.log(newEmpId);
    setRandomEmpId(newEmpId);
  }, []);

  const userSignUp = async () => {
    console.log("Sign Up Form Triggered");

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
                EmpId: randomEmpId,
                FirstName: "",
                LastName: "",
                EmailAddress: email.current.value,
                PhoneNumber: "",
                EmpLocationCity: "",
                EmpLocationState: "",
                EmpLocationCountry: "",
                AdminLevel: "BasicUser",
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
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("New user created", data);
      alert("New user created. Check the email.");
      // automatically send new user an email with link to change password
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
      alert("Unable to sign up.");
    }
    navigate("/login");
    createUserForm.current.reset();
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
      <button
        type="submit"
        value="Submit"
        className="button signin-button"
        onClick={userSignUp}
      >
        <div className="signin-text">Create User</div>
      </button>
    </form>
  );
}

export default SignUpForm;
