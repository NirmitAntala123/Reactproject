import React, { createContext, useReducer } from "react";
const getInitialState = () => {
  const LoggedIninfo = localStorage.getItem("user");
  return LoggedIninfo ? JSON.parse(LoggedIninfo) : [];
};

export const LoginContext = createContext();
const initialState = getInitialState();

const reducer = (state, action) => {
  switch (action.type) {
    case "Login":
      localStorage.setItem("user", JSON.stringify(action.user));
      return Object.assign(state, action.user);
    case "logout":
      localStorage.setItem("user", JSON.stringify(action.user));
      localStorage.removeItem("token");
      return Object.assign(state, action.user);
    default:
      break;
  }
};

export const LoginProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginContext.Provider value={[state, dispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};
