// Biblioteca
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <section data-testid="page-favorites" className="top-container">
        <Header />
        <h1>Favorites</h1>
      </section>
    );
  }
}

export default Favorites;
