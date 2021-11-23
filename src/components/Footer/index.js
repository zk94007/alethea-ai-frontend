import React from 'react';
import './styles.scss';
import {ReactSVG} from 'react-svg';
import {Button, IconButton} from '@material-ui/core';
import RedditIcon from '@material-ui/icons/Reddit';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Footer({onClick}) {
  return (
    <>
      <div className="col-12 col-xl-3 my-2 d-flex justify-content-center">
        <Button
          variant="contained"
          color="primary"
          className="community-button"
          onClick={() => window.open('https://t.me/alethea_ai')}>
          Join our community
        </Button>
      </div>
      <div className="col-12 col-xl-6 justify-content-center align-items-center">
        <div className="row">
          <div className="col-12 col-xl-3 col-lg-6 d-flex justify-content-center px-1">
            <Button size="small" className="p-0" onClick={() => window.open('mailto:info@alethea.ai')}>
              Contact
            </Button>
          </div>
          <div className="col-12 col-xl-3 col-lg-6 d-flex justify-content-center px-1">
            <Button size="small" className="p-0" onClick={() => onClick('pp')}>
              Privacy Policy
            </Button>
          </div>
          <div className="col-12 col-xl-3 col-lg-6 d-flex justify-content-center px-1">
            <Button size="small" className="p-0" onClick={() => onClick('tos')}>
              Terms of Service
            </Button>
          </div>
          <div className="col-12 col-xl-3 col-lg-6 d-flex justify-content-center px-1">
            <Button size="small" className="p-0" onClick={() => onClick('tos')}>
              Disclaimer
            </Button>
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-3 d-flex my-2 flex-column align-items-center">
        <div className="d-flex flex-row justify-content-center">
          <IconButton onClick={() => window.open('https://www.reddit.com/r/Alethea/')}>
            <RedditIcon />
          </IconButton>
          <IconButton onClick={() => window.open('https://medium.com/alethea-ai')}>
            <ReactSVG src={require('../../assets/medium.svg')} />
          </IconButton>
          <IconButton onClick={() => window.open('https://twitter.com/real_alethea')}>
            <TwitterIcon />
          </IconButton>
          <IconButton onClick={() => window.open('https://www.youtube.com/channel/UC3WLysYnxlErUeCeXxzVRLA')}>
            <YouTubeIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
