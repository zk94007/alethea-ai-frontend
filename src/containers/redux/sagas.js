import {all, call, put, takeLatest, select} from 'redux-saga/effects';
import moment from 'moment';

import {
  login,
  signup,
  googleLogin,
  googleSignup,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
  verifyEmail,
  createJob,
  getJob,
  deleteJob,
  updateJob,
  getJobs,
  getPublicAvatars,
  getUserAvatars,
  getPublicCategories,
  getUserCategories
} from '../../services/http_client';
import {
  CLOSE_AUTH_MODAL,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_LOGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  SET_AUTH_MODAL,
  SET_DRAWER,
  SET_LOGIN_MODAL,
  SET_SIGNUP_MODAL,
  CREATE_JOB_ERROR,
  SET_FORGOT_PASSWORD_MODAL,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_RENDER_DATA,
  SET_RENDER_DATA,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_SIGNUP_REQUEST,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_RESPONSE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_RESPONSE,
  RESET_PASSWORD,
  RESET_PASSWORD_RESPONSE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_RESPONSE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  CREATE_JOB,
  CREATE_JOB_RESPONSE,
  GET_JOB,
  GET_JOB_RESPONSE,
  UPDATE_JOB,
  UPDATE_JOB_RESPONSE,
  DELETE_JOB,
  DELETE_JOB_RESPONSE,
  GET_JOBS,
  GET_JOBS_RESPONSE,
  GET_PUBLIC_AVATARS,
  GET_PUBLIC_AVATARS_RESPONSE,
  GET_USER_AVATARS,
  GET_USER_AVATARS_RESPONSE,
  GET_PUBLIC_CATEGORIES,
  GET_PUBLIC_CATEGORIES_RESPONSE,
  GET_USER_CATEGORIES,
  GET_USER_CATEGORIES_RESPONSE
} from './constants';

const getToken = state => state.rootReducer.authToken;

function* handleUpdateRenderData(action) {
  const {body} = action;
  yield put({
    type: SET_RENDER_DATA,
    ...body
  });
}

function* handleOpenDrawer() {
  yield put({type: SET_DRAWER, payload: true});
}

function* handleCloseDrawer() {
  yield put({type: SET_DRAWER, payload: false});
}

function* handleOpenLoginModal() {
  yield put({type: SET_LOGIN_MODAL, msg: '', errors: ''});
}

function* handleOpenSignUpModal() {
  yield put({type: SET_SIGNUP_MODAL, msg: '', errors: ''});
}

function* handleOpenForgotPasswordModal() {
  yield put({type: SET_FORGOT_PASSWORD_MODAL, msg: '', errors: ''});
}

function* handleCloseAuthModal() {
  yield put({type: SET_AUTH_MODAL, msg: '', errors: ''});
}

function* handleLoginRequest(action) {
  try {
    const {body} = action;
    const {data} = yield call(login, body);
    const {success} = data;

    if (success === true) {
      yield put({
        type: SET_AUTH_MODAL
      });
      yield put({
        type: LOGIN_SUCCESS,
        authToken: data.data.token.access_token,
        currentUser: data.data.user
      });

      const jobsResponse = yield call(getJobs, data.data.token.access_token);
      if (jobsResponse.data.data.success) {
        yield put({
          type: GET_JOBS_RESPONSE,
          jobs: jobsResponse.data.data.data
            .filter(j => j.renderData.status === 'finished')
            .sort((a, b) => moment(b.date) - moment(a.date))
        });
      }

      const avatarsResponse = yield call(getUserAvatars, data.data.token.access_token);
      if (avatarsResponse.data.data.success) {
        yield put({
          type: GET_USER_AVATARS_RESPONSE,
          avatars: avatarsResponse.data.data.data
        });
      }

      const categoriesResponse = yield call(getUserCategories, data.data.token.access_token);
      if (categoriesResponse.data.data.success) {
        yield put({
          type: GET_USER_CATEGORIES_RESPONSE,
          categories: categoriesResponse.data.data.data
        });
      }
    } else if (data.data.message === 'LOGIN.USER_NOT_FOUND') {
      yield put({
        type: LOGIN_ERROR,
        msg: "The email doesn't exist"
      });
    } else if (data.data.message === 'LOGIN.EMAIL_NOT_VERIFIED') {
      yield put({
        type: LOGIN_ERROR,
        msg: 'Please complete email verification first'
      });
    } else if (data.data.message === 'LOGIN.GOOGLE_USER_ERROR') {
      yield put({
        type: LOGIN_ERROR,
        msg: 'You registered with Gmail, please login with Gmail'
      });
    } else if (data.data.message === 'LOGIN.PASSWORD_ERROR') {
      yield put({
        type: LOGIN_ERROR,
        msg: 'Password is wrong'
      });
    } else {
      yield put({
        type: LOGIN_ERROR,
        msg: 'Unknown Error'
      });
    }
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      msg: 'LOGIN_ERROR: the connection was failed.'
    });
  }
}

function* handleSignUpRequest(action) {
  const {body} = action;
  try {
    const {data} = yield call(signup, body);
    const {success} = data;
    if (success === true) {
      yield put({
        type: SET_AUTH_MODAL
      });
      yield put({
        type: SIGNUP_SUCCESS,
        authToken: data.data.token.access_token,
        currentUser: data.data.user,
        msg: 'Successful registration. We sent you a verification email.'
      });
    } else {
      const {
        data: {message}
      } = data;
      if (message === 'REGISTRATION.MISSING_MANDATORY_PARAMETERS') {
        yield put({
          type: SIGNUP_ERROR,
          msg: 'There is a problem in provided credential.'
        });
      } else if (message === 'REGISTRATION.USER_ALREADY_REGISTERED') {
        yield put({
          type: SIGNUP_ERROR,
          msg: 'Email has registered already.'
        });
      } else {
        yield put({
          type: SIGNUP_ERROR,
          msg: 'Unknown Error'
        });
      }
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: SIGNUP_ERROR,
      msg: 'Something went wrong.'
    });
  }
}

function* handleGoogleLoginRequest(action) {
  try {
    const {body} = action;
    const {data} = yield call(googleLogin, body);
    const {success} = data;
    if (success === true) {
      yield put({
        type: SET_AUTH_MODAL
      });
      yield put({
        type: LOGIN_SUCCESS,
        authToken: data.data.token.access_token,
        currentUser: data.data.user
      });

      const jobsResponse = yield call(getJobs, data.data.token.access_token);
      if (jobsResponse.data.data.success) {
        yield put({
          type: GET_JOBS_RESPONSE,
          jobs: jobsResponse.data.data.data
            .filter(j => j.renderData.status === 'finished')
            .sort((a, b) => moment(b.date) - moment(a.date))
        });
      }

      const avatarsResponse = yield call(getUserAvatars, data.data.token.access_token);
      if (avatarsResponse.data.data.success) {
        yield put({
          type: GET_USER_AVATARS_RESPONSE,
          avatars: avatarsResponse.data.data.data
        });
      }

      const categoriesResponse = yield call(getUserCategories, data.data.token.access_token);
      if (categoriesResponse.data.data.success) {
        yield put({
          type: GET_USER_CATEGORIES_RESPONSE,
          categories: categoriesResponse.data.data.data
        });
      }
    } else if (data.data.message === 'LOGIN.USER_NOT_FOUND') {
      yield put({
        type: LOGIN_ERROR,
        msg: "The email doesn't exist"
      });
    } else if (data.data.message === 'LOGIN.EMAIL_NOT_VERIFIED') {
      yield put({
        type: LOGIN_ERROR,
        msg: 'Please complete email verification first'
      });
    } else if (data.data.message === 'LOGIN.ERROR') {
      yield put({
        type: LOGIN_ERROR,
        msg: 'Password is wrong'
      });
    } else {
      yield put({
        type: LOGIN_ERROR,
        msg: 'Unknown Error'
      });
    }
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      msg: 'LOGIN_ERROR: the connection was failed.'
    });
  }
}

function* handleGoogleSignUpRequest(action) {
  const {body} = action;
  try {
    const {data} = yield call(googleSignup, body);
    const {success} = data;
    if (success === true) {
      yield put({
        type: SET_AUTH_MODAL
      });
      yield put({
        type: SIGNUP_SUCCESS,
        authToken: data.data.token.access_token,
        currentUser: data.data.user,
        msg: 'Successful registration. We sent you a verification email.'
      });
    } else {
      const {
        data: {message}
      } = data;
      if (message === 'REGISTRATION.MISSING_MANDATORY_PARAMETERS') {
        yield put({
          type: SIGNUP_ERROR,
          msg: 'There is a problem in provided credential.'
        });
      } else if (message === 'REGISTRATION.USER_ALREADY_REGISTERED') {
        yield put({
          type: SIGNUP_ERROR,
          msg: 'Email has registered already.'
        });
      } else if (message === 'LOGIN.EMAIL_SENDED_RECENTLY') {
        yield put({
          type: SIGNUP_ERROR,
          msg: 'Email has sent to your email already. Please check your inbox.'
        });
      } else {
        yield put({
          type: SIGNUP_ERROR,
          msg: 'Unknown Error'
        });
      }
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: SIGNUP_ERROR,
      msg: 'Something went wrong.'
    });
  }
}

function* handleChangePassword(action) {
  const {authToken, body} = action;
  try {
    const {data} = yield call(changePassword, body, authToken);
    const {success} = data.data;
    if (success === true) {
      yield put({
        type: CHANGE_PASSWORD_RESPONSE,
        msg: 'Successful password changed.'
      });
    } else {
      yield put({
        type: CHANGE_PASSWORD_RESPONSE,
        msg: 'Something went wrong.'
      });
    }
  } catch (e) {
    yield put({
      type: CHANGE_PASSWORD_RESPONSE,
      msg: 'Something went wrong.'
    });
  }
}

function* handleVerifyRequest(action) {
  const {emailToken} = action;
  try {
    const {data} = yield call(verifyEmail, emailToken);
    console.log(data);
    const {success} = data;
    if (success === true) {
      yield put({
        type: VERIFY_SUCCESS,
        msg: 'Successfully verified'
      });
    } else {
      yield put({
        type: VERIFY_ERROR,
        msg: 'Invalid verification link'
      });
    }
  } catch (e) {
    yield put({
      type: VERIFY_ERROR,
      msg: 'Something went wrong'
    });
  }
}

function* handleForgotPassword(action) {
  const {email} = action;
  try {
    const {data} = yield call(forgotPassword, email);
    const {success} = data;
    if (success === true) {
      yield put({
        type: FORGOT_PASSWORD_RESPONSE,
        msg: 'Reset email sent successfully.'
      });
    } else {
      const {
        data: {message}
      } = data;
      if (message === 'LOGIN.GOOGLE_SIGNUP') {
        yield put({
          type: FORGOT_PASSWORD_RESPONSE,
          msg: 'You registered with Google, please Sign In with Google.'
        });
      } else if (message === 'LOGIN.USER_NOT_FOUND') {
        yield put({
          type: FORGOT_PASSWORD_RESPONSE,
          msg: 'The email does not exist, please register first'
        });
      } else {
        yield put({
          type: FORGOT_PASSWORD_RESPONSE,
          msg: 'Something went wrong.'
        });
      }
    }
  } catch (e) {
    yield put({
      type: FORGOT_PASSWORD_RESPONSE,
      msg: 'Something went wrong.'
    });
  }
}

function* handleResetPassword(action) {
  const {body} = action;
  try {
    const {data} = yield call(resetPassword, body);
    const {success} = data;
    if (success === true) {
      yield put({
        type: RESET_PASSWORD_RESPONSE,
        msg: 'Password reset successfully.'
      });
    } else {
      yield put({
        type: RESET_PASSWORD_RESPONSE,
        msg: 'Something went wrong.'
      });
    }
  } catch (e) {
    yield put({
      type: FORGOT_PASSWORD_RESPONSE,
      msg: 'Something went wrong.'
    });
  }
}

function* handleUpdateProfile(action) {
  const {body, authToken} = action;
  try {
    const {data} = yield call(updateProfile, body, authToken);
    const {success} = data.data;
    if (success === true) {
      yield put({
        type: UPDATE_PROFILE_RESPONSE,
        body: body
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* handleLogOutRequest() {
  yield put({type: LOGOUT_SUCCESS});
}

function* handleGetJob(action) {
  const {id} = action;
  try {
    const token = yield select(getToken);
    const {data} = yield call(getJob, id, token);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: GET_JOB_RESPONSE,
      job: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleCreateJob(action) {
  const {body} = action;
  try {
    const token = yield select(getToken);

    const {data} = yield call(createJob, body, token);
    const {success} = data.data;

    const getMessage = code => {
      switch (code) {
        case 'JOBS.ERROR.NO_CREDIT':
          return 'You have no credits';
        case 'JOBS.ERROR.UNVERIFIED':
          return 'Please verify your email first';
        case 'NO_CREDIT':
          return 'You have no credits';
        default:
          return 'Please try again after re-login';
      }
    };

    if (!success) {
      return yield put({
        type: CREATE_JOB_ERROR,
        errors: getMessage(data.data.data.message)
      });
    }

    yield put({
      type: CREATE_JOB_RESPONSE,
      job: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleDeleteJob(action) {
  const {id} = action;
  try {
    const token = yield select(getToken);
    const {data} = yield call(deleteJob, id, token);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: DELETE_JOB_RESPONSE,
      job: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleUpdateJob(action) {
  const {id, body} = action;
  try {
    const token = yield select(getToken);
    const {data} = yield call(updateJob, id, body, token);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: UPDATE_JOB_RESPONSE,
      job: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleGetJobs(action) {
  const {body} = action;
  try {
    const token = yield select(getToken);
    const {data} = yield call(getJobs, body, token);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: GET_JOBS_RESPONSE,
      jobs: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleGetPublicAvatars() {
  try {
    const {data} = yield call(getPublicAvatars);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: GET_PUBLIC_AVATARS_RESPONSE,
      avatars: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleGetUserAvatars() {
  try {
    const token = yield select(getToken);
    const {data} = yield call(getUserAvatars, token);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: GET_USER_AVATARS_RESPONSE,
      avatars: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleGetPublicCategories() {
  try {
    const {data} = yield call(getPublicCategories);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: GET_PUBLIC_CATEGORIES_RESPONSE,
      categories: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

function* handleGetUserCategories() {
  try {
    const token = yield select(getToken);
    const {data} = yield call(getUserCategories, token);
    const {success} = data.data;
    if (!success) return;

    yield put({
      type: GET_USER_CATEGORIES_RESPONSE,
      categories: data.data.data
    });
  } catch (e) {
    console.log(e);
  }
}

export default all([
  takeLatest(CREATE_JOB, handleCreateJob),
  takeLatest(UPDATE_JOB, handleUpdateJob),
  takeLatest(GET_JOBS, handleGetJobs),
  takeLatest(GET_JOB, handleGetJob),
  takeLatest(DELETE_JOB, handleDeleteJob),
  takeLatest(LOGIN_REQUEST, handleLoginRequest),
  takeLatest(OPEN_DRAWER, handleOpenDrawer),
  takeLatest(CLOSE_DRAWER, handleCloseDrawer),
  takeLatest(OPEN_LOGIN_MODAL, handleOpenLoginModal),
  takeLatest(OPEN_SIGNUP_MODAL, handleOpenSignUpModal),
  takeLatest(OPEN_FORGOT_PASSWORD_MODAL, handleOpenForgotPasswordModal),
  takeLatest(CLOSE_AUTH_MODAL, handleCloseAuthModal),
  takeLatest(UPDATE_RENDER_DATA, handleUpdateRenderData),
  takeLatest(LOGOUT_REQUEST, handleLogOutRequest),
  takeLatest(SIGNUP_REQUEST, handleSignUpRequest),
  takeLatest(GOOGLE_LOGIN_REQUEST, handleGoogleLoginRequest),
  takeLatest(GOOGLE_SIGNUP_REQUEST, handleGoogleSignUpRequest),
  takeLatest(CHANGE_PASSWORD, handleChangePassword),
  takeLatest(FORGOT_PASSWORD, handleForgotPassword),
  takeLatest(RESET_PASSWORD, handleResetPassword),
  takeLatest(UPDATE_PROFILE, handleUpdateProfile),
  takeLatest(VERIFY_REQUEST, handleVerifyRequest),
  takeLatest(GET_PUBLIC_AVATARS, handleGetPublicAvatars),
  takeLatest(GET_USER_AVATARS, handleGetUserAvatars),
  takeLatest(GET_PUBLIC_CATEGORIES, handleGetPublicCategories),
  takeLatest(GET_USER_CATEGORIES, handleGetUserCategories)
]);
