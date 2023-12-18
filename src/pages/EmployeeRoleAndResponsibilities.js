import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Styles.css";

function employee_roles_and_responsibilities() {
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

      <main class="roles_and_responsibilities_page--main-section max-width--main-container">
        <h1 class="roles_and_responsibilities_page-title form-page-title--lg-1">
          Roles and Responsibilities
        </h1>
        <div class="edit_page__return-link-holder">
          {/* <a
            href="http://52.167.226.44:8080/ibi_apps/WFServlet.ibfs?IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/KashDemo_Files/KASH_Operations/html-pages/external_html_and_assets/html/employees-hub.html"
            class="return-link"
          > */}
          <Link to="/employee-hub" class="return-link">
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
            <p class="return-link-text">Return to Employees</p>
          </Link>
          {/* </a> */}
        </div>

        <div class="roles_and_responsibilities_page--content-holder">
          <form
            id="add_employee_to_project--form"
            class="roles_and_responsibilities--mini-form add_employee_to_project--form"
          >
            <h2 class="add_employee_to_project--title">Add to Project</h2>
            <div class="add_employee_to_project--content-holder">
              <div class="employee-selection--holder">
                <label
                  for="add_employee_to_project--employee--selection"
                  class="add_employee_to_project--employee--label"
                >
                  Employee
                  <select
                    required
                    name="add_employee_to_project--employee--selection"
                    id="add_employee_to_project--employee--selection"
                    class="add_employee_to_project--employee--selection"
                  >
                    <option value="">- Select an Employee -</option>
                  </select>
                </label>
              </div>

              <div class="project-information-holder">
                <label
                  for="add_employee_to_project--project_desc--selection"
                  class="add_employee_to_project--project_desc--label"
                >
                  Project
                  <select
                    required
                    name="add_employee_to_project--project_desc--selection"
                    id="add_employee_to_project--project_desc--selection"
                    class="add_employee_to_project--project_desc--selection"
                  >
                    <option value="">- Select a Project -</option>
                  </select>
                </label>

                <label
                  for="add_employee_to_project--sub_assignment--selection"
                  class="add_employee_to_project--sub_assignment--label"
                >
                  Sub-Assignment
                  <select
                    required
                    name="add_employee_to_project--sub_assignment--selection"
                    id="add_employee_to_project--sub_assignment--selection"
                    class="add_employee_to_project--sub_assignment--selection"
                  >
                    <option value="">- Please Select a Project First -</option>
                  </select>
                </label>
              </div>
            </div>
            <button
              class="add_employee_to_project--button"
              id="add_employee_to_project--button"
              onclick="sendAddEmployeeToProjectToFex()"
            >
              Add to Project
            </button>
          </form>

          <form
            id="remove_employee_from_project--form"
            class="roles_and_responsibilities--mini-form remove_employee_from_project--form"
          >
            <h2 class="remove_employee_from_project--title">
              Remove From Project
            </h2>
            <div class="remove_employee_from_project--content-holder">
              <div class="employee-selection--holder">
                <label
                  for="remove_employee_from_project--employee--selection"
                  class="remove_employee_from_project--employee--label"
                >
                  Employee
                  <select
                    required
                    name="remove_employee_from_project--employee--selection"
                    id="remove_employee_from_project--employee--selection"
                    class="remove_employee_from_project--employee--selection"
                  >
                    <option value="">- Select an Employee -</option>
                  </select>
                </label>
              </div>

              <div class="project-information-holder">
                <label
                  for="remove_employee_from_project--project_desc--selection"
                  class="remove_employee_from_project--project_desc--label"
                >
                  Project
                  <select
                    required
                    name="remove_employee_from_project--project_desc--selection"
                    id="remove_employee_from_project--project_desc--selection"
                    class="remove_employee_from_project--project_desc--selection"
                  >
                    <option value="">- Select an Employee First -</option>
                  </select>
                </label>

                <label
                  for="remove_employee_from_project--sub_assignment--selection"
                  class="remove_employee_from_project--sub_assignment--label"
                >
                  Sub-Assignment
                  <select
                    required
                    name="remove_employee_from_project--sub_assignment--selection"
                    id="remove_employee_from_project--sub_assignment--selection"
                    class="remove_employee_from_project--sub_assignment--selection"
                  >
                    <option
                      id="remove_employee_from_project--sub_assignment--empty-display-option"
                      value="00"
                    >
                      - Select a Project First -
                    </option>
                  </select>
                </label>
              </div>
            </div>
            <button
              class="remove_employee_from_project--button"
              id="remove_employee_from_project--button"
              onclick="sendRemoveEmployeeFromProjectToFex()"
            >
              Remove From Project
            </button>
          </form>

          <form class="roles_and_responsibilities--mini-form manage_roles_and_tasks--form">
            <h2>Manage Roles/Tasks</h2>
            <div class="employee_and_project_details--selector-group">
              <div class="employee_selection--holder">
                <label
                  class="manage_roles--employee_label"
                  for="manage_roles--employee_selector"
                >
                  Employee
                  <select
                    name="manage_roles--employee_selector"
                    id="manage_roles--employee_selector"
                  >
                    <option value="">- Select an Employee -</option>
                  </select>
                </label>
              </div>

              <div class="project_selections--holder">
                <label
                  class="manage_roles--project_label"
                  for="manage_roles--project_selector"
                >
                  Project
                  <select
                    name="manage_roles--project_selector"
                    id="manage_roles--project_selector"
                  >
                    <option value="">- Select an Employee First -</option>
                  </select>
                </label>

                <label
                  class="manage_roles--sub-assignment_label"
                  for="manage_roles--sub-assignment_selector"
                >
                  Sub-Assignment
                  <select
                    name="manage_roles--sub-assignment_selector"
                    id="manage_roles--sub-assignment_selector"
                  >
                    <option value="">- Select a Project First -</option>
                  </select>
                </label>
              </div>
            </div>

            <div class="roles_and_tasks--management-section">
              <div class="section_container roles_holder">
                <h3 class="roles_title">Roles</h3>
                <div
                  id="roles_interaction_section"
                  class="interaction-section roles_interaction_section"
                >
                  <span class="role-entry">
                    <button
                      class="remove_item--button"
                      title="Delete This Task"
                      type="button"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="6" cy="6" r="6" fill="#CB3F3F" />
                        <rect
                          x="8.51953"
                          y="3.33398"
                          width="0.666667"
                          height="7.33333"
                          transform="rotate(45 8.51953 3.33398)"
                          fill="#F5ABAB"
                        />
                        <rect
                          x="3.80566"
                          y="3.33398"
                          width="7.33333"
                          height="0.666667"
                          transform="rotate(45 3.80566 3.33398)"
                          fill="#F5ABAB"
                        />
                      </svg>
                    </button>
                    <p>Role 1</p>
                  </span>
                </div>
                <div class="addition_holder role_addition--holder">
                  <label for="">
                    Enter New Role
                    <input id="add-to-role-list--input" type="text" />
                  </label>
                  <button
                    onclick="addToEmployeeRoles()"
                    class="add_task_and_role--button add_new_role--button"
                    type="button"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div class="section_container tasks_holder">
                <h3 class="tasks_title">Tasks</h3>
                <div
                  id="tasks_interaction_section"
                  class="interaction-section tasks_interaction_section"
                >
                  <span class="task-entry">
                    <button
                      class="remove_item--button"
                      title="Delete This Task"
                      type="button"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="6" cy="6" r="6" fill="#CB3F3F" />
                        <rect
                          x="8.51953"
                          y="3.33398"
                          width="0.666667"
                          height="7.33333"
                          transform="rotate(45 8.51953 3.33398)"
                          fill="#F5ABAB"
                        />
                        <rect
                          x="3.80566"
                          y="3.33398"
                          width="7.33333"
                          height="0.666667"
                          transform="rotate(45 3.80566 3.33398)"
                          fill="#F5ABAB"
                        />
                      </svg>
                    </button>
                    <p>Task 1</p>
                  </span>
                </div>
                <div class="addition_holder task_addition--holder">
                  <label for="">
                    Enter New Task
                    <input type="text" />
                  </label>
                  <button
                    class="add_task_and_role--button add_new_task--button"
                    type="button"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <iframe
          src=""
          id="add_employee_to_project--fex-iframe"
          class="attach-contact-to-project--fex-iframe"
        ></iframe>

        <iframe
          src=""
          id="remove_employee_from_project--fex-iframe"
          class="attach-contact-to-project--fex-iframe"
        ></iframe>

        <iframe
          src=""
          id="assign_employee_roles--fex-iframe"
          class="attach-contact-to-project--fex-iframe"
        ></iframe>

        <iframe
          src=""
          id="add_employee_role_iframe"
          class="attach-contact-to-project--fex-iframe"
        ></iframe>
      </main>
    </div>
  );
}

export default employee_roles_and_responsibilities;
