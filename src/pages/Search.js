// Bibliotecas
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <section data-testid="page-search" className="top-container">
        <Header />
        <section className="search-container">

          <input type="text" data-testid="search-artist-input" />

          <button
            type="button"
            className="blue-button"
          >
            Procurar

          </button>

        </section>
      </section>
    );
  }
}

export default Search;
