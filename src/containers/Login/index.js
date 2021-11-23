import React, {Component} from 'react';
import './styles.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LoginWidget from '../../components/LoginWidget';

export default class Login extends Component {
  render() {
    return (
      <div className="vh-100 d-flex flex-column align-items-center">
        <PerfectScrollbar className="vh-100">
          <LoginWidget />
        </PerfectScrollbar>
      </div>
    );
  }
}
