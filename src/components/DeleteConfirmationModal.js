import React from "react";
import "../assets/styles/Styles.css"


function DeleteConfirmationModal(props) {
    return (  
    <dialog id="myModal"
    className="confirm-delete-dialog-box" 
    // ref={confirmationModal}
    >
             <div id="confirmmsgdiv" className="modal-dialog modal-confirm">
                  <div className="modal-content">
                      <div className="modal-header flex-column">						
                          <h4 className="modal-title w-100">Confirm Delete</h4>	
                          <button onClick={props.close} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      </div>
                      <div id="removeconfirmpopup" className="modal-body">
                          <p>Are you sure you want to delete <b>Sub Category or Segment</b>? </p>    				
                      </div>
                      <div className="modal-footer justify-content-center">
                          <button onClick={props.close} type="button" className="modal-btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button type="button" className="modal-btn btn-danger" onClick={props.deleteRecord}>Delete</button>
                      </div>
                  </div>
              </div>
          </dialog> );
}

export default DeleteConfirmationModal;