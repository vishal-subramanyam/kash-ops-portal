import React from "react";
import "../assets/styles/Styles.css";
import { Link } from "react-router-dom";

function EditCompanyAdmin() {
  return (
    <div>
      <dialog class="database-submit-dialog" id="database-submit-dialog">
        <form method="dialog">
          <div id="database-submit-dialog--text-content-holder">
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

      <main class="edit-comp-contact-page__main-section max-width--main-container">
        <h1 class="edit-comp-contact-title form-page-title--lg-1">
          Edit Company Admins
        </h1>
        <div class="edit_page__return-link-holder">
          <Link to="/clients-hub" class="return-link">
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
            <p class="return-link-text">Return to Clients</p>
          </Link>
        </div>

        <div class="edit-comp-contact-page--content-holder">
          <form
            id="attach_contact_to_project--form"
            class="edit_contact_page--mini-form attach_contact_to_project--form"
          >
            <h2 class="attach_contact_to_project--title">
              Attach Admin to Company
            </h2>
            <div class="attach_contact_to_project--content-holder">
              <div class="company-information-holder">
                <label
                  for="attach_contact_to_project--company_name--selection"
                  class="attach_contact_to_project--company_name--label"
                >
                  Company
                  <select
                    name="attach_contact_to_project--company_name--selection"
                    id="attach_contact_to_project--company_name--selection"
                    class="attach_contact_to_project--company_name--selection"
                  >
                    <option value="">- Select a Company -</option>
                  </select>
                </label>

                <label
                  for="attach_contact_to_project--contact_name--selection"
                  class="attach_contact_to_project--contact_name--label"
                >
                  Admin Name
                  <select
                    name="attach_contact_to_project--contact_name--selection"
                    id="attach_contact_to_project--contact_name--selection"
                    class="attach-contact-to-project--form-input attach_contact_to_project--contact_name--selection"
                  >
                    <option
                      id="attach_contact_to_project--contact-name-empty-display-option"
                      value=""
                    >
                      - Please Select an Admin -
                    </option>
                  </select>
                </label>
              </div>
            </div>
            <button
              id="attach-contact-to-project--button"
              onclick="sendAttachAdminToCompanyToFex()"
            >
              Add to Company
            </button>
          </form>

          <form
            id="remove_contact_from_project--form"
            class="edit_contact_page--mini-form remove_contact_from_project--form"
          >
            <h2 class="remove_contact_from_project--title">
              Remove Admin from Company
            </h2>
            <div class="remove_contact_from_project--content-holder">
              <label
                for="remove_contact_from_project--project_description--selection"
                class="remove_contact_from_project--project_description--label"
              >
                Company
                <select
                  name="remove_contact_from_project--project_description--selection"
                  id="remove_contact_from_project--project_description--selection"
                  class="remove_contact_from_project--project_description--selection"
                  onchange="populateAdminsToRemove()"
                >
                  <option value="">- Select a Project -</option>
                </select>
              </label>

              <label
                for="remove_contact_from_project--contact_name--selection"
                class="remove_contact_from_project--contact_name--label"
              >
                Admin Name
                <select
                  name="remove_contact_from_project--contact_name--selection"
                  id="remove_contact_from_project--contact_name--selection"
                  class="remove-contact-from-project--form-input remove_contact_from_project--contact_name--selection"
                >
                  <option
                    id="remove_contact_from_project--contact-name-empty-display-option"
                    value=""
                  >
                    - Please Select a Company First -
                  </option>
                </select>
              </label>
            </div>
            <button
              id="remove-contact-from-project--button"
              onclick="removeAdminFromCompanyFex()"
            >
              Remove From Company
            </button>
          </form>
        </div>

        <iframe
          src=""
          id="attach-contact-to-project--fex-iframe"
          class="attach-contact-to-project--fex-iframe"
        ></iframe>
      </main>
    </div>
  );
}

export default EditCompanyAdmin;
