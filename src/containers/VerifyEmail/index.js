import React, {Component} from 'react';
import {connect} from 'react-redux';
import './styles.scss';
import {requestVerify, closeMessageSnack} from '../redux/actions';
import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import history from '../../routes/history';

class VerifyEmail extends Component {
  componentDidMount() {
    const {
      match: {
        params: {emailToken}
      },
      actions: {requestVerify, handleClose}
    } = this.props;
    handleClose();
    requestVerify(emailToken);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.msg !== this.props.msg && this.props.msg !== '') {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }

  render() {
    const {
      msg,
      actions: {handleClose}
    } = this.props;

    const success = msg === 'Successfully verified' ? true : false;

    return (
      <div className="vh-100 d-flex flex-column align-items-center">
        <h3>Please wait...</h3>
        <Snackbar open={!!msg} autoHideDuration={6000} onClose={() => handleClose()}>
          <Alert onClose={() => handleClose()} severity={success ? 'success' : 'error'}>
            {msg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  msg: state.rootReducer.msg
});

const mapDispatchToProps = dispatch => ({
  actions: {
    requestVerify: emailToken => {
      dispatch(requestVerify(emailToken));
    },
    handleClose: () => {
      dispatch(closeMessageSnack());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
