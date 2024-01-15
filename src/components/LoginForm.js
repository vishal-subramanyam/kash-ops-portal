import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Authentication";
import "../assets/styles/Styles.css";

function LoginForm(props) {
  const { login } = useAuth();
  const navigate = useNavigate();
  let usernameInput = useRef();
  let passwordInput = useRef();
  let [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  });

  const getAllUsers = () => {
    console.log("Use effect to query user table");
    fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
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

  const userLogin = async (e) => {
    e.preventDefault();
    console.log(usernameInput.current.value);
    console.log(btoa(passwordInput.current.value));
    try {
      const response = await fetch(
        "http://localhost:4040/AppContextService/KshSignIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _keyword_: "KASH_OPERATIONS_USER_TABLE",
            username: "ganderson",
            password: "QUxFWDEyMw==",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("User logged in", data);
      if (data.success === false) {
        console.log(
          "Unable to login. Check username and paassword are correct."
        );
        return;
      }
      // save logged in user first name to state
      // get the first name of the logged in user by getting emp id from the response of the logged in fetch
      props.userLoggedIn("Firsst name");
      props.setAdmin(true);

      // set auth state to true
      await login();
      navigate("/");
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
      alert("Unable to login.");
    }
  };

  return (
    <form method="post" className="login-form">
      <div className="login-field">
        <label
          className="login-form--input_label"
          htmlFor="login--username-input"
        >
          <p className="login-form--username-label">Username</p>
          <input
            type="text"
            className="login-input"
            id="login--username-input"
            name="login--username-input"
            ref={usernameInput}
          />
        </label>
      </div>
      <div className="login-field">
        <label
          className="login-form--input_label"
          htmlFor="login--password-input"
        >
          <p className="login-form--password-label">Password</p>
          <input
            type="password"
            className="login-input"
            id="login--password-input"
            name="login--password-input"
            ref={passwordInput}
          />
        </label>
      </div>
      <button
        type="submit"
        value="Submit"
        className="button signin-button"
        onClick={userLogin}
      >
        <div className="signin-text">Login</div>
      </button>
    </form>
  );
}

export default LoginForm;
