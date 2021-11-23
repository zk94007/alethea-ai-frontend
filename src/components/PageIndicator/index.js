import React from 'react';
import './styles.scss';

export default function PageIndicator({dots, activeIndex}) {
  return (
    <div className="d-flex flex-row align-items-center">
      {Array.from(Array(dots).keys()).map(e => (
        <div key={e} className="dot-container">
          <div className={activeIndex === e ? 'active-dot-class' : 'dot-class'} />
        </div>
      ))}
    </div>
  );
}
