// Biblioteca
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <section data-testid="page-album" className="large-width">
        <Header />
        <h1>Album</h1>
      </section>
    );
  }
}

export default Album;
