import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Hidden, Tabs, Tab} from '@material-ui/core';
import './styles.scss';
import TabPanel from '../../components/TabPanel';
import Users from './Users';
import Jobs from './Jobs';
import Report from './Report';
import CustomVideo from './CustomVideo';
import FaceSwap from './FaceSwap';
import {appConfig} from '../../config/app';

export default class Admin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pageIndex: 0
    };
  }

  changeTabs(index) {
    this.setState({pageIndex: index});
  }

  renderTabs(orientation) {
    const {pageIndex} = this.state;
    return (
      <Tabs
        orientation={orientation}
        variant="scrollable"
        value={pageIndex}
        onChange={(event, value) => this.setState({pageIndex: value})}
        aria-label="user admin tab"
        className="tabs-border">
        <Tab label="Users" onClick={() => this.changeTabs(0)} />
        <Tab label="Jobs" onClick={() => this.changeTabs(1)} />
        <Tab label="Report" onClick={() => this.changeTabs(2)} />
        {!appConfig.isProduction && (
          <>
            <Tab label="Custom Video" onClick={() => this.changeTabs(3)} />
            <Tab label="FaceSwap" onClick={() => this.changeTabs(4)} />
          </>
        )}
      </Tabs>
    );
  }

  renderPanels() {
    const {pageIndex} = this.state;
    return (
      <div className="col-12 col-xl-9 col-lg-8 col-md-7 h-100 mobile-vw-100 overflow-hidden d-flex flex-column p-0 p-md-4">
        <TabPanel className="tap-panel" value={pageIndex} index={0}>
          <Users />
        </TabPanel>
        <TabPanel className="tap-panel" value={pageIndex} index={1}>
          <Jobs />
        </TabPanel>
        <TabPanel className="tap-panel" value={pageIndex} index={2}>
          <Report />
        </TabPanel>
        <TabPanel className="tap-panel" value={pageIndex} index={3}>
          <CustomVideo />
        </TabPanel>
        <TabPanel className="tap-panel" value={pageIndex} index={4}>
          <FaceSwap />
        </TabPanel>
        <Hidden smUp>{this.renderTabs('horizontal')}</Hidden>
      </div>
    );
  }

  render() {
    return (
      <div className="vh-100">
        <Hidden xsDown>
          <div className="row p-0 m-0">
            <div className="col-12 col-xl-3 col-lg-4 col-md-5 vh-100 p-3 splitter d-flex flex-column mx-auto">
              <h3 className="font-weight-semi-bold text-center my-5">Admin Panel</h3>
              {this.renderTabs('vertical')}
            </div>

            {this.renderPanels()}
          </div>
        </Hidden>
        <Hidden smUp>{this.renderPanels()}</Hidden>
      </div>
    );
  }
}
