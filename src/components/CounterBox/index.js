import React from 'react';
import './styles.scss';

const CounterBox = ({value, label}) => {
  return (
    <div className="counter-box-wrapper">
      <div className="counter-box">
        <div className="counter-box-b1" />
        <div className="counter-box-b2" />
        <div className="counter-box-b3" />
        <div className="counter-box-b4" />
        <div className="counter-box-background" />
        <span>{value}</span>
      </div>
      <span className="counter-label">{label}</span>
    </div>
  );
};

export default CounterBox;
