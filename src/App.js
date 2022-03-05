// Bibliotecas
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Componentes
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Switch>
            <Route path="/album/:id" component={ Album } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile/" component={ Profile } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/search" component={ Search } />
            <Route exact path="/" component={ Login } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;
