import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AttractionsList from "./AttractionsList";
import LocationsList from "./LocationsList";
import LocationShowPage from "./LocationShowPage";
import NewAttractionForm from "./NewAttractionForm";
import AttractionShowPage from "./AttractionShowPage";
import Home from "./Home"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/attractions">
          <AttractionsList user={currentUser}/>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/locations" component={LocationsList} />
        <Route exact path="/locations/:id" component={LocationShowPage} />
        <Route exact path="/attractions/:id">
          <AttractionShowPage user={currentUser}/>
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
