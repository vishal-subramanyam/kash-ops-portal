import React from "react";
import "../assets/styles/Styles.css";

function LoginForm(props) {
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
          />
        </label>
      </div>
      <div className="login-field">
        <label className="login-form--input_label" htmlFor="">
          <p className="login-form--password-label">Password</p>
          <input
            type="password"
            className="login-input"
            id="login--password-input"
            name="login--password-input"
          />
        </label>
      </div>
      <button
        type="submit"
        value="Submit"
        className="button signin-button"
        onClick={props.userLogin}
      >
        <div className="signin-text">Login</div>
      </button>
    </form>
  );
}

export default LoginForm;
