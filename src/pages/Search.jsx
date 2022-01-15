import React, { Component } from 'react';
import './layout-css/search.css';
import { Link } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';

const DOIS = 2;
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      loading: false,
      lengthInput: '',
      lengthInput2: '',
      nameArtist: false,
      albunsArtist: ['teste'],
    };
  }

  handleChange = (e) => {
    const { disabled } = this.state;
    const valueInput = e.target.value;
    if (valueInput !== undefined) {
      this.setState({
        disabled: disabled && valueInput.length < DOIS,
        lengthInput: e.target.value,
      });
    }
  };

  clearInput = async () => {
    this.setState((prevState) => ({
      loading: true,
      lengthInput2: prevState.lengthInput,
    }));
    const { lengthInput } = this.state;
    const api = await searchAlbumsAPI(lengthInput);
    console.log(api);
    this.setState({
      lengthInput: '',
      nameArtist: true,
      loading: false,
      albunsArtist: [...api],
    });
  };

  render() {
    const {
      disabled,
      lengthInput,
      loading,
      nameArtist,
      lengthInput2,
      albunsArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <h3>Search</h3>
        <Header />
        <form>
          {loading ? (
            <span>Carregando...</span>
          ) : (
            <Input
              type="text"
              data-testid="search-artist-input"
              value={ lengthInput }
              onChange={ this.handleChange }
            />
          )}

          {loading ? (
            ''
          ) : (
            <Button
              type="button"
              disabled={ disabled }
              color="primary"
              data-testid="search-artist-button"
              onClick={ this.clearInput }
            >
              Pesquisar
            </Button>
          )}
          {nameArtist ? (
            <h2>
              Resultado de álbuns de:
              {' '}
              {lengthInput2}
            </h2>

          ) : (
            ''
          )}

          {albunsArtist.length === 0 && 'Nenhum álbum foi encontrado '}

          {albunsArtist.length > 1
            && albunsArtist.map((albums) => (
              <div key={ albums.id }>
                <h2>{albums.artistId}</h2>
                <h2>{albums.artistName}</h2>
                <h2>{albums.collectionId}</h2>
                <h2>{albums.collectionName}</h2>
                <h2>{albums.artistName}</h2>
                <h2>{albums.collectionPrice}</h2>
                <img src={ albums.artworkUrl100 } alt={ albums.artistName } />
                <h2>{albums.releaseDate}</h2>
                <h2>{albums.trackCount}</h2>
                <Link
                  data-testid={ `link-to-album-${albums.collectionId}` }
                  to={ `/album/${albums.collectionId}` }
                  className="link"
                >
                  Mais Detalhes
                </Link>
              </div>
            ))}
        </form>
      </div>
    );
  }
}
