import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/Styles.css";
import EditEmployeeInfo from "../components/EditEmployeeInfo";

function EmployeeHub() {
  const showEditEmployeeModel = () => {
    document.getElementsByClassName("lightboxbackdrop")[0].style.display =
      "flex";
    document.getElementsByClassName("lightbox")[0].style.display = "block";
    // document.getElementById('editEmployeeFrame').src = 'http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&|IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/edit_employee_information.htm';
  };

  return (
    <main
      id="employees-hub-page-main"
      className="kash_operations--hub-page--main employees-hub-page-main max-width--main-container"
    >
      {/* Edit Employee Model */}
      {/* <div className="lightboxbackdrop">
        <div className="lightbox" style={{ overflow: "scroll" }}>
          <span onClick={hideLightbox} className="x-button">
            X
          </span> */}
      {/* <iframe id="editEmployeeFrame"></iframe> */}
      <EditEmployeeInfo id="editEmployeeFrame" />
      {/* </div>
      </div> */}

      {/* END Edit Employee Model */}

      <div className="kash_operations--upper-section-holder">
        <h1 className="kash_operations--hub-title employees-hub-page-title">
          Employees
        </h1>
        {/* <a href="http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/check_admin_and_display_home.fex" className="return-to-operations-hub"> */}
        <Link to="/" className="return-to-operations-hub">
          <svg
            width="80"
            height="134"
            viewBox="0 0 80 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M76.7864 3.36106C72.8812 -0.544183 66.5495 -0.544181 62.6443 3.36106L1.12622 64.8787C-0.0453612 66.0503 -0.0453675 67.9497 1.12621 69.1213L62.6445 130.64C66.5497 134.545 72.8814 134.545 76.7866 130.64C80.6919 126.734 80.6919 120.403 76.7866 116.497L29.4107 69.1216C28.2391 67.95 28.2391 66.0505 29.4107 64.8789L76.7864 17.5032C80.6917 13.598 80.6917 7.2663 76.7864 3.36106Z"
              fill="#255463"
            />
          </svg>
          <p>Return to Operations Hub</p>
        </Link>
      </div>
      <div className="hub_page--main-actions-holder employee_hub--main-action-holder">
        {/* View report redirects to a new portal */}
        <Link
          target="_blank"
          to="/reports"
          className="hub_page--main-action-link employee_hub--main-action-link"
        >
          <p>View Reports</p>
          <svg
            width="100"
            height="46"
            viewBox="0 0 100 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 12.8597H59.2665V32.988H0V12.8597Z" fill="#FA9B4B" />
            <path d="M99.1037 23L59.2665 46V0L99.1037 23Z" fill="#FA9B4B" />
          </svg>
        </Link>
      </div>
      {/* // <!--<div className="hub_page--secondary-actions-holder">-->
    // <!--    <a href="http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/external_html_and_assets/html/add-employee-page.html" className="hub_page--secondary-action-link employee_hub--secondary-action-link">Add Employee</a>-->
    // <!--    <a href="#" className="hub_page--secondary-action-link employee_hub--secondary-action-link">Assign Employee</a>-->
    // <!--</div>--> */}

      {/* <iframe id="employees-hub--admin-links-fex-iframe" src={myUrl}></iframe> */}

      {/* START Show 'Add employee' and 'Edit Employee Info' links if logged in user is Admin level */}
      <div className="employee_hub--full_admin_links">
        <div className="employee_hub--admin-links-holder">
          <div className="hub_page--secondary-actions-holder">
            <h2 className="activity_hub--admin_links_title employee_hub--admin_links_title employee_hub--add-title">
              Add
            </h2>
            {/* <a href="http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&|IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/external_html_and_assets/html/add-employee-page.html" class="add_employee-admin-link hub_page--secondary-action-link employee_hub--secondary-action-link">Add Employee</a> */}
            <Link
              to="/add-employee"
              className="add_employee-admin-link hub_page--secondary-action-link employee_hub--secondary-action-link"
            >
              Add Employee
            </Link>
          </div>
          <div className="hub_page--secondary-actions-holder">
            <h2 className="activity_hub--admin_links_title employee_hub--admin_links_title employee_hub--edit-title">
              Edit
            </h2>
            <a
              //   href="#"
              onClick={showEditEmployeeModel}
              className="edit_employee-admin-link hub_page--secondary-action-link employee_hub--secondary-action-link"
            >
              Edit Employee Information
            </a>
            {/* <a
              href="http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&|IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/external_html_and_assets/html/employee_roles_and_responsibilities-page.htm"
              class="roles_and_responsibilities-admin-link hub_page--secondary-action-link employee_hub--secondary-action-link"
            > */}
            {/* <Link
              to="/employee-roles-and-responsibilities"
              class="roles_and_responsibilities-admin-link hub_page--secondary-action-link employee_hub--secondary-action-link"
            >
              Roles and Responsibilities
            </Link> */}
            {/* </a> */}
          </div>
        </div>
      </div>
      {/* END show links if signed in employee is Admin level */}
    </main>
  );
}

export default EmployeeHub;
