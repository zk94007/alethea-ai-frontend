import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.scss';
import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import InventoryItem from '../../components/InventoryItem';
import {Hidden} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

const AVATARS = [
  {
    title: 'Steve Jobs',
    imageSrc: 'https://d2iia7yeg2usc9.cloudfront.net/inventory-1.png'
  },
  {
    title: 'Bill Gates',
    imageSrc: 'https://d2iia7yeg2usc9.cloudfront.net/inventory-2.png'
  },
  {
    title: 'Mark Zuckerberg',
    imageSrc: 'https://d2iia7yeg2usc9.cloudfront.net/inventory-3.png'
  }
];

class Avatars extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedAvatar: null
    };
  }

  renderAvatars() {
    const {selectedAvatar} = this.state;
    return AVATARS.map((e, n) => (
      <div key={n} className="col-xl-4 col-lg-6 col-md-12 mb-4">
        <InventoryItem
          onClick={() => this.setState({selectedAvatar: e})}
          key={n}
          index={e}
          isActive={selectedAvatar === null ? null : selectedAvatar === e}
          name={e.title}
          src={e.imageSrc}
        />
      </div>
    ));
  }

  render() {
    return (
      <div className="flex-fill h-100 p-3 p-md-0">
        <Hidden xsDown>
          <PerfectScrollbar className="overflow-hidden-x">
            <div className="overflow-hidden-x">
              <div className="row">{this.renderAvatars()}</div>
            </div>
          </PerfectScrollbar>
        </Hidden>
        <Hidden smUp>
          <SwipeableViews enableMouseEvents slideClassName="px-2">
            {this.renderAvatars()}
          </SwipeableViews>
        </Hidden>
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

export default connect(mapStateToProps, mapDispatchToProps)(Avatars);
