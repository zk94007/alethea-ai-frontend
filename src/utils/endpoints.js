import { appConfig } from '../config/app';

export const HTTP_AUDIO_REQUEST = 'https://b63y2lkh0a.execute-api.us-east-2.amazonaws.com/dev/audio/google';
export const HTTP_WAV2LIP_REQUEST = 'https://b63y2lkh0a.execute-api.us-east-2.amazonaws.com/dev/wav2lip/request';
export const HTTP_WAV2LIP_STATUS = 'https://b63y2lkh0a.execute-api.us-east-2.amazonaws.com/dev/wav2lip/status';

export const HTTP_FILE_UPLOAD = `${appConfig.apiUrl}/avatars/get-upload-url`;
export const HTTP_LOGIN = `${appConfig.apiUrl}/auth/email/login`;
export const HTTP_SIGNUP = `${appConfig.apiUrl}/auth/email/register`;
export const HTTP_GOOGLE_LOGIN = `${appConfig.apiUrl}/auth/google/login`;
export const HTTP_GOOGLE_SIGNUP = `${appConfig.apiUrl}/auth/google/register`;
export const HTTP_JOB = `${appConfig.apiUrl}/jobs`;
export const HTTP_CHANGE_PASSWORD = `${appConfig.apiUrl}/users/user/change-password`;
export const HTTP_FORGOT_PASSWORD = `${appConfig.apiUrl}/auth/email/forgot-password`;
export const HTTP_RESET_PASSWORD = `${appConfig.apiUrl}/auth/email/reset-password`;
export const HTTP_VERIFY_EMAIL = `${appConfig.apiUrl}/auth/email/verify`;
export const HTTP_GET_ALL_USERS = `${appConfig.apiUrl}/users/all`;
export const HTTP_BLOCK_USER = `${appConfig.apiUrl}/users/block/user`;
export const HTTP_UNBLOCK_USER = `${appConfig.apiUrl}/users/unblock/user`;
export const HTTP_GET_ALL_JOBS = `${appConfig.apiUrl}/jobs/admin`;
export const HTTP_PROFILE_UPDATE = `${appConfig.apiUrl}/users/profile/update`;
export const HTTP_GET_PUBLIC_AVATARS = `${appConfig.apiUrl}/avatars/public`;
export const HTTP_GET_USER_AVATARS = `${appConfig.apiUrl}/avatars/`;
export const HTTP_GET_PUBLIC_CATEGORIES = `${appConfig.apiUrl}/categories/public`;
export const HTTP_GET_USER_CATEGORIES = `${appConfig.apiUrl}/categories/`;
export const HTTP_GET_ALICE_DEMO = `${appConfig.aliceApiUrl}/generate`;
export const HTTP_POST_ON_GENERAL_SLACK = `${appConfig.stagingGpt3ApiUrl}/gpt/post_on_slack_general`;
export const HTTP_UPLOAD_RECORDING = `${appConfig.aliceApiUrl}/upload-recording`;