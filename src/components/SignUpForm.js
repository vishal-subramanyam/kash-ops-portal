import React from "react";
import "../assets/styles/Styles.css"

function SignUpForm(props) {
    return (         
        <form action="" className="login-form">
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
              />
            </label>
          </div>
          <div className="login-field">
            <label className="login-form--input_label" htmlFor="signup--email-input">
              <p className="login-form--password-label">Email</p>
              <input
                type="password"
                className="login-input"
                id="login--password-input"
                name="signup--email-input"
              />
            </label>
          </div>
          <button
            type="submit"
            value="Submit"
            className="button signin-button"
            onClick={props.userSignUp}
          >
            <div className="signin-text">Create User</div>
          </button>
        </form>
    );
}

export default SignUpForm;