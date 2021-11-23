import React, { createRef, useEffect, useState } from 'react';
// import moment from 'moment';
import './styles.scss';
import './styleDemo.scss';
import MediaToolbar from '../../components/MediaToolbarAlice';
import { Dialog, DialogContent, TextField, Button, Snackbar } from '@material-ui/core';
import { FaClipboard, FaFileDownload } from 'react-icons/fa';
import Alert from '@material-ui/lab/Alert';
import { appConfig } from '../../config/app';
import { uploadRecording, postOnGeneralSlack, getDemoALiceData } from '../../services/http_client';
import { RenderLeftFooterMenu1, RenderLeftFooterMenu2, BeginMeetingButton } from '../../components/MediaToolbar';
import HeaderLine from '../../components/HeaderLine';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';

// hooks
import getGptCharacters from '../../hooks/useGptCharacters';

// constants
import NAMES from './names';


const nameReplacementMapping = {
  '10 FT': 'NFT',
  'n f t': 'NFT',
  'FTP': 'NFT',
  'FFT': 'NFT',
  'LFTS': 'NFTs',
  'FTD': 'NFT',
  'and f t': 'NFT',
  'and nft': 'iNFT',
  'nf d': 'NFT',
  'nf t': 'NFT',
  'nfd': 'NFT',
  'nfp': 'NFT',
  'ndf': 'NFT',
  'lfd': 'NFT',
  'inft': 'iNFT',
  'infd': 'iNFT',
  'ilfd': 'iNFT',
  'indf': 'iNFT',
  'nfts': 'NFTs',
  'infp': 'iNFT',
  'inf t': 'iNFT',
  'ift': 'iNFT',
  'i n f t': 'iNFT',
  'eye nft': 'iNFT',
  'i 10 FT': 'iNFT',
  'eye 10 FT': 'iNFT',
  'nftinft': 'NFT & iNFT',
  'FTNINFT': 'NFT & iNFT',
  'willis': 'Alice',
  'INF, T': 'iNFT'
};

const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

let inactivityTimeout;
let accumulatedUserSpeechText = '';

function Demo({ history, location, match }) {
  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: 'user'
  // };
  // const camRef = useRef();
  const loopVideoRef = createRef();
  // const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [camVisible, setCamVisible] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [state, setState] = useState({
    isAuthenticated: true,
    videoUrl: null,
    videoBlobUrl: null,
    videoStatus: 'NotLoaded', // | 'Loading' | 'Loaded'
    loopVideoUrl: '',
    timeSentFromFE: null,
    ttsInferenceSpeed: null,
    timeVideoInference: null,
    timeReceivedFromBE: null,
    videoFrameContainer1: null,
    videoFrameContainer2: null,
    frameRate: 24,
    currentFrame: 0,
    previousFrame: 0,
    usePosterImage: false,
    isRedirectCheckDone: location.pathname === '/ron' ? true : false,
    userName: '',
    hasGivenUserName: false,
    suggestedNames: false,
    introductoryVideoData: false,
    loadingIntroductorySpeech: false,
    nameAvailabilityError: false,
    isGettingDemoData: false,
    speechText: '',
    sessionId: Date.now()
  });

  const [speech, setSpeech] = useState(false);
  const [isGettingSpeech, setIsGettingSpeech] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isEndOfInteraction, setIsEndOfInteraction] = useState(false);
  const [sound, setSound] = useState(false);
  const [micConstraints, setMicConstraints] = useState(false);
  const [meetingBegan, setMeetingBegan] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingLink, setRecordingLink] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [camAllowed, setCamAllowed] = useState(false);
  const [error, setError] = useState(false);
  const [downloadVideo, setDownloadVideo] = useState();

  const updateState = values => {
    setState(prev => {
      return {
        ...prev,
        ...values
      };
    });
  };

  const obj = getGptCharacters(location, match);

  useEffect(() => {
    localStorage.setItem('listeningStatus', 1);
    localStorage.setItem('micStatus', 0);
    localStorage.setItem('speakerStatus', 0);
    localStorage.setItem('speakCount', 0);
    localStorage.setItem('speechText', '');
    localStorage.setItem('isIntroduction', 1);
    localStorage.setItem('hasFreeInteractionsLimitReached', 0);
    localStorage.setItem('errorCount', 0);

    if (!history.location.state && history.location.pathname === "/demo") {
      history.replace('/upload-video');
    } else {
      updateState({
        loopVideoUrl: obj.loop_video_url,
        isRedirectCheckDone: true,
      });
    }

    const speechConfig = speechsdk.SpeechConfig.fromSubscription(appConfig.speechKey, appConfig.speechRegion);
    speechConfig.speechRecognitionLanguage = 'en-US';
    speechConfig.setProperty(speechsdk.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, "5000");
    speechConfig.setProperty(speechsdk.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, "5000");

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechRecognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
    setRecognizer(speechRecognizer);

    state.videoFrameContainer1 = 'hi';

    return () => {
      setIsMuted(true);
      localStorage.setItem('listeningStatus', 0);
      localStorage.setItem('micStatus', 0);
      speechRecognizer.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!state.isAuthenticated) {
      state.videoFrameContainer1 = window.VideoFrame({
        id: 'video',
        frameRate: state.frameRate,
        callback: function (currentFrame) {
          updateState({ currentFrame });
        }
      });
      state.videoFrameContainer1.listen('frame');

      state.videoFrameContainer2 = window.VideoFrame({
        id: 'video_cache',
        frameRate: state.frameRate
      });

      if (state.videoFrameContainer2.video) {
        state.videoFrameContainer2.video.play();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuthenticated, state.videoBlobUrl]);

  // if (!history.location.state && location.pathname === '/ron') {
  //   if (isAuthenticated === false) {
  //     return (
  //       <div className='vh-100 d-flex flex-column align-items-center position-relative'>
  //         <div id='auth-wrapper' className='position-absolute'>
  //           <PasswordProtect
  //             onAuthSuccess={() => setIsAuthenticated(true)}
  //             password='Metapurse'
  //           />
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  const toggleSound = () => {
    setSound(prevState => !prevState);
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const toggleCam = () => {
    toggleReactCam();
    if (camAllowed) {
      setCamAllowed(false);
    } else {
      setCamAllowed(true);
    }
  };

  const toggleMute = () => {
    if (micConstraints) {
      localStorage.setItem('micStatus', 0);
      setMicConstraints(false);
      let span = document.getElementsByClassName('remove-span');
      if (span[0]) {
        span[0].remove();
      }
    } else {
      localStorage.setItem('micStatus', 1);
      setMicConstraints(true);
    }
  };

  const playVideo = data => {
    let vid = document.getElementById('video_cache');
    if (vid) {
      console.log("vid", vid)
      vid.src = data.result_video_url;
      vid.preload = 'auto';
      vid.onplaying = setTimeout(() => setSpeech({ text: data.text, isUser: false }), 500);
      vid.play();
    }
  };

  const downloadVideoFromSpeech = async (speech, isIntroductory = false, userName = false) => {
    const {
      location: { state: historyState }
    } = history;

    let formattedSpeech = '';
    formattedSpeech = `${localStorage.getItem('speechText')}${speech}${isIntroductory ? '' : '<|endoftext|>'}`;
    console.log('formattedSpeech', formattedSpeech);
    if (isIntroductory) {
      updateState({ loadingIntroductorySpeech: true });
    } else {
      updateState({
        isGettingDemoData: true
      });
    }
    let text = "";
    if (!historyState && location.pathname === '/ron') {
      if (!isIntroductory) text = speech
    }
    else
      text = !historyState && isIntroductory ? '' : !historyState ? speech : [0, 1, 2].includes(historyState.gpt) ? formattedSpeech : isIntroductory && [3, 4, 6].includes(historyState.gpt) ? '' : speech

    console.log("====text===", text);

    let data;

    if (Number(localStorage.getItem('speakCount')) > obj.speak_count && obj.end_of_interaction_response) {
      data = obj.random_responses[Math.floor((Math.random() * 3))];
    } else {
      try {
        data = await getDemoALiceData(
          text,
          state.currentFrame,
          obj.video_id,
          obj.google_tts,
          !historyState || historyState.gpt === 3 ? obj.gpt : isIntroductory && [0, 1, 2].includes(historyState.gpt) ? '5' : historyState.gpt,
          obj.language_code,
          "alice",
          state.sessionId,
          `${userName ? userName : state.userName}${state.sessionId}`,
          userName ? userName : state.userName
        )
        localStorage.setItem('errorCount', 0);
        data = data.data;
      } catch (error) {
        accumulatedUserSpeechText = '';
        setSpeech(false);
        setIsRecording(true);
        // const speakCount = Number(localStorage.getItem('speakCount'));
        const errorCount = Number(localStorage.getItem('errorCount'));
        localStorage.setItem('errorCount', errorCount + 1);
        !isIntroductory &&
          recognizer.startContinuousRecognitionAsync(
            () => {
              console.log('started');
            },
            e => {
              console.log('eroorrrrrrr', e);
            }
          );
        localStorage.setItem('listeningStatus', 1);

        // if (obj.inactivity_response_required) {
        //   inactivityTimeout = setTimeout(() => {
        //     if (speakCount < obj.speak_count) {
        //       let inactivityResponse = obj.inactivity_response[Math.floor((Math.random() * 3))];
        //       updateState({ videoUrl: inactivityResponse.result_video_url });
        //       localStorage.setItem('listeningStatus', 0);
        //       setIsRecording(false);
        //       recognizer.stopContinuousRecognitionAsync(async () => {
        //         playVideo(inactivityResponse);
        //       });
        //     }
        //   }, obj.inactivity_timeout_duration);
        // }
      }
    }
    setIsGettingSpeech(false);

    if (data && data.result_video_url) {

      if (isIntroductory) {
        formattedSpeech = `${localStorage.getItem('speechText')}${speech}<|endoftext|>`;
      }

      if (!isIntroductory) {
        formattedSpeech = `${formattedSpeech}${data.text}<|endoftext|>`;
      }
      updateState({
        videoUrl: data.result_video_url,
        videoStatus: 'Loading',
        isGettingDemoData: false
      });

      localStorage.setItem('speechText', formattedSpeech);

      if (!isIntroductory) {
        // const speakCount = Number(localStorage.getItem('speakCount'));
        // if (location.pathname === '/alice') {
        //   if (speakCount % 15 === 0) {
        //     await postOnGeneralSlack({
        //       session_id: state.sessionId,
        //       character: "alice"
        //     })
        //   }
        // }
        playVideo(data);
      } else {
        updateState({
          loadingIntroductorySpeech: false,
          introductoryVideoData: data
        });
      }
    } else {
      const errorCount = Number(localStorage.getItem('errorCount'));
      let errorMessage;
      if (errorCount > 2) {
        errorMessage = " needs some rest today, and is being rebooted. Please come back here shortly."
      } else {
        errorMessage = " was unable to hear you, please speak again."
      }
      setError(`${capitalizeFirstLetter(obj.character_name)} ${errorMessage}`);
    }
  };

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  const onEnded = () => {
    const isIntroduction = Number(localStorage.getItem('isIntroduction')) === 1;

    if (state.previousFrame) {
      state.videoFrameContainer1.video.currentTime = (state.previousFrame + 60) / 24;
    }
    updateState({
      videoUrl: null,
      videoBlobUrl: null,
      videoStatus: 'NotLoaded'
    });
    // state.videoFrameContainer1.video.play();
    setTimeout(async () => {
      setSpeech(false);
      setIsRecording(true);
      accumulatedUserSpeechText = '';
      const hasFreeInteractionsLimitReached = Number(localStorage.getItem('hasFreeInteractionsLimitReached')) === 1;
      const isListening = Number(localStorage.getItem('listeningStatus')) === 1;
      const isMicOn = Number(localStorage.getItem('micStatus')) === 1;
      const speakCount = Number(localStorage.getItem('speakCount'));
      // const {
      //     location: {state: historyState}
      //   } = history;


      // let gpt = 0;
      // if(!historyState && location.pathname === '/ron')
      //   gpt = 6
      // else gpt = historyState.gpt
      console.log("isEndOfFreeInteraction && isListening", speakCount, isListening, isMicOn, hasFreeInteractionsLimitReached)
      if (speakCount > obj.speak_count) {
        await postOnGeneralSlack({
          session_id: state.sessionId,
          character: obj.character_name.toLowerCase()
        });
        setIsEndOfInteraction(true);
        setIsRecording(false);
        setSpeech({
          speech: 'End of Interaction',
          isUser: undefined
        });
        window.location.reload();
      }
      else if (speakCount === obj.speak_count && obj.end_of_interaction_response) {
        setTimeout(() => {
          setTimeout(() => {
            let speech1 = obj.random_responses[Math.floor((Math.random() * 3))];
            updateState({ videoUrl: speech1.result_video_url })
            localStorage.setItem('listeningStatus', 0);
            setIsRecording(false);
            localStorage.setItem('speakCount', speakCount + 1);
            recognizer.stopContinuousRecognitionAsync(async () => {
              playVideo(speech1);
            });
          }, 1000);
        }, 1000);
      }
      else {
        !isIntroduction &&
          recognizer.startContinuousRecognitionAsync(
            () => {
              console.log('started');
            },
            e => {
              console.log('eroorrrrrrr', e);
            }
          );
        localStorage.setItem('listeningStatus', 1);

        if (obj.inactivity_response_required) {
          inactivityTimeout = setTimeout(() => {
            if (speakCount < obj.speak_count) {
              let inactivityResponse = obj.inactivity_response[Math.floor((Math.random() * 3))];
              updateState({ videoUrl: inactivityResponse.result_video_url });
              localStorage.setItem('listeningStatus', 0);
              setIsRecording(false);
              recognizer.stopContinuousRecognitionAsync(async () => {
                playVideo(inactivityResponse);
              });
            }
          }, obj.inactivity_timeout_duration);
        }
      }
      if (isIntroduction) {
        localStorage.setItem('isIntroduction', 0);
        sttFromMic();
      }
    }, 50);
  };

  async function sttFromMic() {
    recognizer.startContinuousRecognitionAsync(
      () => {
        console.log('started');
      },
      e => {
        console.log('eroorrrrrrr', e);
      }
    );

    recognizer.recognizing = async (s, e) => {
      const isListening = Number(localStorage.getItem('listeningStatus')) === 1;
      const isMicOn = Number(localStorage.getItem('micStatus')) === 1;
      console.log(e.privResult.privText);
      if (e.privResult.privText && isListening && isMicOn) {
        clearTimeout(inactivityTimeout);
        setIsRecording(false);
        setSpeech({
          text: accumulatedUserSpeechText + ' ' + e.privResult.privText,
          isUser: true
        });
      }
    };

    recognizer.recognized = (s, e) => {
      const isListening = Number(localStorage.getItem('listeningStatus')) === 1;
      const isMicOn = Number(localStorage.getItem('micStatus')) === 1;
      console.log(e.privResult.privText, isListening, isMicOn);
      if (e.privResult.privText && isListening && isMicOn) {
        let formattedSpeech = e.privResult.privText;

        Object.keys(nameReplacementMapping).forEach(n => {
          if (formattedSpeech.toLowerCase().includes(n.toLowerCase()) || formattedSpeech.includes(capitalizeFirstLetter(n))) {
            formattedSpeech = formattedSpeech.replace(n, nameReplacementMapping[n]);
          }
        });

        accumulatedUserSpeechText = accumulatedUserSpeechText + ' ' + formattedSpeech;

        handleOnRecognizeSpeech(e, accumulatedUserSpeechText);
      }

    };
  }

  const handleOnRecognizeSpeech = (e, accSpeech) => {
    console.log('recognized', e.privResult);
    localStorage.setItem('listeningStatus', 0);
    let speakCount = Number(localStorage.getItem('speakCount'));
    speakCount += 1;
    localStorage.setItem('speakCount', speakCount);
    setIsRecording(false);
    setIsGettingSpeech(true);
    recognizer.stopContinuousRecognitionAsync(
      async () => {
        console.log('endddedd');

        setSpeech({
          text: accSpeech,
          isUser: true
        });
        downloadVideoFromSpeech(accSpeech);
      },
      e => {
        console.log('eroorrrrrrr', e);
      }
    );
  };

  // const downloadVideo = (videoUrl, cb, speech) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', videoUrl, true);
  //   xhr.responseType = 'blob';
  //   xhr.onload = function () {
  //     if (this.status === 200) {
  //       setReply();
  //       setIsEnded(true);
  //       const myBlob = this.response;
  //       const blobUrl = (window.webkitURL || window.URL).createObjectURL(
  //         myBlob
  //       );
  //       cb(blobUrl);
  //     }
  //   };

  //   xhr.send();
  // };

  const toggleReactCam = () => {
    setCamVisible(!camVisible);
  };

  const handleOnChangeName = e => {
    const value = e.target.value.toLowerCase();
    if (value) {
      let suggestedNames = NAMES.filter(n => n.toLowerCase().startsWith(value)).map(
        n => n.charAt(0).toUpperCase() + n.slice(1)
      );
      suggestedNames = [...new Set(suggestedNames)];
      updateState({
        suggestedNames: suggestedNames.length ? suggestedNames.slice(0, 5) : false,
        userName: e.target.value
      });
    } else {
      updateState({ suggestedNames: false, userName: e.target.value });
    }
  };

  const handleOnSubmitName = () => {
    let introductorySpeech;

    if (state.suggestedNames.length) {
      introductorySpeech = `Hi ${state.userName}, what brings you to this virtual world ?`;
      downloadVideoFromSpeech(introductorySpeech, true);
      updateState({ hasGivenUserName: true });
    } else {
      updateState({
        nameAvailabilityError: true
      });
    }
  };

  console.log('nameAvailabilityError', state.nameAvailabilityError, state.hasGivenUserName);

  const handleOnClickName = name => {
    const introductorySpeech = `Hi ${name}, what brings you to this virtual world ?`;
    updateState({ hasGivenUserName: true, userName: name });
    downloadVideoFromSpeech(introductorySpeech, true, name);
  };

  // const nameAvailibilityErrorAction = () => (
  //   <>
  //     <IconButton
  //       size='small'
  //       className='mr-2'
  //       onClick={handleOnConfirmNameAvailibilityError}
  //     >
  //       <Done />
  //     </IconButton>
  //     <IconButton
  //       size='small'
  //       onClick={() => updateState({nameAvailabilityError: false})}
  //     >
  //       <Close />
  //     </IconButton>
  //   </>
  // );

  const handleOnClickOkay = () => {
    updateState({
      userName: obj.default_name,
      hasGivenUserName: true,
      nameAvailabilityError: false
    });
    const introductorySpeech = `Hi ${state.userName}, what brings you to this virtual world ?`;
    downloadVideoFromSpeech(introductorySpeech, true, obj.default_name);
  };

  const handleEnterName = e => {
    if (e.keyCode === 13 || e.which === 13) {
      handleOnSubmitName();
    }
  };

  const beginMeeting = async () => {
    if (!meetingBegan) {
      setMeetingBegan(true);
      // !state.loadingIntroductorySpeech && playVideo(state.introductoryVideoData);
    } else {
      await postOnGeneralSlack({
        session_id: state.sessionId,
        character: obj.character_name.toLowerCase()
      });
      setIsEndOfInteraction(true);
      setIsRecording(false);
      setSpeech({
        speech: 'End of Interaction',
        isUser: undefined
      });
      window.location.reload();
    }
  };

  const handleStopRecording = async blobUrl => {
    setIsUploading(true);
    const blob = await fetch(blobUrl).then(r => r.blob());
    console.log(blob);
    const fileObj = new File([blob], 'recording.mp4', { type: 'video/mp4' });
    console.log(fileObj);

    const formData = new FormData();
    formData.append('file', fileObj);

    uploadRecording(formData)
      .then(r => {
        if (r.data.video_url && r.data.video_id) {
          setRecordingLink(r.data.video_url);
          setDownloadVideo(r.data.video_id);
        }
      })
      .finally(() => setIsUploading(false));
  };

  const renderShareRecordingDialog = () => (
    <Dialog
      open={!!recordingLink}
      disableEnforceFocus
      disableScrollLock={true}
      aria-labelledby="form-dialog-title"
      onClose={() => setRecordingLink(false)}>
      <p className="font-size-34 font-weight-bold text-center pb-4 mb-0">Share Interaction Recording</p>
      <HeaderLine center />
      <DialogContent>
        <div className="d-flex justify-content-center mt-3">
          <video controls style={{ width: '500px', outline: 'none' }}>
            <source src={recordingLink} />
          </video>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <p className="text-center mr-3 mb-0">{recordingLink}</p>
          <FaClipboard className="clipboard-icon" onClick={() => navigator.clipboard.writeText(recordingLink)} />
          <a className="clipboard-icon ml-2" href={`https://${appConfig.username}:${appConfig.password}${location.pathname === '/alice_v3' || location.pathname === '/alice' ? '@backend-lipsync.alethea.ai' : '@apologia.ai'}/download-recording?download_req_id=${downloadVideo}`} target="_black"><FaFileDownload /></a>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <TwitterShareButton url={recordingLink} className="m-2">
            <TwitterIcon size={50} borderRadius={8} />
          </TwitterShareButton>
          <FacebookShareButton url={recordingLink} className="m-2">
            <FacebookIcon size={50} borderRadius={8} />
          </FacebookShareButton>
          <TelegramShareButton url={recordingLink} className="m-2">
            <TelegramIcon size={50} borderRadius={8} />
          </TelegramShareButton>
          <LinkedinShareButton url={recordingLink} className="m-2">
            <LinkedinIcon size={50} borderRadius={8} />
          </LinkedinShareButton>
          <WhatsappShareButton url={recordingLink} className="m-2">
            <WhatsappIcon size={50} borderRadius={8} />
          </WhatsappShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderNameDialog = () => (
    <Dialog
      open={!recordingLink && (!state.hasGivenUserName || !sound || !micConstraints || !meetingBegan)}
      // hideBackdrop
      disableEnforceFocus
      disableBackdropClick
      disableScrollLock={true}
      aria-labelledby="form-dialog-title">
      <p className="font-size-34 font-weight-bold text-center pb-4 mb-0 given-your-name">
        {!state.hasGivenUserName ? obj.given_your_name : 'Welcome'}
      </p>
      <HeaderLine center />
      <DialogContent>
        {!state.nameAvailabilityError && !state.hasGivenUserName && (
          <>
            {state.suggestedNames.length ? (
              <div className="name-suggestions-wrapper disable-scrollbars d-flex justify-content-center mt-4">
                {state.suggestedNames.map((n, i) => (
                  <Button
                    key={i}
                    variant="contained"
                    color="primary"
                    size="small"
                    className="mr-2"
                    onClick={() => handleOnClickName(n)}>
                    {n}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center mt-4">
                {obj.type_your_name}
              </div>
            )}
            <TextField
              variant="outlined"
              value={state.userName}
              onChange={handleOnChangeName}
              fullWidth
              className="px-3 mt-2 name-suggestions-input"
              onKeyUp={handleEnterName}
            />

            <div className="d-flex justify-content-center">
              <Button
                variant="contained"
                color="primary"
                className="okay-button mt-3 mx-auto"
                disabled={!state.userName}
                onClick={handleOnSubmitName}>
                Next
              </Button>
            </div>
          </>
        )}
        {state.nameAvailabilityError && (
          <div className="d-flex justify-content-center flex-column">
            <p className="fonrt-size-16 text-center mb-1">
              {obj.name_unavailability_title}
            </p>
            <p className="fonrt-size-16 text-center font-weight-bold pb-1 mb-0">{obj.default_name}</p>

            <div className="d-flex justify-content-center flex-wrap">
              <Button
                variant="contained"
                className="back-button mt-3 mx-1"
                onClick={() => updateState({ nameAvailabilityError: false })}>
                Back
              </Button>
              <Button variant="contained" color="primary" className="okay-button mt-3 mx-1" onClick={handleOnClickOkay}>
                Okay
              </Button>
            </div>
          </div>
        )}

        {state.hasGivenUserName && !state.nameAvailabilityError && (!sound || !micConstraints || !meetingBegan) && (
          <div>
            <p className="text-center mt-3">
              {obj.welcome_message_prefix} <b>{`${state.userName}`}</b>{obj.welcome_message_surfix}
            </p>
            {/* {!meetingBegan && ( */}
            <>
              <div className="d-flex justify-content-center flex-wrap">
                <RenderLeftFooterMenu1 sound={sound} toggleSound={toggleSound} isMuted={isMuted} />
                {/* {!meetingBegan && <RenderLeftFooterMenu3 camAllowed={camAllowed} toggleCam={toggleCam} />} */}
                <span className="ml-2">
                  <RenderLeftFooterMenu2
                    micConstraints={micConstraints}
                    toggleMute={toggleMute}
                    isRecording={isRecording}
                  />
                </span>
              </div>
              {!meetingBegan &&
                <div className="d-flex justify-content-center mt-3">
                  <BeginMeetingButton
                    meetingBegan={meetingBegan}
                    beginMeeting={beginMeeting}
                    sound={sound}
                    micConstraints={micConstraints}
                    loadingIntroductorySpeech={state.loadingIntroductorySpeech}
                  />
                </div>
              }
            </>
            {/* )} */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="alice-background">
      {renderShareRecordingDialog()}
      {renderNameDialog()}
      <div className="py-md-5 py-3 d-flex flex-column justify-content-center h-100 demo-wrapper-alice">
        <div className="row mx-0">
          <div className="col-md-12 col-12 video-wrapper-demo-alice">
            {/* <input
                  type='file'
                  onChange={e => {
                    debugger;
                  }}
                /> */}
            <div className="ai-video">
              {state.videoUrl && (
                <video id="video_cache" onEnded={onEnded} style={{ zIndex: 1300 }} muted={isMuted}></video>
              )}
              <video id="video" autoPlay muted style={{ zIndex: 100 }} ref={loopVideoRef} loop>
                <source
                  src={
                    history.location.state && history.location.state.video_url
                      ? history.location.state.video_url
                      : state.loopVideoUrl
                  }
                />
              </video>
              {/* {!speech || speech.isUser || speech.isUser === undefined ? "" : <div className={`script-wrapper desktop-ai-speech ${speech.isUser ? '' : 'speech-color'} ${!micConstraints || !sound || !meetingBegan ? 'd-none' : ''}`}>{speech.text}</div>} */}
            </div>
            {!recordingLink && (!state.hasGivenUserName || !sound || !micConstraints || !meetingBegan) ? <div /> :
              <>
                {state.isRedirectCheckDone && state.hasGivenUserName && meetingBegan && (
                  <MediaToolbar
                    loopVideoRef={loopVideoRef}
                    downloadVideoFromSpeech={(speech, startRecording) => downloadVideoFromSpeech(speech, startRecording)}
                    toggleReactCam={() => toggleReactCam()}
                    isMuted={isMuted}
                    setIsMuted={() => setIsMuted(!isMuted)}
                    playVideo={playVideo}
                    introductoryVideoData={state.introductoryVideoData}
                    loadingIntroductorySpeech={state.loadingIntroductorySpeech}
                    gettingDemoData={state.isGettingDemoData}
                    sessionId={state.sessionId}
                    speech={speech}
                    isRecording={isRecording}
                    isGettingSpeech={isGettingSpeech}
                    isEndOfFreeInteraction={isEndOfInteraction}
                    sound={sound}
                    setSound={setSound}
                    micConstraints={micConstraints}
                    setMicConstraints={setMicConstraints}
                    meetingBegan={meetingBegan}
                    setMeetingBegan={setMeetingBegan}
                    toggleMute={toggleMute}
                    toggleSound={toggleSound}
                    beginMeeting={beginMeeting}
                    handleStopRecording={handleStopRecording}
                    isUploading={isUploading}
                    toggleCam={toggleCam}
                    camAllowed={camAllowed}
                    location={location}
                  />
                )}
              </>
            }
          </div>
          {/* {!recordingLink && (!state.hasGivenUserName || !sound || !micConstraints || !meetingBegan) ? <div /> : (
                <div className="col-md-5 col-12 d-flex flex-column justify-content-center align-items-center cam-video-mobile">
                  <div className="alethea-logo">
                    <img src={Logo} alt="logo" />
                  </div>
                  <div onClick={toggleReactCam} id={location.pathname === "/alice" || location.pathname.includes('/widget') ? "videoalice3" : "videoalice2"}
                    style={{ zIndex: 100, cursor: 'pointer' }}>
                    <div
                      className="video-cam-wrapper-demo">
                      {camVisible && (
                        <Webcam audio={false} height={720} width={1280} ref={camRef} videoConstraints={videoConstraints} />
                      )}
                    </div>
                  </div>
                  {state.isRedirectCheckDone && state.hasGivenUserName && meetingBegan && (
                    <MediaToolbar
                      loopVideoRef={loopVideoRef}
                      downloadVideoFromSpeech={(speech, startRecording) => downloadVideoFromSpeech(speech, startRecording)}
                      toggleReactCam={() => toggleReactCam()}
                      isMuted={isMuted}
                      setIsMuted={() => setIsMuted(!isMuted)}
                      playVideo={playVideo}
                      introductoryVideoData={state.introductoryVideoData}
                      loadingIntroductorySpeech={state.loadingIntroductorySpeech}
                      gettingDemoData={state.isGettingDemoData}
                      sessionId={state.sessionId}
                      speech={speech}
                      isRecording={isRecording}
                      isGettingSpeech={isGettingSpeech}
                      isEndOfFreeInteraction={isEndOfInteraction}
                      sound={sound}
                      setSound={setSound}
                      micConstraints={micConstraints}
                      setMicConstraints={setMicConstraints}
                      meetingBegan={meetingBegan}
                      setMeetingBegan={setMeetingBegan}
                      toggleMute={toggleMute}
                      toggleSound={toggleSound}
                      beginMeeting={beginMeeting}
                      handleStopRecording={handleStopRecording}
                      isUploading={isUploading}
                      toggleCam={toggleCam}
                      camAllowed={camAllowed}
                      location={location}
                    />
                  )}
                </div>
              )} */}
        </div>
        {/* {!state.hasGivenUserName && (
              <>
                <div className='w-50 mt-5 mt-sm-auto mx-auto'>
                  {state.suggestedNames.length && (
                    <div className='name-suggestions-wrapper disable-scrollbars'>
                      {state.suggestedNames.map((n, i) => (
                        <Chip
                          key={i}
                          label={n}
                          variant='outlined'
                          className='mr-2'
                          onClick={() => handleOnClickName(n)}
                        />
                      ))}
                    </div>
                  )}
                  <label className='font-weight-medium d-block mb-1'>
                    Enter your name
                  </label>
                  <TextField
                    variant='outlined'
                    value={state.userName}
                    onChange={handleOnChangeName}
                    className='w-100'
                  />
                </div>
                <Button
                  variant='contained'
                  color='primary'
                  className='mx-auto mt-3'
                  disabled={!state.userName}
                  onClick={handleOnSubmitName}
                >
                  Enter
                </Button>
              </>
            )} */}
        <Snackbar open={!!error} autoHideDuration={10000} onClose={() => setError(false)}>
          <Alert onClose={() => setError(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Demo;
