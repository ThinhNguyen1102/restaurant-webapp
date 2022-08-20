import { Fragment, useContext } from "react";

import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import NavContext from "../../store/navigate-context";

const Navigation = () => {
  const navCtx = useContext(NavContext);
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.links}>
          <Link
            to="/"
            className={`${classes.link} ${
              navCtx.currPagePath === "/" ? classes["is-active"] : ""
            }`}
            onClick={navCtx.onClickLinkHandler}
          >
            Home
          </Link>
          {authCtx.isLoggedIn && (
            <Link
              to="/restaurants"
              className={`${classes.link} ${
                navCtx.currPagePath === "/restaurants"
                  ? classes["is-active"]
                  : ""
              }`}
              onClick={navCtx.onClickLinkHandler}
            >
              Restaurants
            </Link>
          )}
          {authCtx.isLoggedIn && (
            <Link
              to="/add-restaurant"
              className={`${classes.link} ${
                navCtx.currPagePath === "/add-restaurant"
                  ? classes["is-active"]
                  : ""
              }`}
              onClick={navCtx.onClickLinkHandler}
            >
              New
            </Link>
          )}
          {authCtx.isLoggedIn && (
            <Link
              to="/about"
              className={`${classes.link} ${
                navCtx.currPagePath === "/about" ? classes["is-active"] : ""
              }`}
              onClick={navCtx.onClickLinkHandler}
            >
              About
            </Link>
          )}
        </div>
        <div className={classes.links}>
          {authCtx.isLoggedIn && (
            <div className={classes["username"]}>
              <i className={`fas fa-user-circle ${classes["user-icon"]}`}></i>
              <h4 className={classes["name"]}>{authCtx.userName}</h4>
            </div>
          )}
          {!authCtx.isLoggedIn && (
            <Link
              to="/login"
              className={`${classes.link} ${
                navCtx.currPagePath === "/login" ? classes["is-active"] : ""
              }`}
              onClick={navCtx.onClickLinkHandler}
            >
              Login
            </Link>
          )}
          {authCtx.isLoggedIn && (
            <Link to="/" className={classes.link} onClick={authCtx.onLogout}>
              Logout
            </Link>
          )}
        </div>
      </header>
      <div className={classes.fixed}></div>
    </Fragment>
  );
};

export default Navigation;
