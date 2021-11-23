import React, {Component} from 'react';
import './styles.scss';
import {TextField, Snackbar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {openLoginModal, forgotPassword, closeMessageSnack} from '../../containers/redux/actions';
import {connect} from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import Hidden from '@material-ui/core/Hidden';
import ReCAPTCHA from 'react-google-recaptcha';
import {isEmpty} from 'lodash';
import Alert from '@material-ui/lab/Alert';

class ForgotPasswordWidget extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      recaptcha: ''
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
    if (this.validator.allValid()) {
      const {
        actions: {forgotPassword}
      } = this.props;
      forgotPassword(this.state.email);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const {email, recaptcha} = this.state;
    const {
      msg,
      actions: {openLogin, handleClose}
    } = this.props;

    return (
      <div className="d-flex flex-fill flex-column justify-content-center align-items-center h-100 p-3">
        <Hidden xsDown>
          <h2 className="font-weight-bold mt-auto">Forgot Password</h2>
        </Hidden>
        <h4 className="gray-color my-3 text-center">Please type your email:</h4>
        <div className="d-flex flex-column w-100 auth-form mt-5">
          <label className="font-weight-medium mb-1">Email</label>
          <TextField
            inputProps={{
              autoCapitalize: 'none'
            }}
            id="email"
            variant="outlined"
            className="mb-4"
            value={email}
            onChange={e => this.setState({email: e.target.value})}
            placeholder="Please enter your Email address"
          />
          {this.validator.message('email', email, 'required|email', {
            className: 'text-white'
          })}
        </div>
        <Button
          variant="contained"
          color="primary"
          className="auth-button w-100 mb-5"
          disabled={!this.validator.allValid() || isEmpty(recaptcha)}
          onClick={() => this.onSubmit()}>
          Submit
        </Button>
        <ReCAPTCHA
          className="mb-auto"
          sitekey="6LezW9cZAAAAAKldsEfvWjXDaAISOkQ1jbOw6BRs"
          onChange={this.onChange.bind(this)}
          ref={el => {
            this.captchaRef = el;
          }}
        />
        <h4 className="mb-0 my-3 text-center">
          <b onClick={() => openLogin()} className="link-text font-weight-bold">
            Sign In
          </b>
        </h4>
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
    openLogin: () => {
      dispatch(openLoginModal());
    },
    forgotPassword: email => {
      dispatch(forgotPassword(email));
    },
    handleClose: () => {
      dispatch(closeMessageSnack());
    }
  }
});

const mapStateToProps = state => ({
  errors: state.rootReducer.errors,
  msg: state.rootReducer.msg
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordWidget);
