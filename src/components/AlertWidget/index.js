import React from 'react';
import './styles.scss';
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function AlertWidget({isOpen, handleClose, severity, message, onClick}) {
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert onClick={() => onClick()} icon={<div />} elevation={6} variant="outlined" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
