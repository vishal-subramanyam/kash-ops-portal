import react from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/Styles.css";

function HomePage() {
  // Get props from App.js to determine if logged in user is Admin Level or not

  // set state to handle admin data

  // set up useEffect hook to pull in the admin data

  /*   font-weight: 900;
  font-size: 3rem;
  text-align: center;
  line-height: 1.06;
  color: #356575; */

  return (
    <main class="kash-operations--home-page-main">
      <div class="kash_operations_home--top-banner">
        <h1
          class="kash_operations_home--title"
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
        <p class="kash_operations_home--user-welcome-msg">
          Welcome, <span id="kash_ops_user--first-name">USER</span>!
        </p>
      </div>
      <section class="kash_operations_home--catgories-holder max-width--main-container">
        <div class="kash_operations_home--main-card--wrapper kash_operations_home--employees-card--wrapper">
          <Link
            to="/employee-hub"
            class="kash_operations_home--main-card kash_operations_home--employees-card"
          >
            <h2 class="kash_operations--employees-card-title">Employees</h2>
          </Link>
          <div class="employee-card--details_tag main-card--details_tag">
            <p class="tag-note">Add Employee</p>
            <p class="tag-note">Employee Info</p>
            <p class="tag-note">Reports</p>
          </div>
        </div>

        <div class="kash_operations_home--main-card--wrapper kash_operations_home--clients-card--wrapper">
          <Link
            to="/clients-hub"
            class="kash_operations_home--main-card kash_operations_home--clients-card"
          >
            <h2 class="kash_operations--clients-card-title">Clients</h2>
          </Link>
          <div class="client-card--details_tag main-card--details_tag">
            <p class="tag-note">Add Company</p>
            <p class="tag-note">Company Info</p>
            <p class="tag-note">Manage Projects</p>
          </div>
        </div>

        <div class="kash_operations_home--main-card--wrapper kash_operations_home--timesheets-card--wrapper">
          <Link
            to="/timesheets-hub"
            class="kash_operations_home--main-card kash_operations_home--timesheets-card"
          >
            <h2 class="kash_operations--timesheets-card-title">Timesheets</h2>
          </Link>
          <div class="timesheet-card--details_tag main-card--details_tag">
            <p class="tag-note">Submit Timesheet</p>
            <p class="tag-note">View Timesheet Reports</p>
          </div>
        </div>

        <p
          aria-hidden="true"
          class="kash_operations_home--interactive-card-watermark employees-card-watermark"
        >
          Employees
        </p>
        <p
          aria-hidden="true"
          class="kash_operations_home--interactive-card-watermark clients-card-watermark"
        >
          Clients
        </p>
        <p
          aria-hidden="true"
          class="kash_operations_home--interactive-card-watermark timesheets-card-watermark"
        >
          Timesheets
        </p>
      </section>
    </main>
  );
}

export default HomePage;
