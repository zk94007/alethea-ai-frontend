import React, {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Hidden} from '@material-ui/core';
import './styles.scss';
import ResourceItem from '../../components/ResourceItem';
import Footer from '../../components/Footer';

import TermsService from '../../components/TermsService';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import AuthWidget from '../../components/AuthWidget';

const RESOURCES = [
  // {
  //   name: 'Light Paper',
  //   imageSrc: require('../../assets/light_paper.jpg'),
  //   link: 'https://docs.google.com/presentation/d/1XBGrCPKXt-Et-rj_PMCZPZ6v1ChrtioTEoXP-dN-r2g/edit?usp=sharing'
  // },
  {
    name: 'Zima Red',
    imageSrc: require('../../assets/zima_red.jpg'),
    link: 'https://andrewsteinwold.substack.com/p/ai-nfts-what-is-an-inft-'
  },
  {
    name: 'VentureBeat',
    imageSrc: require('../../assets/venture_beat.jpeg'),
    link: 'https://venturebeat.com/2020/10/27/alethea-ai-makes-it-easy-to-create-ai-avatars-from-a-single-photo/'
  },
  {
    name: 'Future Today Institute',
    imageSrc: require('../../assets/institude.png'),
    link: 'https://mailchi.mp/futuretodayinstitute/synthetic-marketplaces'
  },
  {
    name: 'Recode',
    imageSrc: require('../../assets/recode.png'),
    link:
      'https://www.vox.com/recode/2020/6/29/21303588/deepfakes-anonymous-artificial-intelligence-welcome-to-chechnya'
  },
  {
    name: 'CoinDesk',
    imageSrc: require('../../assets/coin_desk.png'),
    link: 'https://www.coindesk.com/ai-startup-pilots-digital-masks-that-counter-facial-recognition'
  },
  {
    name: 'The Generative Age',
    imageSrc: require('../../assets/generative-age.png'),
    link: 'https://arr.am/2020/09/15/the-generative-age/'
  }
];

export default class About extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: null,
      content: ''
    };
  }

  renderContent() {
    const {content} = this.state;
    switch (content) {
      case 'tos':
        return <TermsService onClose={() => this.setState({content: ''})} />;
      case 'pp':
        return <PrivacyPolicy onClose={() => this.setState({content: ''})} />;
      default:
        return null;
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

  renderScroll() {
    const {selectedIndex} = this.state;
    return (
      <div>
        <div className="row mx-2">
          {RESOURCES.map((e, n) => (
            <div key={n} className="col-xl-4 col-lg-6 col-md-12 mb-4">
              <ResourceItem
                onClick={() => window.open(e.link)}
                isActive={selectedIndex === null ? null : selectedIndex === e}
                name={e.name}
                src={e.imageSrc}
                type="image"
              />
            </div>
          ))}
        </div>
        <Hidden smUp>
          <div className="row mt-auto bg-secondary-dark align-items-center py-4 mx-auto">
            <Footer onClick={content => this.onClick(content)} />
          </div>
        </Hidden>
      </div>
    );
  }

  render() {
    // const {selectedIndex} = this.state;
    return (
      <div className="vh-100">
        <div className="row p-0 m-0">
          <div className="col-xl-3 col-lg-4 col-md-5 vh-100 p-0 splitter d-flex">
            <PerfectScrollbar className="d-flex flex-column flex-fill align-items-center">
              <h3 className="pt-3 mt-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-0 mb-md-4">About Us</h3>
              <h5 className="text-center gray-color mx-4 my-3">
                We will enable a metaverse of millions of intelligent and interactive characters to emerge, with their
                own thriving economics.
              </h5>
              <Hidden smUp>
                <div className="h-100">{this.renderScroll()}</div>
                {this.renderContent()}
                <AuthWidget />
              </Hidden>
            </PerfectScrollbar>
          </div>
          <Hidden xsDown>
            <div className="d-flex col-xl-9 col-lg-8 col-md-7 vh-max-100 overflow-hidden flex-column p-0">
              <PerfectScrollbar
                containerRef={ref => (this._containerRef = ref)}
                className="w-100 vh-max-100 d-flex flex-column justify-content-between">
                {this.renderContent()}
                <PerfectScrollbar className="flex-fill pt-3">{this.renderScroll()}</PerfectScrollbar>
                <div className="row mt-auto bg-secondary-dark align-items-center w-100 mx-auto">
                  <Footer onClick={content => this.onClick(content)} />
                </div>
                <AuthWidget />
              </PerfectScrollbar>
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}
