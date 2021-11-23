import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.scss';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';

class Credits extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <div className="video-container">
          <div className="video-box p-2">
            <video
              controls
              className="object-fit w-100 h-100 rounded-border"
              src={require('../../assets/home_video.mp4')}
            />
          </div>
        </div>
        <div className="d-flex flex-row">
          <Button variant="outlined" color="inherit" className="my-4 mx-2">
            Share
          </Button>
          <Button variant="contained" color="primary" className="my-4 mx-3">
            Download
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken
});

const mapDispatchToProps = dispatch => ({
  actions: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Credits);
