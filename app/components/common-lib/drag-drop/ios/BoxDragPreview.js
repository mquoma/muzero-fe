/**
 * Created by iross on 2/17/2016.
 */
import React, { Component, PropTypes } from 'react';
import Box from './Box';

const styles = {
  display: 'inline-block',
  opacity: '.9'
};

export default class BoxDragPreview extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }


  render () {
    let width = document.querySelector('.draggable').offsetWidth;
    const { title } = this.props;
    return (
      <div style={{ ...styles, width }}>
        <Box title={title} />
      </div>
    );
  }
};
