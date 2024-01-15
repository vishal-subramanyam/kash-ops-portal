import React, { useState, createContext } from "react";

const authContext = createContext;

export function useAuth() {
  const [authed, setAuthed] = useState(true);
  console.log(authed);
  return {
    authed,
    login() {
      console.log("authorize login");
      return new Promise((res) => {
        setAuthed(true);
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
