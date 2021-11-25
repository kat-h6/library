import { takeLatest, select } from 'redux-saga/effects'

function* saveToLocalStorage(): any {
  const state = yield select()
  yield localStorage.setItem('state', JSON.stringify(state))
}

const latest = [takeLatest('*', saveToLocalStorage)]

export default latest
