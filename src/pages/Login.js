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
          <LoginForm
            userLoggedIn={props.loggedInUserName}
            setAdmin={props.setAdmin}
          />
        )}
      </div>
    </main>
  );
}
export default Login;
