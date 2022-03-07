// Biblioteca
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

// Serviços

import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteLoading: true,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.favoriteRecovery();
  }

  favoriteRecovery = async () => {
    const favoriteList = await getFavoriteSongs();
    this.setState({
      favoriteList,
      favoriteLoading: false,
    });
  }

  render() {
    const { favoriteList, favoriteLoading } = this.state;
    return (
      <section data-testid="page-favorites" className="top-container">
        <Header />
        {favoriteLoading
          ? <Loading />
          : (
            <section>
              Músicas favoritas:
              <ul>
                {favoriteList.map(({ previewUrl, trackId, trackName }) => (<MusicCard
                  key={ trackId }
                  musicTrack={ previewUrl }
                  trackName={ trackName }
                  trackId={ trackId }
                  favoriteSong={ this.favoriteSong }
                />))}
              </ul>
            </section>)}
      </section>
    );
  }
}

export default Favorites;
