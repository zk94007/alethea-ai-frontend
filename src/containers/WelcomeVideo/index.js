import React, {Component} from 'react';
import {ReactSVG} from 'react-svg';
import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Button, Hidden, TextField, FormControl, MenuItem, Select} from '@material-ui/core';
import './styles.scss';
import {connect} from 'react-redux';
import {fileUpload} from '../../services/http_client';
import {Snackbar} from '@material-ui/core';
import {openSignUpModal, createJob, getJob, updateRenderData, closeMessageSnack} from '../redux/actions';
import {Progress} from 'reactstrap';
import history from '../../routes/history';
import AuthWidget from '../../components/AuthWidget';
import axios from 'axios';
import {isEmpty, isEqual} from 'lodash';
import VOICES from './voices';
import EMOTIONAL_STATES from './emotionalStates';
import HARMFUL_STRING from './harmfulWords';
import Alert from '@material-ui/lab/Alert';
import ResourceItem from '../../components/ResourceItem';
import InventoryItem from '../../components/InventoryItem';
import SwipeableViews from 'react-swipeable-views';

const HARMFUL_WORDS = HARMFUL_STRING.split(',').map(w => w.trim());
const MAX_MESSAGE_CHARS = 140;
const FACESWAP_TARGET_VIDEOS = [
  {
    name: 'Iron Man Suit Up',
    videoSrc: 'https://d2iia7yeg2usc9.cloudfront.net/FW_T2.mp4',
    videoKey: 'FW_T2.mp4'
  },
  {
    name: 'Trump Speech',
    videoSrc: 'https://d2iia7yeg2usc9.cloudfront.net/FW_T4.mp4',
    videoKey: 'FW_T4.mp4'
  }
];

class WelcomeVideo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isUploading: false,
      uploadedFileName: '',
      uploadingProgress: 1,
      message: '',
      voiceId: 1,
      emotionalState: 'neutral',
      curMessageRemainingLen: MAX_MESSAGE_CHARS,
      isRecording: false,
      audioDetails: {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      },
      progress: 1,
      tickTime: 1000,
      isWaiting: false,
      jobId: '',
      statusMessage: 'Please wait...',
      isPending: false,
      error: '',
      selectedTargetVideo: null
    };
  }

  async componentWillMount() {
    const {renderData} = this.props;
    if (renderData.mode === '' && renderData.inventoryId === '') history.push('/avatars');
  }

  async componentDidUpdate(prevProps) {
    if (!isEqual(this.props.currentJob, prevProps.currentJob)) {
      if (this.props.currentJob?.id !== prevProps.currentJob?.id) {
        this.timer = setTimeout(this.tick, this.state.tickTime);
      }
      if (this.props.currentJob?.renderData?.status !== prevProps.currentJob?.renderData?.status) {
        if (this.props.currentJob?.renderData?.status === 'finished') {
          history.push('/dashboard');
        }
        if (this.props.currentJob?.renderData?.status === 'failed') {
          this.setState({error: 'We are unable to render your video, please try again from the beginning...'});
          this.setTimeout(() => {
            history.push('/avatars');
          }, 3000);
        }
        if (this.props.currentJob?.renderData?.status === 'animation') {
          this.setState({
            isPending: true,
            statusMessage: 'We are generating a custom avatar from your image. It would take several minutes...'
          });
        }
        if (this.props.currentJob?.renderData?.status === 'in_progress') {
          this.setState({
            isPending: false,
            statusMessage: `Creating video... estimated time: ${
              this.props.currentJob?.renderData?.method === 'faceswap' ? '5-10 min' : '2-3 min'
            }`
          });
        }
      }
    }

    if (!isEqual(this.props.errors, prevProps.errors) && this.props.errors) {
      this.setState({error: this.props.errors, isPending: false, isWaiting: false});
    }
  }

  async generate() {
    const {
      authToken,
      renderData,
      actions: {openSignUp, createJob}
    } = this.props;

    if (!authToken) return openSignUp();

    this.setState({
      isPending: true,
      statusMessage: 'Your request is submitted sucessfully...'
    });

    if (renderData.method === 'personalized-video' || renderData.method === 'green-screen') {
      const {message, voiceId} = this.state;

      let isHarmful = false;
      for (let word of HARMFUL_WORDS) {
        for (let m of message.split(' ')) {
          if (m.toLowerCase() === word.toLowerCase()) isHarmful = true;
          if (m.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === word.toLowerCase()) isHarmful = true;
        }
      }

      if (isHarmful) {
        alert('Your content contains harmful content');
        return;
      }

      this.setState({isWaiting: true});
      createJob({
        ...renderData,
        text: message,
        gttsName: VOICES[voiceId].name,
        gttsLanguageCode: VOICES[voiceId].languageCode
      });
    } else if (renderData.method === 'voice2video') {
      this.setState({isWaiting: true});
      createJob(renderData);
    } else if (renderData.method === 'faceswap') {
      const {selectedTargetVideo} = this.state;
      this.setState({isWaiting: true});
      createJob({...renderData, targetVideoKey: selectedTargetVideo.videoKey});
    }
  }

  tick = () => {
    const {
      currentJob,
      actions: {getJob}
    } = this.props;
    if (currentJob?.id) {
      getJob(currentJob.id);
      this.timer = setTimeout(this.tick, this.state.tickTime);
      this.setState({
        progress: this.state.isPending ? Math.min(this.state.progress + 1, 10) : Math.min(this.state.progress + 1, 99)
      });
    }
  };

  uploadingTick = () => {
    this.uploadingTimer = setTimeout(this.uploadingTick, 300);
    this.setState({
      uploadingProgress: Math.min(this.state.uploadingProgress + 3, 99)
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.uploadingTimer);
  }

  messageInput = e => {
    this.setState({
      message: e.target.value,
      curMessageRemainingLen: MAX_MESSAGE_CHARS - e.target.value.length
    });
  };

  async getAudioDuration(file) {
    return new Promise(resolve => {
      const audio = document.createElement('audio');
      const reader = new FileReader();
      reader.onload = function (e) {
        audio.addEventListener('loadedmetadata', () => resolve(audio.duration), false);
        audio.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async handleUploadAudio(file) {
    const {authToken} = this.props;

    this.setState({
      uploadingProgress: 1,
      isUploading: true
    });
    const duration = await this.getAudioDuration(file);
    if (duration > 10) {
      // TODO adjust timer
      this.setState({tickTime: Math.max(Math.floor((duration / 10) * 1000), 10000)});
    }
    console.log(this.state.tickTime);

    this.uploadingTimer = setTimeout(this.uploadingTick, 300);
    const response = await fileUpload({fileName: file.name}, authToken);

    axios({
      method: 'PUT',
      url: response.data.data.data.uploadURL,
      data: file,
      headers: {'Content-Type': 'multipart/form-data'},
      timeout: 500000
    }).then(async res => {
      this.setState({
        uploadingProgress: 99
      });
      clearTimeout(this.uploadingTimer);

      this.setState({
        isUploading: false,
        uploadedFileName: file.name
      });

      const {
        actions: {updateRenderData}
      } = this.props;
      updateRenderData({audioKey: response.data.data.data.resultKey});
    });
  }

  handleAudioStop(data) {
    console.log(data);
    this.setState({audioDetails: data});
  }

  async handleAudioUpload(blob) {
    const {authToken} = this.props;

    if (!blob) {
      alert('Please record before upload');
      return;
    }

    const file = new File([blob], 'record.mp3');
    const duration = Math.min(
      30,
      this.state.audioDetails.h * 3600 + this.state.audioDetails.m * 60 + this.state.audioDetails.s
    );
    if (duration > 10) {
      // TODO adjust timer
      this.setState({tickTime: Math.max(Math.floor((duration / 10) * 1000), 10000)});
    }
    console.log(this.state.tickTime);

    this.setState({
      isRecording: false,
      uploadingProgress: 1,
      isUploading: true
    });

    this.uploadingTimer = setTimeout(this.uploadingTick, 300);
    const response = await fileUpload({fileName: file.name}, authToken);

    axios({
      method: 'PUT',
      url: response.data.data.data.uploadURL,
      data: file,
      headers: {'Content-Type': 'multipart/form-data'},
      timeout: 500000
    }).then(async res => {
      this.setState({
        uploadingProgress: 99
      });
      clearTimeout(this.uploadingTimer);

      this.setState({
        isUploading: false,
        uploadedFileName: file.name
      });

      const {
        actions: {updateRenderData}
      } = this.props;
      updateRenderData({audioKey: response.data.data.data.resultKey});
    });
  }
  handleRest() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    this.setState({audioDetails: reset});
  }

  renderContent() {
    const {
      message,
      curMessageRemainingLen,
      isWaiting,
      voiceId,
      emotionalState,
      isUploading,
      uploadedFileName,
      isRecording
    } = this.state;
    const {renderData, categories} = this.props;

    const pageTitle = categories.find(category => category.method === renderData.method).title;

    if (renderData.method === 'faceswap') {
      const {renderData, avatars} = this.props;
      return (
        <div className="d-flex flex-column flex-fill">
          <h3 className="mt-4 mt-md-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mb-sm-4 mx-3 font-weight-semi-bold text-center">
            {pageTitle}
          </h3>
          <div className="w-100 px-5 px-md-4">
            {(renderData.mode === 'user-generated' || renderData.mode === 'tokenized') &&
              renderData.inventoryId !== '' && (
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
        </div>
      );
    } else if (renderData.method === 'voice2video') {
      return (
        <div className="d-flex flex-column flex-fill">
          <h3 className="mt-4 mt-md-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mb-sm-4 mx-3 font-weight-semi-bold text-center">
            {pageTitle}
          </h3>
          <label className="gray-color mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 text-center mb-5">
            Create an awesome Video by uploading your recorded voice
          </label>
          {!isUploading && !isRecording && (
            <>
              <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-1 font-weight-medium">
                Which emotional state should your AI Avatar have?
              </label>
              <FormControl variant="outlined" className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3">
                <Select
                  labelId="avatar-emotional-state-id"
                  id="avatar-emotional-state-id"
                  value={emotionalState}
                  onChange={event => {
                    if (EMOTIONAL_STATES.find(st => st.name === event.target.value).available) {
                      this.setState({emotionalState: event.target.value});
                    } else {
                      this.setState({emotionalState: 'neutral'});
                    }
                  }}>
                  {EMOTIONAL_STATES.map((e, n) => (
                    <MenuItem key={n} value={e.name}>
                      {e.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="d-flex flex-fill flex-column align-items-center">
                {!isEmpty(uploadedFileName) && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-1 mx-3"
                      component="label"
                      disabled={true}>
                      {uploadedFileName}
                    </Button>
                    <div className="d-flex flex-row mb-4 align-items-top">
                      <label className="font-tiny disabled text-success">Uploaded Successfully</label>
                    </div>
                  </>
                )}
                <Button
                  variant={isEmpty(uploadedFileName) ? 'contained' : 'outlined'}
                  color={isEmpty(uploadedFileName) ? 'primary' : 'secondary'}
                  className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3"
                  component="label"
                  disabled={this.state.isWaiting}>
                  {isEmpty(uploadedFileName) ? 'Upload audio' : 'Upload another audio'}
                  <input
                    type="file"
                    className="d-none"
                    accept=".mp3,.wav"
                    id="fileUpload"
                    onChange={e => {
                      this.handleUploadAudio(e.target.files[0]);
                    }}
                  />
                </Button>
                <div className="d-flex flex-row mb-4 align-items-top">
                  <ReactSVG src={require('../../assets/warning.svg')} />
                  <label className="font-tiny disabled mb-0 ml-1">
                    Maximum audio length: <b className="text-white">30 seconds</b>
                    <br />
                    Allowed formats: <b className="text-white">.mp3</b> or <b className="text-white">.wav</b>
                  </label>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3"
                  component="label"
                  disabled={this.state.isWaiting}
                  onClick={() => {
                    this.setState({isRecording: true});
                  }}>
                  Record
                </Button>
              </div>
            </>
          )}
          {!isUploading && isRecording && (
            <div style={{textAlign: 'center'}}>
              <Recorder
                record={true}
                title={'New recording'}
                audioURL={this.state.audioDetails.url}
                showUIAudio
                handleAudioStop={data => this.handleAudioStop(data)}
                handleOnChange={value => this.handleOnChange(value, 'firstname')}
                handleAudioUpload={data => this.handleAudioUpload(data)}
                handleRest={() => this.handleRest()}
              />
              <Button
                variant="contained"
                color="primary"
                className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3"
                component="label"
                disabled={this.state.isWaiting}
                onClick={() => {
                  this.setState({isRecording: false});
                }}>
                Cancel
              </Button>
            </div>
          )}
          {isUploading && this.renderUploadingProgressBar()}
        </div>
      );
    } else {
      return (
        <div className="d-flex flex-column flex-fill">
          <h3 className="mt-4 mt-md-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mb-sm-4 mx-3 font-weight-semi-bold text-center">
            {pageTitle}
          </h3>
          <Hidden xsDown>
            <label className="gray-color mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 text-center mb-5">
              Write a personalized message below and get a video output featuring your favorite AI Avatar speaking the
              lines!
            </label>
          </Hidden>
          <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-1 font-weight-medium">
            Which language should your AI Avatar speak?
          </label>
          <FormControl variant="outlined" className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3">
            <Select
              labelId="avatar-language-label-id"
              id="avatar-language-id"
              value={voiceId}
              onChange={event => this.setState({voiceId: event.target.value})}>
              {VOICES.map((e, n) => (
                <MenuItem value={n}>{e.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-1 font-weight-medium">
            Which emotional state should your AI Avatar have?
          </label>
          <FormControl variant="outlined" className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3">
            <Select
              labelId="avatar-emotional-state-id"
              id="avatar-emotional-state-id"
              value={emotionalState}
              onChange={event => {
                if (EMOTIONAL_STATES.find(st => st.name === event.target.value).available) {
                  this.setState({emotionalState: event.target.value});
                } else {
                  this.setState({emotionalState: 'neutral'});
                }
              }}>
              {EMOTIONAL_STATES.map((e, n) => (
                <MenuItem key={n} value={e.name}>
                  {e.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-1 font-weight-medium">
            Please write your personalized video message below.
          </label>
          <TextField
            id="message-input"
            variant="outlined"
            className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-1 mx-3"
            value={message}
            multiline
            rows={5}
            disabled={isWaiting}
            onChange={this.messageInput}
            placeholder="You can write in English, or the language you picked."
            inputProps={{maxLength: MAX_MESSAGE_CHARS}}
          />
          <div className="d-flex mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 mb-3 mb-sm-4 flex-row mb-4 align-items-center">
            <ReactSVG src={require('../../assets/warning.svg')} />
            <label className="font-tiny disabled mb-0 ml-1">{curMessageRemainingLen} characters remained</label>
          </div>
        </div>
      );
    }
  }

  renderUploadingProgressBar() {
    const {uploadingProgress} = this.state;
    return (
      <div className="mx-3">
        <div className="d-flex flex-row mt-3 mb-1 justify-content-center align-items-center">
          <label className="font-tiny disabled">Estimated Time: 1-3 Mins</label>
        </div>
        <div className="d-flex progress-container w-100 mt-1 mb-3 justify-content-center align-items-center">
          <Progress value={uploadingProgress} className="w-100" barClassName="bar-progress white-color" />
        </div>
        <div className="d-flex flex-fill align-items-center">
          <label className="font-tiny disabled m-auto">Uploading ...</label>
        </div>
      </div>
    );
  }

  renderProgressBar() {
    const {progress, statusMessage} = this.state;
    return (
      <div className="mx-3">
        <div className="d-flex flex-row mt-0 mb-1 justify-content-center align-items-center">
          {/* <label className="font-tiny disabled">Estimated Time: 1-3 Mins</label> */}
          {/* <div className="d-flex flex-fill align-items-center"> */}
          <label className="font-tiny disabled m-auto text-center">{statusMessage}</label>
          {/* </div> */}
        </div>
        <div className="d-flex progress-container w-100 mt-1 mb-1 justify-content-center align-items-center">
          <Progress value={progress} className="w-100" barClassName="bar-progress white-color">
            {progress}%
          </Progress>
        </div>
      </div>
    );
  }

  renderMain(isMobile) {
    const {renderData} = this.props;
    const {selectedTargetVideo} = this.state;

    if (renderData.method !== 'faceswap') {
      return isMobile ? (
        <></>
      ) : (
        <img src={require('../../assets/hello_world.png')} className="w-100 h-100 object-fit" alt="img-hello-world" />
      );
    }

    if (!isMobile) {
      return (
        <PerfectScrollbar className="d-flex flex-column flex-fill align-items-center">
          <div className="row mt-4 mx-2 w-100">
            {FACESWAP_TARGET_VIDEOS.map((e, n) => (
              <div key={n} className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <ResourceItem
                  onClick={() => this.setState({selectedTargetVideo: e})}
                  isActive={selectedTargetVideo === null ? null : selectedTargetVideo === e}
                  name={e.name}
                  src={e.videoSrc}
                  type="video"
                />
              </div>
            ))}
          </div>
        </PerfectScrollbar>
      );
    } else {
      return (
        <SwipeableViews enableMouseEvents slideClassName="px-2" style={{paddingRight: 32, paddingLeft: 32}}>
          {FACESWAP_TARGET_VIDEOS.map((e, n) => (
            <div key={n} className="col-xl-4 col-lg-6 col-md-12 mb-4">
              <ResourceItem
                onClick={() => this.setState({selectedTargetVideo: e})}
                isActive={selectedTargetVideo === null ? null : selectedTargetVideo === e}
                name={e.name}
                src={e.videoSrc}
                type="video"
              />
            </div>
          ))}
        </SwipeableViews>
      );
    }
  }

  render() {
    const {message, isWaiting, uploadedFileName, error, selectedTargetVideo} = this.state;
    const {
      actions: {handleClose}
    } = this.props;
    const f1 = isEmpty(message);
    const f2 = isEmpty(uploadedFileName);
    const f3 = isEmpty(selectedTargetVideo);
    return (
      <div className="vh-100">
        <Hidden xsDown>
          <div className="row p-0 m-0">
            <div className="col-12 col-xl-3 col-lg-4 col-md-5 vh-100 p-0 splitter">
              <PerfectScrollbar className="d-flex flex-column pt-5">
                {this.renderContent()}
                {isWaiting ? (
                  this.renderProgressBar()
                ) : (
                  <Button
                    variant="contained"
                    disabled={f1 && f2 && f3}
                    color="primary"
                    className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mx-3 my-5"
                    onClick={this.generate.bind(this)}>
                    Generate
                  </Button>
                )}
              </PerfectScrollbar>
            </div>
            <div className="col-12 col-xl-9 col-lg-8 col-md-7 vh-max-100 overflow-hidden p-0">
              {this.renderMain(false)}
              <AuthWidget />
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className="d-flex flex-fill flex-row">
            <div className="d-flex vh-100 flex-column w-100">
              <PerfectScrollbar className="d-flex flex-fill flex-column w-100">
                <div className="w-75 m-auto">{this.renderContent()}</div>
                {this.renderMain(true)}
              </PerfectScrollbar>
              <div className="bottom-stepper flex-column">
                {isWaiting ? (
                  this.renderProgressBar()
                ) : (
                  <Button
                    variant="contained"
                    disabled={f1 && f2 && f3}
                    color="primary"
                    className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mx-3 my-3"
                    onClick={this.generate.bind(this)}>
                    Generate
                  </Button>
                )}
                <AuthWidget />
              </div>
            </div>
          </div>
        </Hidden>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({error: ''});
            handleClose();
          }}>
          <Alert onClose={() => handleClose()} severity="success">
            {error}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  renderData: state.rootReducer.renderData,
  currentUser: state.rootReducer.currentUser,
  currentJob: state.rootReducer.currentJob,
  avatars: state.rootReducer.avatars,
  categories: state.rootReducer.categories,
  errors: state.rootReducer.errors
});

const mapDispatchToProps = dispatch => ({
  actions: {
    openSignUp: () => {
      dispatch(openSignUpModal());
    },
    createJob: renderData => {
      dispatch(createJob(renderData));
    },
    getJob: id => {
      dispatch(getJob(id));
    },
    updateRenderData: renderData => {
      dispatch(updateRenderData(renderData));
    },
    handleClose: () => {
      dispatch(closeMessageSnack());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeVideo);
