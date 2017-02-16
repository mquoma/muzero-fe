/**
 * Created by iross on 2/16/2016.
 */
import React, { Component, PropTypes } from 'react';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move'
};

export default class Box extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    yellow: PropTypes.bool
  };

  render () {
    const { title, yellow } = this.props;
    const backgroundColor = yellow ? 'yellow' : 'white';

    return (
      <div style={{ ...styles, backgroundColor }}>
        {title}
      </div>
    );
  }
};
