import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import ShowStoreList from "../routes/ShowStoreList"

const AppRouter  = ({isLoggedIn,userObj}) => {
  return (
    <Router>
      {isLoggedIn }
      
      <Switch>
        {isLoggedIn ? (
          <>
          
            <Route exact path="/">
              <ShowStoreList userObj={userObj} />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/home">
              <Home userObj={userObj} />
            </Route>
            <Navigation/>
          </>
          
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        
      </Switch>
      
    </Router>
  );
};

export default AppRouter;