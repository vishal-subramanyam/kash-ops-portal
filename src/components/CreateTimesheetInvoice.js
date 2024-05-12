import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ManageInvoices.css";
import UsersDetailsByProject from "./UsersDetailsByProject";
import IndividualProjectSubTotal from "./IndividualProjectSubTotal";

function CreateTimesheetInvoice(props) {
  let [hrsToServer, setHrsToServer] = useState([]);
  let [eachProjectSubTotal, setProjectSubTotal] = useState({});
  let [invoiceTotal, setInvoiceTotal] = useState(0);
  let [dueDate, setDueDate] = useState("");
  let [creationDate, setCreationDate] = useState("");
  let [attn, setAttn] = useState({});
  let [taxRate, setTaxRate] = useState(0);
  // // Apply delay/ debouncer? to wait a couple seconds before triggering dispatch to update filterHours Array in state
  // const updateUserAllRecords = (i, j, role, rate) => {
  //   let stateHrsCopy = [...props.filteredHours];
  //   let updatedRecordValue = stateHrsCopy[i].data[j];
  //   console.log("update all user record", i, j, role, rate);
  //   console.log(updatedRecordValue);

  //   // iterate all billed hours array to a project by an individual user to update their role property with input value
  //   updatedRecordValue.data.map((record) => {
  //     console.log(record["Rate"]);
  //     record["Role"] = role;
  //     record["Rate"] = parseFloat(rate);

  //     if (record["Rate"]) {
  //       record["Amount"] = rate * record["TotalHours"];
  //     }
  //   });
  //   setHrsToServer(stateHrsCopy);

  //   // send arrray to calculate total amount for individual project
  //   individualProjectSubTotal(stateHrsCopy);
  //   // update filteredHours array in state with prop value update
  //   props.updateFilteredHrsArr(stateHrsCopy);
  // };

  // // Apply delay/ debouncer? to wait a couple seconds before triggering dispatch to update filterHours Array in state
  // const updateUserSingleRecord = (i, j, k, propName, e) => {
  //   console.log("update user single record", i, j, propName, e.target.value);
  //   let stateHrsCopy = [...props.filteredHours];
  //   let updatedRecordValue = stateHrsCopy[i].data[j].data[k];
  //   updatedRecordValue[propName] = e.target.value;
  //   // single user record object
  //   console.log(updatedRecordValue);
  //   // updated hours array to send to dispatch to update filteredHours array
  //   console.log(stateHrsCopy);

  //   // Calculate Amount field - individual user record Rate * Hrs
  //   if (propName === "Rate") {
  //     updatedRecordValue["Amount"] =
  //       e.target.value * updatedRecordValue["TotalHours"];
  //   }

  //   // run function to iterate user billed data in a project to account for rate update in order to render update in total amount in accordian
  //   let updatedTotalAmount = stateHrsCopy[i].data[j].data.reduce(
  //     (acc, curr) => {
  //       return acc + curr.Amount;
  //     },
  //     0
  //   );
  //   console.log(updatedTotalAmount);
  //   setHrsToServer(stateHrsCopy);

  //   // send arrray to calculate total amount for individual project
  //   individualProjectSubTotal(stateHrsCopy);
  //   // update filteredHours array in state with prop value update
  //   props.updateFilteredHrsArr(stateHrsCopy);
  // };

  // Convert the from and to date to read mm/dd/yyy instead of how it comes from the DB: yyyy-mm-dd
  const convertDateFormat = (date) => {
    const newDate = date.replaceAll("-", "/").split("/");
    console.log(newDate);

    const temp = newDate[1];
    newDate[1] = newDate[2];
    newDate[2] = temp;

    const newDateFormat = newDate.reverse().join("/");
    return newDateFormat;
  };

  // update individual user's total billed hours value at accordian level
  const displayUserTotalBilledHrs = (i, j) => {
    let stateHrsCopy = [...props.filteredHours];
    let updatedRecordValue = stateHrsCopy[i].data[j];

    let totalBilledHours = updatedRecordValue.data.reduce((acc, currRecord) => {
      return acc + parseFloat(currRecord.TotalHours);
    }, 0);

    // return total billed hours to display at top level of user record accordian
    return totalBilledHours;
  };

  // display the total amount - rate * hours - at top level of accordian for individual user records
  const displayUserRecordTotalAmount = (total) => {
    console.log(total);
    return total;
  };

  // update overall rate values for individual user records
  const displayUserOverallRate = (i, j, e) => {
    let stateHrsCopy = [...props.filteredHours];
    let updatedRecordValue = stateHrsCopy[i].data[j];
    console.log(updatedRecordValue);
    updatedRecordValue.data.map((record, k) => {
      console.log(record);
      // updateUserSingleRecord(i, j, k, "Rate", e);
      return (record["Rate"] = parseFloat(e.target.value));
    });

    console.log(updatedRecordValue);
    console.log(stateHrsCopy);
    // call updateUserSingleRecord function to run update to single record Amount
    // updateUserSingleRecord;

    // update filteredHours array in state with prop value update
    props.updateFilteredHrsArr(stateHrsCopy);
  };

  // send state update on ManageInvoices component to track hours for invoice and other pertinent data
  const hoursToServer = (
    hrsToServer,
    subTotals,
    total,
    taxRate,
    dueDate,
    attn
  ) => {
    console.log(
      "create invoice btn clicked",
      hrsToServer,
      subTotals,
      total,
      taxRate,
      dueDate,
      attn
    );

    // auto generate invoice id
    let invoiceId = Math.floor(10000 + Math.random() * 90000);
    // auto generate invoice num
    let invoiceNum = `INV_${props.companyId}`;

    // iterate hrsToServer to extract all individual user record and add invoice_detail_id property to each record object - invoice num + i of iterator
    let hrsArrToServer = [];
    for (let i = 0; i < hrsToServer.length; i++) {
      for (let j = 0; j < hrsToServer[i].data.length; j++) {
        for (let k = 0; k < hrsToServer[i].data[j].data.length; k++) {
          let usrRec = hrsToServer[i].data[j].data[k];
          let invoiceDetailId = invoiceId + "_" + (k + 1);
          usrRec["invoiceDetailId"] = invoiceDetailId;
          console.log(usrRec);
          hrsArrToServer.push(usrRec);
        }
      }
    }

    //  create array for invoice hrs display: array of project objects containing array of ALL user hrs
    let hrsForInvoice = [];
    for (let i = 0; i < hrsToServer.length; i++) {
      let projectHrs = { projectName: "", hrs: [] };
      if (!projectHrs["projectName"]) {
        projectHrs["projectName"] = hrsToServer[i].projectName;
      }
      for (let j = 0; j < hrsToServer[i].data.length; j++) {
        for (let k = 0; k < hrsToServer[i].data[j].data.length; k++) {
          let usrRec = hrsToServer[i].data[j].data[k];
          let invoiceDetailId = invoiceId + (k + 1);
          usrRec["InvoiceDetailId"] = invoiceDetailId;
          console.log(usrRec);
          projectHrs["hrs"].push(usrRec);
        }
      }
      hrsForInvoice.push(projectHrs);
    }

    // hrsToServer.map((project) => {
    //   project.data.map((usr) => {
    //     usr.data.map((hrs, i) => {
    //       let usrRec = { ...hrs };
    //       let invoiceDetailId = invoiceId + i;
    //       usrRec["invoiceDetailId"] = invoiceDetailId;
    //       console.log(usrRec);
    //       return usrRec;
    //     });
    //   });
    // });

    console.log(hrsForInvoice);

    // convert taxRate to decimal, add subTotals (reduce method) then multiply by tax rate
    let taxRateDec = taxRate * 0.01;
    let taxTotal = total * taxRateDec;
    let grandTotal = taxTotal + total;

    // add properties for internal and external notes
    let dataToServer = {
      hrs: hrsToServer,
      hrs_flat: hrsArrToServer,
      invoice_hrs: hrsForInvoice,
      sub_totals: subTotals,
      pre_tax_total: total,
      grand_total: grandTotal,
      invoice_id: invoiceId,
      invoice_num: invoiceNum,
      tax_rate: taxRate,
      tax_rate_dec: taxRateDec,
      due_date: dueDate,
      creation_date: creationDate,
      attn: attn,
      company_id: props.companyId,
      company_name: props.companyName,
      company_info: props.selCompanyInfo,
      date_from: props.from,
      date_to: props.to,
    };
    console.log(dataToServer);
    props.saveDataToServer(dataToServer);
    props.showModifyInvoice("modifyTab");
  };

  const individualProjectSubTotal = (arr, i) => {
    // need to track specific project the subtotal is being applied
    console.log(arr);
    console.log(i);
    let projectHrs = eachProjectSubTotal;

    // iterate the billed hr array for each user per project and calculate each user's total amount and store in new array
    let totalHrsPerProjectArr = arr[i].data.map((proj, j) => {
      console.log(proj.data);
      return proj.data.reduce((acc, curr) => {
        return acc + curr.Amount;
      }, 0);
    });

    // get total Amount/ project subtotal for all user billed hours
    let totalHrsPerProject = totalHrsPerProjectArr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    console.log(i, totalHrsPerProject);

    if (!projectHrs[i]) {
      projectHrs[i] = 0;
    }
    projectHrs[i] = totalHrsPerProject;
    // setProjectSubTotal((prev) => [
    //   ...prev,
    //   { i: `${prev + totalHrsPerProject}` },
    // ]);
    console.log(projectHrs);
    updateInvoiceTotal(projectHrs);

    // dispatch to track the sub totals for the multiple projects
    props.updateSubTotalArr(projectHrs);

    // setProjectSubTotal((prev) => [...prev, { projectHrs }]);
  };

  const updateInvoiceTotal = (hrs) => {
    let totalsArr = Object.values(hrs);
    let total = totalsArr.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    setInvoiceTotal(total);

    // dispatch to track total of all projects
    props.updateInvoiceTotal(total);
  };

  return (
    <>
      <header>
        <h2 className="invoice--title">Invoice Details</h2>
        <section className="invoice--company-details">
          <h5 className="invoice--company-name">{props.companyName}</h5>
          <section className="invoice--date-range">
            <p>{convertDateFormat(props.from)}</p>
            <span>-</span>
            <p>{convertDateFormat(props.to)}</p>
          </section>
        </section>
      </header>
      {/* The section below is the container for the various company projects and their corresponding billed hours */}
      <section className="invoice-company-projects-container">
        {/* seperate each section below by project */}
        {props.filteredHours.map((rec, i) => {
          console.log("Individual Project in filteredHours state array:", rec);
          return (
            <section key={i} className="invoice-company-project">
              <h6 className="invoice--project-description">
                {rec.projectName}
                <span>({rec.projectSowId})</span>
              </h6>
              <section className="invoice-details-by-resource">
                {rec.data.map((userHrs, j) => {
                  /* This is the accordian that will show more details when clicked and expanded */
                  return (
                    <UsersDetailsByProject
                      key={j}
                      i={i}
                      j={j}
                      userHrs={userHrs}
                      // updateUserAllRecords={updateUserAllRecords}
                      // updateUserSingleRecord={updateUserSingleRecord}

                      filteredHours={props.filteredHours}
                      displayUserTotalBilledHrs={displayUserTotalBilledHrs}
                      setHrsToServer={setHrsToServer}
                      individualProjectSubTotal={individualProjectSubTotal}
                      updateFilteredHrsArr={props.updateFilteredHrsArr}
                    />
                  );
                })}
              </section>
              <IndividualProjectSubTotal
                i={i} // current project index from top level map function
                name={rec.projectName}
                sowId={rec.projectSowId}
                subTotal={eachProjectSubTotal}
              />
            </section>
          );
        })}

        <section className="invoice--projects-total-amount">
          <ol>
            <li>
              <h6>Invoice Total:</h6>
            </li>
            <li>
              <p>$ {invoiceTotal}</p>
            </li>
          </ol>
        </section>

        {/* save due date and tax rate on state of createtimesheetinvoice component to pass as args with create btn below */}
        <section className="invoice--tx-rt-due-date-inputs">
          <div>
            <label htmlFor="invoice--attn">Attn</label>
            <select
              name="invoice--attn"
              type="date"
              onChange={(e) =>
                setAttn({
                  id: e.target[e.target.selectedIndex].getAttribute(
                    "data-empid"
                  ),
                  name: e.target.value,
                })
              }
            >
              <option value=""></option>
              {props.companyAdmins
                .filter((admin, i) => {
                  if (props.companyId === admin.CompanyId) {
                    return admin;
                  }
                })
                .map((a, j) => {
                  return (
                    <option
                      key={j}
                      data-empid={a.EmpId}
                      value={a.FirstName + " " + a.LastName}
                    >
                      {a.FirstName + " " + a.LastName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label htmlFor="invoice--due-date">Creation Date</label>
            <input
              name="invoice--due-date"
              type="date"
              onBlur={(e) => setCreationDate(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="invoice--due-date">Due Date</label>
            <input
              name="invoice--due-date"
              type="date"
              onBlur={(e) => setDueDate(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="invoice--tax-rate">Tax Rate</label>
            <input
              name="invoice--tax-rate"
              type="number"
              min={0}
              onBlur={(e) => setTaxRate(e.target.value)}
            ></input>
          </div>
        </section>

        <section className="invoice--btn-container">
          <button
            className="invoice--create-btn"
            onClick={() =>
              hoursToServer(
                hrsToServer,
                eachProjectSubTotal,
                invoiceTotal,
                taxRate,
                dueDate,
                attn
              )
            }
          >
            Create Invoice
          </button>
          <button
            className="invoice--cancel-btn"
            onClick={() => props.cancel()}
          >
            Cancel
          </button>
        </section>
      </section>
      {/* <AlertMessage ref={alertMessage} close={closeAlert} message={message} /> */}
    </>
  );
}

export default CreateTimesheetInvoice;
