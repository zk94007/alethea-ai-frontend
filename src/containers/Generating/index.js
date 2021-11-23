import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Hidden} from '@material-ui/core';
import './styles.scss';
import {connect} from 'react-redux';
import {Progress} from 'reactstrap';
import AuthWidget from '../../components/AuthWidget';
import history from '../../routes/history';
import {isEmpty} from 'lodash';
import {updateRenderData} from '../redux/actions';

class Generating extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isWaiting: false,
      progress: 0
    };
  }

  tick = () => {
    const {progress} = this.state;
    const {authToken} = this.props;
    if (progress >= 100) {
      if (isEmpty(authToken)) {
        const {
          actions: {updateRenderData}
        } = this.props;
        updateRenderData({method: 'personalized-video'});
        history.push('./welcome-video');
      } else {
        history.push('./studio');
      }
      return;
    }
    this.timer = setTimeout(this.tick, 50);
    this.setState({
      progress: progress + 1
    });
  };

  componentDidMount() {
    this.timer = setTimeout(this.tick, 50);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderProgressBar() {
    const {progress} = this.state;
    return (
      <div className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3">
        <div className="d-flex progress-container w-100 my-3 justify-content-center align-items-center">
          <Progress
            value={progress}
            max={100}
            min={0}
            striped
            className="w-100"
            barClassName="bar-progress white-color">
            {progress}%
          </Progress>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="vh-100">
        <div className="row p-0 m-0">
          <div className="col-12 col-xl-3 col-lg-4 col-md-5 vh-100 p-0 splitter d-flex flex-column justify-content-center">
            <Hidden xsDown>
              <label className="font-lg font-weight-semi-bold text-center">Loading AI Avatar</label>
              {this.renderProgressBar()}
            </Hidden>
            <Hidden smUp>
              <div className="d-flex h-100">
                <img
                  src={require('../../assets/head_brain.png')}
                  className="w-100 h-100 object-fit blur-1"
                  alt="head-brain"
                />
              </div>
              <div className="d-flex flex-column bottom-stepper">
                <label className="font-lg font-weight-semi-bold text-center mt-2">Loading AI Avatar</label>
                {this.renderProgressBar()}
              </div>
            </Hidden>
          </div>
          <Hidden xsDown>
            <div className="col-12 col-xl-9 col-lg-8 col-md-7 vh-100 overflow-hidden p-0">
              <img
                src={require('../../assets/head_brain.png')}
                className="w-100 h-100 object-fit blur-1"
                alt="head-brain"
              />
              <AuthWidget />
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken
});

const mapDispatchToProps = dispatch => ({
  actions: {
    updateRenderData: data => {
      dispatch(updateRenderData(data));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Generating);
