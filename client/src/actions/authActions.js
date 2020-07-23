import axios from 'axios';
import { returnErrors, clearErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING }); // set loading to true

  try {
    const res = await axios.get('/api/auth/user', tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));

    dispatch({
      type: AUTH_ERROR,
    });
    setTimeout(() => dispatch(clearErrors()), 5000);
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
    dispatch(
      returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL')
    );
    setTimeout(() => dispatch(clearErrors()), 5000);
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(
      returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
    );
    setTimeout(() => dispatch(clearErrors()), 5000);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
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
