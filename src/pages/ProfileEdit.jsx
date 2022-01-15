import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Input } from 'reactstrap';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      loading: true,
      redirect: false,
      inputName: '',
      inputEmail: '',
      inputImg: '',
      inputDesc: '',
    };
  }

  /* AJUDA ALUNO MATHEUS  */

  componentDidMount() {
    getUser().then((data) => this.setState({
      inputName: data.name,
      inputEmail: data.email,
      inputDesc: data.description,
      inputImg: data.image,
      loading: false,
    }));
  }

  handleChang = async (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const { inputName, inputEmail, inputImg, inputDesc } = this.state;
      if (inputName && inputEmail.includes('@')
       && inputEmail.includes('.com')
       && inputEmail && inputDesc && inputImg) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  saveButton = () => {
    const { inputName, inputEmail, inputDesc, inputImg } = this.state;
    const objeto = {
      name: inputName,
      email: inputEmail,
      image: inputImg,
      description: inputDesc,
    };
    this.setState({ redirect: true });
    updateUser(objeto);
  }

  render() {
    const { disabled, loading,
      inputName, inputEmail,
      inputImg, inputDesc, redirect } = this.state;
    return (
      <form data-testid="page-profile-edit">
        <h3>Profile Edit</h3>
        <Header />
        {loading ? (
          'Carregando...'
        ) : (

          <>

            Name
            <Input
              type="text"
              className="input"
              value={ inputName }
              id="name"
              name="inputName"
              onChange={ (e) => this.handleChang(e) }
              data-testid="edit-input-name"
            />

            Email
            <Input
              type="text"
              className="input"
              value={ inputEmail }
              name="inputEmail"
              id="Email"
              onChange={ (e) => this.handleChang(e) }
              data-testid="edit-input-email"
            />

            Image
            <Input
              type="text"
              className="input"
              name="inputImg"
              value={ inputImg }
              id="Image"
              onChange={ (e) => this.handleChang(e) }
              data-testid="edit-input-image"
            />

            Description
            <Input
              type="text"
              className="input"
              name="inputDesc"
              value={ inputDesc }
              id="Description"
              onChange={ (e) => this.handleChang(e) }
              data-testid="edit-input-description"
            />

            <Button
              type="button"
              data-testid="edit-button-save"
              disabled={ disabled }
              color="primary"
              onClick={ () => this.saveButton() }
            >
              Salvar
            </Button>
            {redirect && <Redirect to="/profile" />}

          </>

        ) }
      </form>
    );
  }
}
