import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from './common-lib/spinner/Spinner';
import { browserHistory } from 'react-router';

class Application extends React.Component {
  constructor (props, context) {
    super(props, context);
  };

  static propTypes = {
    children: PropTypes.any,
    state: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.object
  };

  render () {

    return (
      <div
        ref="ieMinHeightWrapper"
        className="ie-min-height-wrapper">
        <div id="flex-container">
          <div id="main-content">
             {this.props.children &&
               React.cloneElement(
                 this.props.children,
                 { dispatch: this.props.dispatch, ...this.props.state })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ state } ))(Application);
