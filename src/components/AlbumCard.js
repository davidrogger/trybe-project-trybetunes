// Bibliotecas
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { searchData: { collectionName, artistName, artworkUrl100 } } = this.props;
    return (
      <section className="album-card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        {collectionName}
        {artistName}
      </section>
    );
  }
}

AlbumCard.propTypes = {
  searchData: PropTypes.shape({
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
