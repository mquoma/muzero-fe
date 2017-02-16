import axios from 'axios';
import apiconfig from '../../../utilities/apiconfig'

let baseUrl = 'http://localhost:3000';

export function getUserDaysLeft (user) {

  return dispatch => {

    axios.get(`${baseUrl}/User/` + user)
    .then(function (response) {
      const data = response.data;
      console.log('data');
      console.log(data);
      dispatch({
        type: 'RECEIVE_DAYS_LEFT',
        daysLeft: data[0]
      });
    });
  };
}


export function getUserPendingRequests (user) {

  return dispatch => {

    axios.get(`${baseUrl}/User/Requests/` + user)
    .then(function (response) {
      const data = response.data;
      console.log('data');
      console.log(data);
      dispatch({
        type: 'RECEIVE_PENDING_USER_REQUESTS',
        pendingRequests: data
      });
    });
  };
}

