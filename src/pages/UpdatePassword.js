import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";

function UpdatePassword() {
  const navigate = useNavigate();
  let passwordInput = useRef();
  let confrimPasswordInput = useRef();

  useEffect(() => {}, []);

  const updatePassword = () => {
    console.log("Update Password Triggered");
  };
  return (
    <main className="kash-operations-login">
      <div className="kash_operations_home--hero-section">
        <h1 className="kash_operations_home--title">Operations Center</h1>
        <p className="home-hero--toast_message">By KASH Tech</p>
      </div>
      <div className="kash_operations_home--content-holder">
        <div className="kash_operations_home--banner-heading"></div>
        <form action="" className="login-form">
          <div className="login-field">
            <label className="login-form--input_label" htmlFor="password-input">
              <p className="login-form--username-label">Password</p>
              <input
                type="text"
                className="login-input"
                id="password-input"
                name="password-input"
                ref={passwordInput}
              />
            </label>
          </div>
          <div className="login-field">
            <label
              className="login-form--input_label"
              htmlFor="confrim-password-input"
            >
              <p className="login-form--password-label">Confirm Password</p>
              <input
                type="password"
                className="login-input"
                id="confirm-password-input"
                name="confirm-password-input"
                ref={confrimPasswordInput}
              />
            </label>
          </div>
          <button
            type="submit"
            value="Submit"
            className="button signin-button"
            onClick={updatePassword}
          >
            <div className="signin-text">Update Password</div>
          </button>
        </form>
      </div>
    </main>
  );
}
export default UpdatePassword;
