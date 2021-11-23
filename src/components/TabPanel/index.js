import React from 'react';
import PropTypes from 'prop-types';

export default function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      key={index}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tab-panel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
