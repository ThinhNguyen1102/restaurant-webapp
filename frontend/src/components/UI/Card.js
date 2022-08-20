import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${
        props.dePadding ? classes["padding-sm"] : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
