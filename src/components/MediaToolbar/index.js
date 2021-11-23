import React, {useEffect} from 'react';

import turnCamON from '../../assets/video_player/imgs/video-on.svg';
import turnCamOff from '../../assets/video_player/imgs/video-off.svg';
import span1 from '../../assets/video_player/imgs/span1.svg';
import camToolbar from '../../assets/video_player/imgs/camToolbar.svg';
import TurnSoundOffIcon from '../../assets/muted-volume.svg';
import TurnSoundOnIcon from '../../assets/volume.svg';
import TurnSpeakerOffIcon from '../../assets/muted-mic.svg';
import TurnSpeakerOnIcon from '../../assets/mic.svg';
import userVoice from '../../assets/voice-2.svg';
import audioWave from '../../assets/audio_wave.gif';
import micWaves from '../../assets/mic_waves.gif';

import {
  Footer,
  FooterLeftMenu1,
  FooterLeftMenu2,
  FooterLeftMenu3,
  // FooterRightMenu,
  FooterIcon,
  FooterImgSpan,
  //   InfoBar,
  // MobileFooter
} from '../styles';
import {Button, CircularProgress} from '@material-ui/core';
import {useReactMediaRecorder} from 'react-media-recorder';

export const RenderLeftFooterMenu1 = ({sound, toggleSound, isMuted}) => (
  <FooterLeftMenu1
    className={`d-flex justify-content-center align-items-center flex-column mr-1 tool-btn ${
      sound ? 'unmuted' : 'muted'
    }`}
    onClick={toggleSound}
  >
    {isMuted ? (
      <FooterIcon src={TurnSoundOffIcon} alt='turn sound off' />
    ) : (
      <FooterIcon src={TurnSoundOnIcon} alt='turn sound on' />
    )}
  </FooterLeftMenu1>
);

export const RenderLeftFooterMenu2 = ({
  micConstraints,
  toggleMute,
  isRecording
}) => {
  return (
    <FooterLeftMenu2
      className={`d-flex justify-content-center align-items-center flex-column mr-1 tool-btn ${
        micConstraints ? 'unmuted' : 'muted'
      }`}
      onClick={() => toggleMute}
    >
      {micConstraints ? (
        <FooterIcon
          src={isRecording ? micWaves : TurnSpeakerOnIcon}
          alt='mute'
          onClick={toggleMute}
        />
      ) : (
        <FooterIcon
          src={TurnSpeakerOffIcon}
          alt='unmute'
          onClick={toggleMute}
        />
      )}
    </FooterLeftMenu2>
  );
};


export const RenderLeftFooterMenu3 = ({camAllowed, toggleCam}) => {
  return (
    <FooterLeftMenu3
      className={`d-flex justify-content-center align-items-center flex-column tool-btn ${
        camAllowed ? 'unmuted' : 'muted'
      }`}
      onClick={toggleCam}
    >
      {camAllowed ? (
        <FooterIcon src={turnCamON} alt='Cam on' onClick={toggleCam} />
      ) : (
        <FooterIcon src={turnCamOff} alt='Cam Off' onClick={toggleCam} />
      )}
    </FooterLeftMenu3>
  );
};

export const BeginMeetingButton = ({
  meetingBegan,
  beginMeeting,
  sound,
  micConstraints,
  loadingIntroductorySpeech
}) => (
  <Button
    variant={meetingBegan ? 'outlined' : 'contained'}
    onClick={beginMeeting}
    className={`${!meetingBegan ? 'meeting-btn' : ''} ml-md-1 ml-0`}
    disabled={
      !sound || !micConstraints || (meetingBegan && loadingIntroductorySpeech)
    }
    endIcon={
      meetingBegan &&
      loadingIntroductorySpeech && <CircularProgress size={16} />
    }
    style={{minWidth: '170px', height: '50px'}}
  >
    {`${meetingBegan ? 'End' : 'Begin'} Meeting`}
  </Button>
);

const ScreenRecorder = ({isUploading, handleStopRecording}) => {
  const {
    status,
    error,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({screen: true, video: true, audio: true});

  useEffect(() => {
    if (mediaBlobUrl) {
      handleStopRecording(mediaBlobUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaBlobUrl]);
  console.log('statusstatus', status, mediaBlobUrl);

  return (
    <>
      {(status === 'recording' || isUploading) && error !== "screen_capturing_unsupported_error" && (
        <Button
          variant='contained'
          className='ml-1'
          onClick={() => stopRecording()}
          style={{
            minWidth: isUploading ? '195px' : '180px',
            height: '50px'
          }}
          disabled={isUploading}
          endIcon={isUploading && <CircularProgress size={16} />}
        >
          Stop Recording
        </Button>
      )}
      {status === 'idle' && error !== "screen_capturing_unsupported_error" && (
        <Button
          variant='contained'
          className='ml-1'
          onClick={() => startRecording()}
          style={{minWidth: '180px', height: '50px'}}
        >
          Start Recording
        </Button>
      )}
    </>
  );
};

export default function MediaToolbar({
  location,
  toggleReactCam,
  isMuted,
  setIsMuted,
  loadingIntroductorySpeech,
  introductoryVideoData,
  playVideo,
  isGettingSpeech,
  speech,
  isRecording,
  isEndOfFreeInteraction,
  sound,
  setSound,
  micConstraints,
  setMicConstraints,
  meetingBegan,
  setMeetingBegan,
  toggleMute,
  toggleSound,
  beginMeeting,
  handleStopRecording,
  isUploading,
  camAllowed,
  toggleCam
}) {

  useEffect(() => {
    const imagesPreload = [
      turnCamON,
      turnCamOff,
      span1,
      camToolbar,
      TurnSoundOnIcon,
      TurnSoundOffIcon,
      TurnSpeakerOnIcon,
      TurnSpeakerOffIcon,
      micWaves
    ];
    imagesPreload.forEach(image => {
      const newImage = new Image();
      newImage.src = image;
      window[image] = newImage;
    });
  }, []);

  useEffect(() => {
    if (!loadingIntroductorySpeech && meetingBegan) {
      playVideo(introductoryVideoData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingIntroductorySpeech]);


  // const _renderLeftFooterMenu3 = () => {
  //   return (
  //     <FooterLeftMenu3
  //       className={`d-flex justify-content-center align-items-center flex-column tool-btn ${
  //         camAllowed ? 'unmuted' : 'muted'
  //       }`}
  //       onClick={toggleCam}
  //     >
  //       {camAllowed ? (
  //         <FooterIcon src={turnCamON} alt='Cam on' onClick={toggleCam} />
  //       ) : (
  //         <FooterIcon src={turnCamOff} alt='Cam Off' onClick={toggleCam} />
  //       )}
  //     </FooterLeftMenu3>
  //   );
  // };

  // const _renderLeftFooterMenu4 = () => {
  //   return (
  //     <FooterLeftMenu2
  //       id='listeningStatus'
  //       className='d-flex justify-content-center align-items-center'
  //     >
  //       <span style={{fontSize: 20, color: 'cornflowerblue'}}>
  //         Listening...
  //       </span>
  //     </FooterLeftMenu2>
  //   );
  // };

  //   const _renderLeftFooterMenu5 = () => {
  //     return (
  //       <FooterLeftMenu2 className='d-flex justify-content-center align-items-center flex-column'>
  //         <span>Listening...</span>
  //       </FooterLeftMenu2>
  //     );
  //   };

  const _renderCenterFooterMenu = () => {
    return (
      <>
        {micConstraints && sound ? (
          <>
            <div
              className={`script-wrapper mx-0 mx-md-2 ${
                speech.isUser === true
                  ? 'green'
                  : speech.isUser === false
                  ? 'speech-color'
                  : ''
              } ${!micConstraints || !sound || !meetingBegan ? 'd-none' : ''}`}
            >
              <div
                className='text-input align-items-center d-flex justify-content-center'
                id='ResultText'
              >
                {!isRecording && (
                  <>
                    <img
                      src={speech.isUser ? userVoice : audioWave}
                      alt='Voice:'
                      className='mr-2'
                      width='30'
                      height='28'
                    />
                    {speech.isUser ? speech.text : <div className="d-block d-md-none">{speech.text}</div>}
                    {isGettingSpeech && (
                      <CircularProgress size={16} className='ml-1' />
                    )}
                  </>
                )}
                {isRecording && 'Listening...'}
              </div>
            </div>
          </>
        ) : (
          <span className='text-white ml-2'>
            Turn on your
            <FooterImgSpan
              src={TurnSpeakerOnIcon}
              alt={'mic'}
              className={'mx-2'}
              onClick={toggleMute}
            />
            and
            <FooterImgSpan
              src={TurnSoundOnIcon}
              alt={'cam'}
              className={'mx-2'}
              onClick={toggleSound}
            />
          </span>
        )}
      </>
    );
  };

  // const _renderRightFooterMenu = () => {
  //   return (
  //     <FooterRightMenu className='d-flex justify-content-center align-items-end flex-column'>
  //       <span className='align-items-center d-flex rec-btn'>
  //         <span>&#8226; REC</span>
  //       </span>
  //     </FooterRightMenu>
  //   );
  // };

  const _renderFooter = () => {
    return (
      <Footer id='footer' className='mx-auto'>
        <div className='h-100 px-0 d-flex align-items-center media-toolbar'>
          {isEndOfFreeInteraction ? (
            <p className='font-weight-bold mb-0'>End of Free Interactions</p>
          ) : (
            <>
              <div className="d-flex media-toolbar-icons">
                <RenderLeftFooterMenu1
                  sound={sound}
                  toggleSound={toggleSound}
                  isMuted={isMuted}
                />
              <RenderLeftFooterMenu2
                micConstraints={micConstraints}
                toggleMute={toggleMute}
                isRecording={isRecording}
              />

              <RenderLeftFooterMenu3 camAllowed={camAllowed} toggleCam={toggleCam} />
              </div>

              <div className="mr-3 media-toolbar-content">
              {_renderCenterFooterMenu()}
              </div>
             <div className="d-flex media-toolbar-buttons">
             <BeginMeetingButton
                meetingBegan={meetingBegan}
                beginMeeting={beginMeeting}
                sound={sound}
                micConstraints={micConstraints}
                loadingIntroductorySpeech={loadingIntroductorySpeech}
              />
                <div className="screen-recorder">
                <ScreenRecorder
                  isUploading={isUploading}
                  handleStopRecording={handleStopRecording}
                />
                </div>
             </div>
              {/* {(status === 'recording' || isUploading) && (
                <Button
                  variant='contained'
                  className='ml-1'
                  onClick={() => stopRecording()}
                  style={{
                    minWidth: isUploading ? '195px' : '180px',
                    height: '50px'
                  }}
                  disabled={isUploading}
                  endIcon={isUploading && <CircularProgress size={16} />}
                >
                  Stop Recording
                </Button>
              )}
              {status === 'idle' && (
                <Button
                  variant='contained'
                  className='ml-1'
                  onClick={() => startRecording()}
                  style={{minWidth: '180px', height: '50px'}}
                >
                  Start Recording
                </Button>
              )} */}
            </>
          )}
        </div>
      </Footer>
    );
  };

  // const _renderMobileFooter = () => {
  //   return (
  //     <MobileFooter className='d-flex flex-column' id='footer'>
  //       <div className='container-fluid'>
  //         <div className='row'>
  //           <div className='col'>{_renderCenterFooterMenu()}</div>
  //         </div>
  //         <div className='row px-0'>
  //           <div className='col-6'>
  //             <div className='row'>
  //               <div className='col-5 p-0'>
  //                 <RenderLeftFooterMenu1
  //                   sound={sound}
  //                   toggleSound={toggleSound}
  //                   isMuted={isMuted}
  //                 />
  //               </div>
  //               <div className='col-5 p-0'>
  //                 <RenderLeftFooterMenu2
  //                   micConstraints={micConstraints}
  //                   toggleMute={toggleMute}
  //                   isRecording={isRecording}
  //                 />
  //               </div>
  //               <div className='col-5 p-0'><RenderLeftFooterMenu3 camAllowed={camAllowed} toggleCam={toggleCam} /></div>
  //             </div>
  //           </div>
  //           <div className='col-6'>
  //             <div className='row'>
  //               <div
  //                 className='col-12'
  //                 style={{paddingRight: 'calc(11vw - 15px)'}}
  //               >
  //                 {_renderRightFooterMenu()}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </MobileFooter>
  //   );
  // };

  return (
    <div className='w-100 h-100 d-flex flex-column'>
      {/* {width > breakpoint.sm ? _renderFooter() : _renderMobileFooter()} */}
      {_renderFooter()}
    </div>
  );
}
