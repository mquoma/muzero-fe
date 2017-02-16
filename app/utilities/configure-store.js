import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers';

const storeEnhancers = [];
/* eslint-disable no-undef */
if (__DEVTOOLS__) {
  /*eslint-enable no-undef */
  const DevTools = require('../components/DevTools.js').default;

  storeEnhancers.push(DevTools.instrument());
}
let combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore = applyMiddleware(thunkMiddleware)(combinedCreateStore);

const combinedReducer = combineReducers(reducers);

export default function configureStore (initialState) {

  const store = finalCreateStore(combinedReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
