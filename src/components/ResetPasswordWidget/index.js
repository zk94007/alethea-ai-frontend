import React, {Component} from 'react';
import './styles.scss';
import {TextField, Snackbar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {openLoginModal, resetPassword, closeMessageSnack} from '../../containers/redux/actions';
import {connect} from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import Hidden from '@material-ui/core/Hidden';
import ReCAPTCHA from 'react-google-recaptcha';
import {isEmpty} from 'lodash';
import Alert from '@material-ui/lab/Alert';
import {ReactSVG} from 'react-svg';
import history from '../../routes/history';

class ResetPasswordWidget extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      newPassword: '',
      newPasswordConfirm: '',
      recaptcha: '',
      newPasswordToken: props.newPasswordToken
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
        actions: {openLogin, resetPassword}
      } = this.props;
      resetPassword(this.state.newPasswordToken, this.state.newPassword);
      setTimeout(() => {
        openLogin();
        history.push('/');
      }, 3000);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const {newPassword, newPasswordConfirm, recaptcha} = this.state;
    const {
      msg,
      actions: {handleClose}
    } = this.props;

    return (
      <div className="d-flex flex-fill flex-column justify-content-center align-items-center h-100 p-3">
        <Hidden xsDown>
          <h2 className="font-weight-bold mt-auto">Reset Password</h2>
        </Hidden>
        <div className="d-flex flex-column w-100 auth-form mt-4">
          <label className="mx-4 mb-1 font-weight-medium">New Password:</label>
          <TextField
            inputProps={{
              autoCapitalize: 'none'
            }}
            id="new-password-input"
            variant="outlined"
            className="mx-4 mb-3"
            type="password"
            value={newPassword}
            onChange={e => this.setState({newPassword: e.target.value})}
          />
          <div className="d-flex flex-row mx-4 mb-1 align-items-center">
            <ReactSVG src={require('../../assets/warning.svg')} />
            <label className="font-tiny disabled mb-0 ml-1">Password length should be minimum 6 symbols</label>
          </div>
          {this.validator.message('newPassword', newPassword, 'required|min:6|max:120', {
            className: 'font-tiny ml-4'
          })}
        </div>

        <div className="d-flex flex-column w-100 auth-form mt-4">
          <TextField
            inputProps={{
              autoCapitalize: 'none'
            }}
            id="new-password-confirm-input"
            variant="outlined"
            className="mx-4 mb-3"
            type="password"
            value={newPasswordConfirm}
            onChange={e => this.setState({newPasswordConfirm: e.target.value})}
          />
          <div className="d-flex flex-row mx-4 mb-4 align-items-center">
            <ReactSVG src={require('../../assets/warning.svg')} />
            <label className="font-tiny disabled mb-0 ml-1">Please re-type your new password again:</label>
          </div>
          {this.validator.message('newPasswordConfirm', newPasswordConfirm, `required|in:${newPassword}`, {
            className: 'font-tiny ml-4'
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
    resetPassword: (newPasswordToken, newPassword) => {
      dispatch(resetPassword({newPasswordToken, newPassword}));
    },
    openLogin: () => {
      dispatch(openLoginModal());
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordWidget);
