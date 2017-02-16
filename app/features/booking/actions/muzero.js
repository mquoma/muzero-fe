import axios from 'axios';
import apiconfig from '../../../utilities/apiconfig'

let baseUrl = 'http://localhost:3000/';


export function getUserDaysLeft (user) {

  return dispatch => {

    axios.get(`${baseUrl}/User/Requests/` + eventId)
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

