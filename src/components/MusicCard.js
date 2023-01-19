// Bibliotecas
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Heart } from 'phosphor-react';

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

favoriteCheckBox = (trackId) => {
  const { favoriteSong } = this.props;
  const { favorite } = this.state;
  this.setState((prevState) => ({
    favorite: !prevState.favorite,
  }));
  console.log(favorite);
  const boxValue = !favorite;
  favoriteSong(trackId, boxValue);
}

render() {
  const {
    musicTrack, trackName, trackId, artworkUrl100, favoritePage = false,
    collectionId,
  } = this.props;

  const { favorite, trackLoading } = this.state;

  return (
    trackLoading
      ? <Loading />
      : (
        <li className="album-track">
          { favoritePage && (
            <Link
              to={ `/album/${collectionId}` }
            >
              <img src={ artworkUrl100 } alt="Imagem do album" />
            </Link>
          ) }
          <span>
            {trackName}
          </span>
          <section
            className="audio-container"
          >
            <audio
              data-testid="audio-component"
              src={ musicTrack }
              controls
            >
              <track kind="captions" />
            </audio>
            <Heart
              size={ 25 }
              weight={ favorite ? 'fill' : 'regular' }
              id={ trackId }
              onClick={ () => this.favoriteCheckBox(trackId) }
            />
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
