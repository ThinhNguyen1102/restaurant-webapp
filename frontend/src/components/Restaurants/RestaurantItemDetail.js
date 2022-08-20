/* eslint-disable jsx-a11y/img-redundant-alt */
import classes from "./RestaurantItemDetail.module.css";

import Button from "../UI/Button";
import Card from "../UI/Card";

const RestaurantItemDetail = (props) => {
  return (
    <Card>
      <div className={classes["item-box"]}>
        <div className={classes.image}>
          <img crossOrigin="anonymous" src={props.imageUrl} alt="image" />
        </div>
        <h3>
          <i className={`fas fa-utensils ${classes["name-icon"]}`}></i>
          {props.name}
        </h3>
        <h4>
          <i className={`fas fa-map-marker-alt ${classes["address-icon"]}`}></i>
          {props.address}
        </h4>
        <div className={classes.intro}>
          <p>{props.introduction}</p>
        </div>
        <div>
          <Button onClick={props.onClose} isActive={true}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantItemDetail;
