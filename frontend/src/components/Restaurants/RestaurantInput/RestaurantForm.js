import Button from "../../UI/Button";
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Card from "../../UI/Card";
import classes from "./RestaurantFrom.module.css";
import Input from "../../UI/Input";
import AuthContext from "../../../store/auth-context";
import showToastMessage from "../../../utils/toastMessage";
import RestaurantContext from "../../../store/restaurant-context";
import NavContext from "../../../store/navigate-context";

const API_URL = "http://localhost:8080/api/v1/restaurants";

const RestaurantFrom = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const param = useParams();
  const restId = param.restId;

  const navigate = useNavigate();
  const restCtx = useContext(RestaurantContext);
  const authCxt = useContext(AuthContext);
  const navCtx = useContext(NavContext);

  useEffect(() => {
    if (restId) {
      setRestaurantId(restId);
    } else {
      setIsEdit(false);
    }
  }, [restId]);

  // ------------------------ API
  const fetchRestaurantHandle = useCallback(async () => {
    if (!restaurantId) {
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${authCxt.token}`,
        },
      });
      if (!response) {
        showToastMessage("Something went wrong!", "error");
        throw new Error("Something went wrong!");
      }
      setRestaurant(response.data.result);
      setIsEdit(true);
    } catch (err) {
      console.log(err);
      showToastMessage(err.response.data.message, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  useEffect(() => {
    fetchRestaurantHandle();
  }, [fetchRestaurantHandle]);

  // ------------------------ API
  const postRestaurantHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      if (isEdit) {
        if (!formData.get("image").name) {
          formData.set("image", restaurant.imageUrl);
        }
        try {
          const response = await axios.put(
            `${API_URL}/${restaurantId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${authCxt.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (!response) {
            showToastMessage("Something went wrong!", "error");
            throw new Error("Something went wrong!");
          }
          showToastMessage(
            response.data.message,
            response.data.success ? "success" : "warning"
          );
          navigate("/");
          restCtx.setIsReFetch({});
          navCtx.onClickLinkHandler();
        } catch (err) {
          console.log(err);
          showToastMessage(err.response.data.message, "error");
        }
      } else {
        try {
          const response = await axios.post(`${API_URL}`, formData, {
            headers: {
              Authorization: `Bearer ${authCxt.token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          if (!response) {
            showToastMessage("Something went wrong!", "error");
            throw new Error("Something went wrong!");
          }
          restCtx.setIsReFetch({});
          showToastMessage(
            response.data.message,
            response.data.success ? "success" : "warning"
          );
          navigate("/");
          navCtx.onClickLinkHandler();
        } catch (err) {
          console.log(err);
          showToastMessage(err.response.data.message, "error");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEdit, restaurantId]
  );

  return (
    <div className={classes["form-wrapper"]}>
      <Card>
        <form
          className={classes["form-control"]}
          onSubmit={postRestaurantHandler}
        >
          <h2>New Restaurant</h2>
          <Input
            title="Name"
            name="name"
            type="text"
            defaultValue={isEdit ? restaurant.name : ""}
            postItem={true}
          />
          <Input
            title="Address"
            name="address"
            type="text"
            defaultValue={isEdit ? restaurant.address : ""}
            postItem={true}
          />
          <div className={classes["form-input"]}>
            <label>Restaurant info</label>
            <textarea
              name="introduction"
              spellCheck="false"
              type="text"
              defaultValue={isEdit ? restaurant.introduction : ""}
            />
          </div>
          <div className={classes["form-input"]}>
            <label>Image</label>
            <input name="image" spellCheck="false" type="file" />
          </div>
          <div className={classes["btn-box"]}>
            <Button type="submit" isActive={true}>
              {isEdit ? "Update Restaurant" : "Add Restaurant"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RestaurantFrom;
