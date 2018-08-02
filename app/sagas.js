//import { takeEvery } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchStrings() {
  // call restful API from localhost:3000/saved endpoint
  const strs = yield call([axios, axios.get], 'http://localhost:3000/saved');
  yield put({ type: 'FETCH_STRINGS_SUCCESS', payload: strs.data });
}

export function* fetchStringsWatcher() {
  yield takeEvery('FETCH_STRINGS', fetchStrings);
}
