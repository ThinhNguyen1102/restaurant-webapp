import PaginationBox from "../components/UI/PaginationBox";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <div className={classes["home"]}>
      {props.children}
      <PaginationBox to={"/"} />
    </div>
  );
};

export default Home;
