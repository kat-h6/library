import {
  UserState,
  UserActions,
  LOG_IN,
  LOG_OUT,
  SET_TOKEN,
} from '../../types/user'

//prettier-ignore
export default function user(
  state: UserState = {
    user: null,
    token: null
  },
  action: UserActions
): UserState {
  switch (action.type) {
  case LOG_IN: {
    return { ...state, user: action.payload.user }
  }
  case SET_TOKEN: {
    return { ...state, token: action.payload.token}
  }
  case LOG_OUT: {
    return {...state, user: null, token: null}
  }
  default:
    return state
  }
}
