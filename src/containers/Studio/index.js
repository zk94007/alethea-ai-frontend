import React, {Component} from 'react';
import {connect} from 'react-redux';
import './styles.scss';
import {Hidden, IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PerfectScrollbar from 'react-perfect-scrollbar';
import InventoryItem from '../../components/InventoryItem';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AIAvatarItem from '../../components/AIAvatarItem';
import {updateRenderData} from '../redux/actions';
import history from '../../routes/history';
import AlertWidget from '../../components/AlertWidget';

// import STUDIO_OPTIONS from './options.js';

class Studio extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openBottomSheet: false,
      selectedOption: null,
      renderVoiceContent: false,
      showAlert: false
    };
  }

  componentDidMount() {
    const {renderData} = this.props;
    if (renderData.inventoryId === '' && !renderData.mode === '') {
      history.push('/avatars');
    }
  }

  renderItem() {
    const {renderData, avatars} = this.props;
    return (
      <div className="w-100 px-5 px-md-4">
        {(renderData.mode === 'user-generated' || renderData.mode === 'tokenized') && renderData.inventoryId !== '' && (
          <InventoryItem
            onClick={() => {}}
            isActive={true}
            name={(avatars ?? []).find(i => i.id === renderData.inventoryId)?.name}
            src={(avatars ?? []).find(i => i.id === renderData.inventoryId)?.imageSrc}
          />
        )}
        {renderData.mode === 'custom' && (
          <InventoryItem
            onClick={() => {}}
            isActive={true}
            name="Custom Avatar"
            src={`https://d2iia7yeg2usc9.cloudfront.net/${renderData.imageKey}`}
          />
        )}
        {renderData.mode === '' && !renderData.inventoryId && <p>Please pick up User-generated Avatar</p>}
      </div>
    );
  }

  renderStudioItems() {
    const {categories} = this.props;
    if (!categories) return;

    const {selectedOption} = this.state;
    return categories
      .sort((a, b) => a.order - b.order)
      .map((e, n) => (
        <div className="col-12 col-xl-4 col-lg-6 col-md-12 p-0 pl-md-4" key={n}>
          <AIAvatarItem
            title={e.title}
            description={e.description}
            onClick={_ => {
              this.setState({selectedOption: e}, () => {
                if (e.method !== 'soon') this.continue();
              });
            }}
            src={e.imageSrc}
            isActive={selectedOption === null ? null : selectedOption === e}
            isDisable={e.method === 'soon'}
          />
        </div>
      ));
  }

  continue() {
    const {selectedOption} = this.state;
    const {
      actions: {updateRenderData}
    } = this.props;
    updateRenderData({method: selectedOption.method});
    history.push('/welcome-video');
  }

  renderVoiceVideo() {
    return (
      <div className="d-flex justify-content-center my-auto px-3 flex-column">
        <Button variant="contained" color="primary" className="mb-4 mt-2 w-100" onClick={() => {}}>
          Upload Audio
        </Button>
        <Button variant="contained" color="primary" className="mb-4 mt-2 w-100" onClick={() => {}}>
          Generate
        </Button>
      </div>
    );
  }

  render() {
    const {openBottomSheet, selectedOption, renderVoiceContent, showAlert} = this.state;
    return (
      <div className="vh-100">
        <div className="row p-0 m-0">
          <Hidden xsDown>
            <div className="col-12 col-xl-3 col-lg-4 col-md-5 vh-100 p-0 splitter d-flex flex-column justify-content-center">
              {renderVoiceContent ? (
                this.renderVoiceVideo()
              ) : (
                <div className="my-auto d-flex flex-column align-items-center">
                  <label className="font-lg font-weight-semi-bold text-center mb-4 pb-2">AI Avatar Selected</label>
                  {this.renderItem()}
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="contained"
                      className="my-4"
                      color="primary"
                      onClick={() => history.push('./avatars')}>
                      Select Another AI Avatar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Hidden>
          <div className="col-12 col-xl-9 col-lg-8 col-md-7 vh-100 overflow-hidden p-0 d-flex flex-column">
            {renderVoiceContent ? (
              this.renderVoiceVideo()
            ) : (
              <PerfectScrollbar className="flex-fill p-3 m-3">
                <div className="row">{this.renderStudioItems()}</div>
              </PerfectScrollbar>
            )}
            <Hidden smUp>
              <div className="d-flex justify-content-center mb-5 bottom-stepper px-3 pt-3 pb-4">
                <Button
                  variant="contained"
                  color="primary"
                  className="w-100"
                  disabled={!selectedOption || selectedOption.method === 'soon'}
                  onClick={() => {
                    this.continue();
                  }}>
                  Continue
                </Button>
              </div>
              <SwipeableBottomSheet
                overflowHeight={56}
                open={openBottomSheet}
                onChange={openBottomSheet => this.setState({openBottomSheet})}>
                <div className="bottom-sheet-header d-flex flex-row justify-content-between align-items-center px-3">
                  <h5 className="font-weight-semi-bold">AI Avatar Selected</h5>
                  <IconButton className="pr-0" onClick={() => this.setState({openBottomSheet: !openBottomSheet})}>
                    {openBottomSheet ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </IconButton>
                </div>
                <div className="bottom-sheet-body d-flex flex-column">
                  <div className="flex-fill d-flex justify-content-center align-items-center">{this.renderItem()}</div>
                  <div className="d-flex justify-content-center">
                    <Button variant="outlined" className="my-4" onClick={() => history.push('./avatars')}>
                      Select Another AI Avatar
                    </Button>
                  </div>
                </div>
              </SwipeableBottomSheet>
            </Hidden>
          </div>
        </div>
        <AlertWidget
          isOpen={showAlert}
          onClick={() => {}}
          handleClose={() => this.setState({showAlert: false})}
          message="For Enterprise Only - Click Here To Request Access"
          severity="info"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  renderData: state.rootReducer.renderData,
  avatars: state.rootReducer.avatars,
  categories: state.rootReducer.categories
});

const mapDispatchToProps = dispatch => ({
  actions: {
    updateRenderData: data => {
      dispatch(updateRenderData(data));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Studio);
