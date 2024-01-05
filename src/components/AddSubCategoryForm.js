import React, {useRef} from "react";

function AddSubCategoryForm(props) {

    let newWorkAreaInput = useRef();
    let newWorkAreaIdInput = useRef();

    const validateRequiredInputs = () => {
        console.log("Validate Inputs")
    }
 
    return (
    
        <form className="add-sub-assignment-input-area">
                <div className="add-sub-assignment-workspace-form--form-input--plus">
                  <svg
                    id="addWorkspaceBtn"
                    className="add-sub-assignment-details-form--add-sub-assignment-button-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0,0,256,256"
                    width="25"
                    height="25"
                    fillRule="nonzero"
                  >
                    <g
                      fill="#e7549a"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
                    </g>
                    <g
                      fill="#ffffff"
                      fill-rule="evenodd"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(10.66667,10.66667)">
                        <path d="M11,2v9h-9v2h9v9h2v-9h9v-2h-9v-9z"></path>
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="add-sub-assignment-workspace-form--form-input--workspace-input">
                  <input
                    id="newWorkAreaInput"
                    className="add-sub-assignment-details-form--form-input add-workspace"
                    type="text"
                    placeholder="Work Area"
                    required="required"
                    ref={newWorkAreaInput}
                  />
                </div>

                <div className="add-sub-assignment-workspace-form--form-input--task-area-input">
                  <input
                    id="newWorkAreaIdInput"
                    className="add-sub-assignment-details-form--form-input add-task-area"
                    type="text"
                    placeholder="Work Area ID"
                    required="required"
                    ref={newWorkAreaIdInput}
                  />
                </div>

                <button
                  id="createWorkAreaBtn"
                  className="add-sub-assignment-workspace-form--add-button"
                  type="button"
                  onClick={validateRequiredInputs}
                >
                  Create Work Area
                </button>
              </form> 
              );
}

export default AddSubCategoryForm;