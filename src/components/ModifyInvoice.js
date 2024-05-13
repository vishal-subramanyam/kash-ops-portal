import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../assets/styles/ManageInvoices.css";

function ModifyInvoice(props) {
  console.log(props.dataToServer);
  let invoicePDF = useRef();
  const downloadPDF = () => {
    console.log("download PDF triggered");
    html2canvas(invoicePDF.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      pdf.save(`${props.dataToServer.invoice_num}.pdf`);
    });
  };

  return (
    <section className="ManageInvoices--modify-invoice-tab-content">
      {!props.dataToServer ? (
        <div className="Invoice-pdf--placeholder-container"></div>
      ) : (
        <>
          <section className="Invoice-pdf--container" ref={invoicePDF}>
            <header>
              <section className="Invoice-pdf--heading">
                <h1>Invoice</h1>
                <h5>KASH Tech, LLC</h5>
              </section>
              <section className="Invoice-pdf--header-details">
                <section className="Invoice-header-left">
                  <ol>
                    <li className="Invoice-num">
                      <p>Invoice #</p>
                      <p className="Invoice-detail">
                        {props.dataToServer.invoice_num}
                      </p>
                    </li>
                    <li className="Invoice-date">
                      <p>Invoice Date</p>
                      <p className="Invoice-detail">
                        {props.dataToServer.creation_date}
                      </p>
                    </li>
                    <li className="Invoice-period">
                      <p>Invoice Period</p>
                      <div>
                        <p className="Invoice-detail">
                          {props.dataToServer.date_from +
                            " - " +
                            props.dataToServer.date_to}
                        </p>
                      </div>
                    </li>
                    <li className="Invoice-due-date">
                      <p>Due Date</p>
                      <p className="Invoice-detail">
                        {props.dataToServer.due_date}
                      </p>
                    </li>
                  </ol>
                </section>
                <section className="Invoice-header-right">
                  <section className="Invoice-pdf--attn">
                    <h6>ATTN:</h6>
                    <ol>
                      <li>{props.dataToServer.attn["name"]}</li>
                      <li>
                        <b>{props.dataToServer.company_name}</b>
                      </li>
                      <li>
                        {props.dataToServer.company_info[0].CompanyAddress}
                      </li>
                      {/* <li>Suite 587</li> */}
                      <li>
                        {props.dataToServer.company_info[0].CompanyLocationCity}
                        ,{" "}
                        {
                          props.dataToServer.company_info[0]
                            .CompanyLocationState
                        }{" "}
                        {props.dataToServer.company_info[0].CompanyZipCode}
                      </li>
                      {/* <li>000-000-0000</li> */}
                    </ol>
                  </section>
                </section>
              </section>
            </header>
            <main className="Invoice-pdf--project-data-container">
              <ol className="Invoice-pdf--project-details">
                {/* map over props.dataToServer["hrs"]*/}

                {props.dataToServer.invoice_hrs.map((project, p) => {
                  return (
                    <li key={p} className="Invoice-pdf--individual-project">
                      <header className="Invoice-pdf--project-name">
                        Project: <span>{project.projectName}</span>
                      </header>
                      <section className="Invoice-pdf--project-hrs">
                        <header className="Invoice-pdf--project-hrs-header">
                          <ol>
                            <li>Name</li>
                            <li>Role</li>
                            <li>Hours</li>
                            <li>
                              Rate <span>(/hr)</span>
                            </li>
                            <li>Amount</li>
                          </ol>
                        </header>
                        {/* iterate over the hrs data array from  props.dataToServer["hrs"] */}

                        <ol className="Invoice-pdf--project-hrs-details">
                          {project.hrs.map((userRecord, u) => {
                            return (
                              <li key={u}>
                                <ol className="Invoice-pdf--project-hrs-record">
                                  <li>{userRecord.FullName}</li>
                                  <li>{userRecord.Role}</li>
                                  <li>{userRecord.TotalHours}</li>
                                  <li>$ {userRecord.Rate}</li>
                                  <li>$ {userRecord.Amount}</li>
                                </ol>
                              </li>
                            );
                          })}
                        </ol>
                      </section>
                      <section className="Invoice-pdf--project-sub-total">
                        <p>Project Sub-Total: </p>
                        <p>$ {props.dataToServer.sub_totals[p]}</p>
                      </section>
                    </li>
                  );
                })}
              </ol>
            </main>
            <section className="Invoice-pdf--grand-total-section">
              <ol>
                <li>
                  <p>Total:</p>
                  <p>$ {props.dataToServer.pre_tax_total}</p>
                </li>
                <li>
                  {/* <label htmlFor="">Tax Rate (%):</label>
              <input type="number" min={0}></input> */}
                  <p>Tax Rate (%):</p>
                  <p>{props.dataToServer.tax_rate}</p>
                </li>
                <li>
                  <p>Grand Total</p>
                  <p>$ {props.dataToServer.grand_total}</p>
                </li>
              </ol>
            </section>
            <footer>
              <h6>KASH Tech, LLC</h6>
              <ol>
                <li>250 International Pkwy, Lake Mary, FL 32746 USA</li>
                <li>|</li>
                <li>407-710-0548</li>
                <li>|</li>
                <li>sales.kashtechllc.com</li>
              </ol>
            </footer>
          </section>
          <button
            className="Invoice-pdf--pdf-btn"
            onClick={(e) => downloadPDF()}
          >
            Download PDF
          </button>
        </>
      )}
    </section>
  );
}

export default ModifyInvoice;
