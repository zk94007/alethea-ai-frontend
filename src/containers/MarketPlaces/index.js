import React, {Component} from 'react';
import {Hidden} from '@material-ui/core';
import './styles.scss';

export default class MarketPlace extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: null
    };
  }

  renderContent() {
    return (
      <div className="flex-fill d-flex w-100 ">
        <img src={require('../../assets/market_bg.png')} className="w-100 h-100 object-fit blur-1" alt="" />
        <div className="blur-2 background-color market-overlay" />
        <div className="bg-transparent market-overlay d-flex flex-column justify-content-center align-items-center">
          <h3 className="font-weight-medium text-white">Our V1 Marketplace is currently being updated.</h3>
        </div>
      </div>
    );
  }

  render() {
    // const {selectedIndex} = this.state;
    return (
      <div className="vh-100">
        <div className="row p-0 m-0">
          <div className="col-xl-3 col-lg-4 col-md-5 vh-100 p-0 splitter d-flex">
            <div className="d-flex flex-column flex-fill align-items-center justify-content-between">
              <h3 className="pt-3 mt-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 custom-control px-0">Marketplace</h3>
              <Hidden smUp>{this.renderContent()}</Hidden>
              {/*<div className="d-flex align-items-end justify-content-center bottom-stepper w-100 pt-3">*/}
              {/*  <Button*/}
              {/*    variant="contained"*/}
              {/*    color="primary"*/}
              {/*    disabled={selectedIndex === null}*/}
              {/*    className="mb-3 my-md-5"*/}
              {/*    onClick={() => {}}>*/}
              {/*    Select and continue*/}
              {/*  </Button>*/}
              {/*</div>*/}
            </div>
          </div>
          <Hidden xsDown>
            <div className="d-flex col-xl-9 col-lg-8 col-md-7 vh-max-100 overflow-hidden flex-column px-0">
              {this.renderContent()}
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}
