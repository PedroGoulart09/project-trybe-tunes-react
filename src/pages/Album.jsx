import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import Header from '../components/Header';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAlbuns: [],
      musicFavo: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  async favoriteSongs() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const music = await getMusics(id);
    this.setState({
      listAlbuns: [...music],
    });
    const favorite = await getFavoriteSongs();
    this.setState({
      musicFavo: [...favorite],
    });
  }

  render() {
    const { listAlbuns, loading, musicFavo } = this.state;
    return (
      <div data-testid="page-album">
        <h3>Album</h3>
        <Header />

        { listAlbuns.map((musics, index) => (index === 0 ? (
          <div>
            <h2 data-testid="artist-name">{musics.artistName}</h2>
            <h2 data-testid="album-name">{musics.collectionName}</h2>
          </div>
        ) : (
          <div key={ musics.trackName }>
            <h3>{musics.trackName}</h3>
            <audio
              data-testid="audio-component"
              src={ musics.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o
              elemento
              <code>audio</code>
              .
            </audio>
            {/*   AJUDA ALUNO MATHEUS   */}

            Favoritas
            <Input
              type="checkbox"
              id="favorites-music"
              checked={ musicFavo.find(
                (fav) => fav.trackId === musics.trackId,
              ) }
              data-testid={ `checkbox-music-${musics.trackId}` }
              onChange={ async (event) => {
                if (event.target.checked) {
                  this.setState({ loading: true });
                  await addSong(musics);
                  const favoritadas = await getFavoriteSongs();
                  this.setState({ loading: false, musicFavo: [...favoritadas] });
                } else if (event.target.checked === false) {
                  this.setState({ loading: true });
                  await removeSong(musics);
                  const favoritadas = await getFavoriteSongs();
                  this.setState({
                    loading: false,
                    musicFavo: [...favoritadas],
                  });
                }
              } }
            />
          </div>
        )))}
        <p>{loading && 'Carregando...'}</p>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.string.isRequired,
};
