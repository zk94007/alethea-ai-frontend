import React, {Component} from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.scss';
import {connect} from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import {BitlyClient} from 'bitly';
import {Video} from 'cloudinary-react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import fileDownload from 'react-file-download';
import * as MobileDetect from 'mobile-detect';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';

class CurrentWatching extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      url: '',
      cld: undefined,
      iPhone: false
    };

    this.linkRef = React.createRef();
  }

  async componentDidMount() {
    const {currentJob} = this.props;

    const BC = new BitlyClient('67e4c038ca0e93561605e41c3423fb93e4c935bf');
    const response = await BC.shorten('https://d2iia7yeg2usc9.cloudfront.net/' + currentJob?.renderData?.resultKey);
    const url = response.link;

    const md = new MobileDetect(window.navigator.userAgent);

    this.setState({
      url,
      iPhone: md.is('iPhone')
    });
  }

  download(url, filename) {
    axios
      .get(url, {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, filename);
      });
  }

  renderSocialButton(url) {
    const {currentJob} = this.props;

    return (
      <div className="d-flex flex-row mt-3 mx-2 mx-md-0 flex-wrap justify-content-start">
        {!this.state.iPhone && (
          <Button
            variant="contained"
            color="primary"
            className="m-2"
            component="span"
            onClick={() => {
              this.download(
                `https://wav2lip.s3.us-east-2.amazonaws.com/${currentJob?.renderData?.resultKey}`,
                'alethea.mp4'
              );
            }}>
            Download
          </Button>
        )}
        <TwitterShareButton
          url={url}
          title={'This Video features an AI Avatar built by Alethea.ai, check it out :'}
          className="m-2">
          <TwitterIcon size={48} className="rounded" />
        </TwitterShareButton>
        <FacebookShareButton
          url={url}
          title={'This Video features an AI Avatar built by Alethea.ai, check it out :'}
          className="m-2">
          <FacebookIcon size={48} className="rounded" />
        </FacebookShareButton>
        <TelegramShareButton
          url={url}
          title={'This Video features an AI Avatar built by Alethea.ai, check it out :'}
          className="m-2">
          <TelegramIcon size={48} className="rounded" />
        </TelegramShareButton>
        <div
          onClick={() => {
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `https://player.cloudinary.com/embed/?cloud_name=alethea&public_id=${currentJob?.renderData?.publicId}&fluid=true&controls=true&source_types%5B0%5D=mp4`
              )}&title=${encodeURIComponent(
                'This Video features an AI Avatar built by Alethea.ai, check it out :'
              )}&source=${encodeURIComponent('https://www.alethea.ai')}`,
              '_blank',
              'location=yes,height=570,width=520,scrollbars=yes,status=yes'
            );
          }}
          className="m-2">
          <LinkedinIcon size={48} className="rounded" />
        </div>
        <WhatsappShareButton
          url={url}
          title={'This Video features an AI Avatar built by Alethea.ai, check it out :'}
          className="m-2">
          <WhatsappIcon size={48} className="rounded" />
        </WhatsappShareButton>
      </div>
    );
  }

  render() {
    const {currentJob} = this.props;
    const {url} = this.state;

    return (
      <div className="d-flex flex-column mt-3 mt-0 px-3 px-md-0">
        <div className="video-container">
          <div className="video-box" id={currentJob?.renderData?.publicId}>
            {!this.state.iPhone && (
              <Video
                sourceTypes={['mp4', 'mp3']}
                cloudName="alethea"
                publicId={currentJob?.renderData?.publicId}
                width="100%"
                height="100%"
                controls
                controlsList="nodownload"
              />
            )}
            {this.state.iPhone && (
              <Video
                sourceTypes={['mp4', 'mp3']}
                cloudName="alethea"
                publicId={currentJob?.renderData?.publicId}
                width="100%"
                height="100%"
                controls
              />
            )}
          </div>
        </div>
        <Hidden xsDown>{url && this.renderSocialButton(url)}</Hidden>
        <Hidden smUp>
          <div className="d-flex flex-column">{url && this.renderSocialButton(url)}</div>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  currentJob: state.rootReducer.currentJob
});

const mapDispatchToProps = dispatch => ({
  actions: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWatching);
