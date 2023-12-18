import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Styles.css";
import "../assets/styles/Login.css";

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
    <main class="kash-operations-login">
      <div class="kash_operations_home--top-banner">
        <h1 class="kash_operations_home--title">KASH Tech Operations</h1>
      </div>
      <div class="container">
        <div class="signin-screen">
          <div class="signin-content">
            <form class="login">
              <div class="login-field">
                <i class="signin-icons fa fa-user"></i>
                <input
                  type="text"
                  name="IBIC_user"
                  class="login-input"
                  placeholder="User name"
                />
              </div>
              <div class="login-field">
                <i class="signin-icons fa fa-lock"></i>
                <input
                  type="password"
                  name="IBIC_pass"
                  class="login-input"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                value="Submit"
                class="button signin-button"
                onClick={userLogin}
              >
                <span class="signin-text">Log In</span>
                <i class="button-icon fa fa-chevron-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
