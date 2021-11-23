import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Hidden, Tabs, Tab} from '@material-ui/core';
import './styles.scss';
import {connect} from 'react-redux';
import TabPanel from '../../components/TabPanel';
import CurrentWatching from './CurrentWatching';
// import Avatars from './Avatars';
import Videos from './Videos';
import {isEmpty, isEqual} from 'lodash';
import Account from './Account';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pageIndex: isEmpty(this.props.currentJob) ? 1 : 0
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.currentJob, prevProps.currentJob)) {
      this.setState({pageIndex: isEmpty(this.props.currentJob) ? 1 : 0});
    }
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
        aria-label="Vertical tabs example"
        className="tabs-border">
        <Tab label="Currently watching" disabled={isEmpty(this.props.currentJob?.renderData?.resultKey)} />
        <Tab label="All videos" />
        <Tab label="Account" />
      </Tabs>
    );
  }

  renderPanels() {
    const {pageIndex} = this.state;
    return (
      <div className="col-12 col-xl-9 col-lg-8 col-md-7 h-100 mobile-vw-100 overflow-hidden d-flex flex-column p-0 p-md-4">
        <TabPanel className="tap-panel" value={pageIndex} index={0}>
          <CurrentWatching />
        </TabPanel>
        <TabPanel className="tap-panel" value={pageIndex} index={1}>
          <Videos changeTabs={this.changeTabs.bind(this)} />
        </TabPanel>
        <TabPanel className="tap-panel" value={pageIndex} index={2}>
          <Account />
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
              <h3 className="font-weight-semi-bold text-center my-5">My Dashboard</h3>
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

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  currentJob: state.rootReducer.currentJob
});

const mapDispatchToProps = dispatch => ({
  actions: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
