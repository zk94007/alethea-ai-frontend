import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  CLOSE_AUTH_MODAL,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_LOGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  UPDATE_RENDER_DATA,
  SET_AUTH_TOKEN,
  SIGNUP_REQUEST,
  CLOSE_MESSAGE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_SIGNUP_REQUEST,
  UPDATE_CREDIT,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_PROFILE,
  VERIFY_REQUEST,
  SET_CURRENT_JOB,
  GET_JOB,
  DELETE_JOB,
  UPDATE_JOB,
  CREATE_JOB,
  GET_JOBS,
  GET_PUBLIC_AVATARS,
  GET_USER_AVATARS,
  GET_PUBLIC_CATEGORIES,
  GET_USER_CATEGORIES
} from './constants';

export const requestLogin = body => ({
  type: LOGIN_REQUEST,
  body
});

export const requestSignUp = body => ({
  type: SIGNUP_REQUEST,
  body
});

export const requestGoogleLogin = body => ({
  type: GOOGLE_LOGIN_REQUEST,
  body
});

export const requestGoogleSignUp = body => ({
  type: GOOGLE_SIGNUP_REQUEST,
  body
});

export const requestLogout = () => ({
  type: LOGOUT_REQUEST
});

export const openDrawer = () => ({
  type: OPEN_DRAWER
});

export const closeDrawer = () => ({
  type: CLOSE_DRAWER
});

export const openLoginModal = () => ({
  type: OPEN_LOGIN_MODAL
});

export const openSignUpModal = () => ({
  type: OPEN_SIGNUP_MODAL
});

export const openForgotPasswordModal = () => ({
  type: OPEN_FORGOT_PASSWORD_MODAL
});

export const closeAuthModal = () => ({
  type: CLOSE_AUTH_MODAL
});

export const updateRenderData = body => ({
  type: UPDATE_RENDER_DATA,
  body
});

export const setAuthToken = ({authToken}) => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const closeMessageSnack = () => ({
  type: CLOSE_MESSAGE
});

export const updateCredit = credit => ({
  type: UPDATE_CREDIT,
  credit
});

export const changePassword = (body, authToken) => ({
  type: CHANGE_PASSWORD,
  body,
  authToken
});

export const forgotPassword = email => ({
  type: FORGOT_PASSWORD,
  email
});

export const requestVerify = emailToken => ({
  type: VERIFY_REQUEST,
  emailToken
});

export const resetPassword = body => ({
  type: RESET_PASSWORD,
  body
});

export const updateProfile = (body, authToken) => ({
  type: UPDATE_PROFILE,
  body,
  authToken
});

export const getJob = id => ({
  type: GET_JOB,
  id
});

export const createJob = body => ({
  type: CREATE_JOB,
  body
});

export const deleteJob = id => ({
  type: DELETE_JOB,
  id
});

export const updateJob = (id, body) => ({
  type: UPDATE_JOB,
  id,
  body
});

export const getJobs = () => ({
  type: GET_JOBS
});

export const setCurrentJob = job => ({
  type: SET_CURRENT_JOB,
  job
});

export const getPublicAvatars = () => ({
  type: GET_PUBLIC_AVATARS
});

export const getUserAvatars = () => ({
  type: GET_USER_AVATARS
});

export const getPublicCategories = () => ({
  type: GET_PUBLIC_CATEGORIES
});

export const getUserCategories = () => ({
  type: GET_USER_CATEGORIES
});
