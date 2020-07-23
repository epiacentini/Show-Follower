import { GET_USERS } from './types';
import { returnErrors } from './errorActions';

export const updateUsers = (userList) => async (dispatch) => {
  if (userList !== null) {
    dispatch({ type: GET_USERS, payload: userList });
    return;
  }
  dispatch(returnErrors('Please Select at least one user', '400'));
  return;
};
