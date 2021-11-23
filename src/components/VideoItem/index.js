import React from 'react';
import './styles.scss';
import {isEmpty} from 'lodash';
import {Video} from 'cloudinary-react';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function VideoItem({index, src, onPlay, onDelete, publicId}) {
  if (isEmpty(publicId)) {
    return (
      <div key={index} onClick={() => onPlay()} className="video-item-container">
        <div className="video-item">
          <video src={src} className="video-image w-100 h-100 object-fit" />
        </div>
      </div>
    );
  } else {
    return (
      <div key={index} className="video-item-container" onClick={event => onPlay(event)}>
        <div className="video-item">
          <div className="video-item-actions">
            <Button variant="contained" onClick={event => onDelete(event)} component="button">
              <DeleteIcon></DeleteIcon>
            </Button>
          </div>
          <Video cloudName="alethea" publicId={publicId} width="100%" height="100%"></Video>
        </div>
      </div>
    );
  }
}
