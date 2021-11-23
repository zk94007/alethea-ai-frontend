import {
  HTTP_FILE_UPLOAD,
  HTTP_LOGIN,
  HTTP_SIGNUP,
  HTTP_GOOGLE_LOGIN,
  HTTP_GOOGLE_SIGNUP,
  HTTP_JOB,
  HTTP_CHANGE_PASSWORD,
  HTTP_FORGOT_PASSWORD,
  HTTP_RESET_PASSWORD,
  HTTP_GET_ALL_USERS,
  HTTP_GET_ALL_JOBS,
  HTTP_PROFILE_UPDATE,
  HTTP_VERIFY_EMAIL,
  HTTP_GET_PUBLIC_AVATARS,
  HTTP_GET_USER_AVATARS,
  HTTP_BLOCK_USER,
  HTTP_GET_USER_CATEGORIES,
  HTTP_GET_PUBLIC_CATEGORIES,
  HTTP_UNBLOCK_USER,
  HTTP_GET_ALICE_DEMO,
  HTTP_POST_ON_GENERAL_SLACK,
  HTTP_UPLOAD_RECORDING
} from '../utils/endpoints';

import { request, request_upload_url } from '../utils/http';

export async function fileUpload(body) {
  return await request.post(HTTP_FILE_UPLOAD, body);
}

export async function login(body) {
  return await request.post(HTTP_LOGIN, body);
}

export async function signup(body) {
  return await request.post(HTTP_SIGNUP, body);
}

export async function googleSignup(body) {
  return await request.post(HTTP_GOOGLE_SIGNUP, body);
}

export async function googleLogin(body) {
  return await request.post(HTTP_GOOGLE_LOGIN, body);
}

export async function createJob(body, token) {
  return await request.post(HTTP_JOB, body, { headers: { Authorization: 'Bearer ' + token } });
}

export async function updateJob(id, body, token) {
  return await request.put(`${HTTP_JOB}/${id}`, body, { headers: { Authorization: 'Bearer ' + token } });
}

export async function deleteJob(id, token) {
  return await request.delete(`${HTTP_JOB}/${id}`, { headers: { Authorization: 'Bearer ' + token } });
}

export async function getJob(id, token) {
  return await request.get(`${HTTP_JOB}/${id}`, { headers: { Authorization: 'Bearer ' + token } });
}

export async function getJobs(token) {
  return await request.get(HTTP_JOB, { headers: { Authorization: 'Bearer ' + token } });
}

export async function changePassword(body, token) {
  return await request.post(HTTP_CHANGE_PASSWORD, body, { headers: { Authorization: 'Bearer ' + token } });
}

export async function forgotPassword(email) {
  return await request.get(`${HTTP_FORGOT_PASSWORD}/${email}`);
}

export async function resetPassword(body) {
  return await request.post(HTTP_RESET_PASSWORD, body);
}

export async function verifyEmail(emailToken) {
  return await request.get(`${HTTP_VERIFY_EMAIL}/${emailToken}`);
}

export async function getAllUsers(token) {
  return await request.get(HTTP_GET_ALL_USERS, { headers: { Authorization: 'Bearer ' + token } });
}

export async function getAllJobs(token) {
  return await request.get(HTTP_GET_ALL_JOBS, { headers: { Authorization: 'Bearer ' + token } });
}

export async function updateProfile(body, token) {
  return await request.post(HTTP_PROFILE_UPDATE, body, { headers: { Authorization: 'Bearer ' + token } });
}

export async function getPublicAvatars() {
  return await request.get(HTTP_GET_PUBLIC_AVATARS);
}

export async function getUserAvatars(token) {
  return await request.get(HTTP_GET_USER_AVATARS, { headers: { Authorization: 'Bearer ' + token } });
}

export async function blockUser(email, token) {
  return await request.get(`${HTTP_BLOCK_USER}/${email}`, { headers: { Authorization: 'Bearer ' + token } });
}

export async function getPublicCategories() {
  return await request.get(HTTP_GET_PUBLIC_CATEGORIES);
}

export async function getUserCategories(token) {
  return await request.get(HTTP_GET_USER_CATEGORIES, { headers: { Authorization: 'Bearer ' + token } });
}

export async function unblockUser(email, token) {
  return await request.get(`${HTTP_UNBLOCK_USER}/${email}`, { headers: { Authorization: 'Bearer ' + token } });
}

export async function uploadRecording(data) {
  return await request_upload_url.post(HTTP_UPLOAD_RECORDING, data, {
    headers: {
      'content-type': 'multipart/form-data'
    },
  });
}

export async function getDemoALiceData(
  text,
  frame,
  video_id,
  google_tts,
  gpt = 2,
  language_code,
  language_name,
  session_id,
  user_id,
  user_name
) {
  const params = {
    frame,
    video_id,
    google_tts,
    gpt,
    language_code,
    language_name,
    session_id,
    user_id,
    user_name,
    text
  };

  return await request_upload_url.get(HTTP_GET_ALICE_DEMO, {
    params
  });
}

export async function postOnGeneralSlack(data) {
  return await request.post(HTTP_POST_ON_GENERAL_SLACK, data);
}