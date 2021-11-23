import React, {Component} from 'react';
import {ReactSVG} from 'react-svg';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Button from '@material-ui/core/Button';
import './styles.scss';
import {Hidden} from '@material-ui/core';
import FinalItem from '../../components/FinalItem';
import history from '../../routes/history';
import {connect} from 'react-redux';

class Hello extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showContent: false
    };
  }

  componentDidMount() {
    this.backListener = history.listen(location => {
      if (location.action === 'POP') {
        // Do your stuff
        if (this.state.showContent) {
          this.setState({showContent: false});
        } else {
        }
      }
    });
  }

  componentWillUnmount() {
    this.backListener();
  }

  renderContent() {
    return (
      <div className="w-100 h-100 row m-0">
        {Array.from(Array(10).keys()).map((e, n) => (
          <div key={n} className="col-xl-3 col-lg-4 col-md-6 mb-3">
            <FinalItem key={n} onClick={() => {}} />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {showContent} = this.state;
    const {renderData} = this.props;
    return (
      <div className="vh-100 d-flex flex-row">
        <div className="d-flex flex-fill flex-column">
          <PerfectScrollbar className="flex-fill">
            <div className="d-flex row p-0 m-0 w-100">
              <Hidden xsDown={showContent}>
                <div className="col-12 col-xl-3 col-lg-4 col-md-5 flex-fill p-0 splitter vh-100 justify-content-between d-flex flex-column">
                  <Hidden xsDown>
                    <ReactSVG
                      src="logo_white.svg"
                      className="logo-max-width p-0 m-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-5"
                    />
                  </Hidden>
                  <div className="m-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5">
                    <div className="side_avatar_container">
                      <video
                        controls
                        className="side_avatar_image object-fit w-100 h-100"
                        src={'https://d2iia7yeg2usc9.cloudfront.net/' + renderData.resultKey}
                      />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="d-flex w-100 mt-auto">
                      <Button
                        variant="contained"
                        color="primary"
                        className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 flex-fill"
                        onClick={() => this.setState({showContent: true})}>
                        TikTok
                      </Button>
                    </div>
                    <div className="d-flex w-100 my-3">
                      <Button
                        variant="contained"
                        color="primary"
                        className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 flex-fill"
                        onClick={() => this.setState({showContent: true})}>
                        Air Drop
                      </Button>
                    </div>
                  </div>
                </div>
              </Hidden>
              <Hidden xsDown={!showContent}>
                <div className="d-flex col-12 col-xl-9 col-lg-8 col-md-7 vh-max-100 overflow-hidden p-0 p-sm-4 d-flex flex-column">
                  <PerfectScrollbar>
                    <h1 className="font-weight-semi-bold mb-2 mb-md-4 mt-4 mt-md-2 text-center text-md-left">TikTok</h1>
                    <Hidden smUp>
                      <h5 className="gray-color text-center mb-4 pb-2">
                        Recreate trending TikTok videos,
                        <br />
                        featuring your favorite stars.
                      </h5>
                    </Hidden>
                    {this.renderContent()}
                  </PerfectScrollbar>
                </div>
              </Hidden>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  renderData: state.rootReducer.renderData
});

export default connect(mapStateToProps, null)(Hello);
