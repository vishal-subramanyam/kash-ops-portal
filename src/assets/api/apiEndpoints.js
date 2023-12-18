export const getAPIRequest = async (url, method, bodyData) => {
  // const domain = 'http://localhost:8320/SigmaAPIServices/'
  const domain = "http://localhost:4040/";

  if (bodyData != null) {
    return fetch(`${domain}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
  } else {
    return fetch(`${domain}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const getFileAPIRequest = async (url, method, bodyData) => {
  // const domain = 'http://localhost:8320/SigmaAPIServices/'
  const domain = "http://localhost:4040/";

  return fetch(`${domain}${url}`, {
    method: method,
    body: bodyData,
    headers: {},
  });
};

export const getFileAPIRequest2 = async (url, method, bodyData) => {
  const domain = "http://localhost:8080/komatsu/";

  return fetch(`${domain}${url}`, {
    method: method,
    body: bodyData,
    headers: {},
  });
};
export const getFileAPIRequest3 = async (url, method, bodyData) => {
  const domain = "http://localhost:8080/komatsu";

  return fetch(`${domain}${url}`, {
    method: method,
    body: bodyData,
    headers: {},
  });
};
