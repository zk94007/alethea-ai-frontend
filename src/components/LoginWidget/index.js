import React, {Component} from 'react';
import './styles.scss';
import {TextField, Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {ReactSVG} from 'react-svg';
import Button from '@material-ui/core/Button';
import TermsDialog from '../TermsDialog';
import {
  closeMessageSnack,
  openSignUpModal,
  openForgotPasswordModal,
  requestLogin,
  requestGoogleLogin,
  forgotPassword
} from '../../containers/redux/actions';
import {connect} from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import Hidden from '@material-ui/core/Hidden';
import GoogleButton from '../GoogleButton';

class LoginWidget extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      showDialog: false
    };

    this.validator = new SimpleReactValidator();
  }

  onSubmit() {
    if (this.validator.allValid()) {
      const {
        actions: {loginRequest}
      } = this.props;
      const {username, password} = this.state;
      loginRequest({
        email: username,
        password: password
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  responseGoogle = response => {
    if (!response.error) {
      const {
        actions: {googleLoginRequest}
      } = this.props;
      const {googleId, tokenId} = response;
      googleLoginRequest({
        googleId,
        tokenId
      });
    }
  };

  render() {
    const {username, password, showDialog} = this.state;
    const {
      msg,
      actions: {openSignUp, openForgotPassword, handleClose}
    } = this.props;

    return (
      <div className="d-flex flex-fill flex-column justify-content-center align-items-center h-100 p-3">
        <Hidden xsDown>
          <h2 className="font-weight-bold mt-auto mb-3">Sign in</h2>
        </Hidden>
        <h4 className="gray-color auth-form w-100 mb-3 mt-5">Sign in with Email</h4>
        <div className="d-flex flex-column w-100 auth-form ">
          <label className="font-weight-medium mb-1">Email</label>
          <TextField
            inputProps={{
              autoCapitalize: 'none'
            }}
            id="email"
            variant="outlined"
            className="mb-4"
            value={username}
            onChange={e => this.setState({username: e.target.value})}
            placeholder="Your email"
          />
          {this.validator.message('email', username, 'required|email', {
            className: 'text-danger'
          })}
        </div>
        <div className="d-flex flex-column w-100 auth-form">
          <label className="font-weight-medium mb-0">Password</label>
          <TextField
            inputProps={{
              autoCapitalize: 'none'
            }}
            id="password"
            variant="outlined"
            className="my-1"
            value={password}
            type="password"
            onChange={e => this.setState({password: e.target.value})}
            placeholder="Password"
          />
          <div className="d-flex flex-row mb-4 align-items-center">
            <ReactSVG src={require('../../assets/warning.svg')} />
            <label className="font-tiny disabled mb-0 ml-1">Password length should be minimum 6 symbols</label>
          </div>
          {this.validator.message('password', password, 'required|min:6|max:120')}
        </div>
        <Button variant="contained" color="primary" onClick={() => this.onSubmit()}>
          Sign in
        </Button>
        <label className="font-lg gray-color my-4">or</label>
        <GoogleButton
          title="Sign in with Google"
          onFailure={this.responseGoogle.bind(this)}
          onSuccess={this.responseGoogle.bind(this)}
        />
        <h4 className="mb-0 my-3 text-center">
          Don’t have an account? <u onClick={() => openSignUp()}>Create One</u>
        </h4>
        <label className="font-sm mt-3 mb-auto text-center link-text" onClick={() => openForgotPassword()}>
          Forgot Password?
        </label>
        <label className="font-sm mb-auto text-center">
          By creating an account, or by signing in, I agree to Alethea AI's{' '}
          <b onClick={() => this.setState({showDialog: true})} className="link-text">
            Terms & Conditions
          </b>
        </label>
        <TermsDialog isShow={showDialog} onClose={() => this.setState({showDialog: false})} />
        <Snackbar open={!!msg} autoHideDuration={6000} onClose={() => handleClose()}>
          <Alert onClose={() => handleClose()} severity="success">
            {msg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    loginRequest: id => {
      dispatch(requestLogin(id));
    },
    openSignUp: () => {
      dispatch(openSignUpModal());
    },
    openForgotPassword: () => {
      dispatch(openForgotPasswordModal());
    },
    handleClose: () => {
      dispatch(closeMessageSnack());
    },
    googleLoginRequest: body => {
      dispatch(requestGoogleLogin(body));
    },
    forgotPassword: body => {
      dispatch(forgotPassword(body));
    }
  }
});

const mapStateToProps = state => ({
  errors: state.rootReducer.errors,
  msg: state.rootReducer.msg
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
