import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DataGrid} from '@material-ui/data-grid';
import {Link, Box} from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import {getAllJobs} from '../../services/http_client';
import moment from 'moment';
import {isEmpty} from 'lodash';

const columns = [
  {field: 'id', headerName: 'Id', width: 320, hide: true},
  {
    field: 'date',
    headerName: 'Date',
    width: 180,
    valueGetter: params => moment(params.getValue('date')).format('YYYY-MM-DD hh:mm:ss')
  },
  {field: 'email', headerName: 'Email', width: 240},
  {field: 'mode', headerName: 'Mode', width: 180},
  {field: 'method', headerName: 'Method', width: 180},
  {field: 'status', headerName: 'Status', width: 120},
  {
    field: 'audioKey',
    headerName: 'Audio',
    width: 100,
    renderCell: params =>
      !isEmpty(params.getValue('audioKey')) && (
        <Link target="_blank" href={'https://d2iia7yeg2usc9.cloudfront.net/' + params.getValue('audioKey')}>
          Audio
        </Link>
      )
  },
  {
    field: 'videoKey',
    headerName: 'Video',
    width: 100,
    renderCell: params =>
      !isEmpty(params.getValue('videoKey')) && (
        <Link target="_blank" href={'https://d2iia7yeg2usc9.cloudfront.net/' + params.getValue('videoKey')}>
          Video
        </Link>
      )
  },
  {
    field: 'resultKey',
    headerName: 'Result',
    width: 100,
    renderCell: params =>
      !isEmpty(params.getValue('resultKey')) && (
        <Link target="_blank" href={'https://d2iia7yeg2usc9.cloudfront.net/' + params.getValue('resultKey')}>
          Result
        </Link>
      )
  },
  {
    field: 'text',
    headerName: 'Text',
    width: 300,
    renderCell: params => !isEmpty(params.getValue('text')) && <Box>{params.getValue('text')}</Box>
  }
];

class Jobs extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      jobs: []
    };
  }

  async componentDidMount() {
    const {authToken} = this.props;
    const response = await getAllJobs(authToken);
    if (response.data.data.success) {
      const jobs = response.data.data.data.jobs;
      this.setState({
        jobs: jobs.map(j => {
          return {
            id: j.id,
            date: j.date,
            email: j.email,
            mode: j.renderData.mode,
            status: j.renderData.status,
            audioKey: j.renderData.audioKey,
            videoKey: j.renderData.videoKey,
            resultKey: j.renderData.resultKey,
            text: j.renderData.text
          };
        })
      });
    }
  }

  render() {
    return (
      <div className="d-flex flex-fill h-100 p-3 flex-column">
        {/* <div>
          <Button color="primary" variant="contained" className="my-3">
            Create
          </Button>
        </div> */}
        <div className="flex-fill">
          <div className="w-100 h-100">
            <DataGrid rows={this.state.jobs} columns={columns} pageSize={10} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken
});

const mapDispatchToProps = dispatch => ({
  actions: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
