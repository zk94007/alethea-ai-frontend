import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginWidget from '../LoginWidget';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './styles.scss';
import {closeAuthModal} from '../../containers/redux/actions';
import SignUpWidget from '../SignUpWidget';
import ForgotPasswordWidget from '../ForgotPasswordWidget';
// import CloseIcon from '@material-ui/icons/Close';
// import {IconButton, Dialog, DialogContent, DialogTitle, Hidden} from '@material-ui/core';

class AuthWidget extends Component {
  componentWillUnmount() {
    const {
      actions: {closeAuthModal}
    } = this.props;
    closeAuthModal();
  }

  render() {
    const {showLoginModal, showSignUpModal, showForgotPasswordModal} = this.props;
    if (showLoginModal) {
      return (
        <div className="auth-background">
          <PerfectScrollbar className="h-100 d-flex">
            <LoginWidget />
          </PerfectScrollbar>
        </div>
      );
    }

    if (showSignUpModal) {
      return (
        <div className="auth-background">
          <PerfectScrollbar className="h-100 d-flex">
            <SignUpWidget />
          </PerfectScrollbar>
        </div>
      );
    }

    if (showForgotPasswordModal) {
      return (
        <div className="auth-background">
          <PerfectScrollbar className="h-100 d-flex">
            <ForgotPasswordWidget />
          </PerfectScrollbar>
        </div>
      );
    }

    return <div />;
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  showLoginModal: state.rootReducer.showLoginModal,
  showSignUpModal: state.rootReducer.showSignUpModal,
  showForgotPasswordModal: state.rootReducer.showForgotPasswordModal
});

const mapDispatchToProps = dispatch => ({
  actions: {
    closeAuthModal: () => {
      dispatch(closeAuthModal());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthWidget);
