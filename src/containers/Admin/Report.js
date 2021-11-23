import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DataGrid} from '@material-ui/data-grid';
import {Box} from '@material-ui/core';
import {getAllJobs} from '../../services/http_client';
import moment from 'moment';

const columns = [
  {field: 'id', headerName: 'Id', width: 320, hide: true},
  {
    field: 'date',
    headerName: 'Date',
    width: 180,
    valueGetter: params => moment(params.getValue('date')).format('YYYY-MM-DD hh:mm:ss')
  },
  {field: 'name', headerName: 'Name', width: 240},
  {field: 'count', headerName: 'Count', width: 180},
  {
    field: 'imageSrc',
    headerName: 'Image',
    width: 300,
    renderCell: params => {
      return (
        <Box>
          <img src={params.getValue('imageSrc')} style={{width: '50px'}} alt={params.getValue('name')}></img>
        </Box>
      );
    }
  }
];

class Report extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      report: []
    };
  }

  async componentDidMount() {
    const {avatars, authToken} = this.props;
    const response = await getAllJobs(authToken);
    if (response.data.data.success) {
      const jobs = response.data.data.data.jobs;

      this.setState({
        report: (avatars ?? []).map(avatar => ({
          ...avatar,
          count: jobs.filter(
            j =>
              j.renderData.status === 'finished' &&
              j.renderData.inventoryId === avatar.id &&
              j.renderData.mode === avatar.type
          ).length
        }))
      });
    }
  }

  render() {
    return (
      <div className="d-flex flex-fill h-100 p-3 flex-column">
        <div className="flex-fill">
          <div className="w-100 h-100">
            <DataGrid rows={this.state.report} columns={columns} pageSize={10} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  avatars: state.rootReducer.avatars
});

const mapDispatchToProps = dispatch => ({
  actions: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
