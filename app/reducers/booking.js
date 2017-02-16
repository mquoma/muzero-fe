import createReducer from '../utilities/create-reducer';

const initialState = {

};

const actionHandlers = {
 
  ['SET_CURRENT_ACTION']: (state, action) => ({
  	currentAction: action.currentAction
  }),

  ['RECEIVE_DAYS_LEFT']: ( state, action) => ({
  	daysLeft: action.daysLeft
  }),
  ['RECEIVE_PENDING_USER_REQUESTS']: ( state, action) => ({
  	pendingRequests: action.pendingRequests
  }),
  ['RECEIVE_ALL_USER_REQUESTS']: ( state, action) => ({
  	allRequests: action.allRequests
  }),
  ['SET_BOOKER_ID']: ( state, action) => ({
  	bookerId: action.bookerId
  }),
  ['SET_EVENT_ID']: ( state, action) => ({
  	eventId: action.eventId
  }),
  ['SET_NUMBER_OF_OCCUPANTS']: (set, action) => ({
    numberOfOccupants: action.numberOfOccupants
  }),
  ['SET_START_DATE']: (set, action) => ({
    startDate: action.startDate
  }),
  ['SET_END_DATE']: (set, action) => ({
    endDate: action.endDate
  }),
  ['SET_NUMBER_OF_ROOMS']: (set, action) => ({
    numberOfRooms: action.numberOfRooms
  }),
  ['RECEIVE_ERROR']: (set, action) => ({
    error: action.error
  })


};

export default createReducer(initialState, actionHandlers);
