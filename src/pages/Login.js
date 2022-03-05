// Bibliotecas
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Serviços
import { createUser } from '../services/userAPI';

// Componentes
import Loading from './Loading';

// Estilização
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      buttonDisable: true,
      loading: false,
    };
  }

minNameLength = () => {
  const { userName } = this.state;
  const minLength = 3;
  const lengthValidation = userName.length >= minLength;

  this.setState({
    buttonDisable: !lengthValidation,
  });
}

  loginStateUpdate = ({ target }) => {
    const { value } = target;
    this.setState({
      userName: value,
    }, () => this.minNameLength());
  }

  userLogin = async () => {
    const { userName } = this.state;
    const { userLogin } = this.props;

    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    userLogin();
  }

  render() {
    const { userName, buttonDisable, loading } = this.state;
    return loading ? <Loading /> : (
      <section data-testid="page-login" className="login-container">
        <h1>trybe tunes</h1>
        <section className="login-forms">

          <input
            type="text"
            placeholder="Nome"
            data-testid="login-name-input"
            onChange={ this.loginStateUpdate }
            value={ userName }
          />

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonDisable }
            onClick={ this.userLogin }
          >
            Entrar
          </button>

        </section>
      </section>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

export default Login;
