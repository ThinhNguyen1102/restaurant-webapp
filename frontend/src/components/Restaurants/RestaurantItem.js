/* eslint-disable jsx-a11y/img-redundant-alt */
import { useCallback, useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./RestaurantItem.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useLocation, Navigate } from "react-router-dom";
import RestaurantItemDetail from "./RestaurantItemDetail";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import showToastMessage from "../../utils/toastMessage";
import RestaurantContext from "../../store/restaurant-context";

const RestaurantItem = (props) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRedirectEdit, setIsRedirectEdit] = useState(false);

  const restCtx = useContext(RestaurantContext);
  const authCxt = useContext(AuthContext);
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (pathname === "/restaurants") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [pathname]);

  const showDetaiHandler = () => {
    setIsShowDetail(true);
  };

  const onClose = () => {
    setIsShowDetail(false);
  };

  const onEditHandlerClick = () => {
    setIsRedirectEdit(true);
  };

  const isActive = props.userName === authCxt.userName ? true : false;

  // ------------------------ API
  const deleteRestarantHandle = useCallback(async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/restaurants/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${authCxt.token}`,
          },
        }
      );
      if (!response) {
        showToastMessage("Something went wrong!", "error");
        throw new Error("Something went wrong!");
      }
      restCtx.setIsReFetch({});
      showToastMessage(
        response.data.message,
        response.data.success ? "success" : "warning"
      );
    } catch (err) {
      console.log(err.response.data.message);
      showToastMessage(err.response.data.message, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`col l-4 m-6 c-12 ${classes["wrapper-item"]}`}>
      {isRedirectEdit && (
        <Navigate to={`/add-restaurant/${props.id}`}></Navigate>
      )}
      <Card>
        <div className={classes["item-box"]}>
          {isAdmin && (
            <div
              className={`${classes["icon-box"]} ${
                !isActive ? classes["is-disable"] : ""
              }`}
              onClick={deleteRestarantHandle}
            >
              <i className="fas fa-times"></i>
            </div>
          )}
          <h4>
            <i className={`fas fa-utensils ${classes["name-icon"]}`}></i>
            {props.name}
          </h4>
          <div className={classes.image}>
            <img
              crossOrigin="anonymous"
              src={props.imageUrl}
              alt="image"
              onClick={showDetaiHandler}
            />
          </div>
          <div className={classes["footer-wrapper"]}>
            <div className={classes["user-created"]}>
              <i className={`fas fa-user ${classes["user-icon"]}`}></i>
              {props.userName}
            </div>
            <div className={isAdmin ? classes["button-box"] : ""}>
              <Button onClick={showDetaiHandler} isActive={true}>
                Detail
              </Button>
              {isAdmin && (
                <Button onClick={onEditHandlerClick} isActive={isActive}>
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      {isShowDetail && (
        <Modal onClose={onClose}>
          <RestaurantItemDetail
            onClose={onClose}
            name={props.name}
            address={props.address}
            introduction={props.introduction}
            imageUrl={props.imageUrl}
          />
        </Modal>
      )}
    </div>
  );
};

export default RestaurantItem;
