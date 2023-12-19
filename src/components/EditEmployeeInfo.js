import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/Styles.css";
import "../assets/styles/EditEmployeeInfo.css";

function EditEmployeeInfo() {
  let adminSelected;
  let adminCheckbox = useRef();
  let [isEmployeeAdmin, setEmployeeAsAdmin] = useState(false);
  let [allEmployeesArr, setAllEmployeesArr] = useState([]);
  let [selectedCurrentEmployee, setSelectedCurrentEmployee] = useState({});
  // useEffect to fetch data from KASH_OPERATIONS_EMPLOYEE_TABLE for the employee select dropdown that triggers onNameChange function
  // fetch from Employee table and check if employee is Admin level
  // if Admin level user, check the admin checkbox

  useEffect(() => {
    fetch("http://localhost:4040/GenericResultBuilderService/buildResults", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_EMPLOYEE_TABLE" }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllEmployeesArr(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const checkIfEmployeeAdmin = async (id) => {
    await fetch(
      "http://localhost:4040/GenericResultBuilderService/buildResults",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_ADMIN_TABLE" }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(id);
        // return res.data;
        // check if id matches and id in the response
        adminSelected = res.data.filter((admin, i) => admin.EmpId === id);
        // if admin selected, return true else return false
      })
      .catch((err) => alert(err));
  };

  const onNameChange = async (e) => {
    // fetch employee name from database
    // populate the input fields with relevant data from api call
    console.log(
      "selected employee from dropdown " +
        e.target.children[e.target.selectedIndex].getAttribute(
          "data-employeeId"
        )
    );
    let selectedEmployeeId =
      e.target.children[e.target.selectedIndex].getAttribute("data-employeeid");
    // set state array for selected employee if the employee Ids match
    let selectedEmployeeFromDropdown = allEmployeesArr.filter((employee, i) => {
      return selectedEmployeeId === employee.EmpId;
    });
    console.log(selectedEmployeeFromDropdown);
    setSelectedCurrentEmployee(...selectedEmployeeFromDropdown);

    // if selected user employee id in admin table, set attrribute checked to admin checkbox input
    await checkIfEmployeeAdmin(selectedEmployeeFromDropdown[0].EmpId);
    console.log(adminSelected);
    if (adminSelected.length !== 0) {
      setEmployeeAsAdmin(true);
    } else {
      setEmployeeAsAdmin(false);
    }
  };
  console.log(isEmployeeAdmin);
  // console.log(selectedCurrentEmployee);

  const updateUser = () => {
    // make a fetch post call to update employee info given field values
  };

  const deleteUser = () => {
    // make a fetch call to the delete user endpoint
  };
  return (
    <div className="edit-employee_information--body">
      {/* <iframe id="loadSelectionsFrame" className="hidden" src="WFServlet?IBIC_server=EDASERVE&IBIMR_drill=IBFS,RUNFEX,IBIF_ex,true&IBIF_ex=IBFS:/WFC/Repository/KashDemo_Files/KASH_Operations/get_employee_dropdown.fex"></iframe> */}

      <div id="employee_edit_container" className="edit_table_container col-12">
        <div className="roles_and_responsibilities--mini-form manage_roles_and_tasks--form">
          <h2>Edit Employee Information</h2>
          <label className="manage_roles--employee_label" htmlFor="EMP_ID">
            Employee
            <select name="EMP_ID" id="EMP_ID" onChange={onNameChange}>
              <option value="Select an Employee">-Select an Employee-</option>
              {allEmployeesArr.map((employee, i) => {
                return (
                  <option
                    data-employeeid={employee.EmpId}
                    value={`${employee.FirstName} ${employee.LastName}`}
                    key={i}
                  >
                    {`${employee.FirstName} ${employee.LastName}`}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="employee-info-form">
            <div className="left_group_inputs">
              <br />
              <label htmlFor="admin-checkbox">
                Admin
                <input
                  type="checkbox"
                  id="admin-checkbox"
                  name="admin-checkbox"
                  value=""
                  // ref={adminCheckbox}
                  checked={isEmployeeAdmin ? "checked" : ""}
                />
              </label>
              <br />
              <label htmlFor="userName">
                Username
                <input
                  // style={{ display: "none" }}
                  id="userName"
                  className="form-control"
                  value={selectedCurrentEmployee.WfInternalUsn}
                  readOnly
                />
              </label>

              <label
                className="manage_roles--employee_label"
                htmlFor="FIRSTNAME"
              >
                First name
                <input
                  id="firstnamebox"
                  name="FIRSTNAME"
                  className="form-control"
                  defaultValue={selectedCurrentEmployee.FirstName}
                ></input>
              </label>

              <label
                className="manage_roles--employee_label"
                htmlFor="manage_employees--last_name"
              >
                Last name
                <input
                  id="lastnamebox"
                  name="LASTNAME"
                  className="form-control"
                  defaultValue={selectedCurrentEmployee.LastName}
                ></input>
              </label>

              <label className="manage_roles--employee_label" htmlFor="EMAIL">
                Email Address
                <input
                  id="emailbox"
                  name="EMAIL"
                  className="form-control"
                  defaultValue={selectedCurrentEmployee.EmployeeAddress}
                ></input>
              </label>

              <label className="manage_roles--employee_label" htmlFor="PHONE">
                Phone Number
                <input
                  id="phonebox"
                  name="PHONE"
                  className="form-control"
                  defaultValue={selectedCurrentEmployee.PhoneNumber}
                ></input>
              </label>
            </div>

            <div className=" left_group_inputs">
              <label className="manage_roles--employee_label" htmlFor="CITY">
                Location City
                <input
                  id="citybox"
                  name="manage_employees--city"
                  className="form-control"
                  defaultValue={selectedCurrentEmployee.EmpLocationCity}
                ></input>
              </label>

              <label className="manage_roles--employee_label" htmlFor="STATE">
                State/Province/Territory
                <input
                  id="statebox"
                  name="manage_employees--state"
                  className="form-control"
                  defaultValue={selectedCurrentEmployee.EmpLocationState}
                ></input>
              </label>

              <label className="manage_roles--employee_label" htmlFor="COUNTRY">
                Country
                <input
                  id="countrybox"
                  name="manage_employees--email"
                  className="form-control"
                  defaultValue={selectedCurrentEmployee.EmpLocationCountry}
                ></input>
              </label>
              <div className="buttonContainer">
                <button className="btn btn-primary" onClick={updateUser}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={deleteUser}>
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeInfo;
