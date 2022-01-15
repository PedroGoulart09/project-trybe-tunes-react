import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      informationUser: {},
    };
  }

  componentDidMount() {
    this.handleChange();
  }

  handleChange = async () => {
    const user = await getUser();
    this.setState({ loading: false, informationUser: user });
  };

  render() {
    const { loading, informationUser } = this.state;
    return (
      <div data-testid="page-profile">
        <h3>Profile</h3>
        <Header />
        <Link to="/profile/edit">Editar perfil</Link>

        {loading ? (
          'Carregando...'
        ) : (
          <>
            <>

              <h3>{informationUser.name}</h3>
              <img data-testid="profile-image" src={ informationUser.image } alt="" />
            </>
            <h3>{informationUser.email}</h3>
            <h3>{informationUser.description}</h3>

          </>

        ) }
      </div>
    );
  }
}
