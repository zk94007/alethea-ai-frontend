import React, {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Button, Hidden, MobileStepper} from '@material-ui/core';
import history from '../../routes/history';
import './styles.scss';
import SwipeableViews from 'react-swipeable-views';
import InventoryItem from '../../components/InventoryItem';
import {connect} from 'react-redux';
import {updateRenderData} from '../redux/actions';

class Inventory extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: null
    };
  }

  renderScroll() {
    const {avatars} = this.props;
    const {selectedIndex} = this.state;
    return (
      <div className="row mx-2">
        {avatars
          .filter(avatar => avatar.type === 'user-generated')
          .map((e, n) => (
            <InventoryItem
              onClick={() => this.setState({selectedIndex: e})}
              key={n}
              isActive={selectedIndex === null ? null : selectedIndex === e}
              name={e.name}
              src={e.imageSrc}
            />
          ))}
      </div>
    );
  }

  onContinue() {
    const {
      actions: {updateRenderData}
    } = this.props;
    const {selectedIndex} = this.state;
    updateRenderData({mode: 'user-generated', inventoryId: selectedIndex.id, videoKey: selectedIndex.videoKey});
    history.push('/generating');
  }

  render() {
    const {avatars} = this.props;
    const {selectedIndex} = this.state;
    return (
      <div className="vh-100">
        <Hidden xsDown>
          <div className="row p-0 m-0">
            <div className="col-xl-3 col-lg-4 col-md-5 vh-100 p-0 splitter d-flex">
              <div className="d-flex flex-column flex-fill align-items-center">
                <h3 className="pt-3 mt-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4">Stars</h3>
                <h5 className="gray-color mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 text-center">
                  For a limited time, we are giving free public access to the <b>Stars</b> in the <b>Genesis Batch</b>!
                  <br />
                  Choose your favorite Star:
                </h5>
                {/*<h5 className="gray-color mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mt-3 mb-4 font-weight-semi-bold">*/}
                {/*    Or pick one from our inventory*/}
                {/*</h5>*/}
                <div className="w-100 px-xl-5 px-lg-4 px-md-3 px-sm-5 d-flex flex-fill align-items-end">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={selectedIndex === null}
                    className="mb-5 w-100"
                    onClick={() => this.onContinue()}>
                    Select and continue
                  </Button>
                </div>
              </div>
            </div>
            <div className="d-flex col-xl-9 col-lg-8 col-md-7 vh-max-100 overflow-hidden flex-column pt-3 px-4 pb-4">
              <h1 className="font-weight-semi-bold mb-4 mt-3">Stars</h1>
              <PerfectScrollbar className="flex-fill">{this.renderScroll()}</PerfectScrollbar>
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className="d-flex flex-fill flex-row">
            <div className="d-flex vh-100 flex-column w-100">
              <div className="d-flex flex-fill flex-column w-100 align-items-center">
                <h3 className="mt-4 mx-3 mb-2 font-weight-semi-bold">Stars</h3>
                <h5 className="gray-color mx-4 mb-1 text-center">
                  For a limited time, we are giving free
                  <br />
                  public access to the <b>Stars</b> in
                  <br />
                  the <b>Genesis Batch</b>!<br />
                  Choose your favorite Star:
                </h5>
                {/*<div className="horizontal-separator w-100" />*/}
                {/*{this.renderScroll()}*/}
                <div className="w-100 flex-fill d-flex align-items-center">
                  <div className="overflow-hidden slide-container">
                    <SwipeableViews enableMouseEvents slideClassName="px-2" style={{paddingRight: 32, paddingLeft: 32}}>
                      {avatars
                        .filter(avatar => avatar.type === 'user-generated')
                        .map((e, n) => (
                          <InventoryItem
                            onClick={() => this.setState({selectedIndex: e})}
                            key={n}
                            index={e}
                            isActive={selectedIndex === null ? null : selectedIndex === e}
                            name={e.name}
                            src={e.imageSrc}
                          />
                        ))}
                    </SwipeableViews>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column bottom-stepper">
                <Button
                  variant="contained"
                  disabled={selectedIndex === null}
                  color="primary"
                  className="m-3"
                  onClick={() => this.onContinue()}>
                  Select and continue
                </Button>
                <MobileStepper
                  variant="dots"
                  steps={4}
                  position="static"
                  activeStep={1}
                  nextButton={<div />}
                  backButton={<div />}
                />
              </div>
            </div>
          </div>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  avatars: state.rootReducer.avatars
});

const mapDispatchToProps = dispatch => ({
  actions: {
    updateRenderData: data => {
      dispatch(updateRenderData(data));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
