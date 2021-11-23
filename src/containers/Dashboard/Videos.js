import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.scss';
import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {setCurrentJob, deleteJob} from '../redux/actions';
import {Hidden} from '@material-ui/core';
import {isEmpty} from 'lodash';
import VideoItem from '../../components/VideoItem';

class Videos extends Component {
  renderVideos() {
    const {
      jobs,
      actions: {setCurrentJob, deleteJob}
    } = this.props;
    const videos = jobs.filter(j => j?.renderData?.status === 'finished');
    if (isEmpty(videos)) return <h3 className="mx-3 font-weight-semi-bold text-center">No Video</h3>;

    return videos.map((e, index) => {
      return (
        !isEmpty(e?.renderData) && (
          <VideoItem
            onPlay={() => {
              setCurrentJob(e);
              this.props.changeTabs(0);
            }}
            onDelete={event => {
              event.stopPropagation();
              deleteJob(e.id);
            }}
            key={index}
            index={e.id}
            src={'https://d2iia7yeg2usc9.cloudfront.net/' + e.renderData?.resultKey}
            publicId={e.renderData?.publicId}
          />
        )
      );
    });
  }

  render() {
    return (
      <div className="flex-fill h-100 p-3 p-md-0">
        <Hidden xsDown>
          <PerfectScrollbar>
            <div className="overflow-hidden-x">
              <div className="row">{this.renderVideos()}</div>
            </div>
          </PerfectScrollbar>
        </Hidden>
        <Hidden smUp>
          <PerfectScrollbar>
            <div className="overflow-hidden-x">
              <div className="row">{this.renderVideos()}</div>
            </div>
          </PerfectScrollbar>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  jobs: state.rootReducer.jobs,
  currentJob: state.rootReducer.currentJob
});

const mapDispatchToProps = dispatch => ({
  actions: {
    setCurrentJob: job => {
      dispatch(setCurrentJob(job));
    },
    deleteJob: id => {
      dispatch(deleteJob(id));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
