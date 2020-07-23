import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  DELETE_SHOW,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  msg: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
    case DELETE_SHOW:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
        msg: action.payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        msg: {},
      };

    default:
      return state;
  }
}
