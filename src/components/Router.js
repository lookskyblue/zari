import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import ShowStoreList from "../routes/ShowStoreList"
import SimpleMap from "../components/googlemap"
import StoreDetail from "../routes/StoreDetail"
import Pos from "../routes/Pos"
import PosEdit from "../routes/PosEdit"
import Menu from "../routes/Menu"
import EditTable from "../routes/EditTable";
import AddOrder from "../routes/AddOrder";
import ReviewPage from "routes/ReviewPage";

const AppRouter = ({ isLoggedIn, userObj, location }) => {
  return (
    <Router>
      {isLoggedIn}

      <Switch>
        {isLoggedIn ? (
          <>
            <Navigation />
            <Route exact path="/">
              <ShowStoreList userObj={userObj} location={location} />
            </Route>

            <Route exact path="/Profile" component={Profile} />

            <Route exact path="/Home">
              <Home userObj={userObj} location={location} />
            </Route>

            <Route exact path="/storeDetail" component={StoreDetail} />

            <Route exact path="/Pos" component={Pos} />
            <Route exact path="/PosEdit" component={PosEdit} />
            <Route exact path="/Menu" component={Menu} />
            <Route exact path="/AddOrder" component={AddOrder} />

            <Route exact path="/EditTable" component={EditTable} />
            
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
