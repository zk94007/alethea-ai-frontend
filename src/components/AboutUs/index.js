import React from 'react';
import './styles.scss';
import {Hidden} from '@material-ui/core';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import ResourceItem from '../ResourceItem';
import {ReactSVG} from 'react-svg';

export default function AboutUs() {
  const renderContent = () => {
    return (
      <>
        <h1 className="font-weight-semi-bold mb-2 mb-md-4 mt-4 text-center text-md-left">About Us</h1>
        <label className="gray-color">
          We enable the creation, sharing, and monetization of trusted synthetic media. We are the originators of the
          iNFT Standard, that embeds OpenAI's state-of-the-art GPT-3 engine into NFTs to create interactive and
          intelligent characters with their own virtual economies and generative outputs.
        </label>
      </>
    );
  };

  const renderPartners = () => {
    return (
      <div className="col-xl-12 col-md-12 mb-4 px-0">
        <div className="w-100 d-flex mt-5">
          <h2>Partners</h2>
        </div>
        <div className="d-flex flex-row w-100 flex-wrap justify-content-between">
          {/* <div className="mx-auto">
            <ReactSVG className="my-3 mx-2" src={require('../../assets/magic_network.svg')} />
          </div> */}
          {/* <div className="mx-auto">
            <ReactSVG className="my-3 mx-2" src={require('../../assets/oasis_lab.svg')} />
          </div> */}
          <div className="mx-auto">
            <img alt="huawei logo" height="60" className="my-3 mx-2" src={require('../../assets/openai.png')} />
          </div>
          <div className="mx-auto">
            <ReactSVG className="my-3 mx-2" src={require('../../assets/nvidia.svg')} />
          </div>
          <div className="mx-auto">
            <img alt="huawei logo" className="my-3 mx-2" src={require('../../assets/huawei.png')} />
          </div>
          {/* <div className="mx-auto">
            <img alt="infocomm logo" className="my-3 mx-2" src={require('../../assets/infocomm.png')} />
          </div> */}
        </div>
      </div>
    );
  };

  // const renderBadges = isMobile => {
  //   return (
  //     <div className={`col-xl-12 col-md-12 mb-4 ${isMobile ? 'text-center' : ''}`}>
  //       <a
  //         href="https://www.producthunt.com/posts/ai-avatars?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-ai-avatars"
  //         target="_blank"
  //         rel="noopener noreferrer">
  //         {/*eslint-disable */}
  //         <img
  //           src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=272830&theme=light&period=daily"
  //           alt="AI Avatars - One image, infinite possibilities. | Product Hunt"
  //           style={{ width: '250px', height: '54px;' }}
  //         />
  //         {/*eslint-enable */}
  //       </a>
  //     </div>
  //   );
  // };

  return (
    <div className="container">
      <Hidden smUp>
        {renderContent()}
        {renderPartners()}
        {/* {renderBadges(true)} */}
      </Hidden>
      <Hidden xsDown>
        <div className="d-flex flex-column mx-md-3">{renderContent()}</div>
        <div className="row my-4 mx-md-3">{renderPartners()}</div>
      </Hidden>
    </div>
  );
}
