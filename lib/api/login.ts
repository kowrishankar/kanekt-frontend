import { SagaIterator } from 'redux-saga';
import axios, { request } from './apiClient';
import queryString from 'query-string';
import { TRegisterUser } from '../../store/type';

export const login = (username: string, password: string, deviceId: string): SagaIterator => {
  console.log("Login trying to reach backend");

  // TODO: to return user data if verification is not done
  return axios.post(queryString.stringifyUrl({ url: `/login` }), { username, password, device_id: deviceId });
};

export const register = (data: TRegisterUser): SagaIterator => {
  console.log('register trying to reach backend', data);
  return axios.post(queryString.stringifyUrl({ url: '/signup' }), data);
};

export const forgotPassword = (email: string): SagaIterator => {
  // TODO: API to be created
  console.log('forgot password API', email);
  return axios.post(queryString.stringifyUrl({ url: '/reset-password' }), email);
};
