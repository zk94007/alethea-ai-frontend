import React, {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Button from '@material-ui/core/Button';
import {Hidden} from '@material-ui/core';
import BackgroundVideo from 'react-background-video-player';
import './styles.scss';
// import PageIndicator from "../../components/PageIndicator";
import AuthWidget from '../../components/AuthWidget';
import CookieConsent from 'react-cookie-consent-notification';
// import Countdown from 'react-countdown';
// import CounterBox from '../../components/CounterBox';
import Discord from '../../components/AppBar/components/DiscordIcon';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      hour: 1,
      minute: 0,
      seconds: 0
    };
  }

  renderTitle() {
    return (
      <div className="d-flex flex-column align-items-left">
        <h1 className="font-weight-bold home-subtitle">Welcome to</h1>
        <h1 className="font-weight-bold home-title">Alethea AI</h1>
        <hr className="home-divider gradient-divider" />

        <h1 className="home-description title">Give your NFT superpowers.</h1>
        <h1 className="home-description">
          Create a unique, intelligent, GPT-3 powered and interactive version of your digital asset.
        </h1>
      </div>
    );
  }

  render() {
    return (
      <div className="d-flex vh-100">
        <Hidden xsDown>
          <div className="row p-0 m-0 w-100 position-relative">
            <div className="col-xl-4 col-lg-4 col-md-5 p-0 splitter position-absolute left-panel">
              <PerfectScrollbar className="d-flex vh-100 flex-column align-items-center">
                <div className="my-2 pt-5 px-5">{this.renderTitle()}</div>
                <div className="d-flex justify-content-start align-items-center w-100 px-5 mt-5 mb-3 ">
                  {/* <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className="purchase-button button-outline"
                    onClick={() => window.open('https://medium.com/alethea-ai/what-is-an-inft-8ee4575806b7', '_blank')}>
                    Learn More
                  </Button> */}
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className="purchase-button button-outline ml-3"
                    onClick={() => window.open('https://discord.gg/x2Nj6MGEwN', '_blank')}>
                    <span className="mr-3">
                      <Discord />
                    </span>
                    Join our Discord
                  </Button>
                </div>
              </PerfectScrollbar>
            </div>
            <div className="d-flex col-xl-12 col-lg-12 col-md-12 p-0 vh-100 overflow-hidden">
              <CookieConsent background="#3B4148" color="#CED0EA" buttonText="Allow" buttonColor="#FFF">
                This website uses cookies
              </CookieConsent>
              <BackgroundVideo
                playsInline
                muted
                src={require('../../assets/home_video_2.mp4')}
                containerHeight={500}
                containerWidth={500}
              />
              <div className="d-flex col-xl-8 offset-xl-4 col-lg-8 offset-lg-4 col-md-7 offset-md-5 p-0 vh-100 overflow-hidden">
                <AuthWidget />
              </div>
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className="d-flex flex-column w-100 mobile-layout">
            <div className="d-flex flex-column align-items-center justify-content-end mobile-banner-height position-relative">
              <BackgroundVideo
                playsInline
                muted
                className="w-100 h-100"
                src={require('../../assets/home_video_2.mp4')}
                containerHeight={500}
                containerWidth={500}
              />
              <div className="custom-control pl-0 custom-mb px-4">{this.renderTitle()}</div>
            </div>
            <div className="d-flex justify-content-left align-items-center px-4">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="purchase-button button-outline"
                onClick={() => window.open('https://medium.com/alethea-ai/what-is-an-inft-8ee4575806b7', '_blank')}>
                Learn More
              </Button>
            </div>
            <CookieConsent
              background="#3B4148"
              color="#CED0EA"
              buttonText="Allow"
              buttonColor="#FFF"
              className="cookie-consent">
              This website uses cookies
            </CookieConsent>
            <AuthWidget />
          </div>
        </Hidden>
      </div>
    );
  }
}
