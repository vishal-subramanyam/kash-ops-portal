import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { domain } from "../assets/api/apiEndpoints";
import SuccessMessage from "../components/SuccessMessage";
import AlertMessage from "../components/AlertMessage";

function EditCompanyDetails(props) {
  let alertMessage = useRef();
  let successMessage = useRef();
  let editCompanyForm = useRef();
  let companyNameInput = useRef();
  let companyIdInput = useRef();
  let companyAddressInput = useRef();
  let companyCityInput = useRef();
  let companyStateInput = useRef();
  let companyZipInput = useRef();
  let companyCountryInput = useRef();
  let selectedCompanyDropdown = useRef();
  let selectedCompanyOption = useRef();
  let [message, setMessage] = useState();
  let [selectedCurrentCompany, setSelectedCurrentCompany] = useState({});
  let [allCompaniesArr, setAllCompaniesArr] = useState([]);

  useEffect(() => {
    if (props.loggedInUser.AdminLevel === "Super Admin") {
      getAllCompanies();
    } else {
      getAllCompaniesByCompanyAdmin();
    }
  }, [selectedCurrentCompany]);

  const getAllCompanies = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "KASH_OPERATIONS_COMPANY_TABLE",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setAllCompaniesArr(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to get projects from database. ${err}`)
        );
        alertMessage.current.showModal();
      });
  };

  const getAllCompaniesByCompanyAdmin = async () => {
    await fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _keyword_: "COMPANY_BY_COMPANY_ADMIN_TABLE",
        EmpId: props.loggedInUser.EmpId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAllCompaniesArr(res.data);
      })
      .catch((err) => {
        setMessage(
          alertMessageDisplay(`Unable to get companies from database. ${err}`)
        );
        alertMessage.current.showModal();
      });
  };

  const onNameChange = (e, i) => {
    let selectedCompanyId =
      e.target.children[e.target.selectedIndex].getAttribute("data-companyid");
    let selectedCompanyFromDropdown = allCompaniesArr.filter((company, i) => {
      return selectedCompanyId === company.CompanyId;
    });
    console.log(selectedCompanyFromDropdown);
    if (selectedCompanyId === null) {
      setSelectedCurrentCompany({});
      companyNameInput.current.value = "";
      companyIdInput.current.value = "";
      companyAddressInput.current.value = "";
      companyCityInput.current.value = "";
      companyStateInput.current.value = "";
      companyZipInput.current.value = "";
      companyCountryInput.current.value = "";
    } else {
      setSelectedCurrentCompany(selectedCompanyFromDropdown[0]);
      populateCompanyDetailInputs(selectedCompanyFromDropdown);
    }
  };

  const populateCompanyDetailInputs = (company) => {
    console.log(company);
    companyNameInput.current.value = company[0].CompanyName;
    companyIdInput.current.value = company[0].CompanyId;
    companyAddressInput.current.value = company[0].CompanyAddress;
    companyCityInput.current.value = company[0].CompanyLocationCity;
    companyStateInput.current.value = company[0].CompanyLocationState;
    companyZipInput.current.value = company[0].CompanyZipCode;
    companyCountryInput.current.value = company[0].CompanyLocationCountry;
  };

  const updateCompany = (e) => {
    e.preventDefault();
    if (selectedCompanyDropdown.current.value === "") {
      setMessage(alertMessageDisplay("Please select a company to update."));
      alertMessage.current.showModal();
      return;
    }
    let formDetails = new FormData(editCompanyForm.current);
    let formDetailsArr = [];

    for (const entry of formDetails) {
      formDetailsArr.push(entry);
    }
    console.log(formDetailsArr);
    try {
      const response = fetch(
        `${domain}GenericTransactionService/processTransactionForUpdate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                CompanyAddress: formDetailsArr[3][1],
                CompanyName: formDetailsArr[1][1],
                ExternalUsername: "-",
                CompanyId: formDetailsArr[2][1],
                CompanyLocationState: formDetailsArr[5][1],
                CompanyLocationCountry: formDetailsArr[7][1],
                CompanyLocationCity: formDetailsArr[4][1],
                CompanyZipCode: formDetailsArr[6][1],
              },
            ],
            _keyword_: "KASH_OPERATIONS_COMPANY_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );

      setMessage(
        alertMessageDisplay(`${selectedCurrentCompany.CompanyName} is updated.`)
      );
      successMessage.current.showModal();

      setSelectedCurrentCompany({});
      editCompanyForm.current.reset();
    } catch (error) {
      setMessage(
        alertMessageDisplay(
          `Unable to update ${selectedCurrentCompany.CompanyName}. Error: ${error}`
        )
      );
      alertMessage.current.showModal();
    }
  };
  const deleteCompany = async (e) => {
    e.preventDefault();
    console.log(selectedCompanyDropdown.current.value);
    console.log(selectedCurrentCompany);
    // make sure a project is selected in dropdown before user can delete
    if (selectedCompanyDropdown.current.value === "") {
      setMessage(alertMessageDisplay("Please select a company to delete."));
      alertMessage.current.showModal();
      return;
    }
    try {
      const response = await fetch(
        `${domain}/GenericTransactionService/processTransactionForDelete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                CompanyId: selectedCurrentCompany.CompanyId,
              },
            ],
            _keyword_: "KASH_OPERATIONS_COMPANY_TABLE",
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        }
      );
      setMessage(
        alertMessageDisplay(`${selectedCurrentCompany.CompanyName} is Deleted.`)
      );
      successMessage.current.showModal();
      editCompanyForm.current.reset();
      setSelectedCurrentCompany({});
    } catch (error) {
      setMessage(
        alertMessageDisplay(`Unable to delete company. Error: ${error}`)
      );
      alertMessage.current.showModal();
    }
  };

  const alertMessageDisplay = (entry) => {
    return entry;
  };

  const closeAlert = () => {
    alertMessage.current.close();
  };
  return (
    <div>
      <AlertMessage ref={alertMessage} close={closeAlert} message={message} />
      <SuccessMessage
        ref={successMessage}
        close={closeAlert}
        message={message}
      />
      <main className="edit-company-page__main-section max-width--main-container">
        <h1 className="edit-company-title form-page-title--lg-1">
          Edit or Delete a Company
        </h1>
        <div className="edit_page__return-link-holder">
          <Link to="/client-hub" className="return-link">
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
            <p className="return-link-text">Return to Clients</p>
          </Link>
        </div>
        <div className="add-company-page--content-holder">
          <div className="add-company-img-holder">
            <img
              src={require("../assets/images/EditCompanyImg.png")}
              alt="Company office interior setting"
              className="add-company-img"
            />
          </div>

          <form
            id="add-company-form"
            className="add-company-form"
            ref={editCompanyForm}
          >
            <div className="add-company-form--company-details">
              <label
                for="company-form--name-input"
                className="company-form--name-label"
              >
                Companies
                <select
                  required="required"
                  type="text"
                  className="add-company-form-input company-form--name-input"
                  id="company-form--name-input"
                  name="company-form--name-input"
                  ref={selectedCompanyDropdown}
                  onChange={onNameChange}
                >
                  <option value="">- Choose A Company -</option>
                  {allCompaniesArr.map((company, i) => {
                    return (
                      <option
                        key={i}
                        value={company.CompanyName}
                        data-companyid={company.CompanyId}
                        ref={selectedCompanyOption}
                      >
                        {company.CompanyName}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label
                for="company-form--name-input"
                className="company-form--name-label"
              >
                Company Name
                <input
                  required="required"
                  type="text"
                  className="add-company-form-input company-form--name-input"
                  id="company-form--name-input"
                  name="company-form--name-input"
                  ref={companyNameInput}
                />
              </label>
              <label
                for="company-form--id-input"
                className="company-form--id-label"
              >
                Company ID
                <input
                  readOnly
                  required="required"
                  type="text"
                  className="add-company-form-input company-form--id-input company-form--id-input-readonly"
                  id="company-form--id-input"
                  name="company-form--id-input"
                  ref={companyIdInput}
                />
              </label>
            </div>

            <div className="add-company-form--company-location">
              <label
                for="company-form--address-input"
                className="company-form--address-label"
              >
                Address
                <input
                  type="text"
                  className="add-company-form-input company-form--address-input"
                  id="company-form--address-input"
                  name="company-form--address-input"
                  ref={companyAddressInput}
                />
              </label>

              <label
                for="company-form--city-input"
                className="company-form--city-label"
              >
                City
                <input
                  type="text"
                  className="add-company-form-input company-form--city-input"
                  id="company-form--city-input"
                  name="company-form--city-input"
                  ref={companyCityInput}
                />
              </label>

              <label
                for="company-form--state-input"
                className="company-form--state-label"
              >
                State
                <input
                  type="text"
                  className="add-company-form-input company-form--state-input"
                  id="company-form--state-input"
                  name="company-form--state-input"
                  ref={companyStateInput}
                />
              </label>

              <label
                for="company-form--zip_code-input"
                className="company-form--zip_code-label"
              >
                Zip Code
                <input
                  type="text"
                  className="add-company-form-input company-form--zip_code-input"
                  id="company-form--zip_code-input"
                  name="company-form--zip_code-input"
                  ref={companyZipInput}
                />
              </label>

              <label
                for="company-form--country-input"
                className="company-form--country-label"
              >
                Country
                <input
                  type="text"
                  className="add-company-form-input company-form--country-input"
                  id="company-form--country-input"
                  name="company-form--country-input"
                  ref={companyCountryInput}
                />
              </label>
            </div>

            <div className="edit-company-button-container">
              <button
                className="btn btn-primary update-company-btn"
                onClick={updateCompany}
              >
                Update
              </button>
              <button
                className="btn btn-danger delete-company-btn"
                onClick={deleteCompany}
              >
                Delete Company
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditCompanyDetails;
