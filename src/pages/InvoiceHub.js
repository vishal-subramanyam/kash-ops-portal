import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import "../assets/styles/Styles.css";

function InvoiceHub() {
  return (
    <main
      id="invoinces-hub-page-main"
      className="kash_operations--hub-page--main invoices-hub-page-main max-width--main-container"
    >
      <div className="kash_operations--upper-section-holder">
        <h1 className="kash_operations--hub-title invoices-hub-page-title">
          Invoices
        </h1>
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
      <div className="hub_page--main-actions-holder invoice_hub--main-action-holder">
        <Link
          to="/invoice-detail"
          className="hub_page--main-action-link invoice_hub--main-action-link"
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

      <div className="invoice_hub--full_admin_links">
        <div className="invoice_hub--admin-links-holder">
          <div className="hub_page--secondary-actions-holder">
            <h2 className="activity_hub--admin_links_title invoice_hub--admin_links_title invoice_hub--add-title">
              Manage
            </h2>
            <Link
              to="/manage-invoice"
              className="manage_invoice-admin-link hub_page--secondary-action-link invoice_hub--secondary-action-link"
            >
              Manage Invoices
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default InvoiceHub;
