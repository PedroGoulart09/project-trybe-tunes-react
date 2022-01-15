import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: [],
    };
  }

  componentDidMount() {
    getUser().then((user) => this.setState({ name: user }));
  }

  render() {
    const { name } = this.state;
    return (
      <header data-testid="header-component">
        {name.length !== 0
          ? <h3 data-testid="header-user-name">{name.name}</h3>
          : <span>Carregando...</span>}

        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Musicas Favoritas: </Link>
        <Link to="/profile" data-testid="link-to-profile">Profile: </Link>

      </header>
    );
  }
}
