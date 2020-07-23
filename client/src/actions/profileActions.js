import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, DELETE_SHOW } from './types';

// get current users profile
export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/profile/me', tokenConfig(getState));
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (names) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify({ names });
    const res = await axios.post('/api/profile', body, tokenConfig(getState));
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addToInterests = (showID) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify({ showID });
    const res = await axios.put(
      '/api/profile/current',
      body,
      tokenConfig(getState)
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addToFuture = (showID) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify({ showID });
    const res = await axios.put(
      '/api/profile/future',
      body,
      tokenConfig(getState)
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeFuture = (imdbID) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `/api/profile/future/${imdbID}`,
      tokenConfig(getState)
    );
    dispatch({
      type: DELETE_SHOW,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeCurrent = (imdbID) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `/api/profile/current/${imdbID}`,
      tokenConfig(getState)
    );
    dispatch({
      type: DELETE_SHOW,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
