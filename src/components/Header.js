// Bibliotecas
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Serviços
import { getUser } from '../services/userAPI';

// Componentes
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      headerLoading: true,
    };
  }

  componentDidMount() {
    this.userLoged();
  }

  userLoged = async () => {
    const userProfile = await getUser();
    const { name } = userProfile;
    this.setState({
      userName: name,
      headerLoading: false,
    });
  }

  render() {
    const { userName, headerLoading } = this.state;
    return (
      <header data-testid="header-component" className="header-container top-container">

        {headerLoading
          ? <Loading />
          : (
            <>
              <section className="header-title">
                <h1>trybe tunes</h1>
                <section>
                  <h2 data-testid="header-user-name">{userName}</h2>
                </section>
              </section>
              <ul className="nav-container">

                <Link
                  to="/search"
                  data-testid="link-to-search"
                >
                  <li>Pesquisa</li>

                </Link>

                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  <li>Favoritos</li>

                </Link>

                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  <li>Perfil</li>

                </Link>

              </ul>
            </>
          )}

      </header>
    );
  }
}

export default Header;
