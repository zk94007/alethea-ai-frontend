import React, {Component} from 'react';
import './styles.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ResetPasswordWidget from '../../components/ResetPasswordWidget';

export default class ResetPassword extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      match: {
        params: {newPasswordToken}
      }
    } = this.props;

    return (
      <div className="vh-100 d-flex flex-column align-items-center">
        <PerfectScrollbar className="vh-100">
          <ResetPasswordWidget newPasswordToken={newPasswordToken} />
        </PerfectScrollbar>
      </div>
    );
  }
}
