import React, {Component} from 'react';
import {Box, Container} from '@material-ui/core';

export default class DefaultLayoutScreen extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Container>
        <Box>
          <h1>Text</h1>
        </Box>
      </Container>
    );
  }
}
