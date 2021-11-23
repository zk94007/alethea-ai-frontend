import React, {Component} from 'react';
import {appConfig} from '../../config/app';
import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Button, Hidden} from '@material-ui/core';
import './styles.scss';
import AIAvatarItem from '../../components/AIAvatarItem';
import AvatarVoiceForm from '../../components/AvatarVoiceForm';
import {fileUpload} from '../../services/http_client';
import {updateRenderData} from '../redux/actions';
import history from '../../routes/history';
import AuthWidget from '../../components/AuthWidget';
import InventoryItem from '../../components/InventoryItem';
import CustomAvatar from '../../components/CustomAvatar';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import AVATARS from './avatars';
import PlanCard from '../../components/PlanCard';
import PLANS from './plans';
const ALEX_TOKEN_BASE = 1000;
const ALEX_TOKEN_ADDRESS = '0x8BA6DcC667d3FF64C1A2123cE72FF5F0199E5315';

class AIAvatars extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: AVATARS[0],
      pageIndex: 1,
      avatarName: '',
      language: '',
      voice: '',
      isWaiting: false,
      selectedAvatar: null
    };
  }

  async handleUploadImage(file) {
    const {selectedIndex} = this.state;

    this.setState({isWaiting: true});

    const {data} = await fileUpload({fileName: file.name});
    axios({
      method: 'PUT',
      url: data.data.data.uploadURL,
      data: file,
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(async res => {
      const {
        actions: {updateRenderData}
      } = this.props;
      updateRenderData({imageKey: data.data.data.resultKey, mode: selectedIndex.mode});
      history.push('/generating');
    });
  }

  async unlockMetaMask() {
    const {selectedIndex, selectedAvatar} = this.state;
    const {
      actions: {updateRenderData}
    } = this.props;

    if (window.web3) {
      await window.ethereum.enable();
      console.log('Detect MetaMask has successfully connected.', window.web3.currentProvider.networkVersion);

      if (window.web3.currentProvider.networkVersion === '1') {
        let minABI = [
          // balanceOf
          {
            constant: true,
            inputs: [{name: '_owner', type: 'address'}],
            name: 'balanceOf',
            outputs: [{name: 'balance', type: 'uint256'}],
            type: 'function'
          },
          // decimals
          {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{name: '', type: 'uint8'}],
            type: 'function'
          }
        ];
        let tokenAddress = ALEX_TOKEN_ADDRESS;

        let isEnough = false;

        for (let walletAddress of window.web3.eth.accounts) {
          // Get ERC20 Token contract instance
          let contract = window.web3.eth.contract(minABI).at(tokenAddress);

          const balance = await new Promise(resolve => {
            contract.balanceOf(walletAddress, (error, _balance) => {
              resolve(_balance);
            });
          });

          const decimals = await new Promise(resolve => {
            contract.decimals((error, _decimals) => {
              resolve(balance.div(10 ** _decimals));
            });
          });

          if (decimals >= ALEX_TOKEN_BASE) {
            isEnough = true;
          }
        }

        if (isEnough) {
          updateRenderData({
            mode: selectedIndex.mode,
            inventoryId: selectedAvatar.id,
            videoKey: selectedAvatar.videoKey
          });
          history.push('/generating');
        } else {
          alert('Not enough coin');
        }
      } else {
        alert('PLease connect to mainnet');
      }
    } else {
      alert('Please Install MetaMask');
    }
  }

  handleContactUs() {}

  renderHead() {
    let title = 'AI Avatars';
    let text = 'Which type of AI Avatars would you like to use?';
    const {selectedIndex, pageIndex} = this.state;

    if (pageIndex > 1 && selectedIndex) {
      title = selectedIndex.title;
      text = selectedIndex.text;
    }
    return (
      <div className="d-flex flex-column w-100 align-items-center">
        <h3 className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-2 mb-md-4 font-weight-semi-bold text-center">{title}</h3>
        <h5 className="mx-4 text-center">{text}</h5>
      </div>
    );
  }

  renderOptions() {
    const {selectedIndex, pageIndex} = this.state;
    return (
      <div className="row flex-fill mx-3 mx-md-0 h-xs-100">
        {AVATARS.map((e, n) => (
          <div className="col-12 col-xl-4 col-lg-6 col-md-12 p-0 pl-md-4" key={n}>
            <AIAvatarItem
              index={n}
              onClick={n => {
                this.setState({selectedIndex: e, pageIndex: n ?? pageIndex, selectedAvatar: null});
              }}
              isActive={selectedIndex === null ? null : selectedIndex === e}
              title={e.title}
              description={e.description}
              src={e.imageSrc}
            />
          </div>
        ))}
      </div>
    );
  }

  renderMain() {
    const {pageIndex, avatarName, language, voice, selectedIndex, selectedAvatar} = this.state;
    switch (pageIndex) {
      case 1:
        return <Hidden smUp>{this.renderOptions()}</Hidden>;
      case 2:
        if (selectedIndex?.mode === 'custom') {
          if (appConfig.isProduction)
            return (
              <div className="row flex-fill h-100 mx-3 mx-md-0 justify-content-center align-items-center">
                <Hidden smUp>
                  {PLANS.map(e => (
                    <div className="col-lg-6 col-12 mb-3 mb-md-4">
                      <PlanCard
                        data={e}
                        onClick={mode => window.open('https://aletheacreate.typeform.com/to/MTyZRP')}
                      />
                    </div>
                  ))}
                </Hidden>
              </div>
            );

          return (
            <PerfectScrollbar className="d-flex flex-column flex-fill align-items-center mobile-vw-100">
              <div className="row flex-fill mx-3 mx-md-0">
                <CustomAvatar />
              </div>
            </PerfectScrollbar>
          );
        }
        if (selectedIndex.mode === 'user-generated' || selectedIndex.mode === 'tokenized') {
          return (
            <div className="row flex-fill px-3 mx-0 page-view justify-content-center">
              <Hidden xsDown>
                {selectedAvatar && (
                  <InventoryItem
                    onClick={() => {}}
                    key={0}
                    index={0}
                    isActive={true}
                    name={selectedAvatar.name}
                    src={selectedAvatar.imageSrc}
                  />
                )}
              </Hidden>
              <Hidden smUp>
                <SwipeableViews enableMouseEvents slideClassName="px-2" style={{paddingRight: 32, paddingLeft: 32}}>
                  {this.renderAvatars('')}
                </SwipeableViews>
              </Hidden>
            </div>
          );
        }

        return <div />;
      case 3:
        return (
          <div className="row flex-fill m-0 w-100">
            <AvatarVoiceForm
              name={avatarName}
              language={language}
              voice={voice}
              onNameChange={avatarName => this.setState({avatarName})}
              onLangChange={language => this.setState({language})}
              onVoiceChange={voice => this.setState({voice})}
            />
          </div>
        );
      default:
        return;
    }
  }

  renderButtons() {
    const {pageIndex, selectedIndex, selectedAvatar} = this.state;
    const {
      currentUser,
      actions: {updateRenderData}
    } = this.props;

    switch (pageIndex) {
      case 1:
        return (
          <Hidden smUp>
            <Button
              variant="contained"
              disabled={selectedIndex === null}
              color="primary"
              className="m-3"
              onClick={() => this.setState({pageIndex: 2})}>
              Select and continue
            </Button>
          </Hidden>
        );
      case 2:
        switch (selectedIndex.mode) {
          case 'custom':
            const isAdminOrAgent = !!currentUser?.roles?.includes('Agent') || !!currentUser?.roles?.includes('Admin');
            if (appConfig.isProduction || !isAdminOrAgent) return <></>;

            return (
              <Button
                variant="contained"
                color="primary"
                className="m-3"
                disabled={this.state.isWaiting}
                component="label">
                Upload image
                <input
                  type="file"
                  className="d-none"
                  id="fileUpload"
                  accept=".jpg"
                  onChange={e => {
                    this.handleUploadImage(e.target.files[0]);
                  }}
                />
              </Button>
            );
          case 'user-generated':
            return (
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant="contained"
                  color="primary"
                  className="m-3"
                  disabled={!selectedAvatar}
                  onClick={() => {
                    updateRenderData({
                      mode: selectedIndex.mode,
                      inventoryId: selectedAvatar.id,
                      videoKey: selectedAvatar.videoKey
                    });
                    history.push('/generating');
                  }}>
                  Select and continue
                </Button>
              </div>
            );
          case 'tokenized':
            return (
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant="contained"
                  color="primary"
                  className="m-3"
                  disabled={!selectedAvatar}
                  onClick={() => this.unlockMetaMask()}>
                  Unlock via MetaMask
                </Button>
              </div>
            );
          default:
            return <div />;
        }
      default:
        return;
    }
  }

  renderAvatars(className) {
    const {avatars} = this.props;
    const {selectedAvatar, selectedIndex} = this.state;
    switch (selectedIndex?.mode) {
      case 'user-generated':
      case 'tokenized':
        return (
          avatars &&
          avatars
            .filter(a => a.type === selectedIndex?.mode)
            .map((e, n) => (
              <div key={n} className={className}>
                <InventoryItem
                  onClick={() => this.setState({pageIndex: 2, selectedAvatar: e})}
                  key={n}
                  index={e}
                  isActive={selectedAvatar === null ? null : selectedAvatar === e}
                  name={e.name}
                  src={e.imageSrc}
                  showDetails={true}
                  createdBy={e.createdBy}
                  createdAt={e.createdAt}
                  creator={e.creator}
                  isLocked={e.isLocked}
                />
              </div>
            ))
        );
      case 'custom':
        if (appConfig.isProduction)
          return (
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              <h3 className="gray-color my-5 text-center w-100">{selectedIndex.message}</h3>
              <div className="row w-100">
                {PLANS.map(e => (
                  <div className="col-lg-6 col-12 mb-3 mb-md-4">
                    <PlanCard data={e} onClick={mode => window.open('https://aletheacreate.typeform.com/to/MTyZRP')} />
                  </div>
                ))}
              </div>
            </div>
          );

        return <></>;
      default:
        return <></>;
    }
  }

  render() {
    const {selectedIndex} = this.state;
    let text = 'Choose a Category below';
    if (selectedIndex) {
      text = selectedIndex.header;
    }
    return (
      <div className="vh-100">
        <div className="row p-0 m-0">
          <div className="d-flex flex-column col-12 col-xl-3 col-lg-4 col-md-5 vh-100 p-0 splitter">
            <PerfectScrollbar className="d-flex flex-column flex-fill align-items-center">
              <div className="my-4 pt-md-5">{this.renderHead()}</div>
              <div className="w-100 px-md-3 px-sm-5 d-flex flex-fill h-100 pb-4 align-items-center justify-content-center">
                <Hidden smUp={selectedIndex === null}>{this.renderMain()}</Hidden>
              </div>
            </PerfectScrollbar>
            <div className="d-flex flex-column bottom-stepper">
              {this.renderButtons()}
              <Hidden smUp>
                <AuthWidget />
              </Hidden>
            </div>
          </div>
          <Hidden xsDown>
            <div className="d-flex col-12 col-xl-9 col-lg-8 col-md-7 vh-max-100 overflow-hidden flex-column py-3 pr-3 pl-2">
              <h3 className="font-weight-semi-bold m-3 ml-4">{text}</h3>
              <PerfectScrollbar className="flex-fill my-3 mr-3 ml-0">
                {this.renderOptions()}
                {(selectedIndex?.mode === 'user-generated' || selectedIndex?.mode === 'tokenized') && (
                  <h3 className="font-weight-semi-bold gray-color mx-4 my-3">{selectedIndex.title}</h3>
                )}
                <div className="row mr-0 ml-2">{this.renderAvatars('col-xl-3 col-lg-4 col-md-6 p-0 pl-3 mb-3')}</div>
              </PerfectScrollbar>
              <AuthWidget />
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  renderData: state.rootReducer.renderData,
  avatars: state.rootReducer.avatars,
  currentUser: state.rootReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  actions: {
    updateRenderData: data => {
      dispatch(updateRenderData(data));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AIAvatars);
