import { useContext } from "react";
import { Link } from "react-router-dom";
import RestaurantContext from "../../store/restaurant-context";
import classes from "./PaginationItem.module.css";

const PaginationItem = (props) => {
  const restCtx = useContext(RestaurantContext);

  const onClickHandler = () => {
    restCtx.setCurrPathPageIndex(props.path);
  };

  return (
    <Link
      to={props.to}
      className={`${classes.link} ${
        props.isActive ? classes["is-active"] : ""
      }`}
      onClick={onClickHandler}
    >
      {props.title}
    </Link>
  );
};

export default PaginationItem;
