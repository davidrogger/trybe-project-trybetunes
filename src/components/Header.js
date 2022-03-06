// Bibliotecas
import React, { Component } from 'react';

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
    return headerLoading ? <Loading /> : (
      <header data-testid="header-component" className="header-container">
        <h1>trybe tunes</h1>
        <section>
          <h2 data-testid="header-user-name">{userName}</h2>
        </section>
      </header>
    );
  }
}

export default Header;
