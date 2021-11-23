import React from 'react';
import './styles.scss';

export default function HoverItem({className, children, onClick, style, absolute}) {
  return (
    <div className={className + ' hover-container'} onClick={onClick} style={style}>
      <div className="hover-middle" />
      <div className="hover-content d-flex flex-column" style={absolute ? {position: 'absolute'} : null}>
        {children}
      </div>
    </div>
  );
}
