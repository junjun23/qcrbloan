import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from './layouts/login';
import Role1 from './layouts/role1';
import Role2 from './layouts/role2';
import Role3 from './layouts/role3';

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const loginLink = (
  <Switch>
      <Route path="/login" component={Login} />
      <Redirect from="/qcrbloan" to="/login" />
  </Switch>
);

const role1Link = (
  <Switch>
      <Route path="/role1" component={Role1} />
      <Redirect from="/" to="/role1/main" />
  </Switch>
);

const role2Link = (
  <Switch>
      <Route path="/role2" component={Role2} />
      <Redirect from="/" to="/role2/main" />
  </Switch>
);

const role3Link = (
  <Switch>
      <Route path="/role3" component={Role3} />
      <Redirect from="/" to="/role3/main" />
  </Switch>
);

class App extends Component {
  render() {
    let userRole = null;

    if(sessionStorage.usertoken) {
      const userDetail = JSON.parse(sessionStorage.userProfile);
      userRole = userDetail.role || null;
    }

    return (
      <Provider store={store}>
        <Router history={history}>
          {userRole === 'role1' ? role1Link 
          : userRole === 'role2' ? role2Link
          : userRole === 'role3' ? role3Link
          : loginLink}
        </Router>
      </Provider>
    );
  }
}

export default App;
