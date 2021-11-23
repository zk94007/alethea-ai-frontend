import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import TermsService from '../TermsService';

export default function TermsDialog({isShow, onClose}) {
  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={isShow} onClose={() => onClose()}>
      <DialogTitle>Terms & Conditions</DialogTitle>
      <DialogContent>
        <TermsService />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} variant="contained" color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
