import React from 'react';
import './styles.scss';
import HoverItem from '../HoverItem';

export default function ResourceItem({index, isActive, src, name, onClick, type}) {
  return (
    <div className="w-100 height-fit-content" key={index} onClick={() => onClick()}>
      <HoverItem className="resource-item-container" absolute>
        {type === 'video' && (
          <video src={src} alt={name} className="resource-image h-100 w-100 object-fit" controls></video>
        )}
        {type === 'image' && <img src={src} alt={name} className="resource-image h-100 w-100 object-fit"></img>}
      </HoverItem>
      <div className={'d-flex align-items-center ' + (isActive ? 'active-resource-title' : 'resource-title')}>
        <label className="font-weight-bold flex-fill text-center my-3">{name}</label>
      </div>
    </div>
  );
}
