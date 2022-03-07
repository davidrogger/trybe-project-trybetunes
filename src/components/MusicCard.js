// Bibliotecas
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Serviços
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    this.isFavorite();
  }

isFavorite = async () => {
  const { trackId } = this.props;
  const favoriteList = await getFavoriteSongs(trackId);
  const favorite = favoriteList.some((music) => music.trackId === trackId);
  this.setState({ favorite });
}

favoriteCheckBox = ({ target }) => {
  const { favoriteSong } = this.props;
  this.setState((prevState) => ({
    favorite: !prevState.favorite,
  }));
  const boxValue = target.checked;
  const trackId = Number(target.id);
  favoriteSong(trackId, boxValue);
}

render() {
  const { musicTrack, trackName, trackId } = this.props;
  const { favorite } = this.state;

  return (
    <li className="album-track">
      {trackName}
      <audio data-testid="audio-component" src={ musicTrack } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label htmlFor={ `favorite-music-${trackId}` }>
        Favorita
        <input
          id={ trackId }
          type="checkbox"
          checked={ favorite }
          onChange={ this.favoriteCheckBox }
          data-testid={ `checkbox-music-${trackId}` }
        />
      </label>
    </li>
  );
}
}

MusicCard.propTypes = {
  musicTrack: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteSong: PropTypes.func.isRequired,
};

export default MusicCard;
