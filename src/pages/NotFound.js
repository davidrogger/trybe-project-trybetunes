import React, { Component } from 'react';

import logo from '../imgs/trybetunes_logo.svg';

class NotFound extends Component {
  render() {
    return (
      <section
        className="notfound-container"
        data-testid="page-not-found"
      >
        <img src={ logo } alt="trybetunes logo" />
        <section className="notfound-msg-container">
          <span className="notfound-title">
            Ops!
          </span>
          <span className="notfound-msg ">
            A página que você está procurando não foi encontrada
          </span>
        </section>
      </section>
    );
  }
}

export default NotFound;
