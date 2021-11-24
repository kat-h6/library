import { UserState, UserActions, LOG_IN, LOG_OUT } from '../../types/user'

//prettier-ignore
export default function user(
  state: UserState = {
    user: null,
  },
  action: UserActions
): UserState {
  switch (action.type) {
  case LOG_IN: {
    return { ...state, user: action.payload.user }
  }
  case LOG_OUT: {
    return {...state, user: null}
  }
  default:
    return state
  }
}
