import React, {useEffect} from 'react';

import turnCamON from '../../assets/video_player/imgs/video-on.svg';
import turnCamOff from '../../assets/video_player/imgs/video-off.svg';
import span1 from '../../assets/video_player/imgs/span1.svg';
import camToolbar from '../../assets/video_player/imgs/camToolbar.svg';
import TurnSoundOffIcon from '../../assets/muted-volume.svg';
import TurnSoundOnIcon from '../../assets/volume.svg';
import TurnSpeakerOffIcon from '../../assets/muted-mic.svg';
import TurnSpeakerOnIcon from '../../assets/mic.svg';
import micWaves from '../../assets/mic_waves.gif';
import userVoice from '../../assets/voice-2.svg';
import audioWave from '../../assets/audio_wave.gif';

import {
  // Footer,
  AliceFooter,
  FooterLeftMenu1,
  FooterLeftMenu2,
  FooterLeftMenu3,
  // FooterRightMenu,
  FooterIcon,
  FooterImgSpan
  //   InfoBar,
  // MobileFooter
} from '../styles';
// import { useReactMediaRecorder } from 'react-media-recorder';
import {CircularProgress} from '@material-ui/core';

import StartVideoRecording from '../../assets/start_recording.svg';
import StopVideoRecording from '../../assets/restart.svg';

export const RenderLeftFooterMenu1 = ({sound, toggleSound, isMuted}) => (
  <FooterLeftMenu1
    className={`d-flex justify-content-center align-items-center flex-column mr-1 tool-btn ${
      sound ? 'unmuted' : 'muted'
    }`}
    onClick={toggleSound}>
    {isMuted ? (
      <FooterIcon src={TurnSoundOffIcon} alt="turn sound off" />
    ) : (
      <FooterIcon src={TurnSoundOnIcon} alt="turn sound on" />
    )}
  </FooterLeftMenu1>
);

export const RenderLeftFooterMenu2 = ({micConstraints, toggleMute, isRecording}) => {
  return (
    <FooterLeftMenu2
      className={`d-flex justify-content-center align-items-center flex-column mr-1 tool-btn ${
        micConstraints ? 'unmuted' : 'muted'
      }`}
      onClick={() => toggleMute}>
      {micConstraints ? (
        <FooterIcon src={isRecording ? micWaves : TurnSpeakerOnIcon} alt="mute" onClick={toggleMute} />
      ) : (
        <FooterIcon src={TurnSpeakerOffIcon} alt="unmute" onClick={toggleMute} />
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
      onClick={toggleCam}>
      {camAllowed ? (
        <FooterIcon src={turnCamON} alt="Cam on" onClick={toggleCam} />
      ) : (
        <FooterIcon src={turnCamOff} alt="Cam Off" onClick={toggleCam} />
      )}
    </FooterLeftMenu3>
  );
};

export const BeginMeetingButton = ({meetingBegan, beginMeeting, sound, micConstraints, loadingIntroductorySpeech}) => (
  <div className="mr-auto">
    <FooterLeftMenu1
      className={`d-flex justify-content-center align-items-center flex-column mr-1 tool-btn ${
        sound ? 'unmuted' : 'muted'
      }`}
      onClick={() => beginMeeting()}>
      {meetingBegan ? (
        <FooterIcon src={StopVideoRecording} alt="turn sound off" />
      ) : (
        <FooterIcon src={StartVideoRecording} alt="turn sound on" />
      )}
    </FooterLeftMenu1>
  </div>
);

// const ScreenRecorder = ({ isUploading, handleStopRecording }) => {
//   const {
//     status,
//     error,
//     startRecording,
//     stopRecording,
//     mediaBlobUrl
//   } = useReactMediaRecorder({ screen: true, video: true, audio: true });

//   useEffect(() => {
//     if (mediaBlobUrl) {
//       handleStopRecording(mediaBlobUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [mediaBlobUrl]);
//   console.log('statusstatus', status, mediaBlobUrl);

//   return (
//     <>
//       <div className="ml-auto">
//         <FooterLeftMenu1
//           className={`d-flex justify-content-center align-items-center flex-column mr-1 tool-btn ${(status === 'idle' || isUploading) && error !== "screen_capturing_unsupported_error" ? 'unmuted' : 'muted'
//             }`}
//           onClick={() => stopRecording()}
//         >
//           {(status === 'recording' || isUploading) && error !== "screen_capturing_unsupported_error" ? (
//             <FooterIcon src={StartVideoRecording} alt='turn sound off' />
//           ) : (
//             <FooterIcon src={StartVideoRecording} alt='turn sound on' onClick={() => startRecording()} />
//           )}
//         </FooterLeftMenu1>
//       </div>
//     </>
//   );
// };

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

  const _renderCenterFooterMenu = () => {
    return (
      <>
        {micConstraints && sound ? (
          <>
            <div
              className={`script-wrapper mx-0 ${
                speech.isUser === true ? 'green' : speech.isUser === false ? 'speech-color' : ''
              } ${!micConstraints || !sound || !meetingBegan ? 'd-none' : ''}`}>
              <div className="text-input align-items-center d-flex" id="ResultText">
                {!isRecording && (
                  <>
                    <img
                      src={speech.isUser ? userVoice : audioWave}
                      alt="Voice:"
                      className="mr-2"
                      width="30"
                      height="28"
                    />
                    {speech.isUser ? speech.text : ''}
                    {isGettingSpeech && <CircularProgress size={16} className="ml-1" />}
                  </>
                )}
                {isRecording && 'Listening...'}
              </div>
            </div>
          </>
        ) : (
          <span className="text-white ml-2">
            Turn on your
            <FooterImgSpan src={TurnSpeakerOnIcon} alt={'mic'} className={'mx-2'} onClick={toggleMute} />
            and
            <FooterImgSpan src={TurnSoundOnIcon} alt={'cam'} className={'mx-2'} onClick={toggleSound} />
          </span>
        )}
      </>
    );
  };

  const _renderFooter = () => {
    return (
      <AliceFooter id="footer" className="">
        {location.pathname === '/sothebys' && _renderCenterFooterMenu()}
        <div className="px-0 d-flex align-items-center media-toolbar">
          {isEndOfFreeInteraction ? (
            <p className="font-weight-bold mb-0">End of Free Interactions</p>
          ) : (
            <>
              <div className="w-100 d-flex media-toolbar-icons">
                <BeginMeetingButton
                  meetingBegan={meetingBegan}
                  beginMeeting={beginMeeting}
                  sound={sound}
                  micConstraints={micConstraints}
                  loadingIntroductorySpeech={loadingIntroductorySpeech}
                />
                <RenderLeftFooterMenu1 sound={sound} toggleSound={toggleSound} isMuted={isMuted} />
                <RenderLeftFooterMenu2
                  micConstraints={micConstraints}
                  toggleMute={toggleMute}
                  isRecording={isRecording}
                />

                {/* <RenderLeftFooterMenu3 camAllowed={camAllowed} toggleCam={toggleCam} /> */}
                {/* <div className="d-none d-md-block"> */}
                {/* <div className="screen-recorder d-none d-md-block">
                  <ScreenRecorder
                    isUploading={isUploading}
                    handleStopRecording={handleStopRecording}
                  />
                </div> */}
                {/* </div> */}
              </div>
            </>
          )}
        </div>
      </AliceFooter>
    );
  };

  return <div className="w-100 d-flex flex-column align-items-center toolbar-footer">{_renderFooter()}</div>;
}
