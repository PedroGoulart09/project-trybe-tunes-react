import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Input, Button } from 'reactstrap';
import { createUser } from '../services/userAPI';
import './layout-css/login.css';

const TRES = 3;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      valueName: '',
      loading: false,
      redirect: false,
    };
  }

  generateUser = (e) => {
    const { disabled } = this.state;
    const valueInput = e.target.value;
    if (valueInput !== undefined) {
      this.setState({
        disabled: disabled && valueInput.length < TRES,
        valueName: valueInput,
      });
    }
  }

  render() {
    const { disabled, valueName, loading, redirect } = this.state;

    return (
      <div className="login-all" data-testid="page-login">
        <form className="form">
          <h3 className="h3-loguin">Loguin</h3>
          <h3 className="h3-name">Name:</h3>
          <Input
            type="text"
            className="input-name"
            id="login"
            onChange={ this.generateUser }
            data-testid="login-name-input"
          />

          <Button
            type="button"
            disabled={ disabled }
            color="primary"
            className="btn-login"
            data-testid="login-submit-button"
            onClick={ async () => {
              this.setState({ loading: true });
              await createUser({ name: valueName });
              this.setState({ redirect: true });
            } }
          >
            Entrar

          </Button>
          {loading && <p>Carregando...</p>}
        </form>
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}
