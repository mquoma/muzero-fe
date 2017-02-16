import React, { Component, PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import configureStore from './utilities/configure-store';
import * as storage from './localStorage';
import { RootRoute } from './routeconfig/RootConfig';
import { setTransform, setupInterceptors } from './utilities/transforms';


const initialState = {
  start: {},
  eventHotels: {}
};

export const store = configureStore(initialState);

class Root extends Component {

  static propTypes = {
    history: PropTypes.object
  };

  renderDevTools () {
    /* eslint-disable no-undef */
    if ( __DEVTOOLS__ ) {
      const DevTools = require('./components/DevTools').default;
      return <DevTools key="devtools" />;
    }
    /* eslint-enable no-undef */
  }
  
  render () {
    return (
      <div>
        { this.renderDevTools() }
        <Router history={browserHistory} routes={RootRoute} />
      </div>
    );
  }
}

export default connect((state) => ({ state }))(Root);
