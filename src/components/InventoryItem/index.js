import React, {useState} from 'react';
import './styles.scss';
import {Button, IconButton, Link} from '@material-ui/core';
import {ReactSVG} from 'react-svg';
import ReactCardFlip from 'react-card-flip';
import HoverItem from '../HoverItem';
import {isEmpty} from 'lodash';

export default function InventoryItem({
  index,
  isActive,
  src,
  name,
  onClick,
  showDetails,
  createdBy,
  createdAt,
  url,
  isLocked,
  creator
}) {
  const [showBack, setShowBack] = useState(false);

  const renderHeader = () => {
    return (
      <div className={'d-flex align-items-center ' + (isActive ? 'active-item-header' : 'item-header')}>
        {/*<label className="avatar-sticker">Genesis</label>*/}
        <label className={'font-weight-semi-bold flex-fill text-center my-2 ' + (showDetails ? 'ml-4 pl-2' : '')}>
          {name}
        </label>
        {showDetails && (
          <IconButton className="my-2 p-0 mr-2" onClick={() => setShowBack(!showBack)}>
            <ReactSVG src={require('./../../assets/more_circle.svg')} />
          </IconButton>
        )}
      </div>
    );
  };

  return (
    <div
      key={index}
      onClick={() => onClick()}
      className="w-100 height-fit-content"
      style={isActive === false ? {opacity: 0.5} : {opacity: 1}}>
      <ReactCardFlip isFlipped={showBack && showDetails && src}>
        <>
          {renderHeader()}
          {src ? (
            <HoverItem className="inventory-container  bg-secondary-dark bottom-round-border" absolute>
              <img src={src} alt={name} className="w-100 h-100 object-fit inventory-image" />
              {isLocked && (
                <div className="lock-container p-2">
                  <label className="text-center w-100 text-white font-weight-medium font-sm">
                    To unlock, own 1000 ALEX Tokens
                  </label>
                </div>
              )}
            </HoverItem>
          ) : (
            <div className="inventory-container bg-secondary-dark position-relative bottom-round-border">
              <div className="hover-content d-flex flex-column position-absolute">
                {/*<img*/}
                {/*  src={require('../../assets/avatar1.jpg')}*/}
                {/*  alt={name}*/}
                {/*  className="position-re w-100 h-100 object-fit inventory-image"*/}
                {/*/>*/}
              </div>
              <div className="position-absolute trans-bg d-flex flex-column align-items-center">
                <label className="m-3">
                  If you have ever wanted to create your own Virtual Influencers, like Lil Miquela, contact us to get
                  started.
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="px-3 mt-auto mb-3"
                  onClick={() => window.open('https://aletheacreate.typeform.com/to/MTyZRP')}>
                  Contact Us
                </Button>
              </div>
            </div>
          )}
        </>
        <>
          {renderHeader()}
          <HoverItem className="inventory-container background-dark" absolute>
            <div className="item-image h-100 w-100 p-2">
              <label className="my-2">Created By: {!isEmpty(createdBy) ? createdBy : 'unKnown'}</label>
              <br />
              <label className="my-2">Created On: {!isEmpty(createdAt) ? createdAt : 'unKnown'}</label>
              <br />
              <label className="my-2">
                Creator:{' '}
                {!isEmpty(creator) ? (
                  <Link href={creator} target="_blank">
                    Click
                  </Link>
                ) : (
                  'unKnown'
                )}
              </label>
            </div>
          </HoverItem>
        </>
      </ReactCardFlip>
    </div>
  );
}
