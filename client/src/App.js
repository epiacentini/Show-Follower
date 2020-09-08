import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';
import './App.css';
import { loadUser } from './actions/authActions';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Landing from './components/home/Landing';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login} />
        <section>
          <Switch>
            <Route exact path="/register" component={Register} />
            <PrivateRoute
              exact
              path="/dash/:page?"
              component={(props) => <Landing {...props} />}
            />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
