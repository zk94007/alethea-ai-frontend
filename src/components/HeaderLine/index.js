import React from 'react';
import styled from 'styled-components';

const BottomLine = styled.hr`
  width: 100%;
  height: 1px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(90deg, #fc5d5b 0%, #5865a8 21.87%, #206a7c 54.69%, #23d1be 100%);
  opacity: 0.2;
  margin: 0;
  outline: none;
  border: none;
`;

const BottomStaticLine = styled.hr`
  width: 50px;
  height: 1px;
  background: #fff;
  margin: ${(props) => (props.center ? 'auto' : '0')};
  outline: none;
  border: none;
`;

const HeaderLine = ({ center = false }) => (
  <div className="d-flex flex-column">
    <BottomStaticLine center={center} />
    <BottomLine />
  </div>
);

export default HeaderLine;