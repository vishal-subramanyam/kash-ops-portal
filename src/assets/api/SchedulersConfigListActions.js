import { getAPIRequest } from "./apiEndpoints.js";
export const DATA_RECEIVED_SCHEDULERS_CONFIG =
  "DATA_RECEIVED_SCHEDULERS_CONFIG";
export const COUNTINC_SCHEDULERS_CONFIG = "COUNTINC_SCHEDULERS_CONFIG";
export const COUNTDEC_SCHEDULERS_CONFIG = "COUNTDEC_SCHEDULERS_CONFIG";
export const REQUESTING_DATA_SCHEDULERS_CONFIG =
  "REQUESTING_DATA_SCHEDULERS_CONFIG";
export const ERROR_RECEIVED_SCHEDULERS_CONFIG =
  "ERROR_RECEIVED_SCHEDULERS_CONFIG";
export const LIST_RESET_SCHEDULERS_CONFIG = "LIST_RESET_SCHEDULERS_CONFIG";
export const DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_DELETE =
  "DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_DELETE";
export const REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_DELETE =
  "REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_DELETE";
export const ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_DELETE =
  "ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_DELETE";
export const SUCCESS_ALERT_RELEASE_SCHEDULERS_CONFIG_DELETE =
  "SUCCESS_ALERT_RELEASE_SCHEDULERS_CONFIG_DELETE";
export const DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_SCHEDULE =
  "DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_SCHEDULE";
export const REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_SCHEDULE =
  "REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_SCHEDULE";
export const ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_SCHEDULE =
  "ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_SCHEDULE";
export const DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_LOGS =
  "DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_LOGS";
export const REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_LOGS =
  "REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_LOGS";
export const ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_LOGS =
  "ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_LOGS";
export const SUCCESS_ALERT_RELEASE_SCHEDULERS_CONFIG_SCHEDULE =
  "SUCCESS_ALERT_RELEASE_SCHEDULERS_CONFIG_SCHEDULE";
export const FETCH_SCHEDULERS_CONFIG_TENANT_DATA_LIST =
  "FETCH_SCHEDULERS_CONFIG_TENANT_DATA_LIST";
export const FETCH_SCHEDULERS_CONFIG_TENANT_DATA_SUCCESS_LIST =
  "FETCH_SCHEDULERS_CONFIG_TENANT_DATA_SUCCESS_LIST";
export const FETCH_SCHEDULERS_CONFIG_TENANT_DATA_FAILED_LIST =
  "FETCH_SCHEDULERS_CONFIG_TENANT_DATA_FAILED_LIST";
export const ON_CHANGE_SCHEDULERS_CONFIG_LIST =
  "ON_CHANGE_SCHEDULERS_CONFIG_LIST";
export const LOGS_CLOSE_MODAL = "LOGS_CLOSE_MODAL";

// to determine page number. if next, page number will be incremented.
export const pageCountInc = () => ({
  type: COUNTINC_SCHEDULERS_CONFIG,
});

// to determine page number. if previous, page number will be decremented.
export const pageCountDec = () => ({
  type: COUNTDEC_SCHEDULERS_CONFIG,
});

// set loading to true just before API request(List data)
export const requestData = () => ({
  type: REQUESTING_DATA_SCHEDULERS_CONFIG,
});

// Store data in state from response, if success. set loading to false(List data)
export const dataReceived = (data) => ({
  type: DATA_RECEIVED_SCHEDULERS_CONFIG,
  data: data,
});

// catch block, if not success. set loading to false, Error flag will be set to True(List data)
export const dataError = (data) => ({
  type: ERROR_RECEIVED_SCHEDULERS_CONFIG,
  data: data,
});

// Reset the state while component unmount
export const listReset = () => ({
  type: LIST_RESET_SCHEDULERS_CONFIG,
});

export const requestDataDelete = () => ({
  type: REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_DELETE,
});

export const dataErrorDelete = (data) => ({
  type: ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_DELETE,
  data: data,
});

export const dataReceivedDelete = (data) => ({
  type: DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_DELETE,
  data: data,
});

export const dataReceivedSchedule = (data) => ({
  type: DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_SCHEDULE,
  data: data,
});

export const requestDataSchedule = () => ({
  type: REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_SCHEDULE,
});

export const dataErrorSchedule = (data) => ({
  type: ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_SCHEDULE,
  data: data,
});

export const dataReceivedLogs = (data) => ({
  type: DATA_RECEIVED_FOR_SCHEDULERS_CONFIG_LOGS,
  data: data,
});

export const requestDataLogs = () => ({
  type: REQUESTING_DATA_FOR_SCHEDULERS_CONFIG_LOGS,
});

export const dataErrorLogs = (data) => ({
  type: ERROR_RECEIVED_FOR_SCHEDULERS_CONFIG_LOGS,
  data: data,
});

export function successAlertReleaseSchedule() {
  return {
    type: SUCCESS_ALERT_RELEASE_SCHEDULERS_CONFIG_SCHEDULE,
  };
}

export function successAlertReleasedelete() {
  return {
    type: SUCCESS_ALERT_RELEASE_SCHEDULERS_CONFIG_DELETE,
  };
}

export function logsCloseModal() {
  return {
    type: LOGS_CLOSE_MODAL,
  };
}

export function fetchingTenant() {
  return {
    type: FETCH_SCHEDULERS_CONFIG_TENANT_DATA_LIST,
  };
}

export function fetchingTenantDataSuccess(data) {
  return {
    type: FETCH_SCHEDULERS_CONFIG_TENANT_DATA_SUCCESS_LIST,
    data,
  };
}

export function fetchingTenantDataFailed() {
  return {
    type: FETCH_SCHEDULERS_CONFIG_TENANT_DATA_FAILED_LIST,
  };
}

export function onChangeSchedulerConfig(data, item) {
  return {
    type: ON_CHANGE_SCHEDULERS_CONFIG_LIST,
    data,
    item,
  };
}

export function fetchTenantData() {
  return function (dispatch) {
    dispatch(fetchingTenant());
    return getAPIRequest(`SystemAdministrationService/getTenants`, "GET")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchingTenantDataSuccess(data));
      })
      .catch(() => dispatch(fetchingTenantDataFailed()));
  };
}

// API call for List Page
export function fetchData(configData) {
  return function (dispatch) {
    dispatch(requestData());
    let URL = `SystemAdministrationService/getSchedulersForTenant`;
    return getAPIRequest(URL, "POST", {
      "tenant-name": configData.tenantName,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(dataReceived(data));
      })
      .catch((error) => {
        dispatch(dataError(error));
      });
  };
}

export function fetchDelete(data) {
  return function (dispatch) {
    dispatch(requestDataDelete());
    return getAPIRequest(
      `DataExportConfigurationService/getQueryColumnMappings?id=${data}`,
      "DELETE"
    )
      .then((res) => {
        if (res.status > 299) {
          return res.json();
        } else {
          dispatch(dataReceivedDelete(data));
          dispatch(fetchData());
        }
      })
      .then((json) => {
        if (json) {
          throw new Error();
        }
      })
      .catch(() => {
        dispatch(dataErrorDelete());
      });
  };
}

export function fetchSchedule(data, id, tenantName) {
  return function (dispatch) {
    let URL = "";
    console.log("fetchSchedule() data-> ", data);
    console.log("fetchSchedule() id -> ", id);
    console.log("fetchSchedule() tenantName -> ", tenantName);
    if (data === "Start") {
      URL = "SystemAdministrationService/startScheduler";
    } else {
      URL = "SystemAdministrationService/stopScheduler";
    }
    let payload = {};
    if (data === "Start") {
      payload = {
        name: id,
        status: "NEW",
        lastAction: "START",
        "tenant-name": tenantName,
      };
    } else {
      payload = {
        name: id,
        status: "RUNNING",
        lastAction: "STOP",
        "tenant-name": tenantName,
      };
    }
    // console.log("Payload -> ", payload);

    dispatch(requestDataSchedule());
    return getAPIRequest(URL, "POST", payload)
      .then((res) => {
        if (res.status > 299) {
          return res.json();
        } else {
          dispatch(dataReceivedSchedule(data));
          dispatch(fetchData());
        }
      })
      .then((json) => {
        if (json) {
          throw new Error();
        }
      })
      .catch(() => {
        dispatch(dataErrorSchedule());
      });
  };
}

export function fetchLogs(schedulerName, tenantName) {
  return function (dispatch) {
    let payload = {
      "scheduler-name": schedulerName,
      "tenant-name": tenantName,
    };
    console.log("fetchLogs() payload -> ", payload);
    dispatch(requestDataLogs());
    return getAPIRequest(
      "SystemAdministrationService/getSchedulerLogs",
      "POST",
      payload
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(dataReceivedLogs(data));
      })
      .catch(() => {
        dispatch(dataErrorLogs());
      });
  };
}
