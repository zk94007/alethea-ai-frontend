import React, {Component} from 'react';
import './styles.scss';
import {TextField, Snackbar, IconButton, Checkbox} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {ReactSVG} from 'react-svg';
import Button from '@material-ui/core/Button';
import TermsDialog from '../TermsDialog';
import {
  closeMessageSnack,
  openLoginModal,
  requestSignUp,
  requestGoogleSignUp,
  requestGoogleLogin
} from '../../containers/redux/actions';
import {connect} from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReCAPTCHA from 'react-google-recaptcha';
import {isEmpty} from 'lodash';
import GoogleButton from '../GoogleButton';
import EmailButton from '../EmailButton';

class SignUpWidget extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      showDialog: false,
      recaptcha: '',
      recaptchaError: '',
      showForm: null,
      consent: true
    };

    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    if (this.captchaRef) {
      this.captchaRef.reset();
    }
  }

  onChange(value) {
    this.setState({recaptcha: value});
  }

  onSubmit() {
    this.setState({recaptchaError: ''});

    if (this.validator.allValid()) {
      if (isEmpty(this.state.recaptcha)) {
        this.setState({recaptchaError: 'Please complete Google Recaptcha'});
      } else {
        const {
          actions: {signupRequest}
        } = this.props;
        const {username, password, consent} = this.state;
        signupRequest({
          email: username,
          password: password,
          consent
        });
        this.setState({recaptcha: ''});
        if (this.captchaRef) {
          this.captchaRef.reset();
        }
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  responseGoogleSignUp(response) {
    if (!response?.error) {
      const {
        actions: {googleSignupRequest}
      } = this.props;
      const {consent} = this.state;
      const {googleId, tokenId} = response;
      googleSignupRequest({
        googleId,
        tokenId,
        consent: consent
      });
    }
  }

  responseGoogleSignIn(response) {
    if (!response?.error) {
      const {
        actions: {googleLoginRequest}
      } = this.props;
      const {googleId, tokenId} = response;
      googleLoginRequest({
        googleId,
        tokenId
      });
    }
  }

  renderContent() {
    const {showForm, username, password, consent, recaptcha, recaptchaError} = this.state;
    const {
      errors,
      actions: {openLogin}
    } = this.props;

    switch (showForm) {
      case 'email':
        return (
          <>
            <div className="my-4 d-flex flex-row align-items-center auth-form w-100">
              <IconButton className="p-0 mr-3" onClick={() => this.setState({showForm: null})}>
                <ArrowBackIcon />
              </IconButton>
              <label className="font-lg">Back</label>
            </div>
            <div className="d-flex flex-column w-100 auth-form">
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
            <div className="d-flex flex-column align-items-center mb-auto">
              {isEmpty(recaptcha) ? (
                <ReCAPTCHA
                  sitekey="6LezW9cZAAAAAKldsEfvWjXDaAISOkQ1jbOw6BRs"
                  onChange={this.onChange.bind(this)}
                  ref={el => {
                    this.captchaRef = el;
                  }}
                />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!this.validator.allValid()}
                  onClick={() => this.onSubmit()}>
                  Sign up
                </Button>
              )}
              {recaptchaError && <label className="text-white">{recaptchaError ?? ''}</label>}
              {errors && <label className="text-white">{errors ?? ''}</label>}
            </div>
            {this.renderTC()}
          </>
        );
      default:
        return (
          <>
            <div className="mt-4 w-100 d-flex justify-content-center">
              <EmailButton title="Sign Up with Email" onClick={() => this.setState({showForm: 'email'})} />
            </div>
            <div className="mb-1 mt-3 w-100 d-flex justify-content-center">
              <GoogleButton
                title="Sign Up with Google"
                onSuccess={this.responseGoogleSignUp.bind(this)}
                onFailure={this.responseGoogleSignUp.bind(this)}
              />
            </div>
            <div className="d-flex flex-column w-100 auth-form consent">
              <FormControlLabel
                className="mb-2"
                control={
                  <Checkbox
                    id="consent"
                    name="consent"
                    variant="primary"
                    className="my-1"
                    checked={consent}
                    onChange={e => this.setState({consent: e.target.checked})}
                  />
                }
                label={<span className="consent-label">Send me news and updates from Alethea AI</span>}
              />
            </div>
            <div className="d-flex flex-column align-items-center mb-auto">
              {recaptchaError && <label className="text-white">{recaptchaError ?? ''}</label>}
              {errors && <label className="text-white">{errors ?? ''}</label>}
            </div>
            {this.renderTC()}
            <h2 className="font-weight-bold mt-auto text-center">Already have an account?</h2>
            <div className="mt-4 w-100 d-flex justify-content-center">
              <EmailButton title="Sign in with Email" onClick={() => openLogin()} />
            </div>
            <div className="mt-3 mb-auto w-100 d-flex justify-content-center">
              <GoogleButton
                title="Sign in with Google"
                onSuccess={this.responseGoogleSignIn.bind(this)}
                onFailure={this.responseGoogleSignIn.bind(this)}
              />
            </div>
          </>
        );
    }
  }

  renderTC() {
    return (
      <label className="font-sm text-center">
        By creating an account, or by signing in, I agree to Alethea AI's{' '}
        <b onClick={() => this.setState({showDialog: true})} className="link-text">
          Terms & Conditions
        </b>
      </label>
    );
  }

  render() {
    const {showDialog} = this.state;
    const {
      msg,
      actions: {handleClose}
    } = this.props;

    return (
      <div className="container py-4 d-flex flex-column align-items-center">
        <h2 className="font-weight-bold text-center my-md-5">Sign Up and Get Free Credits</h2>
        {this.renderContent()}

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
    signupRequest: user => {
      dispatch(requestSignUp(user));
    },
    openLogin: () => {
      dispatch(openLoginModal());
    },
    handleClose: () => {
      dispatch(closeMessageSnack());
    },
    googleLoginRequest: body => {
      dispatch(requestGoogleLogin(body));
    },
    googleSignupRequest: user => {
      dispatch(requestGoogleSignUp(user));
    }
  }
});

const mapStateToProps = state => ({
  errors: state.rootReducer.errors,
  msg: state.rootReducer.msg
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpWidget);
