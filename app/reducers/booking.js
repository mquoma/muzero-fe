import createReducer from '../utilities/create-reducer';

const initialState = {

};

const actionHandlers = {
 
  ['SET_CURRENT_ACTION']: (state, action) => ({
  	currentAction: action.currentAction
  }),

  ['RECEIVE_OCCUPANCY_TYPES']: ( state, action) => ({
  	occupancyTypes: action.occupancyTypes
  }),
  ['SET_OCCUPANCY_ID']: ( state, action) => ({
  	occupancyId: action.occupancyId
  }),
  ['SET_TIER']: ( state, action) => ({
  	tierId: action.tierId
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