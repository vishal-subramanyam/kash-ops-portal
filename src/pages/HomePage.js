import react from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/Styles.css";

function HomePage(props) {
  return (
    <main className="kash-operations--home-page-main">
      <div className="kash_operations_home--top-banner">
        <h1
          className="kash_operations_home--title"
          style={{
            fontWeight: "900",
            fontSize: "3rem",
            textAlign: "center",
            lineHeight: "1.06",
            color: "#356575",
          }}
        >
          KASH Tech Operations
        </h1>
        <p className="kash_operations_home--user-welcome-msg">
          Welcome,{" "}
          <span id="kash_ops_user--first-name">
            {props.loggedInUser.FirstName}
          </span>
          !
        </p>
      </div>
      <section className="kash_operations_home--catgories-holder max-width--main-container">
        {/* if logged in user is not an admin, hide employee and clients hubs */}
        {props.admin === '"Basic User"' ? (
          ""
        ) : (
          <>
            <div className="kash_operations_home--main-card--wrapper kash_operations_home--employees-card--wrapper">
              <Link
                to="/employee-hub"
                className="kash_operations_home--main-card kash_operations_home--employees-card"
              >
                <h2 className="kash_operations--employees-card-title">
                  Employees
                </h2>
              </Link>
              <div className="employee-card--details_tag main-card--details_tag">
                <p className="tag-note">Add Employee</p>
                <p className="tag-note">Employee Info</p>
                <p className="tag-note">Reports</p>
              </div>
            </div>

            <div className="kash_operations_home--main-card--wrapper kash_operations_home--clients-card--wrapper">
              <Link
                to="/clients-hub"
                className="kash_operations_home--main-card kash_operations_home--clients-card"
              >
                <h2 className="kash_operations--clients-card-title">Clients</h2>
              </Link>
              <div className="client-card--details_tag main-card--details_tag">
                <p className="tag-note">Add Company</p>
                <p className="tag-note">Company Info</p>
                <p className="tag-note">Manage Projects</p>
              </div>
            </div>
          </>
        )}
        <div className="kash_operations_home--main-card--wrapper kash_operations_home--timesheets-card--wrapper">
          <Link
            to="/timesheets-hub"
            className="kash_operations_home--main-card kash_operations_home--timesheets-card"
          >
            <h2 className="kash_operations--timesheets-card-title">
              Timesheets
            </h2>
          </Link>
          <div className="timesheet-card--details_tag main-card--details_tag">
            <p className="tag-note">Submit Timesheet</p>
            <p className="tag-note">View Timesheet Reports</p>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="kash_operations_home--interactive-card-watermark employees-card-watermark"
        >
          Employees
        </p>
        <p
          aria-hidden="true"
          className="kash_operations_home--interactive-card-watermark clients-card-watermark"
        >
          Clients
        </p>
        <p
          aria-hidden="true"
          className="kash_operations_home--interactive-card-watermark timesheets-card-watermark"
        >
          Timesheets
        </p>
      </section>
    </main>
  );
}

export default HomePage;
