import React, {Component} from 'react';
import {connect} from 'react-redux';
import './styles.scss';
import {Hidden} from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {updateRenderData} from '../redux/actions';
import {ReactSVG} from 'react-svg';

class Api extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    // const {renderVoiceContent} = this.state;
    return (
      <div className="vh-100">
        <div className="row p-0 m-0">
          <div className="col-12 col-xl-3 col-lg-4 col-md-5 vh-100 pt-3 py-md-5 splitter d-flex flex-column align-items-center px-0">
            <h3 className="font-weight-semi-bold my-2 my-md-3">API</h3>
            <h5 className="mt-md-2 mx-4">
              We have developed our state-of-the-art synthetic media API for implementation into your content workflows.
              Please provide us some information by pressing the Request Access button below, and our team will be in
              touch.
            </h5>
            <div className="bottom-stepper mt-auto w-100">
              <Button
                variant="contained"
                className="m-3"
                color="primary"
                onClick={() => window.open('https://aletheacreate.typeform.com/to/MTyZRP')}>
                Request access
              </Button>
            </div>
          </div>
          <Hidden xsDown>
            <div className="col-12 col-xl-9 col-lg-8 col-md-7 vh-100 overflow-hidden p-0 d-flex flex-column bg-api align-items-center justify-content-end">
              <ReactSVG src={require('../../assets/bg_api.svg')} className="p-0 m-1" />
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  renderData: state.rootReducer.renderData
});

const mapDispatchToProps = dispatch => ({
  actions: {
    updateRenderData: data => {
      dispatch(updateRenderData(data));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Api);
