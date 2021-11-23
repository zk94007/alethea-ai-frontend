import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DataGrid} from '@material-ui/data-grid';
import {getAllUsers, blockUser, unblockUser} from '../../services/http_client';
import moment from 'moment';
import {TextField, IconButton} from '@material-ui/core';
import {Block as BlockIcon, CheckCircleOutline as CheckCircleOutlineIcon} from '@material-ui/icons';

class Users extends Component {
  constructor(props, context) {
    super(props, context);

    this.users = [];

    this.columns = [
      {field: 'id', headerName: 'Id', width: 90, hide: true},
      {field: 'email', headerName: 'Email', width: 320},
      {
        field: 'date',
        headerName: 'Registration Date',
        width: 180,
        valueGetter: params => moment(params.getValue('date')).format('YYYY-MM-DD hh:mm:ss')
      },
      {
        field: 'isAdmin',
        headerName: 'Is Admin?',
        type: 'boolean',
        width: 120,
        valueGetter: params => params.getValue('roles').includes('Admin')
      },
      {
        field: 'isVerified',
        headerName: 'Is Verified?',
        type: 'boolean',
        width: 120,
        valueGetter: params => params.getValue('auth').email.valid
      },
      {
        field: 'isBlocked',
        headerName: 'IsBlocked?',
        type: 'booolean',
        width: 120,
        valueGetter: params => params.getValue('roles').filter(role => role !== '').length === 0
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: params => (
          <div className="d-flex flex-row">
            <IconButton aria-label="block">
              <BlockIcon
                fontSize="small"
                color="secondary"
                onClick={() => {
                  this.blockUser(params.getValue('email'));
                }}
              />
            </IconButton>
            <IconButton aria-label="unblock">
              <CheckCircleOutlineIcon
                fontSize="small"
                style={{color: '#4caf50'}}
                onClick={() => {
                  this.unblockUser(params.getValue('email'));
                }}
              />
            </IconButton>
          </div>
        )
      }
    ];

    this.state = {
      users: [],
      filter: {
        email: ''
      }
    };
  }

  async blockUser(email) {
    const {authToken} = this.props;
    const response = await blockUser(email, authToken);
    if (response.data.data.success) {
      this.setState({filter: ''});
      await this.fetchUsers();
    }
  }

  async unblockUser(email) {
    const {authToken} = this.props;
    const response = await unblockUser(email, authToken);
    if (response.data.data.success) {
      this.setState({filter: ''});
      await this.fetchUsers();
    }
  }

  async fetchUsers() {
    const {authToken} = this.props;
    const response = await getAllUsers(authToken);
    if (response.data.data.success) {
      this.users = response.data.data.data.users;
      this.setState({users: this.users.map(u => ({...u, id: u._id}))});
    }
  }

  async componentDidMount() {
    await this.fetchUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter.email !== this.state.filter.email) {
      this.setState({
        users: this.users.filter(u => u.email.includes(this.state.filter.email)).map(u => ({...u, id: u._id}))
      });
    }
  }

  handleChangeFilter(e) {
    this.setState({
      filter: {
        email: e.target.value
      }
    });
  }

  render() {
    return (
      <div className="d-flex flex-fill h-100 p-3 flex-column">
        {/* <div>
          <Button color="primary" variant="contained" className="my-3">
            Create
          </Button>
        </div> */}
        <div className="row w-100">
          <div className="col-12 col-lg-6 col-xl-4 d-flex flex-column">
            <label className="font-weight-medium mb-1">Email</label>
            <TextField
              inputProps={{
                autoCapitalize: 'none'
              }}
              id="email-input"
              variant="outlined"
              className="w-100 mb-4"
              value={this.state.filter.email}
              onChange={this.handleChangeFilter.bind(this)}
            />
          </div>
        </div>

        <div className="flex-fill">
          <div className="w-100 h-100">
            <DataGrid rows={this.state.users} columns={this.columns} pageSize={10} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
