
import axios from 'axios';
import { browserHistory } from 'react-router';


export function getEventHotels () {

  console.log('get');
  return dispatch => {

    dispatch({
      type: 'GET_EVENT_HOTELS'
    });


    let uri = `${APISETTINGS.baseUrl}/EventHotels/1`;

    axios.get(uri)
      .then((resp) => {
        dispatch({
          type: 'RECEIVE_EVENT_HOTELS',
          eventHotels: resp.data
        });
      });
  };
}