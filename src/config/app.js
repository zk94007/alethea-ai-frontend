export const appConfig = {
  apiUrl: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : `https://${process.env.REACT_APP_BRANCH_NAME}-api.alethea.ai`,
  isProduction: process.env.REACT_APP_ENV === 'production',
  aliceApiUrl: process.env.ALICE_API_URL || 'https://backend-lipsync.alethea.ai',
  stagingGpt3ApiUrl: 'https://gpt3.alethea.ai',
  speechKey: process.env.REACT_APP_SPEECH_KEY || 'f74fcb632a4344c19b1f3f5abadf9219',
  speechRegion: process.env.REACT_APP_SPEECH_REGION || 'eastus',
  sithDaoApiUrl: 'https://api.sithdao.com',
  username: process.env.REACT_APP_USERNAME || 'Alethea',
  password: process.env.REACT_APP_PASSWORD || 'Alethea2021!',
  defaultTimeout: 300000
};
