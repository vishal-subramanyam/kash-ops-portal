import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import useAuth from "../components/Authentication";

function Login(props) {
  const navigate = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    document.body.classList.add("remove-body-padding");

    return () => {
      document.body.classList.remove("remove-body-padding");
    };
  }, []);

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

    navigate("/");
  };

  const userSignUp = () => {
    console.log("Sign Up Form Triggered");
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
            onClick={() => setShowSignUpForm(!showSignUpForm)}
          >
            <p className="sign_up-button-text">
              {showSignUpForm ? "Login" : "Sign Up"}
            </p>
          </button>
        </div>
        {showSignUpForm ? (
          <SignUpForm userSignUp={userSignUp} />
        ) : (
          <LoginForm userLogin={userLogin} />
        )}
      </div>
    </main>
  );
}
export default Login;
