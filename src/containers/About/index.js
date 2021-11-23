import React, {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.scss';
import AuthWidget from '../../components/AuthWidget';
import Footer from '../../components/Footer';
import AboutUs from '../../components/AboutUs';
import TermsService from '../../components/TermsService';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import {Hidden} from '@material-ui/core';

export default class About extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
  }
  renderContent() {
    const {content} = this.state;
    switch (content) {
      case 'tos':
        return <TermsService />;
      case 'pp':
        return <PrivacyPolicy />;
      default:
        return <AboutUs />;
    }
  }

  onClick(content) {
    this.setState({content});
    if (this._fullRef) {
      this._fullRef.scrollTop = 0;
    }
    if (this._containerRef) {
      this._containerRef.scrollTop = 0;
    }
  }

  renderBadges = isMobile => {
    return (
      <div className={`col-xl-12 col-md-12 mt-4 ${isMobile ? 'text-center' : ''}`}>
        <a
          href="https://www.producthunt.com/posts/ai-avatars?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-ai-avatars"
          target="_blank"
          rel="noopener noreferrer"
          className="w-100 text-center d-block">
          {/*eslint-disable */}
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=272830&theme=light&period=daily"
            alt="AI Avatars - One image, infinite possibilities. | Product Hunt"
            style={{width: '200px', height: 'auto;'}}
          />
          {/*eslint-enable */}
        </a>
      </div>
    );
  };

  render() {
    return (
      <PerfectScrollbar containerRef={ref => (this._fullRef = ref)} className="vh-100 row">
        <div className="col-12 col-xl-3 col-lg-4 col-md-5 splitter pr-3 pr-md-0 sm-bg-secondary-dark">
          <div className="m-3 mx-xl-4 mx-md-3 mx-sm-3 d-flex flex-column align-items-center our-mission-section">
            {/*<label className="letter-spacing font-lg text-center mt-md-5">what is</label>*/}
            <h1 className="font-weight-bold xl-font-size text-center mt-md-5">Our Mission</h1>
            <h5 className="text-left gray-color our-mission-desc mt-0 mt-md-4">
              We will enable a metaverse of millions of intelligent and interactive characters to emerge, with their own
              thriving economics.
            </h5>
            <div className="badge-img mt-auto">{this.renderBadges()}</div>
          </div>
        </div>
        <div className="d-flex col-12 col-xl-9 col-lg-8 col-md-7 d-flex flex-column pl-md-0">
          <Hidden smUp>
            {this.renderContent()}
            <div className="row mt-auto bg-secondary-dark align-items-center py-4 mx-auto">
              <Footer onClick={content => this.onClick(content)} />
            </div>
            <AuthWidget />
          </Hidden>
          <Hidden xsDown>
            <PerfectScrollbar
              containerRef={ref => (this._containerRef = ref)}
              className="w-100 vh-max-100 d-flex flex-column justify-content-between">
              {this.renderContent()}
              <div className="row mt-auto bg-secondary-dark align-items-center py-4 w-100 mx-auto">
                <Footer onClick={content => this.onClick(content)} />
              </div>
            </PerfectScrollbar>
          </Hidden>
        </div>
      </PerfectScrollbar>
    );
  }
}
