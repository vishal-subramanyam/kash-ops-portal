import React from "react";
import "../assets/styles/ManageInvoices.css";

function ModifyInvoice(props) {
  console.log(props.hrsToServer["hrs"]);
  return (
    <section className="ManageInvoices--modify-invoice-tab-content">
      <section className="Invoice-pdf--container">
        <header>
          <section className="Invoice-pdf--heading">
            <h1>Invoice</h1>
            <h5>KASH Tech, LLC</h5>
          </section>
          <section className="Invoice-pdf--header-details">
            <section className="Invoice-header-left">
              <ol>
                <li className="Invoice-num">
                  <p>Invoice #</p> <p className="Invoice-detail">ABC123</p>
                </li>
                <li className="Invoice-date">
                  <p>Invoice Date</p>{" "}
                  <p className="Invoice-detail">05/01/2024</p>
                </li>
                <li className="Invoice-period">
                  <p>Invoice Period</p>
                  <div>
                    <p className="Invoice-detail">01/01/2024 - 05/01/2024</p>
                  </div>
                </li>
                <li className="Invoice-due-date">
                  <p>Due Date</p> <p className="Invoice-detail">05/10/2024</p>
                </li>
              </ol>
            </section>
            <section className="Invoice-header-right">
              <section className="Invoice-pdf--attn">
                <h6>ATTN:</h6>
                <ol>
                  <li>John Smith</li>
                  <li>
                    <b>Sample Company</b>
                  </li>
                  <li>123 Sample Drive</li>
                  <li>Suite 587</li>
                  <li>Columbus, OH 43081</li>
                  <li>564-854-4297</li>
                </ol>
              </section>
            </section>
          </section>
        </header>
        <main className="Invoice-pdf--project-data-container">
          <ol className="Invoice-pdf--project-details">
            {/* map over props.hrsToServer["hrs"]*/}
            <li className="Invoice-pdf--individual-project">
              <header className="Invoice-pdf--project-name">
                Project: <span>Operations Development</span>
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
                {/* iterate over the hrs data array from  props.hrsToServer["hrs"] */}
                <ol className="Invoice-pdf--project-hrs-details">
                  <li>
                    <ol className="Invoice-pdf--project-hrs-record">
                      <li>Alex Gardner</li>
                      <li>Bi Developer</li>
                      <li>164.50</li>
                      <li>$50</li>
                      <li>$3250.00</li>
                    </ol>
                  </li>
                  <li>
                    <ol className="Invoice-pdf--project-hrs-record">
                      <li>Garrett Anderson</li>
                      <li>Web Developer</li>
                      <li>65</li>
                      <li>$38.00</li>
                      <li>$6251.00</li>
                    </ol>
                  </li>
                </ol>
              </section>
              <section className="Invoice-pdf--project-sub-total">
                <p>Project Sub-Total: </p>
                <p>$9501.00</p>
              </section>
            </li>
          </ol>
        </main>
        <section className="Invoice-pdf--grand-total-section">
          <ol>
            <li>
              <p>Total:</p>
              <p>$13,851.00</p>
            </li>
            <li>
              <label htmlFor="">Tax Rate (%):</label>
              <input type="number" min={0}></input>
            </li>
            <li>
              <p>Grand Total</p>
              <p>$14,405.50</p>
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
    </section>
  );
}

export default ModifyInvoice;
