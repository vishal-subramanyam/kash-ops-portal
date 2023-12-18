import React, { useState } from "react";
import "../assets/styles/Styles.css";
import { Link } from "react-router-dom";

function AddCompany() {
  const validateRequiredInputs = () => {
    // check validitiy of inputs
    // run function to POST company to database
    // run function to open the confirmation modal
  };

  return (
    <div>
      <dialog class="database-submit-dialog" id="database-submit-dialog">
        <form method="dialog">
          <p>
            Company Added: <br />
            <span id="company-name-span"></span>
            <span id="company-id-span"></span>
          </p>
          <div>
            <button
              class="dialog-modal-confirm-button"
              id="dialog-modal-confirm-button"
              value="confirm"
            >
              OK
            </button>
          </div>
        </form>
      </dialog>
      <main className="add-company-page__main-section max-width--main-container">
        <h1 className="add-company-title form-page-title--lg-1">
          Add a Company
        </h1>
        <div className="edit_page__return-link-holder">
          <Link to="/clients-hub" className="return-link">
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
            <p className="return-link-text">Return to Clients</p>
          </Link>
        </div>
        <div className="add-company-page--content-holder">
          <div className="add-company-img-holder">
            <img
              src="https://raw.githubusercontent.com/Alex-Gardner/KASH_Tech_Operations_Portal/main/kashtech-project-reporting-portal/assets/raster-assets/wise-fox-cTv69qOUjc4-unsplash.webp"
              alt="Company office interior setting"
              className="add-company-img"
            />
          </div>

          <form action="" id="add-company-form" className="add-company-form">
            <div className="add-company-form--company-details">
              <label
                for="company-form--name-input"
                className="company-form--name-label"
              >
                Company Name
                <input
                  required="required"
                  type="text"
                  className="add-company-form-input company-form--name-input"
                  id="company-form--name-input"
                  name="company-form--name-input"
                />
              </label>
              <label
                for="company-form--id-input"
                className="company-form--id-label"
              >
                Company ID
                <input
                  required="required"
                  type="text"
                  className="add-company-form-input company-form--id-input"
                  id="company-form--id-input"
                  name="company-form--id-input"
                />
              </label>
            </div>

            <div className="add-company-form--company-location">
              <label
                for="company-form--address-input"
                className="company-form--address-label"
              >
                Address
                <input
                  type="text"
                  className="add-company-form-input company-form--address-input"
                  id="company-form--address-input"
                  name="company-form--address-input"
                />
              </label>

              <label
                for="company-form--city-input"
                className="company-form--city-label"
              >
                City
                <input
                  type="text"
                  className="add-company-form-input company-form--city-input"
                  id="company-form--city-input"
                  name="company-form--city-input"
                />
              </label>

              <label
                for="company-form--state-input"
                className="company-form--state-label"
              >
                State
                <input
                  type="text"
                  className="add-company-form-input company-form--state-input"
                  id="company-form--state-input"
                  name="company-form--state-input"
                />
              </label>

              <label
                for="company-form--zip_code-input"
                className="company-form--zip_code-label"
              >
                Zip Code
                <input
                  type="text"
                  className="add-company-form-input company-form--zip_code-input"
                  id="company-form--zip_code-input"
                  name="company-form--zip_code-input"
                />
              </label>

              <label
                for="company-form--country-input"
                className="company-form--country-label"
              >
                Country
                <input
                  type="text"
                  className="add-company-form-input company-form--country-input"
                  id="company-form--country-input"
                  name="company-form--country-input"
                />
              </label>
            </div>

            <button
              onClick={validateRequiredInputs}
              id="company-form--add-company-button"
              className="company-form--add-company-button"
            >
              Add Company
            </button>
          </form>
        </div>

        {/* SHOW LIST OF COMPANIES */}
        {/* <iframe
        src=""
        id="company-list-summary_iframe"
        class="company-list-summary_iframe"
      ></iframe> */}
      </main>
    </div>
  );
}

export default AddCompany;
