// Bibliotecas
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <section data-testid="page-search" className="search-container top-container">
        <Header />
      </section>
    );
  }
}

export default Search;
