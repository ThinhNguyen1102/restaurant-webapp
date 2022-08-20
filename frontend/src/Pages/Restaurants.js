import PaginationBox from "../components/UI/PaginationBox";
import classes from "./Home.module.css";

const Restaurants = (props) => {
  return (
    <div className={classes["home"]}>
      {props.children}
      <PaginationBox to={"/restaurants"} />
    </div>
  );
};

export default Restaurants;
