import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favorite: [],
    };
  }

  componentDidMount() {
    this.handleChange();
  }

  handleChange = async () => {
    const favo = await getFavoriteSongs();
    this.setState({ loading: false, favorite: [...favo] });
  }

  render() {
    const { loading, favorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <h3>Favorites</h3>
        <Header />

        {favorite.map((fav) => (
          <div key={ fav.id }>

            <h3>{fav.kind}</h3>
            <h3>{fav.trackName}</h3>
            <h3>{fav.artistId}</h3>
            <h3>{fav.trackId}</h3>
            <h3>{fav.artistName}</h3>
            <h3>{fav.collectionName}</h3>

            <audio
              data-testid="audio-component"
              src={ fav.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o
              elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="des">
              Favorita
              <input
                type="checkbox"
                id="des"
                checked={ favorite.find((fav2) => fav2.trackId === fav.trackId) }
                onChange={ async () => {
                  this.setState({ loading: true });
                  await removeSong(fav);
                  const favo = await getFavoriteSongs();
                  console.log(favo);
                  this.setState({ loading: false, favorite: [...favo] });
                } }
              />
            </label>
          </div>
        ))}
        {loading && 'Carregando...'}
      </div>
    );
  }
}
