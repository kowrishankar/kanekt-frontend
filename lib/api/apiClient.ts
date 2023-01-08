import { AxiosRequestConfig, CancelToken } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, cancelled } from 'redux-saga/effects';
import axiosClient from './axiosClient';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Get {
  <T = any | null, R = T>(
    url: string,
    urlParams?: any,
    config?: AxiosRequestConfig,
  ): SagaIterator<R>;
}
interface Post {
  <T = any | null, R = T>(url: string, data?: any, config?: AxiosRequestConfig): SagaIterator<R>;
}

interface Put {
  <T = any | null, R = T>(url: string, data?: any, config?: AxiosRequestConfig): SagaIterator<R>;
}

interface Patch {
  <T = any | null, R = T>(url: string, data?: any, config?: AxiosRequestConfig): SagaIterator<R>;
}
interface Delete {
  <T = any | null>(url: string, data: any, config?: AxiosRequestConfig): SagaIterator<T>;
}

export function* request(config: AxiosRequestConfig = {}): SagaIterator {
  // const source = CancelToken.source();
  try {
    const result = yield call(axiosClient.request, { ...config });
    return result.data;
  } finally {
    if (yield cancelled()) {
      // source.cancel();
    }
  }
}

const get: Get = (url: string, urlParams: any = {}, config: AxiosRequestConfig = {}) =>
  request({
    method: 'get',
    url,
    params: urlParams,
    ...config,
  });

const post: Post = (url, data, config = {}) =>
  request({
    method: 'post',
    url,
    data,
    ...config,
  });

const put: Put = (url, data, config = {}) =>
  request({
    method: 'put',
    url,
    data,
    ...config,
  });

const patch: Patch = (url, data, config = {}) =>
  request({
    method: 'patch',
    url,
    data,
    ...config,
  });

export const deleteRequest: Delete = (url, data, config = {}) =>
  request({
    method: 'delete',
    url,
    data,
    ...config,
  });

export interface Client {
  get: Get;
  post: Post;
  patch: Patch;
  put: Put;
  delete: Delete;
}

const apiClient: Client = {
  get,
  post,
  patch,
  put,
  delete: deleteRequest,
};

export default apiClient;
