import React from 'react';
import './styles.scss';
import Button from '@material-ui/core/Button';
import {ReactSVG} from 'react-svg';
import {GoogleLogin} from 'react-google-login';

export default function GoogleButton({onSuccess, onFailure, title, subTitle}) {
  return (
    <GoogleLogin
      clientId="1055833990333-f5j3rcn91qbqf978pqkftpsurlgd98pv.apps.googleusercontent.com"
      render={renderProps => (
        <Button
          variant="outlined"
          className="w-100 auth-form google-button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}>
          <div className="w-100 d-flex justify-content-between align-items-center flex-row">
            <label className="font-weight-medium">
              {title}
              <span className="font-weight-normal gray-color">{subTitle}</span>
            </label>
            <ReactSVG src={require('../../assets/google_logo.svg')} />
          </div>
        </Button>
      )}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      prompt="select_account"
    />
  );
}
