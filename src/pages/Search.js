// Bibliotecas
import React, { Component } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

// Serviços
import searchAlbumAPIs from '../services/searchAlbumsAPI';

// Componentes
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFor: '',
      buttonDisable: true,
      searchLoading: false,
      currentSearch: '',
      searchList: [],
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

  searchAlbuns = () => {
    const { searchFor } = this.state;
    this.setState({
      searchFor: '',
      buttonDisable: true,
      searchLoading: true,
    }, async () => {
      const searchResponse = await searchAlbumAPIs(searchFor);
      this.setState({
        searchLoading: false,
        searchList: searchResponse,
        currentSearch: searchFor,
      });
    });
  }

  searchDisplay = (searchList, currentSearch) => {
    if (searchList.length === 0) {
      return (
        <span
          className="album-not-found"
        >
          Nenhum álbum foi encontrado
        </span>);
    }
    return (
      <section className="albums-found-container">
        <span
          className="album-result-title"
        >
          {`Resultado de álbuns de: ${currentSearch}`}
        </span>
        <section className="albuns-found-container">
          {searchList.map((album) => (
            <AlbumCard
              searchData={ album }
              key={ `album-key-${album.collectionId}` }
            />
          ))}
        </section>

      </section>);
  }

  render() {
    const { searchFor, buttonDisable, searchLoading,
      currentSearch, searchList } = this.state;

    return (
      <section data-testid="page-search" className="top-container">
        <Header />

        <section className="search-input-container">
          <section
            className="search-input"
          >
            <input
              type="text"
              placeholder="Nome do Artista ou Banda"
              data-testid="search-artist-input"
              value={ searchFor }
              onChange={ this.searchStateUpdate }
            />
            <MagnifyingGlass
              className="search-ico"
              size={ 20 }
            />
          </section>

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

        { searchLoading
          ? <Loading />
          : currentSearch && this.searchDisplay(searchList, currentSearch)}
      </section>

    );
  }
}

export default Search;
