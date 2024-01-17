import React, { useEffect, useState, createContext } from "react";
import { useLocalStorage } from "./LocalStorage";
import { domain } from "../assets/api/apiEndpoints";
const authContext = React.createContext;

export function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  let [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUserInfo", {});
  let [isAdmin, setIsAdmin] = useLocalStorage("adminLevel", null);
  let [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    console.log("Use effect to query user table");
    fetch(`${domain}GenericResultBuilderService/buildResults`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _keyword_: "KASH_OPERATIONS_USER_TABLE" }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("all users", res);
        setAllUsers(res.data);
      })
      .catch((err) => alert(err));
  };

  return {
    // authed,
    user,
    login(username, password) {
      console.log("password base64", password);
      return new Promise((res) => {
        fetch(`${domain}AppContextService/KshSignIn`, {
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

            if (data.success === "false") {
              alert(
                "Unable to login. Check username and paassword are correct."
              );
            } else {
              // get the first name of the employee that is logged in
              let userArrObject = allUsers.filter(
                (name) => data.EmpId === name.EmpId
              );
              console.log(userArrObject);

              // save logged in user first name to state
              // get the first name of the logged in user by getting emp id from the response of the logged in fetch
              setLoggedInUser(userArrObject[0]);
              let basicUserString = "BasicUser";
              if (data.IsAdmin === "Admin" || data.IsAdmin === "SuperAdmin") {
                setIsAdmin(data.IsAdmin);
              } else {
                setIsAdmin(basicUserString);
              }

              setUser(data.username);
              res();
            }
          })
          .catch((error) => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error);
            alert("Unable to login.");
          });
      });
    },
    logout() {
      console.log("de-authorize on logout");
      return new Promise((res) => {
        // setAuthed(false);
        setLoggedInUser(null);
        setIsAdmin(null);
        setUser(null);
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
