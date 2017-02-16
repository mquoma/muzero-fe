import axios from 'axios';
import * as storage from '../localStorage';
import { store } from '../Root';
import { browserHistory } from 'react-router';

export function setTransform (accessToken) {
  axios.defaults.transformRequest.push(function (data, headers) {
    headers['Authorization'] = 'Bearer ' + accessToken;
    headers['Content-Type'] = 'application/json';
    return data;
  });
}

