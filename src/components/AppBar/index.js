import React, {Component} from 'react';
import {AppBar, Button, Hidden, IconButton, Toolbar} from '@material-ui/core';
import {connect} from 'react-redux';
import {Close as CloseIcon, Notes as NotesIcon} from '@material-ui/icons';
import {ReactSVG} from 'react-svg';
import {
  closeDrawer,
  openDrawer,
  openLoginModal,
  openSignUpModal,
  requestLogout,
  setAuthToken
} from '../../containers/redux/actions';
import history from '../../routes/history';
import './styles.scss';
import BetaMark from '../BetaMark';
import Discord from './components/DiscordIcon';

import './styles.scss';

class CustomAppBar extends Component {
  handleLogout() {
    const {
      actions: {requestLogOut}
    } = this.props;

    requestLogOut();
    history.push('');
  }
  render() {
    const {
      showDrawer,
      authToken,
      actions: {openDrawer, closeDrawer, openLogin, openSignUp, requestLogOut},
      currentUser
    } = this.props;
    return (
      <AppBar position="static" className="justify-content-center">
        <Toolbar variant="dense" className="d-flex justify-content-between">
          <Hidden smUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                if (showDrawer) {
                  closeDrawer();
                } else {
                  openDrawer();
                }
              }}>
              {showDrawer ? <CloseIcon /> : <NotesIcon />}
            </IconButton>
          </Hidden>
          <div className="d-flex">
            <ReactSVG
              onClick={() => history.push('./')}
              src="/logo_white.svg"
              className="appbar-logo d-flex p-0 justify-content-center"
            />
            <BetaMark />
          </div>

          <Hidden smUp>
            {authToken ? (
              <div className="d-flex align-items-center justify-content-end ml-auto flex-fill" style={{width: 48}}>
                <label className="gray-color mx-2">Credits: </label>
                <label className="font-weight-semi-bold">{currentUser?.credit}</label>
              </div>
            ) : (
              <IconButton
                edge="start"
                className="auth-button"
                color="inherit"
                aria-label="menu"
                onClick={() => openSignUp()}>
                <ReactSVG
                  src={require('../../assets/me_active.svg')}
                  beforeInjection={svg => {
                    svg.setAttribute('style', 'width: 32px; height: 32px;');
                  }}
                  className="logo-max-width p-0 m-0"
                />
              </IconButton>
            )}
          </Hidden>
          <Hidden xsDown>
            {!!authToken ? (
              <div className="d-flex align-items-center">
                <Button
                  variant="contained"
                  color="primary"
                  className="auth-btn"
                  onClick={() => window.open('https://discord.gg/x2Nj6MGEwN', '_blank')}>
                  <Discord />
                </Button>
                <label className="font-lg gray-color mx-2">Your credits: </label>
                <label className="font-lg font-weight-semi-bold mr-4">{currentUser?.credit}</label>
                {/*<Button variant="contained" color="primary">*/}
                {/*  Buy credit*/}
                {/*</Button>*/}
                <Button onClick={() => requestLogOut()}>
                  <ReactSVG
                    src={require('./../../assets/logout.svg')}
                    beforeInjection={svg => {
                      svg.setAttribute('style', 'width: 32px; height: 32px;');
                    }}
                  />
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="auth-btn"
                  onClick={() => window.open('https://discord.gg/x2Nj6MGEwN', '_blank')}>
                  <Discord />
                </Button>
                <Button variant="contained" color="secondary" className="mx-3" onClick={() => openLogin()}>
                  Sign in
                </Button>
                <Button variant="contained" color="primary" onClick={() => openSignUp()}>
                  Sign up
                </Button>
              </div>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  showDrawer: state.rootReducer.showDrawer,
  currentUser: state.rootReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  actions: {
    openDrawer: () => {
      dispatch(openDrawer());
    },
    closeDrawer: () => {
      dispatch(closeDrawer());
    },
    openLogin: () => {
      dispatch(openLoginModal());
    },
    openSignUp: () => {
      dispatch(openSignUpModal());
    },
    requestLogOut: () => {
      dispatch(requestLogout());
    },
    setAuthToken: authToken => {
      dispatch(
        setAuthToken({
          authToken
        })
      );
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
