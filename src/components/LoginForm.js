import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Styles.css";

function LoginForm(props) {
  const navigate = useNavigate();
  let usernameInput = useRef();
  let passwordInput = useRef();

  const userLogin = async (e) => {
    e.preventDefault();
    // find out if user is an Admin level
    // configuration in kashPEAK to determine if Admin
    // find out if user exists, if user exists then determine is true or false
    //AUTHENTICATE USER
    // const data = JSON.parse(localStorage.getItem("data"));
    // let isSuccessful = false;
    // console.log(data);
    // for (let index = 0; index < data.length; index++) {
    //   if (
    //     this.state.email === data[index].email &&
    //     this.state.password === data[index].password
    //   ) {
    //     isSuccessful = true;
    //     break;
    //   }
    // }
    // if (isSuccessful) {
    //   alert("login successful");
    // } else {
    //   alert("login failed");
    // }

    // e.preventDefault();
    // console.log("login");
    // try {
    //   const response = await fetch(
    //     "http://localhost:4040/AppContextService/KshSignIn",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         // your expected POST request payload goes here
    //         data: [
    //           {
    //             KashOperationsUsn: usernameInput.current.value,
    //             Password: passwordInput.current.value,
    //           },
    //         ],
    //         _keyword_: "KASH_OPERATIONS_USER_TABLE",
    //         secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
    //       }),
    //     }
    //   );
    //   const data = await response.json();
    //   // enter you logic when the fetch is successful
    //   console.log("User logged in", data);
    //   navigate("/");
    // } catch (error) {
    //   // enter your logic for when there is an error (ex. error toast)
    //   console.log(error);
    //   alert("Unable to login.");
    // }

    navigate("/home");
  };

  return (
    <form action="" className="login-form">
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
