import { SagaIterator } from 'redux-saga';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import {
  loginRequested,
  registerFormSubmitted,
  loginSuccess,
  loginFailed,
  registerSuccess,
  registerFailed,
  forgotPasswordRequested,
  forgotPasswordSuccess,
  forgotPasswordFailed,
} from './user';
import { selectForgotPasswordFormData, selectLoginFormData, selectRegisterFormData } from './userSelector';
import { forgotPassword, login, register } from '../lib/api/login';

function* loginUser(): SagaIterator {
  try {
    const { username, password, deviceId } = yield select(selectLoginFormData);
    const res = yield call(login, username, password, deviceId);
    console.log('login data:', res);
    yield put(loginSuccess());
  } catch (error) {
    console.log('===> Login failed', error);
    yield put(loginFailed());
  }
}

function* registerUser(): SagaIterator {
  try {
    const reqData = yield select(selectRegisterFormData);
    const res = yield call(register, reqData);
    console.log(res);
    yield put(registerSuccess());
  } catch (error) {
    yield put(registerFailed('Something went wrong!'));
  }
}

function* forgotPasswordSaga(): SagaIterator {
  try {
    const email = yield select(selectForgotPasswordFormData);
    const res = yield call(forgotPassword, email);
    console.log(res.data);
    yield put(forgotPasswordSuccess());
  } catch (error) {
    yield put(forgotPasswordFailed('Something went wrong!'));
  }
}

export function* watchUserSagas() {
  yield takeLatest(loginRequested.type, loginUser);
  yield takeLatest(registerFormSubmitted.type, registerUser);
  yield takeLatest(forgotPasswordRequested.type, forgotPasswordSaga);
}
