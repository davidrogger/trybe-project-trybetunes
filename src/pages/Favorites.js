// Biblioteca
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <section data-testid="page-favorites">
        <h1>Favorites</h1>
        <Header />
      </section>
    );
  }
}

export default Favorites;
