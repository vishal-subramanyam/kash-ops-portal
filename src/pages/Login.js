import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";
// import "../assets/styles/Styles.css";

function Login() {
  const navigate = useNavigate();
  const userLogin = (e) => {
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
    navigate("/home");
  };
  return (
    <main className="kash-operations-login">
      <div className="kash_operations_home--hero-section">
        <h1 className="kash_operations_home--title">Operations Center</h1>
        <p className="home-hero--toast_message">By KASH Tech</p>
      </div>
      <div className="kash_operations_home--content-holder">
        <div className="kash_operations_home--banner-heading">
          <button
            type="submit"
            value="Submit"
            className="button sign_up-button"
          >
            <p className="sign_up-button-text">Sign Up</p>
          </button>
        </div>
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
            onClick={userLogin}
          >
            <div className="signin-text">Sign In</div>
          </button>
        </form>
      </div>
    </main>
  );
}
export default Login;
