import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import AuthContext from "../../store/auth-context";

import { Navigate, useNavigate } from "react-router-dom";

import classes from "./Login.module.css";
import { useState, useCallback, useContext } from "react";
import axios from "axios";
import showToastMessage from "../../utils/toastMessage";
import NavContext from "../../store/navigate-context";

const Login = () => {
  const [isSignupRedirect, setIsSignupRedirect] = useState(false);
  const authCxt = useContext(AuthContext);
  const navCtx = useContext(NavContext);

  const navigate = useNavigate();

  const onSignupPageRedirect = (e) => {
    e.preventDefault();
    setIsSignupRedirect(true);
  };

  // ------------------------ API
  const onLoginhandler = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          formData
        );
        authCxt.onLogin(response.data.token, response.data.userName);
        authCxt.setUserName(response.data.userName);
        if (response.data.success) {
          navigate("/");
          navCtx.onClickLinkHandler();
        }
        showToastMessage(
          response.data.message,
          response.data.success ? "success" : "warning"
        );
      } catch (err) {
        showToastMessage(err.response.data.message, "error");
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={classes["form-wrapper"]}>
      {isSignupRedirect && <Navigate to="/signup" />}
      <Card>
        <div className={classes.wrapper}>
          <form className={classes["form-control"]} onSubmit={onLoginhandler}>
            <Input type="email" name="email" defaultvValue="" title="E-mail" />
            <Input
              type="password"
              name="password"
              defaultvValue=""
              title="Password"
            />
            <div className={classes["btn-box"]}>
              <Button type="submit" isActive={true}>
                Login
              </Button>
              <div className={classes["signup-wrapper"]}>
                <label>Do not have an account?</label>
                <Button onClick={onSignupPageRedirect} isActive={true}>
                  Signup
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
