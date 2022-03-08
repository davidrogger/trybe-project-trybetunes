// Biblioteca
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Componentes
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

// Serviços
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistName: '',
      collectionName: '',
      artworkIMG: '',
      albumLoading: true,
      musicList: [],
    };
  }

  componentDidMount() {
    this.gettingAlbumMusics();
  }

  gettingAlbumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsResponse = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = musicsResponse[0];
    const justTrackMusics = musicsResponse
      .filter(({ kind }) => kind === 'song');
    this.setState({
      artistName,
      collectionName,
      artworkIMG: artworkUrl100,
      albumLoading: false,
      musicList: justTrackMusics,
    });
  }

favoriteSong = async (id, checkBox) => {
  const { musicList } = this.state;
  const favorite = musicList.find(({ trackId }) => trackId === id);
  this.setState({ albumLoading: true });
  if (checkBox) {
    await addSong(favorite);
  }
  if (!checkBox) {
    await removeSong(favorite);
  }
  this.setState({ albumLoading: false });
}

render() {
  const { artistName, collectionName, musicList, albumLoading,
    artworkIMG } = this.state;
  return (
    <section data-testid="page-album" className="top-container">
      <Header />

      <section className="album-detail">
        { albumLoading
          ? <Loading />
          : (
            <>
              <section className="album-side-container">
                <img src={ artworkIMG } alt={ collectionName } />
                <p data-testid="artist-name">{artistName}</p>
                <p data-testid="album-name">{collectionName}</p>
              </section>
              <ul className="album-playlist">
                {musicList.map(({ previewUrl, trackId, trackName }) => (
                  <MusicCard
                    key={ trackId }
                    musicTrack={ previewUrl }
                    trackName={ trackName }
                    trackId={ trackId }
                    favoriteSong={ this.favoriteSong }
                  />))}
              </ul>
            </>)}
      </section>
    </section>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
