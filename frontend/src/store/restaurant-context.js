import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import showToastMessage from "../utils/toastMessage";

const RestaurantContext = React.createContext({
  restaurants: [],
  currPathPageIndex: "/restaurants?page=1",
  linkPagesIndex: [],
  errorFetch: "",
  isLoading: false,
  isReFetch: false,
  setCurrPathPageIndex: () => {},
  setIsReFetch: () => {},
});

const URL = "http://localhost:8080/api/v1";

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [currPathPageIndex, setCurrPathPageIndex] = useState(
    "/restaurants?page=1"
  );
  const [linkPagesIndex, setLinkPagesIndex] = useState([]);
  const [isReFetch, setIsReFetch] = useState(null);

  const fetchRestaurantHandle = useCallback(async () => {
    setIsLoading(true);
    setErrorFetch(null);

    try {
      const response = await axios.get(`${URL}${currPathPageIndex}`);
      if (!response) {
        showToastMessage("Something went wrong!", "error");
        throw new Error("Something went wrong!");
      }

      const loadedRestaurants = response.data.result;
      const loadedLinks = response.data.links;
      setRestaurants(loadedRestaurants);
      setLinkPagesIndex(loadedLinks);
    } catch (err) {
      showToastMessage(err.message, "error");
      setErrorFetch(err.message);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReFetch, currPathPageIndex]);

  useEffect(() => {
    fetchRestaurantHandle();
  }, [fetchRestaurantHandle]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants: restaurants,
        currPathPageIndex: currPathPageIndex,
        linkPagesIndex: linkPagesIndex,
        errorFetch: errorFetch,
        isLoading: isLoading,
        isReFetch: isReFetch,
        setCurrPathPageIndex: setCurrPathPageIndex,
        setIsReFetch: setIsReFetch,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
