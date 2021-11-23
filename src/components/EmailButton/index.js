import React from 'react';
import './styles.scss';
import Button from '@material-ui/core/Button';
import {ReactSVG} from 'react-svg';

export default function EmailButton({onClick, disabled, title, subTitle}) {
  return (
    <Button variant="outlined" className="w-100 auth-form google-button" onClick={onClick} disabled={disabled}>
      <div className="w-100 d-flex justify-content-between align-items-center flex-row">
        <label className="font-weight-medium">
          {title}
          <span className="font-weight-normal gray-color">{subTitle}</span>
        </label>
        <ReactSVG src={require('../../assets/email.svg')} />
      </div>
    </Button>
  );
}
