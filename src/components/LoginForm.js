import React, { useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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

    login(usernameInput.current.value, btoa(passwordInput.current.value)).then(
      () => {
        navigate(state?.path || "/");
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
        <div className="login-form--change-password-link">
          <Link to="/update-password">
            <p>Forgot Password</p>
          </Link>
        </div>
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
