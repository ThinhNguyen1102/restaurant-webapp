import React, { useState } from "react";

const NavContext = React.createContext({
  currPagePath: "/",
  onClickLinkHandler: () => {},
});

export const NavContextProvider = (props) => {
  const [currPagePath, setCurrPagePath] = useState("/");

  const onClickLinkHandler = () => {
    setTimeout(() => {
      setCurrPagePath(window.location.pathname);
    }, 50);
  };

  return (
    <NavContext.Provider
      value={{
        currPagePath: currPagePath,
        onClickLinkHandler: onClickLinkHandler,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
