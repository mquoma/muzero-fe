/**
 * Created by amattis on 12/22/2015.
 */
import React, { Component, PropTypes } from 'react';

export default class ButtonGroup extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  render () {
    return (
      <div className="button-group">
        {this.props.children}
      </div>
    );
  }
}
