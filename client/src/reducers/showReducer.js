import { DELETE_SHOW } from '../actions/types';

const initialState = {
  current: [],
  future: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
  }
}
