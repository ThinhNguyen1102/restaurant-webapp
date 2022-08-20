import { useContext } from "react";
import RestaurantContext from "../../store/restaurant-context";
import Card from "./Card";
import classes from "./PaginationBox.module.css";
import PaginationItem from "./PaginationItem";

const PaginationBox = (props) => {
  const restCtx = useContext(RestaurantContext);
  const links = restCtx.linkPagesIndex;

  const currPathNum = restCtx.currPathPageIndex.split("=")[1];
  return (
    <div className={classes["pagination-box"]}>
      <Card dePadding={true}>
        <div className={classes["pagination-wrapper"]}>
          {links.map((item) => {
            let isActive = false;
            const path = item.url.split("v1")[1];
            const pathNum = path.split("=")[1];
            if (pathNum === currPathNum) {
              isActive = true;
            }
            return (
              <PaginationItem
                path={path}
                title={item.label}
                key={Math.random()}
                isActive={isActive}
                to={props.to}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default PaginationBox;
