// Bibliotecas
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Componentes
import Album from './pages/Album';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Estilos
import './styles/login.css';
import './styles/header.css';
import './styles/general.css';
import './styles/search.css';
import './styles/album.css';
import './styles/loading.css';
import './styles/profile.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logIn: false,
    };
  }

  userLogin = () => {
    this.setState({
      logIn: true,
    });
  }

  render() {
    const { logIn } = this.state;
    return (
      <main className="main-container">
        <Router>
          <Switch>
            <Route path="/album/:id" component={ Album } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile/" component={ Profile } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/search" component={ Search } />

            <Route exact path="/">
              { logIn
                ? <Redirect to="/search" />
                : <Login userLogin={ this.userLogin } />}
            </Route>

            <Route path="*" component={ NotFound } />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;
