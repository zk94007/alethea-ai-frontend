/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {TextField, Button} from '@material-ui/core';
import './styles.scss';
import {appConfig} from '../../config/app';

class Vader extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      isAuthenticated: false
    };
  }

  onCheckAuth() {
    if (this.state.password === 'Alethea2021!') {
      this.setState({isAuthenticated: true});
    }
  }

  renderAuth() {
    return (
      <div className="my-4 d-flex align-items-center auth-form w-100 flex-column">
        <TextField
          inputProps={{
            autoCapitalize: 'none'
          }}
          id="password"
          variant="outlined"
          className="m-3"
          value={this.state.password}
          type="password"
          onChange={e => this.setState({password: e.target.value})}
          placeholder="Password"
        />
        <Button variant="contained" color="primary" disabled={!this.state.password} onClick={() => this.onCheckAuth()}>
          Enter
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className="vh-100 d-flex flex-column align-items-center">
        {!this.state.isAuthenticated && this.renderAuth()}
      </div>
    );
  }
}

export default Vader;
