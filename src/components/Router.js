import React, { useState } from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import ShowStoreList from "../routes/ShowStoreList"

const AppRouter  = ({isLoggedIn}) => {
  return (
    <Router>
      {isLoggedIn }

      <Switch>
        {isLoggedIn ? (
          <>
          
            <Route exact path="/">
              <ShowStoreList />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/home">
              <Home />
            </Route>

          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        <Navigation/>
      </Switch>
      
    </Router>
  );
};

export default AppRouter;