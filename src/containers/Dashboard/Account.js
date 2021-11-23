import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.scss';
import {connect} from 'react-redux';
import {Button, TextField, Divider, Hidden} from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import {ReactSVG} from 'react-svg';
// import Alert from '@material-ui/lab/Alert';
import {closeMessageSnack, changePassword, updateProfile} from '../../containers/redux/actions';
// import {isEmpty} from 'lodash';
// import {GoogleLogin} from 'react-google-login';

class Account extends Component {
  constructor(props, context) {
    super(props, context);

    const {currentUser} = this.props;

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      website: currentUser.website ? currentUser.website : '',
      realname: currentUser.realname ? currentUser.realname : '',
      location: currentUser.location ? currentUser.location : '',
      jobPosition: currentUser.jobPosition ? currentUser.jobPosition : '',
      tagline: currentUser.tagline ? currentUser.tagline : ''
    };

    this.validator = new SimpleReactValidator();
  }

  onSubmit() {
    if (this.validator.allValid()) {
      const {oldPassword, newPassword} = this.state;
      const {
        authToken,
        actions: {changePassword}
      } = this.props;
      changePassword({oldPassword, newPassword}, authToken);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  onSave() {
    const {website, realname, location, jobPosition, tagline} = this.state;
    const {
      authToken,
      actions: {updateProfile}
    } = this.props;

    updateProfile({website, realname, location, jobPosition, tagline}, authToken);
  }

  render() {
    const {currentUser} = this.props;
    return (
      <PerfectScrollbar>
        <div className="row ml-0 w-100">
          <Hidden xsDown>
            <div className="col-12">
              <h1 className="text-center text-md-left">Account</h1>
            </div>
          </Hidden>
          <div className="col-12 col-lg-6 col-xl-4 d-flex flex-column">
            <h3 className="font-weight-normal gray-color mt-3 mb-4">Account data</h3>
            <label className="font-weight-medium mb-1">Email</label>
            <TextField
              inputProps={{
                autoCapitalize: 'none'
              }}
              id="email-input"
              variant="outlined"
              className="w-100 mb-4"
              disabled
              value={currentUser.email}
            />
            <label className="font-weight-medium mb-1">Website</label>
            <TextField
              id="website-input"
              variant="outlined"
              className="w-100 mb-4"
              placeholder="URL to your website"
              value={this.state.website}
              onChange={e => this.setState({website: e.target.value})}
            />
          </div>
          <div className="col-12 col-lg-6 col-xl-4 d-flex flex-column">
            <Divider className="d-lg-none" />
            <h3 className="font-weight-normal gray-color mt-3 mb-4">User Information</h3>
            <label className="font-weight-medium mb-1">User name</label>
            <TextField
              id="real-name-input"
              variant="outlined"
              className="w-100 mb-4"
              placeholder="User name"
              value={this.state.realname}
              onChange={e => this.setState({realname: e.target.value})}
            />
            {/*<label className="font-weight-medium mb-1">Location</label>*/}
            {/*<TextField*/}
            {/*  id="location-input"*/}
            {/*  variant="outlined"*/}
            {/*  className="w-100 mb-4"*/}
            {/*  placeholder="Location"*/}
            {/*  value={this.state.location}*/}
            {/*  onChange={e => this.setState({location: e.target.value})}*/}
            {/*/>*/}
            {/*<label className="font-weight-medium mb-1">Job position</label>*/}
            {/*<TextField*/}
            {/*  id="job-position-input"*/}
            {/*  variant="outlined"*/}
            {/*  className="w-100 mb-4"*/}
            {/*  placeholder="Job position"*/}
            {/*  value={this.state.jobPosition}*/}
            {/*  onChange={e => this.setState({jobPosition: e.target.value})}*/}
            {/*/>*/}
            <label className="font-weight-medium mb-1">Tagline</label>
            <TextField
              id="tagline-input"
              variant="outlined"
              className="w-100 mb-4"
              placeholder="Tagline"
              value={this.state.tagline}
              onChange={e => this.setState({tagline: e.target.value})}
            />
          </div>
          {/*<div className="col-12 col-xl-4 d-flex flex-column align-items-center">*/}
          {/*  <Divider className="d-xl-none" />*/}
          {/*  <h3 className="font-weight-normal gray-color mt-3 mb-4 w-100">Connect</h3>*/}
          {/*  <GoogleLogin*/}
          {/*    clientId="1055833990333-f5j3rcn91qbqf978pqkftpsurlgd98pv.apps.googleusercontent.com"*/}
          {/*    render={renderProps => (*/}
          {/*      <Button*/}
          {/*        variant="outlined"*/}
          {/*        className="w-100 auth-form google-button mb-3"*/}
          {/*        onClick={renderProps.onClick}*/}
          {/*        disabled={renderProps.disabled}>*/}
          {/*        <div className="w-100 d-flex justify-content-between align-items-center flex-row">*/}
          {/*          <label className="font-weight-medium">*/}
          {/*            Connect to Google <span className="font-weight-normal gray-color">(Arkane)</span>*/}
          {/*          </label>*/}

          {/*          <ReactSVG src={require('../../assets/google_logo.svg')} />*/}
          {/*        </div>*/}
          {/*      </Button>*/}
          {/*    )}*/}
          {/*    buttonText="Login"*/}
          {/*    // onSuccess={this.responseGoogle.bind(this)}*/}
          {/*    // onFailure={this.responseGoogle.bind(this)}*/}
          {/*    cookiePolicy={'single_host_origin'}*/}
          {/*    prompt={'select_account'}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="col-12 align-items-center align-items-md-end d-flex flex-column">
            <Divider className="w-100" />
            <Button color="primary" variant="contained" className="px-5 my-3" onClick={() => this.onSave()}>
              Save
            </Button>
          </div>
        </div>
      </PerfectScrollbar>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  currentUser: state.rootReducer.currentUser,
  msg: state.rootReducer.msg
});

const mapDispatchToProps = dispatch => ({
  actions: {
    handleClose: () => {
      dispatch(closeMessageSnack());
    },
    changePassword: (body, authToken) => {
      dispatch(changePassword(body, authToken));
    },
    updateProfile: (body, authToken) => {
      dispatch(updateProfile(body, authToken));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
