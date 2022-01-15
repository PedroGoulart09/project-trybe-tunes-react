import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Login from './pages/Login';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Link className="link" to="/"> Login </Link>
          <Link className="link" to="/search"> Search </Link>
          <Link className="link" to="/album/teste"> Album </Link>
          <Link className="link" to="/favorites"> Favorites </Link>
          <Link className="link" to="/profile"> Profile </Link>
          <Link className="link" to="/profile/edit"> Profile Edit </Link>
          <Switch>
            <Route
              exact
              path="/"
              component={ Login }
            />
            <Route
              path="/search"
              component={ Search }
            />
            <Route
              path="/album/:id"
              render={ (props) => <Album { ...props } /> }
            />
            <Route
              path="/favorites"
              component={ Favorites }
            />
            <Route
              path="/profile/edit"
              component={ ProfileEdit }
            />
            <Route
              path="/profile"
              component={ Profile }
            />
            <Route
              component={ NotFound }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
