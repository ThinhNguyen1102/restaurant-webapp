import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./wtf-forms.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { RestaurantContextProvider } from "./store/restaurant-context";
import { NavContextProvider } from "./store/navigate-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <RestaurantContextProvider>
      <NavContextProvider>
        <Router>
          <App />
        </Router>
      </NavContextProvider>
    </RestaurantContextProvider>
  </AuthContextProvider>
);
