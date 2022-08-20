import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userName: "",
  onLogout: () => {},
  onLogin: (token, userName) => {},
  setUserName: (userName) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storeUserLoggedInInformation = localStorage.getItem("JWTtoken");
    const storeUserName = localStorage.getItem("userName");

    if (storeUserLoggedInInformation) {
      setToken(storeUserLoggedInInformation);
      setUserName(storeUserName);
      setIsLoggedIn(true);
    }
  }, []);

  const setUserNameHandler = (userName) => {
    setUserName(userName);
  };

  const logoutHandler = () => {
    localStorage.removeItem("JWTtoken");
    localStorage.removeItem("userName");
    setToken("");
    setUserName("");
    setIsLoggedIn(false);
  };

  const loginHandler = (tokenRes, userName) => {
    localStorage.setItem("JWTtoken", tokenRes);
    localStorage.setItem("userName", userName);

    setTimeout(() => {
      localStorage.removeItem("JWTtoken");
      localStorage.removeItem("userName");
    }, 60000);

    setToken(tokenRes);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        userName: userName,
        setUserName: setUserNameHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
