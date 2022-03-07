// Biblioteca
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Componentes
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

// Serviços
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistName: '',
      collectionName: '',
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
    const { artistName, collectionName } = musicsResponse[0];
    const justTrackMusics = musicsResponse
      .filter(({ kind }) => kind === 'song');
    this.setState({
      artistName,
      collectionName,
      albumLoading: false,
      musicList: justTrackMusics,
    });
  }

  render() {
    const { artistName, collectionName, musicList, albumLoading } = this.state;
    return (
      <section data-testid="page-album" className="top-container">
        <Header />

        { albumLoading
          ? <Loading />
          : (
            <section className="album-detail">
              <section className="album-side-container">
                <p data-testid="artist-name">{artistName}</p>
                <p data-testid="album-name">{collectionName}</p>
              </section>
              <section className="album-playlist">
                {musicList.map(({ previewUrl, trackId, trackName }) => (<MusicCard
                  key={ trackId }
                  musicTrack={ previewUrl }
                  trackName={ trackName }
                />))}
              </section>
            </section>)}

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
