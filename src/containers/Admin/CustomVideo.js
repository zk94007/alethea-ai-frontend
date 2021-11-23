import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Progress} from 'reactstrap';
import {fileUpload} from '../../services/http_client';
import {createJob, getJob} from '../redux/actions';
import axios from 'axios';
import {isEqual} from 'lodash';
import history from '../../routes/history';

class CustomVideo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isWaiting: false,
      isRendering: false,
      progress: 1,
      statusMessage: '',
      videoKey: '',
      uploadedVideoFile: '',
      audioKey: '',
      uploadedAudioFile: ''
    };
  }

  async handleUploadVideo(file) {
    const {authToken} = this.props;

    this.setState({
      progress: 1,
      isWaiting: true
    });

    this.timer = setTimeout(this.tick, 1000);
    const response = await fileUpload({fileName: file.name}, authToken);

    axios({
      method: 'PUT',
      url: response.data.data.data.uploadURL,
      data: file,
      headers: {'Content-Type': 'multipart/form-data'},
      timeout: 500000
    }).then(async res => {
      clearTimeout(this.timer);

      this.setState({
        isWaiting: false,
        videoKey: response.data.data.data.resultKey,
        uploadedVideoFile: file.name
      });
    });
  }

  async handleUploadAudio(file) {
    const {authToken} = this.props;

    this.setState({
      progress: 1,
      isWaiting: true
    });

    this.timer = setTimeout(this.tick, 1000);
    const response = await fileUpload({fileName: file.name}, authToken);

    axios({
      method: 'PUT',
      url: response.data.data.data.uploadURL,
      data: file,
      headers: {'Content-Type': 'multipart/form-data'},
      timeout: 500000
    }).then(async res => {
      clearTimeout(this.timer);

      this.setState({
        isWaiting: false,
        audioKey: response.data.data.data.resultKey,
        uploadedAudioFile: file.name
      });
    });
  }

  tick = () => {
    const {
      currentJob,
      actions: {getJob}
    } = this.props;
    const {isRendering} = this.state;
    isRendering && getJob(currentJob.id);
    this.timer = setTimeout(this.tick, 1000);
    this.setState({
      progress: Math.min(this.state.progress + 1, 99)
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.uploadingTimer);
  }

  renderVideoUpload() {
    const {isWaiting, uploadedVideoFile} = this.state;
    if (uploadedVideoFile !== '') return <h3 style={{textAlign: 'center'}}>{uploadedVideoFile}</h3>;

    return (
      <Button
        variant={'contained'}
        color={'primary'}
        className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3"
        component="label"
        disabled={isWaiting}>
        Upload video
        <input
          type="file"
          className="d-none"
          accept=".mp4"
          id="fileUploadVideo"
          onChange={e => {
            this.handleUploadVideo(e.target.files[0]);
          }}
        />
      </Button>
    );
  }

  renderAudioUpload() {
    const {isWaiting, uploadedAudioFile} = this.state;
    if (uploadedAudioFile !== '') return <h3 style={{textAlign: 'center'}}>{uploadedAudioFile}</h3>;

    return (
      <Button
        variant={'contained'}
        color={'primary'}
        className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4 mx-3"
        component="label"
        disabled={isWaiting}>
        Upload audio
        <input
          type="file"
          className="d-none"
          accept=".mp3,.wav"
          id="fileUploadAudio"
          onChange={e => {
            this.handleUploadAudio(e.target.files[0]);
          }}
        />
      </Button>
    );
  }

  renderProgressBar() {
    const {progress, statusMessage} = this.state;
    return (
      <div className="mx-3">
        <div className="d-flex flex-row mt-0 mb-1 justify-content-center align-items-center">
          <label className="font-tiny disabled m-auto text-center">{statusMessage}</label>
        </div>
        <div className="d-flex progress-container w-100 mt-1 mb-1 justify-content-center align-items-center">
          <Progress value={progress} className="w-100" barClassName="bar-progress white-color">
            {progress}%
          </Progress>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.currentJob, prevProps.currentJob)) {
      if (this.props.currentJob?.id !== prevProps.currentJob?.id) {
        this.timer = setTimeout(this.tick, this.state.tickTime);
      }
      if (this.props.currentJob?.renderData?.status !== prevProps.currentJob?.renderData?.status) {
        if (
          this.props.currentJob?.renderData?.status === 'finished' ||
          this.props.currentJob?.renderData?.status === 'failed'
        ) {
          history.push('/dashboard');
        }
        if (this.props.currentJob?.renderData?.status === 'in_progress') {
          this.setState({
            isPending: false,
            statusMessage: 'Creating video... estimated time: 2-3 min'
          });
        }
      }
    }
  }

  generate() {
    const {audioKey, videoKey} = this.state;
    const {
      actions: {createJob}
    } = this.props;

    createJob({
      mode: 'custom-video',
      method: 'voice2video',
      audioKey,
      videoKey
    });

    this.setState({
      isWaiting: true,
      isRendering: true,
      progress: 1,
      statusMessage: 'Your request is submitted sucessfully...'
    });
  }

  render() {
    const {isWaiting, uploadedVideoFile, uploadedAudioFile} = this.state;
    return (
      <div className="vh-100">
        <div className="row p-0 m-0">
          <div className="col-12 vh-100 p-0 splitter">
            <PerfectScrollbar className="d-flex flex-column pt-5">
              {this.renderVideoUpload()}
              {this.renderAudioUpload()}
              {isWaiting ? (
                this.renderProgressBar()
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={uploadedVideoFile === '' || uploadedAudioFile === ''}
                  className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mx-3 my-5"
                  onClick={this.generate.bind(this)}>
                  Generate
                </Button>
              )}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  currentJob: state.rootReducer.currentJob
});

const mapDispatchToProps = dispatch => ({
  actions: {
    createJob: renderData => {
      dispatch(createJob(renderData));
    },
    getJob: id => {
      dispatch(getJob(id));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomVideo);
