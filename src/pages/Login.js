import React, { Component } from 'react';

// Estilização
import '../styles/login.css';

class Login extends Component {
  render() {
    return (
      <section data-testid="page-login" className="login-container">
        <h1>trybe tunes</h1>
        <section className="login-forms">
          <input type="text" placeholder="Nome" />
          <button type="button">Entrar</button>
        </section>
      </section>
    );
  }
}

export default Login;
