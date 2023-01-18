// Bibliotecas
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Serviços
import { getUser } from '../services/userAPI';

// Componentes
import Loading from './Loading';

import tunesLogo from '../imgs/trybetunes_logo2.svg';

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
              <section className="header-content">
                <img className="header-logo" src={ tunesLogo } alt="Trybetunes logo" />
                <section
                  className="user-header-container"
                >
                  <div className="user-header-icon">
                    <div className="avatar-head-ico">
                      .
                    </div>
                    <div className="avatar-body-ico">
                      ...
                    </div>
                  </div>
                  <span
                    data-testid="header-user-name"
                  >
                    {userName}

                  </span>
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
                  <li>Favoritas</li>

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
