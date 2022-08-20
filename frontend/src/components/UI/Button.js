import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${classes.button} ${
        !props.isActive ? classes["is-disable"] : ""
      }`}
      disabled={!props.isActive}
    >
      {props.children}
    </button>
  );
};

export default Button;
