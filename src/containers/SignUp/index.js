import React, {Component} from 'react';
import './styles.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SignUpWidget from '../../components/SignUpWidget';

export default class SignUp extends Component {
  render() {
    return (
      <div className="vh-100 d-flex flex-column align-items-center">
        <PerfectScrollbar className="vh-100">
          <SignUpWidget />
        </PerfectScrollbar>
      </div>
    );
  }
}
