import React from 'react';
import './styles.scss';
import {IconButton} from '@material-ui/core';
// import CloseIcon from "@material-ui/icons/Close";
import SyncIcon from '@material-ui/icons/Sync';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

export default function FinalItem({index, src, name, onClick, image, enableRefresh, isLoading}) {
  return (
    <div key={index} onClick={() => onClick()} className="final-item-container">
      <div className="final-item">
        <img
          src={src ?? require('../../assets/6.jpg')}
          alt="img-inventory-1"
          className="final-image w-100 h-100 object-fit"
        />
        {/*<Backdrop open={isLoading}>*/}
        {/*    <CircularProgress color="inherit" />*/}
        {/*</Backdrop>*/}
      </div>
      {!isLoading && (
        <div className="final-item d-flex flex-row justify-content-end pt-2 px-2">
          {/*<IconButton size="small" className="close-button" aria-label="delete">*/}
          {/*  <CloseIcon fontSize="small" />*/}
          {/*</IconButton>*/}
          <div className="final-avatar-container ">
            <img
              src={image ?? require('../../assets/6.jpg')}
              alt="img-inventory-1"
              className="final-avatar w-100 h-100 object-fit"
            />
            {enableRefresh && (
              <IconButton className="refresh-button" aria-label="delete">
                <SyncIcon color="primary" />
              </IconButton>
            )}
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="bottom-label d-flex align-items-center justify-content-between px-2">
          <label className="font-weight-semi-bold">{name}</label>
          <IconButton className="p-1">
            <ShareOutlinedIcon style={{fontSize: 24}} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
