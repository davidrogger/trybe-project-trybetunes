import React, { Component } from 'react';

// Estilização
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      buttonDisable: true,
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

  render() {
    const { userName, buttonDisable } = this.state;
    return (
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
          >
            Entrar
          </button>

        </section>
      </section>
    );
  }
}

export default Login;
