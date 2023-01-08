/* eslint-disable @typescript-eslint/no-var-requires */
import axios, { AxiosInstance } from 'axios';

// import { serviceName } from 'utils/serviceName';

const instance: AxiosInstance = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
