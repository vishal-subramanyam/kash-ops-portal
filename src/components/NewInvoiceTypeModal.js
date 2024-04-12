import React, { forwardRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { common } from "@mui/material/colors";
import "../assets/styles/HomePage.css";

const newInvoiceTypeModal = forwardRef(function (props, ref) {
  const selectInvoiceType = (e) => {
    console.log(e.target);
  };

  return (
    <dialog
      className="database-submit-dialog invoice-type-modal-container"
      role="alert"
      id="database-submit-dialog"
      ref={ref}
    >
      <h1 className="new-invoice__page-title form-page-title--lg-1">
        Create New Invoice
      </h1>
      <form method="dialog" className="new-invoice-type-form">
        <div className="new-invoice-type new-ts-invoice-choice">
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: common, "& .MuiSvgIcon-root": { fontSize: 45 } }}
                onChange={(e) => selectInvoiceType(e)}
                // color="#fff"
              />
            }
            label="From Timesheet Data"
            labelPlacement="top"
          />
        </div>

        <div className="new-invoice-type new-blank-invoice-choice">
          <FormControlLabel
            control={
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 45 } }}
                onChange={(e) => selectInvoiceType(e)}
                // color="#fff"
              />
            }
            label="Blank Invoice"
            labelPlacement="top"
          />
        </div>

        {/* <div>
          <button
            className="dialog-modal-confirm-button invoice-type-modal-button"
            id="dialog-modal-confirm-button"
            value="confirm"
            style={{ marginTop: "15px" }}
            onClick={props.close}
          >
            CLOSE
          </button>
        </div> */}
      </form>
    </dialog>
  );
});

export default newInvoiceTypeModal;
