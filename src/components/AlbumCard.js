// Bibliotecas
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { searchData: { collectionName, artistName, artworkUrl100,
      collectionId } } = this.props;
    return (
      <section className="album-card">
        <img src={ artworkUrl100 } alt={ collectionName } />

        <section className="album-cover">
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <strong>{collectionName}</strong>
          </Link>

          <p>{artistName}</p>

        </section>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  searchData: PropTypes.shape({
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default AlbumCard;
