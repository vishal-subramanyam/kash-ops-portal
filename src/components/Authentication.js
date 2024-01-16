import React, { useState, createContext } from "react";

const authContext = React.createContext;

export function useAuth() {
  const [authed, setAuthed] = useState(false);
  console.log(authed);
  return {
    authed,
    login(username, password) {
      console.log("authorize login");
      return new Promise((res) => {
        fetch("http://localhost:4040/AppContextService/KshSignIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _keyword_: "KASH_OPERATIONS_USER_TABLE",
            username: username,
            password: password,
            secretkey: "2bf52be7-9f68-4d52-9523-53f7f267153b",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setAuthed((current) => !current);
            // res();
          })
          .catch((error) => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error);
            alert("Unable to login.");
          });
        res();
      });
    },
    logout() {
      console.log("de-authorize on logout");
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
