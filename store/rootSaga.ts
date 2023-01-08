import { all } from 'redux-saga/effects';
import {
  watchUserSagas
} from './userSaga';

export default function* rootSaga() {
  yield all([
    watchUserSagas(),
  ]);
}
