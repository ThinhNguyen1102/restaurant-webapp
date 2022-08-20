import { Routes, Route } from "react-router-dom";
import { Fragment, useContext } from "react";

import Navigation from "./components/Header/Navigation";
import About from "./Pages/About";
import AddRestaurant from "./Pages/AddRestaurant";
import Home from "./Pages/Home";
import Restaurants from "./Pages/Restaurants";
import Card from "./components/UI/Card";
import RestaurantList from "./components/Restaurants/RestaurantList";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import RestaurantContext from "./store/restaurant-context";

function App() {
  const RestCtx = useContext(RestaurantContext);

  let content = (
    <Card>
      <p>Found No Restaurant.</p>
    </Card>
  );

  if (RestCtx.restaurants.length > 0) {
    content = <RestaurantList />;
  }

  if (RestCtx.errorFetch) {
    content = (
      <Card>
        <p>{RestCtx.errorFetch}</p>
      </Card>
    );
  }

  if (RestCtx.isLoading) {
    // eslint-disable-next-line no-unused-vars
    content = (
      <Card>
        <p>Loading...</p>
      </Card>
    );
  }

  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home>{content}</Home>} />
        <Route
          path="/restaurants"
          element={<Restaurants>{content}</Restaurants>}
        />
        <Route path="/add-restaurant" element={<AddRestaurant />}>
          <Route path=":restId" element={<AddRestaurant />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Fragment>
  );
}

export default App;
