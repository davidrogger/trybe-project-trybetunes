// Bibliotecas
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

// Serviços
import { getUser } from '../services/userAPI';

// Componentes
import Loading3 from './Loading3';

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
    const { location: { pathname } } = this.props;
    const selectedLink = 'selected-nav-link';
    const defaultLink = 'default-nav-link';
    return (
      <header data-testid="header-component" className="header-container top-container">

        {headerLoading
          ? <Loading3 />
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
                  className={ pathname === '/search' ? selectedLink : defaultLink }
                  to="/search"
                  data-testid="link-to-search"
                >
                  <li>Pesquisa</li>

                </Link>

                <Link
                  className={ pathname === '/favorites' ? selectedLink : defaultLink }
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  <li>Favoritas</li>

                </Link>

                <Link
                  className={ pathname === '/profile' ? selectedLink : defaultLink }
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

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default withRouter(Header);
