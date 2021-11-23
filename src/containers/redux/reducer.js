import {uniqBy} from 'lodash';

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SET_DRAWER,
  SET_SIGNUP_MODAL,
  SET_FORGOT_PASSWORD_MODAL,
  SET_AUTH_MODAL,
  SET_LOGIN_MODAL,
  SET_RENDER_DATA,
  LOGOUT_SUCCESS,
  SET_AUTH_TOKEN,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  CLOSE_MESSAGE,
  UPDATE_CREDIT,
  CHANGE_PASSWORD_RESPONSE,
  FORGOT_PASSWORD_RESPONSE,
  RESET_PASSWORD_RESPONSE,
  UPDATE_PROFILE_RESPONSE,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  CREATE_JOB_RESPONSE,
  GET_JOB_RESPONSE,
  UPDATE_JOB_RESPONSE,
  DELETE_JOB_RESPONSE,
  GET_JOBS_RESPONSE,
  SET_CURRENT_JOB,
  GET_PUBLIC_AVATARS_RESPONSE,
  GET_USER_AVATARS_RESPONSE,
  GET_PUBLIC_CATEGORIES_RESPONSE,
  GET_USER_CATEGORIES_RESPONSE,
  CREATE_JOB_ERROR
} from './constants';

const initialState = {
  renderData: {
    mode: '', // 'user-generated' | 'tokenized'
    method: '', // 'voice2video' | 'videomessage'
    audioKey: '',
    imageKey: '',
    videoKey: '',
    voiceId: '',
    gttsLanguageCode: '',
    gttsName: '',
    progress: 0,
    status: '',
    resultKey: '',
    jobId: '',
    inventoryId: '',
    text: ''
  },
  isWaiting: false,
  errors: '',
  authToken: '',
  currentUser: null,
  msg: '',
  showDrawer: false,
  showLoginModal: false,
  showSignUpModal: false,
  showForgotPasswordModal: false,
  jobs: [],
  currentJob: null,
  avatars: [],
  categories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_SUCCESS:
      return {...state, isNotVerified: false, msg: action.msg};
    case LOGIN_SUCCESS:
      return {...state, authToken: action.authToken, currentUser: action.currentUser, isNotVerified: false};
    case SIGNUP_SUCCESS:
      return {
        ...state,
        msg: action.msg,
        authToken: action.authToken,
        currentUser: action.currentUser,
        isNotVerified: true,
        maxAllowedRendering: 1
      };
    case VERIFY_ERROR:
      return {...state, msg: action.msg};
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
      return {...state, msg: action.msg};
    case SET_AUTH_TOKEN:
      return {...state, authToken: action.authToken};
    case SET_RENDER_DATA:
      return {
        ...state,
        renderData: {
          ...state.renderData,
          ...action
        }
      };
    case GET_PUBLIC_AVATARS_RESPONSE: {
      let avatars = state.avatars ?? [];
      return {
        ...state,
        avatars: state.avatars
          ? uniqBy([...avatars.filter(avatar => !avatar.isPublic), ...action.avatars], 'id')
          : [...action.avatars]
      };
    }
    case GET_USER_AVATARS_RESPONSE: {
      let avatars = state.avatars ?? [];
      return {
        ...state,
        avatars: state.avatars
          ? uniqBy([...action.avatars, ...avatars.filter(avatar => avatar.isPublic)], 'id')
          : [...action.avatars]
      };
    }
    case GET_PUBLIC_CATEGORIES_RESPONSE: {
      let categories = state.categories ?? [];
      return {
        ...state,
        categories: state.categories
          ? uniqBy([...categories.filter(category => !category.isPublic), ...action.categories], 'id')
          : [...action.categories]
      };
    }
    case GET_USER_CATEGORIES_RESPONSE: {
      let categories = state.categories ?? [];
      return {
        ...state,
        categories: state.categories
          ? uniqBy([...action.categories, ...categories.filter(category => category.isPublic)], 'id')
          : [...action.categories]
      };
    }
    case SET_DRAWER:
      return {...state, showDrawer: action.payload};
    case SET_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: true,
        showSignUpModal: false,
        showForgotPasswordModal: false,
        err: action.msg,
        errors: action.errors
      };
    case SET_SIGNUP_MODAL:
      return {
        ...state,
        showLoginModal: false,
        showSignUpModal: true,
        showForgotPasswordModal: false,
        err: action.msg,
        errors: action.errors
      };
    case SET_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        showLoginModal: false,
        showSignUpModal: false,
        showForgotPasswordModal: true,
        err: action.msg,
        errors: action.errors
      };
    case SET_AUTH_MODAL:
      return {
        ...state,
        showSignUpModal: false,
        showLoginModal: false,
        showForgotPasswordModal: false,
        err: action.msg,
        errors: action.errors
      };
    case CHANGE_PASSWORD_RESPONSE:
    case FORGOT_PASSWORD_RESPONSE:
    case RESET_PASSWORD_RESPONSE:
      return {...state, msg: action.msg};
    case CLOSE_MESSAGE:
      return {...state, msg: '', errors: ''};
    case LOGOUT_SUCCESS: {
      let avatars = state.avatars ?? [];
      let categories = state.categories ?? [];
      return {
        ...initialState,
        avatars: [...avatars.filter(avatar => avatar.isPublic)],
        categories: [...categories.filter(category => category.isPublic)]
      };
    }
    case UPDATE_CREDIT:
      return {
        ...state
      };
    case UPDATE_PROFILE_RESPONSE:
      return {...state, currentUser: {...state.currentUser, ...action.body}};
    case GET_JOBS_RESPONSE:
      return {...state, jobs: [...action.jobs]};
    case GET_JOB_RESPONSE:
    case UPDATE_JOB_RESPONSE:
      return {
        ...state,
        currentJob: {...action.job},
        jobs: [action.job, ...state.jobs.filter(j => j.id !== action.job.id)]
      };
    case DELETE_JOB_RESPONSE:
      return {...state, jobs: [...state.jobs.filter(j => j.id !== action.job.id)]};
    case CREATE_JOB_RESPONSE:
      return {
        ...state,
        currentJob: {...action.job},
        jobs: [action.job, ...state.jobs],
        currentUser: {
          ...state.currentUser,
          credit: Math.max(state.currentUser.credit - 1, 0),
          freeCredit: Math.max(state.currentUser.freeCredit - 1, 0)
        }
      };
    case SET_CURRENT_JOB:
      return {...state, currentJob: {...action.job}};
    case CREATE_JOB_ERROR:
      return {...state, errors: action.errors};
    default:
      return state;
  }
};
