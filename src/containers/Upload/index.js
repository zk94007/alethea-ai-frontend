import React, {Component} from 'react';
import {ReactSVG} from 'react-svg';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Button from '@material-ui/core/Button';
import {Hidden} from '@material-ui/core';
import history from '../../routes/history';
import Dropzone from 'react-dropzone';
import './styles.scss';

export default class Upload extends Component {
  render() {
    return (
      <div className="vh-100">
        <PerfectScrollbar>
          <div className="row p-0 m-0">
            <div className="col-md-3 vh-100 p-0 splitter">
              <PerfectScrollbar className="d-flex flex-column">
                <ReactSVG src="logo.svg" className="p-0" />
                <h3 className="mt-3 mx-5 mb-4">Upload Image</h3>
                <h5 className="gray-color mx-5 mb-4">
                  Upload an image to let us know what your virtual influencer should look like. Please follow the
                  guidelines to ensure the best results.
                </h5>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className="mx-5 mb-5"
                  onClick={() => history.push('/generating')}>
                  Upload
                </Button>
                <h5 className="gray-color mx-5 mt-3 mb-4 font-weight-semi-bold">Or pick one from our inventory</h5>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  className="mx-5 mb-5"
                  onClick={() => history.push('/inventory')}>
                  View inventory
                </Button>
              </PerfectScrollbar>
            </div>
            <Hidden xsDown>
              <div className="d-flex col-md-9 vh-max-100 upload-background overflow-hidden flex-column pt-3 px-4 pb-4">
                <h1 className="font-weight-semi-bold mx-2 mb-4 mt-5">Upload Image</h1>
                <Dropzone>
                  {({getRootProps, getInputProps}) => (
                    <section className="flex-fill image-dropzone d-flex m-2">
                      <div
                        className="d-flex flex-fill flex-column justify-content-center align-items-center"
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <ReactSVG src={require('../../assets/drag_and_drop.svg')} />
                        <h5 className="mt-3 ">
                          <b>Choose a file</b> or drag & drop it here
                        </h5>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </Hidden>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}
