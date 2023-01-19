// Bibliotecas
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Componentes
import Loading from './Loading';

// Serviços
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackLoading: true,
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
  this.setState({
    favorite,
    trackLoading: false,
  });
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
  const {
    musicTrack, trackName, trackId, artworkUrl100, favoritePage = false,
  } = this.props;

  const { favorite, trackLoading } = this.state;

  return (
    trackLoading
      ? <Loading />
      : (
        <li className="album-track">
          { favoritePage && (<img src={ artworkUrl100 } alt="Imagem do album" />) }
          <span>
            {trackName}
          </span>
          <section>
            <audio
              data-testid="audio-component"
              src={ musicTrack }
              controls
            >
              <track kind="captions" />
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                checked={ favorite }
                onChange={ this.favoriteCheckBox }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </section>
        </li>)
  );
}
}

MusicCard.propTypes = {
  musicTrack: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  favoriteSong: PropTypes.func,
  artworkUrl100: PropTypes.string,
  isFavoritePage: PropTypes.bool,
}.isRequired;

export default MusicCard;
