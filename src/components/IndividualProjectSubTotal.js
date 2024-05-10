import React from "react";
import "../assets/styles/ManageInvoices.css";

function individualProjectSubTotal(props) {
  let projectIndex = props.i;
  console.log(projectIndex);

  return (
    <section className="invoice--project-sub-total">
      <ol>
        <li>PROJECT SUBTOTAL</li>
        <li>
          {props.name}
          <span>({props.sowId})</span>
        </li>
        {console.log(props.subTotal)}
        <li>$ {!props.subTotal[props.i] ? 0 : props.subTotal[props.i]}</li>
      </ol>
    </section>
  );
}

export default individualProjectSubTotal;
