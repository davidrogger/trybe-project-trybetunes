// Biblioteca
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

// Serviços
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  favoriteSong = async (id) => {
    const { favoriteList } = this.state;
    const favorite = favoriteList.find(({ trackId }) => trackId === id);
    this.setState({ favoriteLoading: true });

    await removeSong(favorite);
    this.favoriteRecovery();
  }

  favoriteDisplay = () => {
    const { favoriteList } = this.state;
    return (
      favoriteList.length === 0
        ? (<h1>Não existem músicas favorista ainda</h1>)
        : (
          <section className="favorite-background-container">
            <h2>
              Músicas favoritas:
            </h2>
            <ul>
              {favoriteList
                .map((album) => (<MusicCard
                  key={ album.trackId }
                  musicTrack={ album.previewUrl }
                  trackName={ album.trackName }
                  artworkUrl100={ album.artworkUrl100 }
                  trackId={ album.trackId }
                  collectionId={ album.collectionId }
                  favoriteSong={ this.favoriteSong }
                  favoritePage
                />))}
            </ul>
          </section>
        )
    );
  }

  render() {
    const { favoriteList, favoriteLoading } = this.state;
    console.log(favoriteList);
    return (
      <section data-testid="page-favorites" className="top-container">
        <Header />
        {favoriteLoading
          ? <Loading />
          : this.favoriteDisplay() }
      </section>
    );
  }
}

export default Favorites;
