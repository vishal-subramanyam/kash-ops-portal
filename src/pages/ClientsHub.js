import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Styles.css";
import "../assets/styles/HomePage.css";

function ClientsHub() {
  // on page load
  //  Determine if logged in user is Admin level
  return (
    <main
      id="clients-hub-page-main"
      class="kash_operations--hub-page--main clients-hub-page-main max-width--main-container"
    >
      <div class="kash_operations--upper-section-holder">
        <h1 class="kash_operations--hub-title clients-hub-page-title">
          Clients
        </h1>
        <Link to="/home" class="return-to-operations-hub">
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
      <div class="hub_page--main-actions-holder client_hub--main-action-holder">
        {/* <!--a href="#" class="hub_page--main-action-link client_hub--main-action-link"> */}
        {/* <p>View Client Information</p>
        <svg
          width="100"
          height="46"
          viewBox="0 0 100 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 12.8597H59.2665V32.988H0V12.8597Z" fill="#FA9B4B" />
          <path d="M99.1037 23L59.2665 46V0L99.1037 23Z" fill="#FA9B4B" />
        </svg> */}
        {/* </a--> */}
        <a
          target="_blank"
          href="http://52.167.226.44:8080/ibi_apps/portal/operations/company_report--assembled-viz"
          class="hub_page--main-action-link client_hub--main-action-link"
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
        </a>
      </div>

      {/* START If logged in user is Admin level, show below  */}
      <div className="client_hub--full_admin_links">
        <div class="client_hub--admin-links-holder">
          <div class="hub_page--secondary-actions-holder">
            <h2 class="activity_hub--admin_links_title client_hub--admin_links_title client_hub--add-title">
              Add
            </h2>
            <Link
              to="/add-company"
              class="add-company-link hub_page--secondary-action-link client_hub--secondary-action-link"
            >
              Add Company
            </Link>
            <Link
              to="/add-project"
              class="add-project-link hub_page--secondary-action-link client_hub--secondary-action-link"
            >
              Add Project
            </Link>
            {/* <a
              href="http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&|IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/external_html_and_assets/html/add-company_contact-page.html"
              class="add-company_contact-link hub_page--secondary-action-link client_hub--secondary-action-link"
            >
              Add Company Contact
            </a> */}
          </div>
          <div class="hub_page--secondary-actions-holder">
            <h2 class="activity_hub--admin_links_title client_hub--admin_links_title client_hub--edit-title">
              Edit
            </h2>
            {/* <a
              href="#"
              class="edit-company-link hub_page--secondary-action-link client_hub--secondary-action-link"
            >
              Edit Company (In Progress)
            </a> */}
            <Link
              to="/edit-project"
              class="edit-project-link hub_page--secondary-action-link client_hub--secondary-action-link"
            >
              Edit Project
            </Link>
            {/* <a
              href="http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&|IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/external_html_and_assets/html/edit-company_contact-page.html"
              class="edit-company_contact-link hub_page--secondary-action-link client_hub--secondary-action-link"
            >
              Edit Company Contacts
            </a> */}
            <Link
              to="/edit-company-admin"
              class="edit-company_admin-link hub_page--secondary-action-link client_hub--secondary-action-link"
            >
              Edit Company Admins
            </Link>
          </div>
        </div>
      </div>
      {/* END if logged in user is Admin level */}
    </main>
  );
}

export default ClientsHub;
