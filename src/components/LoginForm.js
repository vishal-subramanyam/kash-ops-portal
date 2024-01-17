import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Authentication";
import "../assets/styles/Styles.css";

function LoginForm(props) {
  const { authed, login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  let usernameInput = useRef();
  let passwordInput = useRef();
  let loginForm = useRef();

  const userLogin = (e) => {
    e.preventDefault();
    console.log(usernameInput.current.value);
    console.log(btoa(passwordInput.current.value));
    // try {
    //   const response = await fetch(
    //     "http://localhost:4040/AppContextService/KshSignIn",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         _keyword_: "KASH_OPERATIONS_USER_TABLE",
    //         username: usernameInput.current.value,
    //         password: btoa(passwordInput.current.value),
    //         secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
    //       }),
    //     }
    //   );
    //   const data = await response.json();
    //   // enter you logic when the fetch is successful
    //   console.log("User logged in", data);
    //   if (data.success === "false") {
    //     alert("Unable to login. Check username and paassword are correct.");
    //   } else {
    //     // get the first name of the employee that is logged in
    //     let userArrObject = allUsers.filter(
    //       (name) => data.EmpId === name.EmpId
    //     );
    //     console.log(userArrObject);

    //     // save logged in user first name to state
    //     // get the first name of the logged in user by getting emp id from the response of the logged in fetch
    //     props.userLoggedIn(userArrObject);

    //     if (data.IsAdmin === "Admin" || data.IsAdmin === "SuperAdmin") {
    //       props.setAdmin(true);
    //     }

    //     // set auth state to true
    //   }
    // } catch (error) {
    //   // enter your logic for when there is an error (ex. error toast)
    //   console.log(error);
    //   alert("Unable to login.");
    // }

    login(usernameInput.current.value, btoa(passwordInput.current.value)).then(
      () => {
        // <Navigate to="/" replace={true} />;
        navigate(state?.path || "/");
        console.log("res promise on login function on useAuth triggered");
      }
    );
  };

  return (
    <form method="post" className="login-form" ref={loginForm}>
      <h1 className="kash_operations_home--title login-heading">Login</h1>
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
            required
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
            required
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
