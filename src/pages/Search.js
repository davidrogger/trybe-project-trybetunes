// Bibliotecas
import React, { Component } from 'react';

// Serviços
import searchAlbumAPIs from '../services/searchAlbumsAPI';

// Componentes
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFor: '',
      buttonDisable: true,
      searchLoading: false,
    };
  }

searchStateUpdate = ({ target }) => {
  const { value } = target;
  this.setState({
    searchFor: value,
  }, () => this.minSearchLength());
}

  minSearchLength = () => {
    const { searchFor } = this.state;
    const minLength = 2;
    const lengthValidation = searchFor.length >= minLength;
    this.setState({
      buttonDisable: !lengthValidation,
    });
  }

  searchAlbuns = async () => {
    const { searchFor } = this.state;
    this.setState({ searchFor: '' });

    const searchResponse = await searchAlbumAPIs(searchFor);
    console.log(searchResponse);
  }

  render() {
    const { searchFor, buttonDisable, searchLoading } = this.state;
    return (
      <section data-testid="page-search" className="top-container">
        <Header />
        <section className="search-container">

          <input
            type="text"
            placeholder="Nome do Artista ou Banda"
            data-testid="search-artist-input"
            value={ searchFor }
            onChange={ this.searchStateUpdate }
          />

          <button
            type="button"
            className="blue-button"
            data-testid="search-artist-button"
            onClick={ this.searchAlbuns }
            disabled={ buttonDisable }
          >
            Pesquisar

          </button>

        </section>
      </section>
    );
  }
}

export default Search;
