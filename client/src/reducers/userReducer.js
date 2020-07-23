import { GET_USERS } from '../actions/types';

const initialState = {
  currentUsers: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        currentUsers: action.payload,
      };
    default:
      return state;
  }
}
