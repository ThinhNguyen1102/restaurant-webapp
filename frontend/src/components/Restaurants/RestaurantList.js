import { useContext } from "react";
import RestaurantContext from "../../store/restaurant-context";
import "../UI/grid.css";
import RestaurantItem from "./RestaurantItem";

const RestaurantList = (props) => {
  const restCtx = useContext(RestaurantContext);
  return (
    <div className="grid wide">
      <div className="row">
        {restCtx.restaurants.map((item) => {
          const imageUrl = `http://localhost:8080/${item.imageUrl}`;
          return (
            <RestaurantItem
              key={item.id}
              id={item.id}
              name={item.name}
              address={item.address}
              introduction={item.introduction}
              userName={item.userName}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantList;
