import React from "react";
import { domain } from "../assets/api/apiEndpoints";

const wrapPromise = (promise) => {
  let status = "pending";
  let result = "";
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        console.log("status is pending: ", promise);
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    },
  };
};

const fetchUsers = () => {
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_USER_TABLE" }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      alert(`Unable to load users from database. Error: ${err}`);
    });
  return response;
};

const fetchCompanyAdmins = () => {
  let response = fetch(`${domain}GenericResultBuilderService/buildResults`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _keyword_: "COMPANY_ADMIN_ROLE_USER_COMPANY_DETAILS_TABLE",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      alert(`Unable to load users from database. Error: ${err}`);
    });
  return response;
};

export const createResource = () => {
  return {
    users: wrapPromise(fetchUsers()),
    companyAdmins: wrapPromise(fetchCompanyAdmins()),
  };
};
